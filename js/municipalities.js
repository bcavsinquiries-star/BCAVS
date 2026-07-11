/* ============================================================
   MUNICIPALITIES — data + render helpers
   ============================================================ */
const MUNICIPALITIES = [

  // ============================================================
  // PAKIL
  // ============================================================
  {
    id: 'Pakil',
    name: 'Pakil',
    district: 'Municipality of',
    known: 'Religious Heritage',
    founded: 'September 1788',
    pop: '55,000',
    income: '2nd Class',
    palette: 'p1',

    desc1: 'Pakil is one of the oldest towns in the Philippines and a National Historical Landmark, renowned for its preserved Spanish colonial plaza and ancestral houses.',
    desc2: 'Beneath its streets lie centuries of pre-colonial and Spanish-era pottery — earning Pakil recognition as one of the country\'s richest archaeological sites.',

    timeline: [
      {
        y: '1300s',
        t: 'Early Settlement',
        d: 'Pre-colonial trade community along the Laguna de Bay basin, evidenced by excavated ceramics.'
      },
      {
        y: '1571',
        t: 'Spanish Establishment',
        d: 'Formally organized as a pueblo under Spanish colonial administration.'
      },
      {
        y: '2000',
        t: 'National Landmark',
        d: 'Declared a National Historical Landmark for its intact townscape.'
      }
    ],

    artifactCount: 1,
    landmarkCount: 0
  },

  // ============================================================
  // KALAYAAN
  // ============================================================
  {
    id: 'Kalayaan',
    name: 'Kalayaan',
    district: 'Municipality of',
    known: 'Natural Heritage',
    founded: '1668',
    pop: '42,000',
    income: '2nd Class',
    palette: 'p2',

    desc1: 'Known worldwide for its majestic falls, Kalayaan carries a rich boat-craft tradition built around the very river that shaped its economy and culture.',
    desc2: 'Local artisans have long built and maintained the wooden bancas used for the town\'s signature shooting-the-rapids experience.',

    timeline: [
      {
        y: '1668',
        t: 'Town Founding',
        d: 'Established as a Spanish colonial pueblo along the Kalayaan River.'
      },
      {
        y: '1930s',
        t: 'Early Tourism',
        d: 'The falls become a documented destination for travelers.'
      }
    ],

    artifactCount: 0,
    landmarkCount: 0
  },

  // ============================================================
  // SINILOAN
  // ============================================================
  {
    id: 'Siniloan',
    name: 'Siniloan',
    district: 'Municipality of',
    known: 'Intangible Cultural Heritage',
    founded: '1742',
    pop: '539,000',
    income: '1st Class',
    palette: 'p3',

    desc1: 'Calamba is celebrated as the birthplace of national hero Dr. José Rizal, and holds one of the most visited heritage houses in the province.',
    desc2: 'The town\'s cultural collection centers on Rizal-era domestic life, correspondence, and personal effects preserved by his family and the state.',

    timeline: [
      {
        y: '1742',
        t: 'Town Founding',
        d: 'Established as an encomienda town under Spanish rule.'
      },
      {
        y: '1861',
        t: 'Rizal\'s Birth',
        d: 'José Protasio Rizal is born in the Rizal Shrine house.'
      },
      {
        y: '1950',
        t: 'Shrine Restoration',
        d: 'The Rizal ancestral home is reconstructed as a national shrine.'
      }
    ],

    artifactCount: 0,
    landmarkCount: 0
  },

  // ============================================================
  // MABITAC
  // ============================================================
  {
    id: 'Mabitac',
    name: 'Mabitac',
    district: 'Municipality of',
    known: 'Footwear Craftsmanship',
    founded: '1571',
    pop: '39,000',
    income: '3rd Class',
    palette: 'p4',

    desc1: 'Liliw is the province\'s footwear capital, where generations of tsinelas (slipper) makers have refined a craft passed down since the Spanish era.',
    desc2: 'The town\'s artisan tools and early shoemaking equipment now form part of its living-heritage collection.',

    timeline: [
      {
        y: '1571',
        t: 'Early Settlement',
        d: 'Founded as a visita under nearby Nagcarlan.'
      },
      {
        y: '1800s',
        t: 'Craft Tradition Begins',
        d: 'Footwear-making emerges as the town\'s defining industry.'
      }
    ],

    artifactCount: 0,
    landmarkCount: 3
  },

  // ============================================================
  // FAMY
  // ============================================================
  {
    id: 'Famy',
    name: 'Famy',
    district: 'Municipality of',
    known: 'Underground Cemetery',
    founded: '1583',
    pop: '52,000',
    income: '3rd Class',
    palette: 'p5',

    desc1: 'Home to the only known underground cemetery in the Philippines, Nagcarlan preserves a rare architectural and funerary tradition from the Spanish period.',
    desc2: 'Religious carvings and burial-crypt reliefs recovered from the site anchor much of the town\'s documented collection.',

    timeline: [
      {
        y: '1583',
        t: 'Town Founding',
        d: 'Established under Franciscan missionary administration.'
      },
      {
        y: '1845',
        t: 'Cemetery Built',
        d: 'The underground cemetery is constructed by Fr. Vicente Velloc.'
      }
    ],

    artifactCount: 0,
    landmarkCount: 3
  },

  // ============================================================
  // PAETE
  // ============================================================
  {
    id: 'Paete',
    name: 'Paete',
    district: 'Municipality of',
    known: 'Woodcarving Tradition',
    founded: '1580',
    pop: '24,000',
    income: '4th Class',
    palette: 'p6',

    desc1: 'Paete is internationally recognized for its centuries-old woodcarving tradition, producing santos and taka papier-mâché figures found in churches worldwide.',
    desc2: 'The archive documents both finished devotional carvings and the tools used to produce them, tracing a craft still practiced today.',

    timeline: [
      {
        y: '1580',
        t: 'Town Founding',
        d: 'Established by Franciscan friars along Laguna de Bay.'
      },
      {
        y: '1700s',
        t: 'Woodcarving Flourishes',
        d: 'Paete becomes the primary source of santos for Philippine churches.'
      }
    ],

    artifactCount: 0,
    landmarkCount: 5
  },

  // ============================================================
  // PANGIL
  // ============================================================
  {
    id: 'Pangil',
    name: 'Pangil',
    district: 'Municipality of',
    known: 'Woodcarving Tradition',
    founded: '1580',
    pop: '24,000',
    income: '4th Class',
    palette: 'p7',

    desc1: 'Paete is internationally recognized for its centuries-old woodcarving tradition, producing santos and taka papier-mâché figures found in churches worldwide.',
    desc2: 'The archive documents both finished devotional carvings and the tools used to produce them, tracing a craft still practiced today.',

    timeline: [
      {
        y: '1580',
        t: 'Town Founding',
        d: 'Established by Franciscan friars along Laguna de Bay.'
      },
      {
        y: '1700s',
        t: 'Woodcarving Flourishes',
        d: 'Paete becomes the primary source of santos for Philippine churches.'
      }
    ],

    artifactCount: 0,
    landmarkCount: 5
  },

  // ============================================================
  // /Sta. Maria
  // ============================================================
  {
    id: 'Sta. Maria',
    name: 'Sta. Maria',
    district: 'Municipality of',
    known: 'Woodcarving Tradition',
    founded: '1580',
    pop: '24,000',
    income: '4th Class',
    palette: 'p8',

    desc1: 'Paete is internationally recognized for its centuries-old woodcarving tradition, producing santos and taka papier-mâché figures found in churches worldwide.',
    desc2: 'The archive documents both finished devotional carvings and the tools used to produce them, tracing a craft still practiced today.',

    timeline: [
      {
        y: '1580',
        t: 'Town Founding',
        d: 'Established by Franciscan friars along Laguna de Bay.'
      },
      {
        y: '1700s',
        t: 'Woodcarving Flourishes',
        d: 'Paete becomes the primary source of santos for Philippine churches.'
      }
    ],

    artifactCount: 0,
    landmarkCount: 5
  }
];
const MUNI_MAP = Object.fromEntries(MUNICIPALITIES.map(m=>[m.id,m]));

