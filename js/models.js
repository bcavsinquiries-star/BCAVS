/* ============================================================
   THREE.JS — MODEL GEOMETRY
   ============================================================ */

/**
 * Registry mapping artifact id -> real .glb path (the full-detail /
 * "high" tier), relative to the project root. Artifacts not listed
 * here fall back to the placeholder jar mesh until their model is
 * captured/uploaded.
 * (Optimization Engine note: every entry added here automatically
 * gets LOD + scene-graph optimization via loadArtifactModel below.)
 */
const ARTIFACT_MODELS = {
  'Our Lady of the Turumba': '../public/models/Turumba.glb',
  'Siniloan': '../public/models/Bell-SIN-001.glb',
  'Pangil': '../public/models/Tatlohan.glb',
  'Black Stone': '../public/models/BlackStone.glb'
};

/**
 * Precomputed medium/low LOD tiers for the models above, generated
 * OFFLINE (not in the browser) with gltf-transform: weld -> simplify
 * (meshoptimizer, ~50%/~15% of the original vertices) -> quantize ->
 * WebP texture compression. See public/models/*-med.glb / *-low.glb.
 *
 * This replaces decimating the mesh live with THREE.SimplifyModifier
 * on every page load: for the raw scans here (750k–1.5M triangles),
 * doing that on the main thread would stall the tab for a very
 * noticeable stretch right as the model appears. Precomputing once,
 * ahead of time, means the browser only ever has to *load* a small
 * file, never *compute* a decimation.
 *
 * Artifacts without an entry here simply skip to the runtime
 * SimplifyModifier fallback further down in loadArtifactModel() —
 * still supported, just slower, so nothing breaks for a future
 * artifact whose tiers haven't been generated yet.
 */
const ARTIFACT_MODEL_LOD_TIERS = {
  'Our Lady of the Turumba': {
    med: '../public/models/Turumba-med.glb',
    low: '../public/models/Turumba-low.glb'
  },
  'Siniloan': {
    med: '../public/models/Bell-SIN-001-med.glb',
    low: '../public/models/Bell-SIN-001-low.glb'
  },
  'Black Stone': {
    med: '../public/models/BlackStone-med.glb',
    low: '../public/models/BlackStone-low.glb'
  }
};

function buildJarMesh(wireframe, color){
  const pts = [];

  const profile = [
    [0.0, 0.0], [0.55,0.02], [0.62,0.18], [0.58,0.42], [0.66,0.62],
    [0.55,0.88], [0.30,1.05], [0.34,1.12], [0.30,1.18], [0.0,1.2]
  ];
  profile.forEach(p => pts.push(new THREE.Vector2(p[0]*1.1, p[1])));
  const geo = new THREE.LatheGeometry(pts, 48);
  const mat = new THREE.MeshStandardMaterial({color: color || 0xD8C7A1, roughness:.9, metalness:0.0, wireframe: !!wireframe, flatShading:false});
  const mesh = new THREE.Mesh(geo, mat);
  // Placeholder geometry is static too — route it through the same
  // Optimization Engine pass so every artifact gets the same baseline
  // scene-graph win, real model or not.
  if (typeof optimizeSceneGraph === 'function') optimizeSceneGraph(mesh, { freezeMatrices: false });
  return mesh;
}
/** Builds the small display pedestal shown beneath every artifact mesh. */
function buildPedestal(){
  const geo = new THREE.CylinderGeometry(0.95, 1.05, 0.16, 48);
  const mat = new THREE.MeshStandardMaterial({color:0xD8C7A1, roughness:0.95,metalness:0.0});
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.y = -0.08;
  return mesh;
}

/** Maps artifact category → placeholder material tint, standing in for real per-model textures. */
const CATEGORY_COLOR_MAP = {
  'Pottery & Ceramics': 0x836953,
  'Furniture & Personal Effects': 0x8a5a30,
  'Religious Icons': 0x7a5326,
  'Tools & Trade Objects': 0x6b5334,
  'Architectural Fragments': 0x9c8f74,
  'Maritime Craft': 0x6e4b2a
};

/** Frees GPU-side geometry/texture memory for an object and everything
 *  under it before it's dropped, so swapping models never leaks VRAM. */
function _disposeObject3D(obj){
  if (!obj || typeof obj.traverse !== 'function') return;
  obj.traverse((child) => {
    if (!child.isMesh) return;
    if (child.geometry) child.geometry.dispose();
    const mats = Array.isArray(child.material) ? child.material : [child.material];
    mats.forEach((m) => {
      if (!m) return;
      ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap'].forEach((slot) => {
        if (m[slot]) m[slot].dispose();
      });
      m.dispose();
    });
  });
}

