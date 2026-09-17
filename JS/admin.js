const ADMIN_SESSION_KEY = 'campusAdminSession';
const ADMIN_EMAIL = 'admin@campus.local';
const ADMIN_PASSWORD = 'admin123';
const adminForm = document.getElementById('adminLoginForm');
const isAdminDashboard = document.body?.classList.contains('admin-dashboard-page');
if (isAdminDashboard && localStorage.getItem(ADMIN_SESSION_KEY) !== 'active') {
  window.location.replace('admin-login.html');
}
adminForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('adminEmail')?.value.trim().toLowerCase();
  const password = document.getElementById('adminPassword')?.value || '';
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    alert('Invalid admin credentials. Use admin@campus.local and admin123 for this demo.');
    return;
  }
  localStorage.setItem(ADMIN_SESSION_KEY, 'active');
  window.location.href = 'admin-dashboard.html';
});
function logoutAdmin(event) {
  event?.preventDefault();
  localStorage.removeItem(ADMIN_SESSION_KEY);
  window.location.href = 'admin-login.html';
}
document.querySelectorAll('.admin-top-logout, .admin-logout').forEach((button) => button.addEventListener('click', logoutAdmin));
document.querySelectorAll('.remove-user').forEach((button) => {
  button.addEventListener('click', () => {
    const row = button.closest('.admin-row');
    const name = row?.querySelector('.user-cell')?.textContent.trim() || 'this profile';
    if (row && window.confirm(`Remove ${name} from the directory?`)) row.remove();
  });
});
