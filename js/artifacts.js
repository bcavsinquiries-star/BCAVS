/* ============================================================
   ARTIFACTS — data + render helpers
   ============================================================ */
const ARTIFACTS = [

  // ============================================================
  // Lady of the Turumba
  // ============================================================
  {
    id: 'Our Lady of the Turumba',
  title: 'Our Lady of the Turumba',
  muni: 'Pakil',
  category: 'Religious Art / Sacred Painting',
  era: 'Spanish Colonial',
  palette: 'p1',
  model: 'Turumba.glb',

    // Image Gallery is populated from the 3D viewer instead of static
    // photos — see "Download View" in the viewer toolbar / renderMiniGallery().
    gallery: [],

    short: 'Revered for generations, the image stands as a testament to Pakil\'s deep-rooted Catholic faith and its rich legacy of community devotion and cultural continuity.',
    long1: 'A small oil painting on canvas depicting the Virgin Mary as Our Lady of Sorrows (Mater Dolorosa). The image portrays Mary\'s sorrow and compassion, symbolizing her suffering as the mother of Jesus Christ. Despite its modest size, the painting remains one of the most cherished religious artifacts in Pakil, Laguna.',


    sig1: 'Discovered in 1788 along the shores of Laguna de Bay, the Our Lady of Turumba became the spiritual symbol of Pakil and inspired the Turumba Festival, one of the oldest Marian festivals in the Philippines. The image has been venerated for centuries and continues to embody the town\'s enduring Catholic faith, religious traditions, and cultural identity.',
    material: 'Oil paint on canvas',
    dimensions: 'Not publicly documented',
    dateRange: 'c. 1788',
    location: 'Pakil Parish Church',
    condition: 'Preserved and venerated',
    accession: 'LAG-PAK-001'
  },
  // ============================================================
  // Black Stone
  // ============================================================
  {
    id: 'Black Stone',
    title: 'Black Stone of Siniloan',
    muni: 'Siniloan',
    category: 'Movable Cultural Property / Sacred Stone',
    era: 'Undetermined',
    palette: 'p1',
    model: 'BlackStone.glb',

    // Image Gallery is populated from the 3D viewer instead of static
    // photos — see "Download View" in the viewer toolbar / renderMiniGallery().
    gallery: [],

    short: 'A sacred black stone preserved in Siniloan, Laguna, believed to possess divine healing and protective powers through generations of local faith and oral tradition.',
    long1: 'The Black Stone is a revered cultural property kept by faith healer Jaime "Tata Jaime" Fabia of Barangay Wawa, Siniloan. Distinguished by its smooth dark surface and Latin engraving, the stone is regarded as a sacred heirloom believed to channel divine energy for healing, protection, and spiritual guidance. It continues to play an important role in the municipality’s living traditions of folk spirituality and community faith.',

    sig1: 'The Black Stone holds exceptional spiritual and cultural significance in Siniloan. Passed down through generations, it is associated with faith healing traditions, ancestral beliefs, and local folklore. According to oral tradition, the stone originated from the "Year of the Lord" and serves as a symbol of divine intervention, making it an important representation of the municipality’s intangible cultural heritage and enduring spiritual identity.',

    material: 'Dark polished stone with natural cracks and Latin engraving',
    dimensions: 'Approximately 8 cm',
    dateRange: 'Undetermined; traditionally associated with the "Year of the Lord"',
    location: 'Barangay Wawa, Siniloan, Laguna, Philippines',
    condition: 'Excellent; preserved',
    accession: 'LAG-SIN-003'
  },

  // ============================================================
  // SINILOAN
  // ============================================================
  {
    id: 'Siniloan',
  title: 'Church Bell of Saints Peter and Paul Parish Church',
  muni: 'Siniloan',
  category: 'Historical Artifact / Church Bell',
  era: 'Spanish Colonial',
  palette: 'p3',
  model: 'Bell-SIN-001.glb',

    short: 'A historic church bell that has served as a symbol of faith and community in Siniloan, reflecting the town\'s enduring religious heritage and centuries-old Catholic traditions.',
    long1: 'A cast bronze church bell used for religious ceremonies and community gatherings at the Saints Peter and Paul Parish Church. The bell has long been an integral part of the town\'s spiritual and cultural life.',

    sig1: 'Associated with the historic Saints Peter and Paul Parish Church, the bell represents Siniloan\'s deep-rooted Catholic heritage dating back to the Spanish colonial period. For generations, it has called parishioners to worship and commemorated important religious and civic events in the community.',

    material: 'Cast bronze',
    dimensions: 'Not publicly documented',
    dateRange: 'c. 18th–19th century',
    location: 'Saints Peter and Paul Parish Church, Siniloan, Laguna',
    condition: 'Preserved and maintained by the parish',
    accession: 'LAG-SIN-002'
  },
  // ============================================================
  // THREE ARTIFACTS IN PANGIL
  // ============================================================

  {
    id: 'Pangil',
    title: 'Chinese Pottery & Ceramics from Sulib, Pangil',
    muni: 'Pangil',
    category: 'Archaeological Artifacts',
    era: 'Pre-Colonial Period',
    palette: 'p3',
    model: 'Tatlohan.glb',

    short: 'Chinese Pottery & Ceramics from Sulib, Pangil are archaeological artifacts excavated in Barangay Sulib, Pangil, Laguna. Dating back to the Song and Ming Dynasties (960–1644 CE), these ceramics provide evidence of early Chinese trade and cultural interaction in the region before the Spanish colonial period.',
    long1: 'The Chinese pottery and ceramic artifacts were discovered during archaeological excavations in Barangay Sulib, Pangil, Laguna. According to Ang Maharlikang Bayan ng Pangil, the excavation yielded Chinese pottery and other objects dating to the Song and Ming Dynasties. These artifacts are believed to have belonged to wealthy Chinese immigrants and were buried as part of funeral rituals.',
    long2: 'Their discovery highlights Pangil\'s role as an important pre-colonial settlement with established trade connections to China. The artifacts also provide valuable evidence of the cultural and economic exchanges that took place in the region centuries before the arrival of the Spanish.',
    sig1: 'The Chinese pottery and ceramics found in Sulib demonstrate that Pangil was part of an active trade network in Asia during the pre-colonial period. These archaeological finds reveal early interactions between Chinese merchants and local communities, contributing to a better understanding of Pangil\'s historical importance and cultural heritage.',
    
    material: 'Ceramic',
    dimensions: 'Not publicly documented',
    dateRange: 'Contemporary Period',
    location: 'Municipal Plaza, Pangil, Laguna',
    condition: 'Preserved as a municipal historical landmark',
    accession: 'LAG-KAL-004'
  },
  /*
  // ============================================================
  // PAETE
  // ============================================================
  {
    id: 'paete',
    title: 'Santo Niño Woodcarving',
    muni: 'Paete',
    category: 'Religious Icons',
    era: 'Spanish Colonial',
    palette: 'p6',

    short: 'A devotional Santo Niño figure hand-carved from batikuling wood, exemplifying Paete\'s centuries-old religious sculpture tradition.',
    long1: 'Carved in the round from a single block of batikuling, this figure follows classical Hispanic-Filipino santo proportions taught within Paete\'s family carving workshops.',
    long2: 'Traces of the original gold leaf and polychrome (estofado) finish remain visible along the robe folds.',

    sig1: 'Paete-carved santos were historically commissioned by parishes across the archipelago, making the town a de facto national workshop for religious imagery.',
    sig2: 'The piece demonstrates the transmission of carving knowledge through apprenticeship rather than formal training.',

    material: 'Batikuling wood, gesso, gold leaf',
    dimensions: '54cm H',
    dateRange: 'Late 19th century',
    location: 'Private collection, Paete',
    condition: 'Good, pigment loss on base',
    accession: 'LAG-PAE-031'
  },

  // ============================================================
  // MABITAC
  // ============================================================
  {
    id: 'Mabitac',
    title: 'Traditional Shoemaker\'s Last',
    muni: 'Mabitac',
    category: 'Tools & Trade Objects',
    era: 'American Period',
    palette: 'p4',

    short: 'A carved wooden foot form (last) used by Liliw artisans to hand-shape tsinelas and leather shoes before rubber molds became widespread.',
    long1: 'Each last was custom-carved to a standard foot size and reused across hundreds of pairs, representing the backbone tool of Liliw\'s home-based footwear industry.',
    long2: 'This example shows decades of wear polish along the heel and arch, evidence of sustained daily use.',

    sig1: 'Objects like this last connect Liliw\'s present-day footwear economy directly to its early 20th-century artisan workshops.',
    sig2: 'Its simple form reflects an entirely analog, skill-based production process that predates industrial shoemaking in the province.',

    material: 'Carved hardwood',
    dimensions: '26cm L',
    dateRange: 'c. 1920s–1930s',
    location: 'Liliw Heritage Collection',
    condition: 'Well-worn, structurally sound',
    accession: 'LAG-LIL-008'
  },

  // ============================================================
  // FAMY
  // ============================================================
  {
    id: 'Famy',
    title: 'Crypt Relief Fragment',
    muni: 'Famy',
    category: 'Architectural Fragments',
    era: 'Spanish Colonial',
    palette: 'p5',

    short: 'A carved stone relief fragment recovered from the underground cemetery of Nagcarlan, depicting a memento mori motif common to Spanish-era funerary art.',
    long1: 'The fragment once formed part of a crypt wall panel within the cemetery\'s subterranean chapel, built under Franciscan direction in 1845.',
    long2: 'Its iconography — a skull framed by carved foliage — reflects European funerary conventions adapted using local adobe stone.',

    sig1: 'The Nagcarlan underground cemetery remains the only confirmed structure of its kind in the Philippines, making every recovered fragment archaeologically significant.',
    sig2: 'The relief offers insight into how Catholic funerary symbolism was locally interpreted by Filipino stonemasons.',

    material: 'Carved adobe stone',
    dimensions: '31cm × 22cm',
    dateRange: '1845',
    location: 'National Museum – Laguna Annex',
    condition: 'Fragmentary, stable',
    accession: 'LAG-NAG-005'
  },
  */
];

