import { sidebarRender } from './sidebar/elements.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const sidebar = document.getElementById('sidebar');

  const canvasRegistry = {
    createElementFrom: (el) => {
      const size = 100;
      const div = document.createElement(el.tag);

      if (el.defaultContent) div.textContent = el.defaultContent;
      if (el.attributes) {
        for (const [key, value] of Object.entries(el.attributes)) {
          div.setAttribute(key, value);
        }
      }

      div.style.position = 'absolute';
      div.style.left = '10px';
      div.style.top = '10px';
      div.style.width = size + 'px';
      div.style.height = size + 'px';
      div.style.border = '1px solid #333';
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.justifyContent = 'center';
      div.style.cursor = 'move';
      div.style.backgroundColor = '#007acc';
      div.style.color = '#fff';

      canvas.appendChild(div);
    }
  };

  const sidebarContent = sidebarRender(canvasRegistry);
  sidebar.appendChild(sidebarContent);
});