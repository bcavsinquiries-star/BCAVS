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
  controls.enableDamping = true;
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
  const camera = createCamera(wrap, {fov:38, position:[0, 1.1, 3.6]});
  const renderer = createRenderer(wrap);

  createHeroLightRig(scene);

  const mesh = buildJarMesh(false, 0xB5652F);
  mesh.position.y = -0.5;
  scene.add(mesh);
  const pedestal = buildPedestal();
  pedestal.position.y = -0.58;
  scene.add(pedestal);

  const controls = createOrbitControls(camera, renderer.domElement, {
    autoRotate:true, autoRotateSpeed:2.2, enableZoom:false, enablePan:false,
    minPolarAngle: Math.PI/3.4, maxPolarAngle: Math.PI/1.9
  });

  (function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
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

  const mesh = buildJarMesh(false, 0xB5652F);
  mesh.position.y = -0.35;
  scene.add(mesh);
  const pedestal = buildPedestal();
  pedestal.position.y = -0.43;
  scene.add(pedestal);

  const controls = createOrbitControls(camera, renderer.domElement, {
    autoRotate:false, autoRotateSpeed:2.4, minDistance:2, maxDistance:7,
    minPolarAngle: Math.PI/6, maxPolarAngle: Math.PI/1.7
  });

  (function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  })();

  bindViewerResize(wrap, camera, renderer);

  window.__viewer = {
    scene, camera, renderer, controls, mesh, pedestal, lights,
    lightingIndex: 0, wireframeOn: false
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
  v.mesh.material.wireframe = v.wireframeOn;
  document.getElementById('btnWireframe').classList.toggle('active', v.wireframeOn);
}

function cycleLighting(){
  const v = window.__viewer;
  v.lightingIndex = (v.lightingIndex + 1) % LIGHTING_MODES.length;
  const mode = LIGHTING_MODES[v.lightingIndex];
  applyLightingMode(v.lights, mode);
  document.getElementById('fpsDisplay').textContent = `Optimized · ${mode.charAt(0).toUpperCase()+mode.slice(1)} lighting`;
}

function resetViewer(){
  const v = window.__viewer;
  v.camera.position.set(0, 1.2, 4.2);
  v.controls.target.set(0, 0.2, 0);
  v.controls.update();
  if(v.wireframeOn) toggleWireframe();
  v.lightingIndex = 0;
  applyLightingMode(v.lights, 'gallery');
  document.getElementById('fpsDisplay').textContent = 'Optimized · WebGL · 60fps';
}

function toggleFullscreen(){
  const el = document.getElementById('mainCanvasWrap');
  if(!document.fullscreenElement){ el.requestFullscreen?.(); } else { document.exitFullscreen?.(); }
}