/**
 * Returns the inner HTML for a municipality "plate" (used inside a .muni-card).
 */
function muniPlate(m){
  return `<div class="plate">
    <div class="plate-tint ${m.palette}" style="position:absolute;inset:0;"></div>
    <div class="plate-pattern pattern-topo" style="position:absolute;inset:0;"></div>
    <span class="plate-glyph">${m.name[0]}</span>
    <div class="plate-fade"></div>
    <div class="muni-card-body">
      <span class="tag">${m.district}</span>
      <h3>${m.name}</h3>
      <p>${m.known}</p>
      <span class="muni-card-count">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>
        ${m.artifactCount} artifacts documented
      </span>
    </div>
  </div>`;
}

/**
 * Builds a clickable municipality card that links to the municipality detail page.
 * @param {object} m - a municipality record
 * @param {string} [linkPrefix] - relative path prefix to the pages/ folder (defaults to same-folder "municipality.html")
 */
function renderMuniCard(m, linkPrefix){
  const href = (linkPrefix !== undefined ? linkPrefix : '') + `municipality.html?id=${m.id}`;
  const el = document.createElement('a');
  el.className = 'muni-card';
  el.href = href;
  el.innerHTML = muniPlate(m);
  return el;
}

/** Renders a limited set of municipality cards (e.g. for the home page) */
function renderFeaturedMunicipalities(containerId, count, linkPrefix){
  const wrap = document.getElementById(containerId);
  if(!wrap) return;
  MUNICIPALITIES.slice(0, count || 3).forEach(m => wrap.appendChild(renderMuniCard(m, linkPrefix)));
}

