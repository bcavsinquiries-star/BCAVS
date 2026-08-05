/* ============================================================
   ANNOTATION / GUIDED-TOUR ENGINE
   ============================================================
   Adviser feedback: "interactive" should not mean rotate/zoom only —
   the system should actively describe the artifact to the user, part
   by part, with voice narration, instead of leaving discovery entirely
   up to free manipulation.

   This module adds:
     - Point-of-interest hotspots positioned directly on each loaded
       3D model (real model or placeholder), computed from the model's
       own bounding box so it works for every artifact automatically.
     - Click-to-narrate: clicking a hotspot shows a caption and speaks
       it aloud via the Web Speech API (window.speechSynthesis).
     - "Guided Tour" mode: auto-plays every hotspot in sequence — the
       "demo / simulate each part" behavior requested by the adviser.

   Hooked from js/models.js's loadArtifactModel() -> finish(), so it
   runs after the real model OR the placeholder is finalized in the
   scene, covering every code path (real model, load-error fallback,
   no captured model yet).
   ============================================================ */

/**
 * Curated hotspots per artifact id. Positions are expressed as
 * fractions (0–1) of the loaded object's world-space bounding box,
 * so they don't need to be re-authored if the model is re-scaled.
 */
const ARTIFACT_HOTSPOTS = {
  'Our Lady of the Turumba': [
    { label: 'A Modest but Cherished Painting', frac: { x: 0.32, y: 0.55, z: 0.5 },
      text: "The painting is created using oil paint on canvas, the Our Lady of Turumba portrays the sorrowful and compassionate image of the Virgin Mary, symbolizing her suffering as the mother of Jesus Christ. Despite its small size, the painting remains a treasured religious artifact in Pakil, Laguna, representing the faith, devotion, and cultural heritage of generations of devotees." },
    { label: 'Origins and the Turumba Festival', frac: { x: 0.00050, y: 0.50, z: 0.5 },
      text: "Discovered in 1788 Our Lady of Turumba is a miraculous image of Our Lady of Sorrows, originally a small 9 × 11-inch oil painting brought by a missionary across Laguna de Bay. During a violent storm, the image fell into the lake and was later discovered by local fishermen on Good Friday. Although they tried to bring it to several nearby towns, strong winds and rough waters prevented them. When they headed toward Pakil, Laguna, the lake suddenly became calm, leading them to believe that the Blessed Virgin had chosen Pakil as her home. The image was joyfully welcomed by the townspeople and enshrined in the parish church, where it became the center of devotion. This miraculous event gave birth to the Turumba Festival, an annual celebration of faith, thanksgiving, music, and procession that continues to this day." }
  ],
  'Black Stone': [
    { label: 'Physical Description', frac: { x: 0.5, y: 0.48, z: 0.5 },
      text: "The Black Stone is a smooth, dark-colored stone with a naturally glossy surface, oval shape, and visible cracks formed over time. It bears a Latin inscription believed to hold spiritual significance and is regarded as a sacred object in the local healing tradition." },
    { label: 'Traditional Function', frac: { x: 0.0, y: 0.78, z: 0.5 },
      text: "The Black Stone is used in traditional healing rituals and prayers. It is believed to promote healing, provide spiritual protection, ward off negative forces, and seek divine intervention during times of illness or natural calamities." },
  ],
  'Siniloan': [
    { label: 'The Crown and Suspension Loop', frac: { x: 0.5, y: 0.85, z: 0.5 },
      text: "At the top, the crown and suspension loop are where the bell was traditionally mounted in the church tower, allowing it to swing freely when rung." },
    { label: 'The Bell Body', frac: { x: 0.5, y: 0.5, z: 0.5 },
      text: "Cast in bronze, the body of this bell has called parishioners of Saints Peter and Paul Parish Church to worship for generations, marking both religious and civic occasions." },
    { label: 'The Rim, Where Sound Begins', frac: { x: 0.5, y: 0.12, z: 0.5 },
      text: "The rim is where the clapper strikes to produce sound. This bell dates back to the eighteenth or nineteenth century, during the Spanish colonial period." }
  ],
  'Pangil': [
    { label: 'Chinese Ceramic Plate', frac: { x: 0.25, y: 0.12, z: 0.75 },
      text: "This Chinese ceramic plate was recovered during the archaeological excavation in Sulib, Pangil. It is part of a collection of ceramics dating to the Ming and Song Dynasties and represents the craftsmanship and material culture introduced through early Chinese trade and settlement." },
    { label: 'Chinese Pottery Vessel', frac: { x: 0.55, y: 0.5, z: 0.5 },
      text: "This Chinese pottery vessel was excavated in Sulib, Pangil. It dates back to the Ming and Song Dynasties of China and is believed to have belonged to wealthy Chinese immigrants who buried such objects as part of their funeral traditions." },
    { label: 'Chinese Ceramic Dish', frac: { x: 0.82, y: 0.12, z: 0.75 },
      text: "This small Chinese ceramic dish was discovered alongside other pottery artifacts during the excavation in Sulib, Pangil. Dating to the Ming and Song Dynasties, it reflects the fine ceramic traditions of China and serves as evidence of the cultural and commercial exchanges that took place in the region." }
  ]
};

