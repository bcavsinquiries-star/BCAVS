/* ============================================================
   MAIN — bootstrap entry point
   ============================================================
   Every page includes this last. It wires the behaviors common to
   every page, then dispatches to page-specific rendering based on
   <body data-route="..."> */

window.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  observeReveals();
  highlightActiveNav();

  const route = document.body.dataset.route;

  switch(route){
    case 'home':
      renderFeaturedMunicipalities('featuredMunicipalities', 3, 'pages/');
      renderFeaturedArtifacts('featuredArtifacts', 4, 'pages/');
      observeStats();
      initHeroViewer();
      break;

    case 'municipalities':
      renderAllMunicipalities('allMunicipalities');
      break;

    case 'municipality-detail':
      renderMunicipalityDetail(getQueryParam('id'));
      break;

    case 'gallery':
      populateFilters();
      renderGallery();
      break;

    case 'artifact-detail':
      renderArtifactDetail(getQueryParam('id'));
      break;

    case 'search': {
      const q = getQueryParam('q');
      if(q) document.getElementById('searchInput').value = q;
      renderSearch();
      break;
    }

    case 'admin':
      renderAdminTable();
      break;

    default:
      // about, contact: no page-specific data rendering needed
      break;
  }
});
