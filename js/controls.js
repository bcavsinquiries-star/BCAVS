/* ============================================================
   THREE.JS — ORBIT CONTROLS + VIEWER LIFECYCLE
   ============================================================ */

/**
 * Creates OrbitControls for a camera/renderer pair.
 * @param {THREE.PerspectiveCamera} camera
 * @param {HTMLElement} domElement
 * @param {object} [opts]
 */
function createOrbitControls(camera, domElement, opts){
  opts = opts || {};
  const controls = new THREE.OrbitControls(camera, domElement);
  controls.enableDamping = false;
  controls.dampingFactor = .08;
  controls.autoRotate = !!opts.autoRotate;
  controls.autoRotateSpeed = opts.autoRotateSpeed || 2.2;
  controls.enableZoom = opts.enableZoom !== undefined ? opts.enableZoom : true;
  controls.enablePan = opts.enablePan !== undefined ? opts.enablePan : false;
  if(opts.minPolarAngle !== undefined) controls.minPolarAngle = opts.minPolarAngle;
  if(opts.maxPolarAngle !== undefined) controls.maxPolarAngle = opts.maxPolarAngle;
  if(opts.minDistance !== undefined) controls.minDistance = opts.minDistance;
  if(opts.maxDistance !== undefined) controls.maxDistance = opts.maxDistance;
  return controls;
}

/* ---- Hero mini viewer (home page, lightweight, autorotate-only) ---- */
function initHeroViewer(){
  const wrap = document.getElementById('heroCanvasWrap');
  if(!wrap) return;
  const scene = createScene();
  const camera = createCamera(wrap, {
    fov:38,
    position:[0, 0.8, 3.9]
});
  const renderer = createRenderer(wrap);

  createHeroLightRig(scene);

  // Optimization Engine — live FPS/MS panel (Three.js Stats.js utility),
  // used per the BCAVS technical performance evaluation methodology.
  let stats = null;
  if (typeof Stats === 'function') {
    stats = new Stats();
    stats.showPanel(0); // FPS
    stats.dom.style.position = 'fixed';
    stats.dom.style.top = '10px';
    stats.dom.style.left = '10px';
    stats.dom.style.zIndex = '999999';
    stats.dom.style.pointerEvents = 'none';
    document.body.appendChild(stats.dom);
  }

  const loader = new THREE.GLTFLoader();

  // Optimization Engine — performance monitor tracks load time for the hero model
  const heroPerf = typeof createPerformanceMonitor === 'function' ? createPerformanceMonitor() : null;
  if (heroPerf) heroPerf.recordLoadStart();

loader.load(
  'public/models/Logo.glb',
  function(gltf){
    const model = gltf.scene;

// Rotate if needed
//model.rotation.x = -Math.PI / 2;//

// Measure the model
const box = new THREE.Box3().setFromObject(model);
const size = box.getSize(new THREE.Vector3());
const center = box.getCenter(new THREE.Vector3());

// Center the model
model.position.sub(center);

// Scale the model
const maxDim = Math.max(size.x, size.y, size.z);
const scale = 2 / maxDim;
model.scale.setScalar(scale);

// Recalculate after scaling
const newBox = new THREE.Box3().setFromObject(model);
const newCenter = newBox.getCenter(new THREE.Vector3());

model.position.sub(newCenter);

// Optimization Engine — Scene Graph Optimization pass: frustum culling,
// shadow disabling, static matrix freezing, raycast disabling (see
// js/optimization.js). Called after final positioning, on purpose.
if (typeof optimizeSceneGraph === 'function') optimizeSceneGraph(model);

if (heroPerf) heroPerf.recordLoadEnd('Hero model (Logo.glb)');

scene.add(model);
  },
  undefined,
  function(error){
    console.error('Error loading model:', error);
  }
);
  const pedestal = buildPedestal();
  pedestal.position.y = -1.1;
  scene.add(pedestal);

  const controls = createOrbitControls(camera, renderer.domElement, {
    autoRotate:false,
    autoRotateSpeed:2.2,
    enableZoom:true,
    enablePan:true,
    minDistance:1.5,
    maxDistance:6,
    minPolarAngle: Math.PI/6,
    maxPolarAngle: Math.PI/1.7
});

  (function animate(){
    requestAnimationFrame(animate);
    if (stats) stats.begin();
    controls.update();
    renderer.render(scene, camera);
    if (stats) stats.end();
  })();

  bindViewerResize(wrap, camera, renderer);
}

