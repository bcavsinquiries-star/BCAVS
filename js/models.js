/* ============================================================
   THREE.JS — MODEL GEOMETRY
   ============================================================ */

/**
 * Builds a lathe-geometry "tapayan jar" placeholder mesh. In production this
 * would be replaced by a loaded glTF model per artifact (see loadArtifactModel).
 */
function buildJarMesh(wireframe, color){
  const pts = [];
  // profile of a tapayan jar (x = radius, y = height)
  const profile = [
    [0.0, 0.0], [0.55,0.02], [0.62,0.18], [0.58,0.42], [0.66,0.62],
    [0.55,0.88], [0.30,1.05], [0.34,1.12], [0.30,1.18], [0.0,1.2]
  ];
  profile.forEach(p => pts.push(new THREE.Vector2(p[0]*1.1, p[1])));
  const geo = new THREE.LatheGeometry(pts, 48);
  const mat = new THREE.MeshStandardMaterial({color: color || 0xB5652F, roughness:.75, metalness:.08, wireframe: !!wireframe, flatShading:false});
  return new THREE.Mesh(geo, mat);
}

/** Builds the small display pedestal shown beneath every artifact mesh. */
function buildPedestal(){
  const geo = new THREE.CylinderGeometry(0.95, 1.05, 0.16, 48);
  const mat = new THREE.MeshStandardMaterial({color:0xE9DDC2, roughness:.9});
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.y = -0.08;
  return mesh;
}

/** Maps artifact category → placeholder material tint, standing in for real per-model textures. */
const CATEGORY_COLOR_MAP = {
  'Pottery & Ceramics': 0xB5652F,
  'Furniture & Personal Effects': 0x8a5a30,
  'Religious Icons': 0x7a5326,
  'Tools & Trade Objects': 0x6b5334,
  'Architectural Fragments': 0x9c8f74,
  'Maritime Craft': 0x6e4b2a
};

/**
 * "Loads" the 3D model for the given artifact into the already-initialized
 * main viewer (see viewer.js / controls.js). Shows the loading overlay for a
 * short beat before swapping the placeholder mesh's material color and
 * resetting the camera — standing in for a real async glTF fetch.
 */
function loadArtifactModel(a){
  const loading = document.getElementById('viewerLoading');
  loading.style.opacity = '1';
  loading.style.display = 'flex';
  setTimeout(() => {
    if(!window.__viewer) initMainViewer();
    window.__viewer.mesh.material.color.set(CATEGORY_COLOR_MAP[a.category] || 0xB5652F);
    resetViewer();
    loading.style.opacity = '0';
    setTimeout(() => { loading.style.display = 'none'; }, 400);
  }, 550);
}
