import { textElements } from '../elements/textElements.js';
import { buttonElements } from '../elements/buttonElement.js';
import { imageElements } from '../elements/imageElement.js';

export const sidebarRender = () => {
  const container = document.createElement('div');

  // Text Elements
  const textDiv = document.createElement('div');
  textDiv.className = 'sidebar-group';
  textElements.forEach(el => {
    const btn = document.createElement('button');
    btn.textContent = el.name;
    btn.dataset.id = el.id;
    btn.addEventListener('click', () => {
      console.log('Create text element:', el);
    });
    textDiv.appendChild(btn);
  });
  container.appendChild(textDiv);

  // Button Elements
  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'sidebar-group';
  buttonElements.forEach(el => {
    const btn = document.createElement('button');
    btn.textContent = el.name;
    btn.dataset.id = el.id;
    btn.addEventListener('click', () => {
      console.log('Create button element:', el);
    });
    buttonDiv.appendChild(btn);
  });
  container.appendChild(buttonDiv);

  // Image Elements
  const imageDiv = document.createElement('div');
  imageDiv.className = 'sidebar-group';
  imageElements.forEach(el => {
    const btn = document.createElement('button');
    btn.textContent = el.name;
    btn.dataset.id = el.id;
    btn.addEventListener('click', () => {
      console.log('Create image element:', el);
    });
    imageDiv.appendChild(btn);
  });
  container.appendChild(imageDiv);

  return container;
};