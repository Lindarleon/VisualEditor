import { sidebarRender } from './sidebar/elements.js';

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');

  const sidebarContent = sidebarRender();
  sidebar.appendChild(sidebarContent);
});