const ART_MAP = Object.fromEntries(ARTIFACTS.map(a => [a.id, a]));

/* ============================================================
   IMAGE GALLERY — populated from "Download View" snapshots
   ============================================================
   Some artifacts (e.g. Our Lady of the Turumba, Black Stone of
   Siniloan) ship with an empty a.gallery — instead their Image
   Gallery tab is filled by capturing the live 3D viewer. Captures
   are kept in-memory per artifact id for the current session.
   ============================================================ */
const CAPTURED_VIEWS = {}; // artifact id -> [{ url, ts }]

/** (Re)draws the Image Gallery tab for the given artifact, combining
 *  any static a.gallery photos with viewer snapshots captured so far. */
function renderMiniGallery(a){
  const wrap = document.getElementById('artMiniGallery');
  if(!wrap) return;

  const staticImgs = (a.gallery || []).map(url => ({ url, captured: false }));
  const capturedImgs = (CAPTURED_VIEWS[a.id] || []).map(c => ({ url: c.url, captured: true }));
  const all = staticImgs.concat(capturedImgs);

  if(!all.length){
    wrap.innerHTML = `
      <div class="mini-gallery-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 15l-5-5-9 9"/></svg>
        <p>No images yet.</p>
        <p>Click <b>Download View</b> above the 3D model to capture the current angle — it will appear here, ready to download.</p>
      </div>`;
    return;
  }

  const safeId = (a.id || 'artifact').replace(/\s+/g, '-');
  wrap.innerHTML = all.map((img, i) => `
    <div class="plate${img.captured ? ' captured-plate' : ''}">
      <img src="${img.url}" class="gallery-img" alt="${a.title} — view ${i + 1}">
      ${img.captured ? `
        <a class="plate-download" href="${img.url}" download="${safeId}-view-${i + 1}.png" title="Download this image" aria-label="Download this image" onclick="event.stopPropagation()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>` : ''}
    </div>
  `).join('');
}

/** Wired to the "Download View" button in the viewer plaque. Captures
 *  exactly what's currently on screen, drops it into the Image Gallery
 *  tab, and switches to that tab so the person can see it land there
 *  and download it to their PC. */
function captureCurrentView(){
  const v = window.__viewer;
  if(!v || !v.renderer || !v.scene || !v.camera) return;
  const a = v.artifact;
  if(!a) return;

  // Render one fresh frame so the capture matches the current angle exactly.
  v.renderer.render(v.scene, v.camera);
  let url;
  try {
    url = v.renderer.domElement.toDataURL('image/png');
  } catch (e) {
    console.warn('[Artifacts] Could not capture viewer snapshot:', e);
    return;
  }

  if(!CAPTURED_VIEWS[a.id]) CAPTURED_VIEWS[a.id] = [];
  CAPTURED_VIEWS[a.id].push({ url, ts: Date.now() });

  renderMiniGallery(a);

  const galleryTabBtn = document.querySelector('.tab-btn[data-tab="img"]') ||
    Array.from(document.querySelectorAll('.tab-btn')).find(b => /image gallery/i.test(b.textContent));
  if (galleryTabBtn) switchTab('img', galleryTabBtn);

  if (v.perfMonitor && v.perfMonitor.showToast) {
    v.perfMonitor.showToast('View captured — added to Image Gallery', 1600);
  }
}

/**
 * Builds a clickable artifact card that links to the artifact detail page.
 * @param {object} a - an artifact record
 * @param {string} [linkPrefix] - relative path prefix to the pages/ folder (defaults to same-folder "artifacts.html")
 */
function artifactCard(a, linkPrefix){
  const m = MUNI_MAP[a.muni];
  const href = (linkPrefix !== undefined ? linkPrefix : '') + `artifacts.html?id=${a.id}`;
  const el = document.createElement('a');
  el.className = 'artifact-card glass';
  el.href = href;
  el.innerHTML = `
    <div class="artifact-thumb">

  ${a.model ? `
    <div class="gallery-3d-viewer" data-model="${a.model}"></div>
  ` : `
    <div class="plate-tint ${a.palette}" style="position:absolute;inset:0;"></div>
    <div class="plate-pattern pattern-topo" style="position:absolute;inset:0;"></div>
  `}
      <span class="badge-3d"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 16V8a2 2 0 00-1-1.7l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.7l7 4a2 2 0 002 0l7-4a2 2 0 001-1.7z"/></svg>3D</span>
      <button class="artifact-fav" aria-label="Save artifact" onclick="event.preventDefault();event.stopPropagation();this.querySelector('svg').setAttribute('fill','currentColor')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 10-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg></button>
    </div>
    <div class="artifact-body">
      <span class="tag">${a.category}</span>
      <h4>${a.title}</h4>
      <div class="meta">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.6 7-12a7 7 0 10-14 0c0 5.4 7 12 7 12z"/><circle cx="12" cy="9" r="2.4"/></svg>
        ${m.name} · ${a.era}
      </div>
    </div>`;
  return el;
}

/** Renders a limited set of artifact cards (e.g. for the home page) */
function renderFeaturedArtifacts(containerId, count, linkPrefix){
  const wrap = document.getElementById(containerId);
  if(!wrap) return;
  ARTIFACTS.slice(0, count || ARTIFACTS.length).forEach(a => wrap.appendChild(artifactCard(a, linkPrefix)));
}

function switchTab(name, btn){
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
}

/**
 * Populates the artifact detail page (pages/artifacts.html) for the given id,
 * and kicks off the 3D viewer once data is in place.
 * Redirects to the gallery if the id is unknown.
 */
function renderArtifactDetail(id){
  const a = ART_MAP[id];
  if(!a){ window.location.href = 'gallery.html'; return; }
  const m = MUNI_MAP[a.muni];

  document.getElementById('artBreadcrumb').textContent = a.title;
  document.getElementById('artAccession').textContent = a.accession;
  document.getElementById('artPlaqueTitle').textContent = a.title;
  document.getElementById('artPlaqueSub').textContent = `${a.material.split(',')[0]} · ${a.dateRange} · ${m.name}, Laguna`;
  document.getElementById('artTitle').textContent = a.title;
  document.getElementById('artLocation').textContent = m.name + ', Laguna';
  document.getElementById('artShortDesc').textContent = a.short;
  document.getElementById('artDescLong1').textContent = a.long1;
  document.getElementById('artDescLong2').textContent = a.long2;
  document.getElementById('artSig1').textContent = a.sig1;
  document.getElementById('artSig2').textContent = a.sig2;
  document.querySelector('.artifact-rail .kicker').textContent = a.category;

  document.getElementById('artMetaTable').innerHTML = `
    <tr><td>Material</td><td>${a.material}</td></tr>
    <tr><td>Dimensions</td><td>${a.dimensions}</td></tr>
    <tr><td>Date Range</td><td>${a.dateRange}</td></tr>
    <tr><td>Category</td><td>${a.category}</td></tr>
    <tr><td>Era</td><td>${a.era}</td></tr>
    <tr><td>Municipality</td><td>${m.name}</td></tr>
    <tr><td>Location</td><td>${a.location}</td></tr>
    <tr><td>Condition</td><td>${a.condition}</td></tr>
    <tr><td>Accession No.</td><td>${a.accession}</td></tr>`;

    renderMiniGallery(a);
  const rel = document.getElementById('relatedArtifacts');
  rel.innerHTML = '';
  ARTIFACTS.filter(x => x.id !== a.id && (x.muni === a.muni || x.category === a.category)).slice(0,6).forEach(x => rel.appendChild(artifactCard(x)));
  if(rel.children.length < 3){
    ARTIFACTS.filter(x => x.id !== a.id).slice(0,6).forEach(x => rel.appendChild(artifactCard(x)));
  }

  // reset tabs
  document.querySelectorAll('.tab-btn').forEach((b,i) => b.classList.toggle('active', i===0));
  document.querySelectorAll('.tab-panel').forEach((p,i) => p.classList.toggle('active', i===0));

  document.title = `${a.title} — BCAVS`;

  if(typeof loadArtifactModel === 'function') loadArtifactModel(a);
}
