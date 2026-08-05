/* ============================================================
   SEARCH PAGE
   ============================================================ */

/** Filters ARTIFACTS + MUNICIPALITIES by the current search input and renders results. */
function renderSearch(){
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const results = document.getElementById('searchResults');
  results.innerHTML = '';

  const artMatches = ARTIFACTS.filter(a => !q || (a.title + a.category + a.era + MUNI_MAP[a.muni].name).toLowerCase().includes(q));
  const muniMatches = MUNICIPALITIES.filter(m => !q || (m.name + m.known).toLowerCase().includes(q));

  document.getElementById('searchResultsCount').textContent = q
    ? `Showing ${artMatches.length + muniMatches.length} results for "${q}"`
    : `Showing ${ARTIFACTS.length + MUNICIPALITIES.length} results across artifacts and municipalities`;

  muniMatches.forEach(m => results.appendChild(renderMuniCard(m)));
  artMatches.forEach(a => results.appendChild(artifactCard(a)));

  if(artMatches.length + muniMatches.length === 0){
    results.innerHTML = '<p style="color:var(--brown-soft);">No results. Try a different search term.</p>';
  }
}
