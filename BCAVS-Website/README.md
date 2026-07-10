# BCAVS Starter

Baybay Cultural Artifact Visualization System — a web-based 3D visualization
platform for the localized cultural heritage of Laguna, Philippines.

This is the original one-file prototype (`bcavs-prototype.html`) reorganized
into a real multi-page static site: separate HTML pages that link and reload
between one another (no client-side hash router), modular CSS, and modular
JavaScript.

## Structure

```
BCAVS_Starter/
├── index.html                 Home page
├── css/
│   ├── main.css                Design tokens, reset, buttons, glass cards,
│   │                           section rhythm, footer, page-banner, filters
│   ├── navbar.css              Navbar + mobile menu
│   ├── hero.css                Home hero, search bar, vitrine, stats strip
│   ├── viewer.css               Municipality hero/timeline + 3D artifact
│   │                           viewer shell, toolbar, tabs, meta table
│   └── artifacts.css           Cards/grids, gallery, search, about, contact,
│                               admin dashboard
├── js/
│   ├── main.js                 Bootstrap: wires shared UI, then dispatches
│   │                           to page-specific rendering via <body data-route>
│   ├── router.js               getQueryParam() + active nav-link highlighting
│   ├── scene.js                Three.js scene/renderer creation helpers
│   ├── camera.js                Three.js camera creation helper
│   ├── lighting.js             Light rig creation + lighting-mode presets
│   ├── controls.js             OrbitControls + hero/main viewer lifecycle
│   │                           and toolbar actions (rotate/zoom/wireframe/…)
│   ├── models.js               Placeholder jar/pedestal geometry + model
│   │                           "loading" per artifact category
│   ├── municipalities.js       MUNICIPALITIES data + card/detail rendering
│   ├── artifacts.js            ARTIFACTS data + card/detail rendering
│   ├── gallery.js              Gallery filter population + grid rendering
│   ├── search.js               Search results rendering
│   ├── ui.js                   Navbar scroll state, reveal-on-scroll,
│   │                           animated stat counters, mobile menu toggle
│   └── admin.js                Admin "Recent Artifacts" table rendering
├── assets/
│   ├── images/                 Photos, banners, thumbnails
│   ├── models/                 .glb / .gltf 3D model files
│   ├── textures/               Texture maps for 3D models
│   └── icons/                  Standalone SVG/icon assets
├── pages/
│   ├── municipalities.html     All municipalities (grid)
│   ├── municipality.html       Municipality detail — reads ?id=<slug>
│   ├── gallery.html            Full artifact gallery with filters
│   ├── artifacts.html          Artifact detail + 3D viewer — reads ?id=<slug>
│   ├── search.html             Site search — reads ?q=<term> from the home
│   │                           page search bar
│   ├── about.html              Project brief, mission, tech stack, team
│   └── contact.html            Contact info + message form
├── admin/
│   └── index.html              Admin dashboard (artifact table, upload UI)
└── README.md
```

> **Note on scope:** the target structure only listed `pages/about.html`,
> `pages/gallery.html`, and `pages/artifacts.html`. The original prototype
> also had dedicated municipalities, municipality-detail, and search
> experiences, so `pages/municipalities.html`, `pages/municipality.html`,
> and `pages/search.html` were added to keep that functionality — dropping
> them would have lost real site behavior. Everything else follows the
> requested layout exactly.

## How navigation works now

The original prototype was a single HTML file where JavaScript just
showed/hid `<div class="page">` sections and used `location.hash` for
routing — no real page loads. This version is a true multi-page site:

- Every page is its own `.html` file with its own `<head>`, navbar, and footer.
- Links are plain `<a href="...">` — clicking one does a real page load.
- Detail pages (`municipality.html`, `artifacts.html`) read an `?id=` query
  parameter (via `getQueryParam()` in `router.js`) to know which record to
  display, and redirect back to the listing page if the id isn't found.
- `<body data-route="...">` on each page tells `main.js` which page-specific
  render function(s) to call once the shared scripts have loaded.

## Running it

This is a static site with no build step or backend — everything runs from
plain files.

**Recommended:** serve it with a local static server so relative paths and
`fetch`-free features behave exactly like production, e.g.:

```bash
cd BCAVS_Starter
python3 -m http.server 8080
# then open http://localhost:8080
```

Because navigation uses ordinary relative links (not hash routing), you can
also open `index.html` directly from disk in most browsers and click through
the site normally.

## Data

All municipality and artifact content currently lives inline as JavaScript
data arrays (`MUNICIPALITIES` in `js/municipalities.js`, `ARTIFACTS` in
`js/artifacts.js`). In a production build this would move to a real backend
(the original prototype's footer references Node.js/Express/MySQL) — the
admin dashboard's "Add Artifact" and "Upload New 3D Model" actions are
placeholders (`alert(...)`) for that future wiring.

## 3D viewer

Artifacts currently render as a placeholder lathe-geometry "jar" mesh
(`buildJarMesh()` in `js/models.js`), tinted per category. Swapping in real
per-artifact `.glb`/`.gltf` models (stored under `assets/models/`) only
requires updating `loadArtifactModel()` in `js/models.js` to load and swap
the mesh instead of just recoloring the placeholder.
