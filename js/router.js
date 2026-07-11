/* ============================================================
   ROUTER HELPERS (multi-page site)
   ============================================================
   Each real page sets <body data-route="..."> so shared scripts can
   know which page they're on without re-deriving it from the URL. */

/** Reads a query-string parameter from the current URL, e.g. ?id=burnay-jar */
function getQueryParam(name){
  return new URLSearchParams(window.location.search).get(name);
}

/** Highlights the nav link (and, on interior pages, breadcrumb state) matching data-route on <body>. */
function highlightActiveNav(){
  const route = document.body.dataset.route;
  if(!route) return;
  document.querySelectorAll('.nav-links a[data-route]').forEach(a => {
    a.classList.toggle('active', a.dataset.route === route);
  });
}