/**
 * Loads the precomputed medium/low tiers in the background and slots
 * them into an already-visible THREE.LOD once they arrive, so the
 * artifact never waits on them — the high tier is on screen already.
 * @param {THREE.LOD} lod
 * @param {{med:string, low:string}} tierPaths
 * @param {[number,number]} distances
 */
function _attachPrecomputedLODTiers(lod, tierPaths, distances){
  const loader = new THREE.GLTFLoader();

  // Resolve to the *whole* tier scene, not just its first mesh — some
  // artifacts (e.g. Our Lady of the Turumba) export as more than one
  // mesh primitive per node (a base material plus an alpha-blended
  // overlay material). Grabbing only the first mesh silently dropped
  // that second primitive at medium/low distance; keeping gltf.scene
  // preserves every primitive per tier.
  const loadTierScene = (path) => new Promise((resolve) => {
    loader.load(
      path,
      (gltf) => resolve(gltf.scene),
      undefined,
      (err) => {
        console.warn('[OptimizationEngine] Precomputed LOD tier failed to load, skipping:', path, err);
        resolve(null);
      }
    );
  });

  Promise.all([loadTierScene(tierPaths.med), loadTierScene(tierPaths.low)]).then(([medScene, lowScene]) => {
    // The person may have already navigated to a different artifact by
    // the time these background downloads finish — don't attach stale
    // tiers to a LOD that's no longer the one on screen.
    const v = window.__viewer;
    if (!v || v.mesh !== lod) { _disposeObject3D(medScene); _disposeObject3D(lowScene); return; }

    [medScene, lowScene].forEach((obj) => {
      if (!obj) return;
      if (typeof optimizeSceneGraph === 'function') optimizeSceneGraph(obj);
      obj.traverse((c) => {
        if (!c.isMesh) return;
        if (v.wireframeOn && c.material) c.material.wireframe = true;
        if (c.material && v.materials && !v.materials.includes(c.material)) v.materials.push(c.material);
      });
    });
    if (medScene) lod.addLevel(medScene, distances[0]);
    if (lowScene) lod.addLevel(lowScene, distances[1]);
  });
}

/**
 * Loads the 3D model for the given artifact into the already-initialized
 * main viewer (see controls.js). If a real captured model is registered
 * for this artifact (ARTIFACT_MODELS), it's fetched with GLTFLoader and
 * run through the Optimization Engine (js/optimization.js): scene-graph
 * optimization always, plus a 3-tier LOD swap when the model is a single
 * mesh — using precomputed tiers (ARTIFACT_MODEL_LOD_TIERS) when they
 * exist, or the runtime SimplifyModifier fallback otherwise. Artifacts
 * without a captured model yet fall back to the tinted placeholder jar
 * (also scene-graph-optimized, see buildJarMesh above).
 */
