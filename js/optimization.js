/* ============================================================
   OPTIMIZATION ENGINE
   ------------------------------------------------------------
   Houses the two optimization sub-systems referenced in the
   BCAVS architecture: Scene Graph Optimization and Level of
   Detail (LOD). Also exposes a lightweight PerformanceMonitor
   so every viewer instance (hero + main) can report real,
   measured numbers instead of a static "60fps" label.

   Consumed by js/models.js (model loading) and js/controls.js
   (viewer lifecycle). Load this script AFTER three.js/GLTFLoader
   and BEFORE models.js / controls.js.
   ============================================================ */

/**
 * SCENE GRAPH OPTIMIZATION
 * Walks a loaded object3D (typically gltf.scene) and applies the
 * standard set of static-scene optimizations:
 *   - frustum culling enabled per mesh
 *   - shadows disabled (gallery lighting is baked/ambient, no
 *     real-time shadow casting is used anywhere in the app)
 *   - matrices frozen (matrixAutoUpdate / matrixWorldAutoUpdate = false)
 *     after the object's final transform is set, so three.js skips
 *     recomputing world matrices for static artifacts every frame
 *   - raycasting disabled on individual meshes when the artifact
 *     itself doesn't need per-triangle picking (OrbitControls does
 *     its own event handling, so mesh-level raycasts are pure cost)
 *
 * IMPORTANT: call this AFTER you've finished positioning/scaling the
 * object (centering, scale-to-fit, etc.), since it freezes matrices.
 * Calling it before your final transform will "bake in" a stale pose.
 *
 * @param {THREE.Object3D} root
 * @param {object} [opts]
 * @param {boolean} [opts.disableRaycast=true]
 * @param {boolean} [opts.freezeMatrices=true]
 * @returns {THREE.Object3D} the same root, for chaining
 */
function optimizeSceneGraph(root, opts) {
  opts = opts || {};
  const disableRaycast = opts.disableRaycast !== false;
  const freezeMatrices = opts.freezeMatrices !== false;

  root.traverse((child) => {
    if (!child.isMesh) return;

    child.frustumCulled = true;
    child.castShadow = false;
    child.receiveShadow = false;

    if (child.material) child.material.needsUpdate = false;

    if (disableRaycast) {
      child.raycast = function () {};
    }

    if (freezeMatrices) {
      child.updateMatrix();
      child.matrixAutoUpdate = false;
      child.matrixWorldAutoUpdate = false;
    }
  });

  if (freezeMatrices) {
    root.updateMatrix();
    root.updateMatrixWorld(true);
    root.matrixAutoUpdate = false;
    root.matrixWorldAutoUpdate = false;
  }

  return root;
}

/**
 * LEVEL OF DETAIL (LOD) — runtime fallback
 * Builds a THREE.LOD wrapping three simplified tiers of the same
 * source mesh: high (original), medium (~50% triangle reduction),
 * low (~85% reduction). Distance thresholds are in world units from
 * the camera and tuned for this app's viewer (camera sits ~1.3-7 units
 * from the artifact — see createOrbitControls min/maxDistance).
 *
 * NOTE: for the three shipped artifacts, js/models.js now loads
 * PRECOMPUTED med/low tiers instead (see ARTIFACT_MODEL_LOD_TIERS in
 * models.js) — those tiers were decimated offline with gltf-transform,
 * not live in the browser. This function remains as the fallback for
 * any future artifact that doesn't have precomputed tiers yet, so
 * nothing breaks — it just costs a runtime decimation pass instead of
 * a small file download. Only use this live path on meshes you expect
 * to be modest in size; on very dense scans (500k+ triangles) it can
 * take long enough to be noticeable, since SimplifyModifier runs
 * synchronously on the main thread.
 *
 * Uses THREE.SimplifyModifier when it's available on the page (see
 * the <script> tag added alongside GLTFLoader). If it isn't loaded —
 * e.g. a page only pulled in the core three.js bundle — this
 * degrades gracefully to a single-tier "LOD" that just shows the
 * full mesh at every distance, so viewers never break, they just
 * don't get the triangle-count win until the modifier script loads.
 *
 * @param {THREE.Mesh} sourceMesh - the original, full-detail mesh
 * @param {object} [opts]
 * @param {[number,number]} [opts.distances=[2.2, 4.5]] world-unit distances at which
 *        the medium and low tiers respectively kick in
 * @returns {THREE.LOD}
 */
function buildArtifactLOD(sourceMesh, opts) {
  opts = opts || {};
  const distances = opts.distances || [2.2, 4.5];
  const lod = new THREE.LOD();

  // Tier 0 — high detail (the original mesh, unmodified)
  lod.addLevel(sourceMesh, 0);

  const canSimplify = typeof THREE.SimplifyModifier === 'function' && sourceMesh.geometry.isBufferGeometry;

  if (canSimplify) {
    try {
      const modifier = new THREE.SimplifyModifier();

      const vertexCount = sourceMesh.geometry.attributes.position.count;

      // Tier 1 — medium detail (~50% of original vertices)
      const medGeo = modifier.modify(sourceMesh.geometry, Math.floor(vertexCount * 0.5));
      const medMesh = new THREE.Mesh(medGeo, sourceMesh.material);
      medMesh.position.copy(sourceMesh.position);
      medMesh.rotation.copy(sourceMesh.rotation);
      medMesh.scale.copy(sourceMesh.scale);
      lod.addLevel(medMesh, distances[0]);

      // Tier 2 — low detail (~15% of original vertices)
      const lowGeo = modifier.modify(sourceMesh.geometry, Math.floor(vertexCount * 0.15));
      const lowMesh = new THREE.Mesh(lowGeo, sourceMesh.material);
      lowMesh.position.copy(sourceMesh.position);
      lowMesh.rotation.copy(sourceMesh.rotation);
      lowMesh.scale.copy(sourceMesh.scale);
      lod.addLevel(lowMesh, distances[1]);
    } catch (err) {
      // Decimation failed on this geometry (e.g. non-manifold mesh) —
      // fall back to single-tier so the viewer still renders correctly.
      console.warn('[OptimizationEngine] LOD simplification skipped:', err.message);
    }
  } else {
    console.warn('[OptimizationEngine] THREE.SimplifyModifier not loaded — running single-tier (no LOD reduction).');
  }

  return lod;
}