/**
 * Fallback hotspots for artifacts without a curated set yet (still on
 * the placeholder jar mesh) — synthesized from the artifact's own
 * metadata so every artifact gets a working guided tour, even before
 * its real model and hand-written hotspots exist.
 */
function defaultHotspotsFor(a) {
  const material = (a.material || 'a traditional material').toLowerCase();
  const era = a.era || 'an undetermined era';
  const muni = a.muni || 'its municipality';
  const category = (a.category || 'cultural artifact').toLowerCase();
  const condition = (a.condition || 'preserved').toLowerCase();
  return [
    { label: 'Upper Section', frac: { x: .5, y: .85, z: .5 },
      text: `This is the upper section of the ${a.title}, a ${category} from ${muni}, Laguna.` },
    { label: 'Form and Material', frac: { x: .5, y: .5, z: .5 },
      text: `The main body is associated with ${material}, characteristic of the ${era} in ${muni}.` },
    { label: 'Base and Preservation', frac: { x: .5, y: .12, z: .5 },
      text: `Today, the ${a.title} is ${condition}, continuing to represent the cultural heritage of ${muni}.` }
  ];
}

/* ---- module state ---- */
let _hsMarkers = [];      // { el, world: THREE.Vector3, data }
let _hsCaptionEl = null;
let _hsRAF = null;
let _hsActiveIndex = -1;
let _hsSpeaking = false;      // true while the current hotspot's narration is playing
let _hsBoxCenter = null;      // world-space center of the loaded object, for glow offset direction
let _hsGlowTex = null;
let _hsGlowSprite = null;
let _hsGlowTargetOpacity = 0;
let _hsGlowBaseScale = 0.4;
let _hsFocusRAF = null;       // camera-focus tween handle

/**
 * Speaks a single line of narration and stops there — playback never
 * auto-advances to the next hotspot on its own. Moving to another part
 * always requires the person to hover/click a circle or use Prev/Next.
 */
function _speak(text) {
  if (!('speechSynthesis' in window)) return false;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.pitch = 1.0;
    utter.onstart = () => { _hsSpeaking = true; _syncPlayPauseIcon(); };
    utter.onend = () => { _hsSpeaking = false; _syncPlayPauseIcon(); };
    utter.onerror = () => { _hsSpeaking = false; _syncPlayPauseIcon(); };
    window.speechSynthesis.speak(utter);
    return true;
  } catch (e) {
    console.warn('[Annotations] speechSynthesis failed:', e);
    return false;
  }
}

