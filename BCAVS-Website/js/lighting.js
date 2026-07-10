/* ============================================================
   THREE.JS — LIGHT RIGS
   ============================================================ */

/**
 * Creates the standard three-light gallery rig (hemisphere + key + rim),
 * plus a dimmed spotlight reserved for "dramatic" mode, and adds them to scene.
 * @param {THREE.Scene} scene
 * @returns {object} named light references
 */
function createLightRig(scene){
  const lights = {};
  lights.hemi = new THREE.HemisphereLight(0xfff3df, 0x4a3218, .9);
  scene.add(lights.hemi);

  lights.key = new THREE.DirectionalLight(0xffe8c2, 1.15);
  lights.key.position.set(3, 4, 2);
  scene.add(lights.key);

  lights.rim = new THREE.DirectionalLight(0xC6A15B, .55);
  lights.rim.position.set(-3, 2, -2.5);
  scene.add(lights.rim);

  lights.spot = new THREE.SpotLight(0xffffff, 0);
  lights.spot.position.set(0, 5, 2);
  lights.spot.angle = .5;
  scene.add(lights.spot);

  return lights;
}

/** Lightweight rig used for the small home-page hero preview (no dramatic spot). */
function createHeroLightRig(scene){
  scene.add(new THREE.HemisphereLight(0xfff3df, 0x4a3218, 1.0));
  const key = new THREE.DirectionalLight(0xffe8c2, 1.1);
  key.position.set(3, 4, 2);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xC6A15B, 0.5);
  rim.position.set(-3, 2, -2);
  scene.add(rim);
}

const LIGHTING_MODES = ['gallery', 'daylight', 'dramatic'];

/** Applies one of LIGHTING_MODES to a light rig produced by createLightRig(). */
function applyLightingMode(lights, mode){
  if(mode === 'gallery'){
    lights.hemi.intensity = .9; lights.key.intensity = 1.15; lights.rim.intensity = .55; lights.spot.intensity = 0;
  } else if(mode === 'daylight'){
    lights.hemi.intensity = 1.3; lights.key.intensity = 1.6; lights.rim.intensity = .3; lights.spot.intensity = 0;
  } else {
    lights.hemi.intensity = .25; lights.key.intensity = .3; lights.rim.intensity = .2; lights.spot.intensity = 1.4;
  }
}
