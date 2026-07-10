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
  const muni = document.getElementById('filterMuni').value;
  const cat = document.getElementById('filterCat').value;
  const filtered = ARTIFACTS.filter(a => (!muni || a.muni === muni) && (!cat || a.category === cat));

  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';
  filtered.forEach(a => grid.appendChild(artifactCard(a)));
  document.getElementById('galleryCount').textContent = `Showing ${filtered.length} of ${ARTIFACTS.length} artifacts`;
  if(filtered.length === 0) grid.innerHTML = '<p style="color:var(--brown-soft);">No artifacts match these filters yet.</p>';
}