/** Renders every municipality (e.g. for the municipalities listing page) */
function renderAllMunicipalities(containerId, linkPrefix){
  const wrap = document.getElementById(containerId);
  if(!wrap) return;
  MUNICIPALITIES.forEach(m => wrap.appendChild(renderMuniCard(m, linkPrefix)));
}

/**
 * Populates the municipality detail page (pages/municipality.html) for the given id.
 * Redirects to the municipalities listing if the id is unknown.
 */
function renderMunicipalityDetail(id){
  const m = MUNI_MAP[id];
  if(!m){ window.location.href = 'municipalities.html'; return; }

  document.getElementById('muniBreadcrumb').textContent = m.name;
  document.getElementById('muniName').textContent = m.name;
  document.getElementById('muniLongName').textContent = m.name + ', Laguna';
  document.getElementById('muniNameInline').textContent = m.name;
  document.getElementById('muniArtifactCount').textContent = m.artifactCount;
  document.getElementById('muniLandmarkCount').textContent = m.landmarkCount;
  document.getElementById('muniFounded').textContent = m.founded;
  document.getElementById('muniDistrict').textContent = m.district;
  document.getElementById('muniIncome').textContent = m.income;
  document.getElementById('muniPop').textContent = m.pop;
  document.getElementById('muniKnownFor').textContent = m.known;
  document.getElementById('muniDesc1').textContent = m.desc1;
  document.getElementById('muniDesc2').textContent = m.desc2;

  const tint = document.getElementById('muniHeroBanner').querySelector('.tint');
  tint.className = 'tint ' + m.palette;
  tint.style.position = 'absolute';
  tint.style.inset = '0';

  document.getElementById('muniTimeline').innerHTML = m.timeline.map(t => `
    <div class="timeline-item"><b>${t.y} — ${t.t}</b><p>${t.d}</p></div>`).join('');

  const artGrid = document.getElementById('muniArtifacts');
  artGrid.innerHTML = '';
  ARTIFACTS.filter(a => a.muni === id).forEach(a => artGrid.appendChild(artifactCard(a)));
  if(artGrid.children.length === 0){
    artGrid.innerHTML = '<p style="color:var(--brown-soft);">No artifacts documented for this municipality yet.</p>';
  }

  document.title = `${m.name} — BCAVS`;
}
