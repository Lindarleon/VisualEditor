import { textElements } from '../elements/textElements.js';
import { buttonElements } from '../elements/buttonElement.js';
import { imageElements } from '../elements/imageElement.js';

export const sidebarRender = (canvasRegistry) => {
  const container = document.createElement('div');

  const createSidebarButton = (el) => {
    const btn = document.createElement('button');
    btn.textContent = el.name;
    btn.dataset.id = el.id;
    btn.addEventListener('click', () => {
      canvasRegistry.createElementFrom(el);
    });
    return btn;
  };

  // Text Elements
  const textDiv = document.createElement('div');
  textDiv.className = 'sidebar-group';
  textElements.forEach(el => textDiv.appendChild(createSidebarButton(el)));
  container.appendChild(textDiv);

  // Button Elements
  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'sidebar-group';
  buttonElements.forEach(el => buttonDiv.appendChild(createSidebarButton(el)));
  container.appendChild(buttonDiv);

  // Image Elements
  const imageDiv = document.createElement('div');
  imageDiv.className = 'sidebar-group';
  imageElements.forEach(el => imageDiv.appendChild(createSidebarButton(el)));
  container.appendChild(imageDiv);

  return container;
};