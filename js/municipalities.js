/* ============================================================
   MUNICIPALITIES — data + render helpers
   ============================================================ */
const MUNICIPALITIES = [

  // ============================================================
  // PAKIL
  // ============================================================
  {
    id: 'Pakil',
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.6486847367837!2d121.47768109999998!3d14.3897269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397f14933138c57%3A0xd937af1a273d91bb!2sPakil%20Government%20Center!5e0!3m2!1sen!2sph!4v1784691908797!5m2!1sen!2sph",
    name: 'Pakil',
    district: 'Municipality of',
    known: 'The Turumba Festival',
    founded: '1676',
    pop: '23,972',
    income: '5th-Class',
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
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61851.55465262683!2d121.4102153582031!3d14.327564400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397fb033144a971%3A0x971fc69805494cd1!2sKalayaan%20Municipal%20Hall!5e0!3m2!1sen!2sph!4v1784692431790!5m2!1sen!2sph",
    name: 'Kalayaan',
    district: 'Municipality of',
    known: 'Natural Heritage',
    founded: '1909',
    pop: '25,243',
    income: '5th-Class',
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
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30912.77092016245!2d121.41082327910156!3d14.421608100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397f02b405d0901%3A0xfda068217cbcca15!2sNew%20Siniloan%20Municipal%20Hall!5e0!3m2!1sen!2sph!4v1784693011487!5m2!1sen!2sph",
    name: 'Siniloan',
    district: 'Municipality of',
    known: 'Waterfalls Sanctuary of Eastern',
    founded: '1583',
    pop: '42,533',
    income: '2nd-Class',
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
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30912.77116802011!2d121.4108232654752!3d14.421606313568489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ee33e5c333af%3A0xd2711593636d852a!2sMabitac%20Municipal%20Hall!5e0!3m2!1sen!2sph!4v1784693181660!5m2!1sen!2sph",
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
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.8162392166955!2d121.44521557518297!3d14.437751286029526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397f1dfc8aee375%3A0x9889bab0bb5d88a7!2sPAMAHALAANG%20BAYAN%20FAMY%20LAGUNA!5e0!3m2!1sen!2sph!4v1784693421660!5m2!1sen!2sph",
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
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.0915698613703!2d121.47879447518163!3d14.36411248609469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397fa8521d66b2b%3A0x81e831355699ff56!2sPaete%20Municipal%20Hall!5e0!3m2!1sen!2sph!4v1784693494151!5m2!1sen!2sph",
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
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.424534916673!2d121.46590197518246!3d14.402673686060524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397f0385107bfcf%3A0xd835a300073f7172!2sPangil%20Municipal%20Hall!5e0!3m2!1sen!2sph!4v1784693689879!5m2!1sen!2sph",
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
    id: 'Santa Maria',
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247052.6345447821!2d121.02684765967955!3d14.644732366661431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ede77c57074d%3A0xcde0b295efdad3a3!2sMunicipal%20Hall%20of%20Santa%20Maria%2C%20Laguna!5e0!3m2!1sen!2sph!4v1784693777421!5m2!1sen!2sph",
    name: 'Santa Maria',
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

  console.log("ID:", id);

  const m = MUNI_MAP[id];

  console.log("Municipality:", m);

  if(!m){
    window.location.href = 'municipalities.html';
    return;
  }

  if(document.getElementById('muniName'))
    document.getElementById('muniName').textContent = m.name;

  if(document.getElementById('muniLongName'))
    document.getElementById('muniLongName').textContent = m.name + ', Laguna';

  if(document.getElementById('muniNameInline'))
    document.getElementById('muniNameInline').textContent = m.name;

  if(document.getElementById('muniArtifactCount'))
    document.getElementById('muniArtifactCount').textContent = m.artifactCount;

  if(document.getElementById('muniLandmarkCount'))
    document.getElementById('muniLandmarkCount').textContent = m.landmarkCount;

  if(document.getElementById('muniFounded'))
    document.getElementById('muniFounded').textContent = m.founded;

  if(document.getElementById('muniIncome'))
    document.getElementById('muniIncome').textContent = m.income;

  if(document.getElementById('muniPop'))
    document.getElementById('muniPop').textContent = m.pop;

  if(document.getElementById('muniKnownFor'))
    document.getElementById('muniKnownFor').textContent = m.known;

  if(document.getElementById('muniDesc2'))
    document.getElementById('muniDesc2').textContent = m.desc2;

  const hero = document.getElementById('muniHeroBanner');

  if(hero){
      const tint = hero.querySelector('.tint');

      if(tint){
          tint.className = 'tint ' + m.palette;
      }
  }

  const timeline = document.getElementById('muniTimeline');

  if(timeline){
      timeline.innerHTML = m.timeline.map(t=>`
        <div class="timeline-item">
          <b>${t.y} — ${t.t}</b>
          <p>${t.d}</p>
        </div>
      `).join('');
  }

  const artGrid = document.getElementById('muniArtifacts');

  if(artGrid){
      artGrid.innerHTML='';

      ARTIFACTS
      .filter(a=>a.muni===id)
      .forEach(a=>artGrid.appendChild(artifactCard(a)));

      if(!artGrid.children.length){
          artGrid.innerHTML='<p>No artifacts documented yet.</p>';
      }
  }

  document.title = `${m.name} — BCAVS`;
  const map = document.getElementById("muniMap");
if (map) {
    map.src = m.map;
}
}