/* ---- Main artifact viewer (artifact detail page, full toolbar controls) ---- */
function initMainViewer(){
  const wrap = document.getElementById('mainCanvasWrap');
  if(!wrap) return;

  const scene = createScene();
  const camera = createCamera(wrap, {fov:40, position:[0, 1.2, 4.2]});
  const renderer = createRenderer(wrap);
  const lights = createLightRig(scene);

  // Optimization Engine — scene-graph-optimized placeholder jar mesh.
  // js/models.js's loadArtifactModel() swaps this for a real GLTF model
  // when one is registered (ARTIFACT_MODELS), or tints it per-category
  // and reports its geometry stats otherwise.
  const mesh = buildJarMesh(false);
  mesh.position.y = -0.35;
  scene.add(mesh);

  //const pedestal = buildPedestal();
  //pedestal.position.y = -0.43;
  //scene.add(pedestal);

  const controls = createOrbitControls(camera, renderer.domElement, {
    autoRotate:false,
    autoRotateSpeed:2.4,
    enablePan:true,
    minDistance:1.3,
    maxDistance:7,
    minPolarAngle: Math.PI/6,
    maxPolarAngle: Math.PI/1.7
  });

  // Optimization Engine — live performance monitor drives the perf badge
  // AND the full in-viewer stats panel (#viewerStats) with real, measured
  // numbers: FPS, load time, triangle/vertex count, active LOD tier.
  const perfMonitor = typeof createPerformanceMonitor === 'function'
    ? createPerformanceMonitor({
        badgeEl: document.getElementById('fpsDisplay'),
        statsEls: {
          fps: document.getElementById('statFps'),
          load: document.getElementById('statLoad'),
          tris: document.getElementById('statTris'),
          verts: document.getElementById('statVerts'),
          lod: document.getElementById('statLod'),
        }
      })
    : null;

  (function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    if (perfMonitor) perfMonitor.tick();
  })();

  bindViewerResize(wrap, camera, renderer);

  window.__viewer = {
  scene,
  camera,
  renderer,
  controls,
  model: null,
  mesh,
  lights,
  materials: [mesh.material],
  lightingIndex: 0,
  wireframeOn: false,
  perfMonitor,
  isRealModel: false,
  artifact: null
};
}

function toggleAutoRotate(){
  const v = window.__viewer;
  v.controls.autoRotate = !v.controls.autoRotate;
  document.getElementById('btnRotateMode').classList.toggle('active', v.controls.autoRotate);
}

function zoomViewer(dir){
  const v = window.__viewer;
  const dist = v.camera.position.distanceTo(v.controls.target);
  const newDist = THREE.MathUtils.clamp(dist + dir*0.6, v.controls.minDistance, v.controls.maxDistance);
  const dirVec = v.camera.position.clone().sub(v.controls.target).normalize();
  v.camera.position.copy(v.controls.target).add(dirVec.multiplyScalar(newDist));
}

function toggleWireframe(){
  const v = window.__viewer;
  v.wireframeOn = !v.wireframeOn;
  const mats = v.materials && v.materials.length ? v.materials : [v.mesh.material];
  mats.forEach(m => { if(m) m.wireframe = v.wireframeOn; });
  document.getElementById('btnWireframe').classList.toggle('active', v.wireframeOn);
}

/** Shows/hides the in-viewer stats panel (FPS, load time, triangle/vertex
 *  count, active LOD tier) added by the Optimization Engine. Purely a
 *  display toggle — the monitor keeps ticking underneath either way. */
function toggleStatsPanel(){
  const panel = document.getElementById('viewerStats');
  const btn = document.getElementById('btnStats');
  if(!panel) return;
  const hidden = panel.classList.toggle('hidden-panel');
  if(btn) btn.classList.toggle('active', !hidden);
}

function cycleLighting(){
  const v = window.__viewer;
  v.lightingIndex = (v.lightingIndex + 1) % LIGHTING_MODES.length;
  const mode = LIGHTING_MODES[v.lightingIndex];
  applyLightingMode(v.lights, mode);
  const label = `Optimized · ${mode.charAt(0).toUpperCase()+mode.slice(1)} lighting`;
  if(v.perfMonitor && v.perfMonitor.showToast) v.perfMonitor.showToast(label, 1200);
  else document.getElementById('fpsDisplay').textContent = label;
}

function resetViewer(){
  const v = window.__viewer;
  v.camera.position.set(0, 1.2, 4.2);
  v.controls.target.set(0, 0.2, 0);
  v.controls.update();
  if(v.wireframeOn) toggleWireframe();
  v.lightingIndex = 0;
  applyLightingMode(v.lights, 'gallery');
  // Perf badge is now live (see perfMonitor.tick() in the animate loop),
  // so it doesn't need a static reset string here.
}

function toggleFullscreen(){
  const el = document.getElementById('mainCanvasWrap');
  if(!document.fullscreenElement){ el.requestFullscreen?.(); } else { document.exitFullscreen?.(); }
}