/* ---- Quick win #1: camera auto-focus on the active hotspot ---- */
function _easeInOutQuad(t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

function _focusCameraOn(worldPos) {
  const v = window.__viewer;
  if (!v || !v.camera || !v.controls) return;
  if (_hsFocusRAF) cancelAnimationFrame(_hsFocusRAF);

  const camera = v.camera, controls = v.controls;
  const startTarget = controls.target.clone();
  const endTarget = worldPos.clone();
  const startPos = camera.position.clone();

  // Keep the current viewing direction/angle, just pull the camera
  // in a bit closer toward the part being described.
  const dir = startPos.clone().sub(startTarget);
  const currentDist = dir.length() || 1;
  dir.normalize();
  const minD = controls.minDistance || 1;
  const maxD = controls.maxDistance || 10;
  const focusDist = THREE.MathUtils.clamp(currentDist * 0.82, minD, maxD);
  const endPos = endTarget.clone().add(dir.multiplyScalar(focusDist));

  const duration = 900;
  const t0 = performance.now();
  function tick() {
    const t = Math.min(1, (performance.now() - t0) / duration);
    const e = _easeInOutQuad(t);
    controls.target.lerpVectors(startTarget, endTarget, e);
    camera.position.lerpVectors(startPos, endPos, e);
    if (t < 1) { _hsFocusRAF = requestAnimationFrame(tick); }
    else { _hsFocusRAF = null; }
  }
  tick();
}

/* ---- Quick win #2: in-scene glow highlight on the active part ---- */
function _makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(227,194,125,0.95)');
  grad.addColorStop(0.4, 'rgba(227,194,125,0.35)');
  grad.addColorStop(1, 'rgba(227,194,125,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function _ensureGlowSprite(scene) {
  if (!_hsGlowTex) _hsGlowTex = _makeGlowTexture();
  if (!_hsGlowSprite) {
    const mat = new THREE.SpriteMaterial({
      map: _hsGlowTex, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, opacity: 0
    });
    _hsGlowSprite = new THREE.Sprite(mat);
  }
  if (_hsGlowSprite.parent !== scene) scene.add(_hsGlowSprite);
  return _hsGlowSprite;
}

function _showGlowAt(worldPos) {
  const v = window.__viewer;
  if (!v || !v.scene || typeof THREE === 'undefined') return;
  const sprite = _ensureGlowSprite(v.scene);
  sprite.position.copy(worldPos);
  sprite.scale.setScalar(_hsGlowBaseScale);
  _hsGlowTargetOpacity = 0.85;
}

function _hideGlow() {
  _hsGlowTargetOpacity = 0;
}


function _clearHotspots() {
  if (_hsRAF) cancelAnimationFrame(_hsRAF);
  _hsRAF = null;
  if (_hsFocusRAF) cancelAnimationFrame(_hsFocusRAF);
  _hsFocusRAF = null;
  _hsSpeaking = false;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  _hsMarkers.forEach(m => m.el.remove());
  _hsMarkers = [];
  if (_hsCaptionEl) { _hsCaptionEl.remove(); _hsCaptionEl = null; }
  if (_hsGlowSprite) { _hsGlowSprite.material.opacity = 0; }
  _hsGlowTargetOpacity = 0;
  _hsActiveIndex = -1;
  const btn = document.getElementById('btnGuidedTour');
  if (btn) btn.classList.remove('active');
}

function _buildCaptionEl(wrap) {
  const el = document.createElement('div');
  el.className = 'hotspot-caption';
  el.innerHTML = `
    <div class="hotspot-caption-head">
      <span class="hotspot-caption-label"></span>
      <button class="hotspot-caption-close" aria-label="Close narration" title="Close">&times;</button>
    </div>
    <div class="hotspot-caption-text"></div>
    <div class="hotspot-caption-controls">
      <button class="hs-ctrl" id="hsPrev" aria-label="Previous part" title="Previous part">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 20L9 12l10-8v16z"/><path d="M5 19V5"/></svg>
      </button>
      <button class="hs-ctrl hs-ctrl-primary" id="hsPlayPause" aria-label="Play or pause narration" title="Play / Pause">
        <svg class="hs-icon-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        <svg class="hs-icon-pause" viewBox="0 0 24 24" fill="currentColor" style="display:none"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
      </button>
      <button class="hs-ctrl" id="hsNext" aria-label="Next part" title="Next part">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4l10 8-10 8V4z"/><path d="M19 5v14"/></svg>
      </button>
    </div>
  `;
  el.querySelector('.hotspot-caption-close').addEventListener('click', () => {
    _stopSpeaking();
    el.classList.remove('visible');
    _hideGlow();
    _setActiveMarker(-1);
  });
  // Prev/Next move to one specific part and speak it once — they never
  // chain into a continuous run through the rest of the hotspots.
  el.querySelector('#hsPrev').addEventListener('click', () => {
    activateHotspot(Math.max(0, _hsActiveIndex - 1));
  });
  el.querySelector('#hsNext').addEventListener('click', () => {
    activateHotspot(Math.min(_hsMarkers.length - 1, _hsActiveIndex + 1));
  });
  el.querySelector('#hsPlayPause').addEventListener('click', _togglePlayPause);
  wrap.appendChild(el);
  return el;
}

function _syncPlayPauseIcon() {
  if (!_hsCaptionEl) return;
  const btn = _hsCaptionEl.querySelector('#hsPlayPause');
  if (!btn) return;
  btn.querySelector('.hs-icon-play').style.display = _hsSpeaking ? 'none' : '';
  btn.querySelector('.hs-icon-pause').style.display = _hsSpeaking ? '' : 'none';
}

/** Stops any narration currently playing, without hiding the caption/marker. */
function _stopSpeaking() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  _hsSpeaking = false;
  const tourBtn = document.getElementById('btnGuidedTour');
  if (tourBtn) tourBtn.classList.remove('active');
  _syncPlayPauseIcon();
}

