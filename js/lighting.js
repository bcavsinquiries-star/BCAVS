/* ============================================================
   THREE.JS — LIGHT RIGS
   ============================================================ */

/**
 * Creates the standard three-light gallery rig (hemisphere + key + rim),
 * plus a dimmed spotlight reserved for "dramatic" mode, and adds them to scene.
 * @param {THREE.Scene} scene
 * @returns {object} named light references
 */
function createHeroLightRig(scene){

  scene.add(new THREE.HemisphereLight(0xfff8ef, 0x6a4b2a, 1.2));

  // Main light
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(3, 4, 2);
  scene.add(key);

  // Front light (NEW)
  const front = new THREE.DirectionalLight(0xffffff, 2);
  front.position.set(0, 1.5, 5); // Nasa harap ng artifact
  scene.add(front);

  // Rim light
  const rim = new THREE.DirectionalLight(0xE3C27D, 0.6);
  rim.position.set(-3, 2, -2);
  scene.add(rim);
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