/**
 * Sums triangle and vertex counts across every mesh under an object3D.
 * Pass a single source mesh (not a THREE.LOD wrapper) when you want the
 * "real" complexity of one detail tier — an LOD wrapper holds all of its
 * tiers as children simultaneously, so traversing it directly would
 * double/triple-count triangles across tiers.
 *
 * @param {THREE.Object3D} root
 * @returns {{triangles:number, vertices:number}}
 */
function computeGeometryStats(root) {
  let vertices = 0;
  let triangles = 0;

  root.traverse((child) => {
    if (!child.isMesh || !child.geometry) return;
    const geo = child.geometry;
    const posAttr = geo.attributes && geo.attributes.position;
    if (!posAttr) return;
    vertices += posAttr.count;
    triangles += geo.index ? geo.index.count / 3 : posAttr.count / 3;
  });

  return { triangles: Math.round(triangles), vertices };
}

/**
 * PERFORMANCE MONITOR
 * Tracks live FPS (rolling average) and model load time, and can
 * write both into a DOM badge so the UI shows real numbers instead
 * of a hardcoded "60fps" label. Used by both the hero viewer and
 * the main artifact viewer.
 *
 * Optionally also drives a full in-viewer stats panel (FPS, load
 * time, triangle count, vertex count, active LOD tier) when given
 * `opts.statsEls` — see loadArtifactModel() in js/models.js for how
 * geometry stats and the LOD reference get fed in.
 */
function createPerformanceMonitor(opts) {
  opts = opts || {};
  const badgeEl = opts.badgeEl || null;
  const statsEls = opts.statsEls || {}; // { fps, load, tris, verts, lod }
  const lodLabels = opts.lodLabels || ['High', 'Medium', 'Low'];
  const sampleSize = opts.sampleSize || 30;

  const state = {
    frameTimes: [],
    lastFrame: performance.now(),
    fps: 0,
    lastLoadMs: null,
    toastUntil: 0,
    lodRef: null,
    lastLodLevel: -1,
  };

  function tick() {
    const now = performance.now();
    const delta = now - state.lastFrame;
    state.lastFrame = now;
    if (delta > 0) {
      state.frameTimes.push(1000 / delta);
      if (state.frameTimes.length > sampleSize) state.frameTimes.shift();
      state.fps = Math.round(
        state.frameTimes.reduce((a, b) => a + b, 0) / state.frameTimes.length
      );
    }
    if (badgeEl && now >= state.toastUntil) {
      badgeEl.textContent = `Optimized · WebGL · ${state.fps || '--'}fps`;
    }
    if (statsEls.fps) {
      statsEls.fps.textContent = state.fps ? `${state.fps} fps` : '--';
    }
    if (statsEls.lod && state.lodRef) {
      const level = typeof state.lodRef.getCurrentLevel === 'function'
        ? state.lodRef.getCurrentLevel()
        : 0;
      if (level !== state.lastLodLevel) {
        state.lastLodLevel = level;
        statsEls.lod.textContent = lodLabels[level] || `Tier ${level}`;
      }
    }
  }

  /** Briefly overrides the badge text (e.g. "Optimized · Dramatic lighting")
   *  before it reverts to the live FPS readout. */
  function showToast(text, durationMs) {
    if (!badgeEl) return;
    badgeEl.textContent = text;
    state.toastUntil = performance.now() + (durationMs || 1200);
  }

  function recordLoadStart() {
    state._loadStart = performance.now();
  }

  function recordLoadEnd(label) {
    if (state._loadStart == null) return null;
    const ms = performance.now() - state._loadStart;
    state.lastLoadMs = ms;
    console.log(`[PerformanceMonitor] ${label || 'Model'} load time: ${(ms / 1000).toFixed(2)}s`);
    if (statsEls.load) statsEls.load.textContent = `${(ms / 1000).toFixed(2)}s`;
    state._loadStart = null;
    return ms;
  }

  /** Feed in triangle/vertex counts once a model finishes loading. */
  function setGeometryStats(stats) {
    if (statsEls.tris) {
      statsEls.tris.textContent = stats && stats.triangles != null ? stats.triangles.toLocaleString() : '--';
    }
    if (statsEls.verts) {
      statsEls.verts.textContent = stats && stats.vertices != null ? stats.vertices.toLocaleString() : '--';
    }
  }

  /** Point the monitor at a THREE.LOD instance so tick() can report which
   *  tier is currently visible. Pass null/undefined for single-tier models
   *  (placeholders, multi-mesh models) — the panel shows "N/A" instead. */
  function setLODRef(lodObject) {
    state.lodRef = lodObject || null;
    state.lastLodLevel = -1;
    if (!lodObject && statsEls.lod) statsEls.lod.textContent = 'N/A (single tier)';
  }

  return {
    tick,
    recordLoadStart,
    recordLoadEnd,
    showToast,
    setGeometryStats,
    setLODRef,
    getFPS: () => state.fps,
    getLastLoadMs: () => state.lastLoadMs,
  };
}
