import { textElements } from '../elements/textElements.js';
import { buttonElements } from '../elements/buttonElements.js';
import { imageElements } from '../elements/imageElements.js';

export const sidebarRender = () => {
  const container = document.createElement('div');

  // Render Text Elements
  textElements.forEach(el => {
    const btn = document.createElement('button');
    btn.textContent = el.label;
    btn.dataset.id = el.id;
    container.appendChild(btn);
  });

  // Render Button Elements
  buttonElements.forEach(el => {
    const btn = document.createElement('button');
    btn.textContent = el.label;
    btn.dataset.id = el.id;
    container.appendChild(btn);
  });

  // Render Image Elements
  imageElements.forEach(el => {
    const btn = document.createElement('button');
    btn.textContent = el.label;
    btn.dataset.id = el.id;
    container.appendChild(btn);
  });

  return container;
};