const sidebar = document.getElementById('sidebar');
const sidebarBtn = document.getElementById('sidebarBtn');

sidebarBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});