/** Play/Pause button inside the caption panel — (re)plays the currently
 *  active hotspot's narration once, or stops it if it's already playing.
 *  This never starts a continuous run through the other hotspots. */
function _togglePlayPause() {
  if (!_hsMarkers.length) return;
  if (_hsSpeaking) {
    _stopSpeaking();
  } else {
    const startAt = _hsActiveIndex >= 0 ? _hsActiveIndex : 0;
    activateHotspot(startAt);
  }
}

function _setActiveMarker(i) {
  _hsMarkers.forEach((m, idx) => m.el.classList.toggle('active', idx === i));
  _hsActiveIndex = i;
}

/**
 * Activates a single hotspot: shows its caption, focuses the camera on
 * it, glows the part on the model, and speaks its narration once.
 * Narration never auto-advances into the next hotspot — reaching
 * another part always requires the person to click a circle, or use
 * Prev/Next/Play in the caption panel.
 */
function activateHotspot(i) {
  if (i < 0 || i >= _hsMarkers.length) return;
  const marker = _hsMarkers[i];
  const h = marker.data;
  _setActiveMarker(i);
  if (_hsCaptionEl) {
    _hsCaptionEl.querySelector('.hotspot-caption-label').textContent = `${i + 1} / ${_hsMarkers.length} — ${h.label}`;
    _hsCaptionEl.querySelector('.hotspot-caption-text').textContent = h.text;
    _hsCaptionEl.classList.add('visible');
  }
  _focusCameraOn(marker.world);
  _showGlowAt(marker.world);
  _speak(h.text);
  const tourBtn = document.getElementById('btnGuidedTour');
  if (tourBtn) tourBtn.classList.add('active');
}

/** Toolbar "Guided Tour" button — opens the narration panel at the
 *  first hotspot (or closes it if it's already open). It only ever
 *  plays the one part it's on; it does not chain through the rest. */
function toggleGuidedTour() {
  if (!_hsMarkers.length) return;
  const open = _hsCaptionEl && _hsCaptionEl.classList.contains('visible');
  if (open) {
    _stopSpeaking();
    _hsCaptionEl.classList.remove('visible');
    _hideGlow();
    _setActiveMarker(-1);
  } else {
    activateHotspot(0);
  }
}

