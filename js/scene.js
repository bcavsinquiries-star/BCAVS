/* ============================================================
   THREE.JS — SCENE + RENDERER SETUP
   ============================================================ */

/** Creates an empty THREE.Scene. Kept as its own function so lighting/models
 *  can be composed independently of scene creation. */
function createScene(){
  return new THREE.Scene();
}

/**
 * Creates a THREE.WebGLRenderer sized to the given wrapper element and
 * appends its canvas to that wrapper.
 * @param {HTMLElement} wrap
 */
function createRenderer(wrap){
  const w = wrap.clientWidth, h = wrap.clientHeight;
  const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  wrap.appendChild(renderer.domElement);
  return renderer;
}

/** Wires a resize listener that keeps a camera/renderer pair in sync with their wrapper's size. */
function bindViewerResize(wrap, camera, renderer){
  window.addEventListener('resize', () => {
    if(!wrap.clientWidth) return;
    camera.aspect = wrap.clientWidth / wrap.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
  });
}
