const heroSearchForm = document.getElementById('heroSearchForm');
heroSearchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = document.getElementById('heroSearchInput')?.value.trim() || '';
  const target = query ? `pages/profiles.html?search=${encodeURIComponent(query)}` : 'pages/profiles.html';
  window.location.href = target;
});