function _projectLoop(wrap, camera) {
  let pulseT = 0;
  function loop() {
    _hsRAF = requestAnimationFrame(loop);
    const w = wrap.clientWidth, h = wrap.clientHeight;
    if (!w || !h) return;
    _hsMarkers.forEach(m => {
      const ndc = m.world.clone().project(camera);
      const behind = ndc.z > 1;
      const x = (ndc.x * 0.5 + 0.5) * w;
      const y = (-ndc.y * 0.5 + 0.5) * h;
      const outside = x < -20 || x > w + 20 || y < -20 || y > h + 20;
      m.el.style.display = (behind || outside) ? 'none' : 'flex';
      m.el.style.left = x + 'px';
      m.el.style.top = y + 'px';
    });

    // Quick win #2: fade the in-scene glow toward its target opacity,
    // with a gentle pulse while it's active.
    if (_hsGlowSprite) {
      const cur = _hsGlowSprite.material.opacity;
      _hsGlowSprite.material.opacity += (_hsGlowTargetOpacity - cur) * 0.12;
      if (_hsGlowTargetOpacity > 0) {
        pulseT += 0.045;
        const pulse = 1 + 0.08 * Math.sin(pulseT * 3);
        _hsGlowSprite.scale.setScalar(_hsGlowBaseScale * pulse);
      }
    }
  }
  loop();
}

/**
 * Initializes hotspots for the given artifact against the current
 * window.__viewer. Safe to call every time an artifact finishes
 * loading — clears any previous hotspot state first.
 */
function initArtifactHotspots(a) {
  _clearHotspots();

  const v = window.__viewer;
  const wrap = document.getElementById('mainCanvasWrap');
  if (!v || !wrap || !v.mesh || typeof THREE === 'undefined') return;

  const hotspots = ARTIFACT_HOTSPOTS[a.id] || defaultHotspotsFor(a);

  const box = new THREE.Box3().setFromObject(v.mesh);
  if (box.isEmpty()) return;

  _hsBoxCenter = box.getCenter(new THREE.Vector3());
  _hsGlowBaseScale = Math.max(0.25, box.getSize(new THREE.Vector3()).length() * 0.22);

  _hsCaptionEl = _buildCaptionEl(wrap);

  hotspots.forEach((h, i) => {
    const world = new THREE.Vector3(
      THREE.MathUtils.lerp(box.min.x, box.max.x, h.frac.x),
      THREE.MathUtils.lerp(box.min.y, box.max.y, h.frac.y),
      THREE.MathUtils.lerp(box.min.z, box.max.z, h.frac.z)
    );
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'hotspot-marker';
    el.setAttribute('aria-label', h.label);
    el.innerHTML = `<span class="hotspot-dot"></span>`;
    el.addEventListener('click', () => {
      activateHotspot(i);
    });
    wrap.appendChild(el);
    _hsMarkers.push({ el, world, data: h });
  });

  _projectLoop(wrap, v.camera);

  // Hotspot circles only "pop up" while the mouse is hovering the model
  // itself (see .hotspots-visible in annotations.css); the currently
  // active one stays visible on its own via the .active class.
  if (!wrap.dataset.hotspotHoverWired) {
    wrap.dataset.hotspotHoverWired = '1';
    wrap.addEventListener('mouseenter', () => wrap.classList.add('hotspots-visible'));
    wrap.addEventListener('mouseleave', () => wrap.classList.remove('hotspots-visible'));
    // Touch devices have no hover — a tap on the model reveals the
    // circles so they can then be tapped to play their narration.
    wrap.addEventListener('touchstart', () => wrap.classList.add('hotspots-visible'), { passive: true });
  }

  const tourBtn = document.getElementById('btnGuidedTour');
  if (tourBtn && !tourBtn.dataset.wired) {
    tourBtn.dataset.wired = '1';
    tourBtn.addEventListener('click', toggleGuidedTour);
  }
}
