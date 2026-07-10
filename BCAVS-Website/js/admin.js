/* ============================================================
   ADMIN DASHBOARD
   ============================================================ */

/** Renders the "Recent Artifacts" table on the admin dashboard from ARTIFACTS data. */
function renderAdminTable(){
  const body = document.getElementById('adminTableBody');
  if(!body || body.dataset.done) return;

  body.innerHTML = ARTIFACTS.map(a => {
    const m = MUNI_MAP[a.muni];
    return `<tr>
      <td><div class="row-thumb"><div class="sw ${a.palette}" style="background-color:transparent;"></div><span>${a.title}</span></div></td>
      <td>${m.name}</td>
      <td>${a.category}</td>
      <td><span class="status-pill published">Published</span></td>
      <td>2 days ago</td>
      <td><div class="row-actions">
        <button onclick="window.location.href='../pages/artifacts.html?id=${a.id}'" aria-label="View"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg></button>
        <button aria-label="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg></button>
        <button aria-label="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg></button>
      </div></td>
    </tr>`;
  }).join('');
  body.dataset.done = '1';
}