function loadArtifactModel(a){
  const loading = document.getElementById('viewerLoading');
  const loadingText = document.getElementById('viewerLoadingText');
  loading.style.opacity = '1';
  loading.style.display = 'flex';
  if (loadingText) loadingText.textContent = 'Preparing 3D model…';

  if(!window.__viewer) initMainViewer();
  const v = window.__viewer;
  v.artifact = a; // lets the "Download View" button know what it's capturing
  const modelPath = ARTIFACT_MODELS[a.id];
  const lodTiers = ARTIFACT_MODEL_LOD_TIERS[a.id];

  function finish(){
    resetViewer();
    if (typeof initArtifactHotspots === 'function') initArtifactHotspots(a);
    loading.style.opacity = '0';
    setTimeout(() => { loading.style.display = 'none'; }, 400);
  }

  if (v.perfMonitor) v.perfMonitor.recordLoadStart();

  const hasRealLoader = modelPath && typeof THREE !== 'undefined' && typeof THREE.GLTFLoader === 'function';

  if (hasRealLoader) {
    const loader = new THREE.GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        // Swap out the placeholder jar (or a previously loaded artifact)
        // for the real model, freeing its GPU memory as it goes.
        if (v.mesh) { v.scene.remove(v.mesh); _disposeObject3D(v.mesh); }

        const model = gltf.scene;

        // Center + scale-to-fit within the viewer, matchin\\ the hero viewer
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        model.scale.setScalar(1.7 / maxDim);
        const newBox = new THREE.Box3().setFromObject(model);
        const newCenter = new THREE.Vector3();
        newBox.getCenter(newCenter);
        model.position.sub(newCenter);
        model.position.y -= -0.11;

        const meshes = [];
        model.traverse(c => { if(c.isMesh) meshes.push(c); });

        // Optimization Engine — LOD.
        let displayObject = model;
        let lodObject = null;
        // High: distance < 2.2 (now reachable — controls.js minDistance is 1.3)
        // Medium: 2.2–4.5 (covers the default camera distance, ~4.4)
        // Low: >= 4.5
        const distances = [2.2, 4.5];

        if (lodTiers && lodTiers.med && lodTiers.low) {
          // Precomputed-tier path: works regardless of how many mesh
          // primitives the artifact exports as (single material, or a
          // base material + an alpha-blended overlay like Our Lady of
          // the Turumba's veil) — every primitive belonging to the node
          // rides along in the same LOD level together, so multi-material
          // artifacts still get real High/Medium/Low switching instead of
          // silently falling back to "N/A (single tier)".
          if (v.perfMonitor) v.perfMonitor.setGeometryStats(computeGeometryStats(model));

          const lod = new THREE.LOD();
          // The LOD wrapper takes over the model's root transform; the
          // model itself (now level 0) goes back to identity so it isn't
          // offset/scaled twice once nested under the LOD.
          lod.position.copy(model.position);
          lod.rotation.copy(model.rotation);
          lod.scale.copy(model.scale);
          model.position.set(0, 0, 0);
          model.rotation.set(0, 0, 0);
          model.scale.set(1, 1, 1);

          lod.addLevel(model, 0); // high tier: the full-detail model already loaded above
          _attachPrecomputedLODTiers(lod, lodTiers, distances);

          displayObject = lod;
          lodObject = lod;
        } else if (meshes.length === 1 && typeof buildArtifactLOD === 'function') {
          // Fallback for single-primitive artifacts without precomputed
          // tiers yet: decimate live with THREE.SimplifyModifier.
          if (v.perfMonitor) v.perfMonitor.setGeometryStats(computeGeometryStats(meshes[0]));

          const lod = buildArtifactLOD(meshes[0], { distances });
          lod.position.copy(model.position);
          lod.rotation.copy(model.rotation);
          lod.scale.copy(model.scale);
          displayObject = lod;
          lodObject = lod;
        } else {
          // No precomputed tiers AND more than one primitive: nothing
          // safe to auto-simplify yet, so just show the full model.
          if (v.perfMonitor) v.perfMonitor.setGeometryStats(computeGeometryStats(model));
        }
        if (v.perfMonitor) v.perfMonitor.setLODRef(lodObject);

        // Optimization Engine — Scene Graph Optimization (frustum culling,
        // shadow disabling, static matrix freezing, raycast disabling).
        if (typeof optimizeSceneGraph === 'function') optimizeSceneGraph(displayObject);

        v.scene.add(displayObject);
        v.mesh = displayObject;
        v.materials = meshes.map(m => m.material).filter(Boolean);
        v.isRealModel = true;

        if (v.perfMonitor) v.perfMonitor.recordLoadEnd(a.title);
        finish();
      },
      (evt) => {
        // Download-progress readout — reuses the existing loading label,
        // just fills in a live percentage while the (still sizeable) .glb
        // downloads, instead of leaving the person watching a bare spinner.
        if (loadingText && evt && evt.total) {
          const pct = Math.min(100, Math.round((evt.loaded / evt.total) * 100));
          loadingText.textContent = `Preparing 3D model… ${pct}%`;
        }
      },
      (err) => {
        console.error('[OptimizationEngine] Model load failed for', a.title, '— falling back to placeholder:', err);
        v.mesh.material.color.set(CATEGORY_COLOR_MAP[a.category] || 0xB5652F);
        if (v.perfMonitor) {
          v.perfMonitor.setLODRef(null);
          v.perfMonitor.setGeometryStats(computeGeometryStats(v.mesh));
          v.perfMonitor.recordLoadEnd(a.title + ' (placeholder fallback)');
        }
        finish();
      }
    );
  } else {
    // No captured model registered for this artifact yet — use the
    // scene-graph-optimized placeholder, tinted per category.
    setTimeout(() => {
      v.mesh.material.color.set(CATEGORY_COLOR_MAP[a.category] || 0xB5652F);
      if (v.perfMonitor) {
        v.perfMonitor.setLODRef(null);
        v.perfMonitor.setGeometryStats(computeGeometryStats(v.mesh));
        v.perfMonitor.recordLoadEnd(a.title + ' (placeholder)');
      }
      finish();
    }, 550);
  }
}
