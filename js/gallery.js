/* ============================================================
   GALLERY PAGE — filters + grid
   ============================================================ */

/** Populates the municipality/category <select> filters from ARTIFACTS data. */
function populateFilters(){
  const munis = [...new Set(ARTIFACTS.map(a => a.muni))];
  const cats = [...new Set(ARTIFACTS.map(a => a.category))];

  const fm = document.getElementById('filterMuni');
  munis.forEach(id => { const o = document.createElement('option'); o.value = id; o.textContent = MUNI_MAP[id].name; fm.appendChild(o); });

  const fc = document.getElementById('filterCat');
  cats.forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = c; fc.appendChild(o); });
}

/** Re-renders the gallery grid based on the current filter selections. */
function renderGallery(){

  const muni =
    document.getElementById('filterMuni').value;

  const cat =
    document.getElementById('filterCat').value;

  const filtered = ARTIFACTS.filter(
    a =>
      (!muni || a.muni === muni) &&
      (!cat || a.category === cat)
  );

  const grid =
    document.getElementById('galleryGrid');

  grid.innerHTML = '';

  filtered.forEach(a => {
    grid.appendChild(
      artifactCard(a)
    );
  });

  document.getElementById('galleryCount').textContent =
    `Showing ${filtered.length} of ${ARTIFACTS.length} artifacts`;

  if(filtered.length === 0){

    grid.innerHTML =
      '<p style="color:var(--brown-soft);">No artifacts match these filters yet.</p>';

    return;
  }
  initGallery3DViewers();
}

/* ============================================================
   GALLERY MODEL SETTINGS
   Each model can have its own position, scale, and rotation.
   ============================================================ */

const GALLERY_MODEL_SETTINGS = {

  "Turumba.glb": {
    scale: 1.9,
    position: {
      x: 0,         //Kaliwa, Kanan
      y: 0.35,     //Taas, Baba
      z: 0          //papalayo, papalapit (camera)
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    lighting: {
      ambient: 0,
      key: 0.8,
      fill: 1.2
    }
  },

  "Bell-SIN-001.glb": {
    scale: 2.3,
    position: {
      x: 0,
      y: 0.25,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    lighting: {
      ambient: 0,
      key: 0.5,
      fill: 2.0
    }
  },
  
  "BlackStone.glb": {
    scale: 1.9,
    position: {
      x: 0,
      y: 0.35,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    lighting: {
      ambient: 2.5,
      key: 1.0,
      fill: 1.5
    }
  },

  "Tatlohan.glb": {
    scale: 1.9,
    position: {
      x: 0,
      y: 0.35,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    lighting: {
      ambient: 0.5,
      key: 0.5,
      fill: 1.5
    }
  }

};

/* ============================================================
   GALLERY — Small Three.js 3D previews
   ============================================================ */

function initGallery3DViewers() {

  const viewers = document.querySelectorAll('.gallery-3d-viewer');

  viewers.forEach(container => {

    const modelFile = container.dataset.model;

    if (!modelFile) return;

    const settings = GALLERY_MODEL_SETTINGS[modelFile] || {};
    const lighting = settings.lighting || {};

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      35,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    camera.position.set(0, 0.5, 3.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(
      0xffffff,
      lighting.ambient ?? 0.2
    );
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(
      0xffffff,
      lighting.key ?? 0.3
    );
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(
      0xffffff,
      lighting.fill ?? 1.5
    );
    fillLight.position.set(-3, 2, 3);
    scene.add(fillLight);
  
    // Load model
    const loader = new THREE.GLTFLoader();

    // This same code runs on both index.html (site root) and
    // pages/gallery.html (one folder deep), so the path to /public
    // has to be resolved relative to whichever page loaded it —
    // mirroring the linkPrefix pattern already used in artifactCard().
    const modelsBase = location.pathname.includes('/pages/')
      ? '../public/models/'
      : 'public/models/';
    const modelPath = `${modelsBase}${modelFile}`;

    loader.load(
      modelPath,

      function(gltf) {

        const model = gltf.scene;

        // Find model dimensions
        const box = new THREE.Box3().setFromObject(model);

        const size = box.getSize(
          new THREE.Vector3()
        );

        const center = box.getCenter(
          new THREE.Vector3()
        );

        // Center model
        model.position.sub(center);

        // Scale model
        const maxDim = Math.max(
          size.x,
          size.y,
          size.z
        );

        if (maxDim > 0) {

          const scale = settings?.scale
              ? settings.scale / maxDim : 2 / maxDim;

          model.scale.setScalar(scale);
        }

        // Center again after scaling
        const newBox =
        new THREE.Box3().setFromObject(model);

        const newCenter =
        newBox.getCenter(new THREE.Vector3());

        model.position.sub(newCenter);

    // Apply custom settings if available
    if (settings) {

        model.position.x += settings.position.x;
        model.position.y += settings.position.y;
        model.position.z += settings.position.z;

        model.rotation.x = settings.rotation.x;
        model.rotation.y = settings.rotation.y;
        model.rotation.z = settings.rotation.z;
}

scene.add(model);

        // Animation
        function animate() {

          requestAnimationFrame(animate);

          model.rotation.y += 0.005;

          renderer.render(
            scene,
            camera
          );
        }

        animate();

        console.log(
          'Gallery 3D loaded:',
          modelFile
        );

      },

      undefined,

      function(error) {

        console.error(
          'Gallery 3D model failed:',
          modelPath,
          error
        );

      }
    );

  });
}