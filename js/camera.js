/* ============================================================
   THREE.JS — CAMERA SETUP
   ============================================================ */

/**
 * Creates a perspective camera sized to the wrapper's aspect ratio.
 * @param {HTMLElement} wrap
 * @param {object} [opts]
 * @param {number} [opts.fov=40]
 * @param {[number,number,number]} [opts.position=[0,1.2,4.2]]
 */
function createCamera(wrap, opts){
  opts = opts || {};
  const fov = opts.fov || 40;
  const pos = opts.position || [0, 1.2, 4.2];
  const w = wrap.clientWidth, h = wrap.clientHeight;
  const camera = new THREE.PerspectiveCamera(fov, w / h, 0.1, 100);
  camera.position.set(pos[0], pos[1], pos[2]);
  return camera;
}
