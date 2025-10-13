const canvas = document.getElementById('canvas');
const sidebar = document.getElementById('sidebar');
const sidebarBtn = document.getElementById('sidebarBtn');
const viewBtn = document.getElementById('viewBtn');
const removeBtn = document.getElementById('removeBtn');
const generateBtn = document.getElementById('generateBtn');
const sizeSlider = document.getElementById('sizeSlider');

let elements = [];
let selectedElement = null;
let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let elementCounter = 0;

sidebarBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

canvas.addEventListener('dblclick', (e) => {
  if (e.target === canvas || e.target.classList.contains('canvas-label')) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createElementAt(x, y);
  }
});

function createElementAt(x, y) {
  elementCounter++;
  const size = parseInt(sizeSlider.value);
  
  const element = document.createElement('div');
  element.className = 'element';
  element.textContent = `Element ${elementCounter}`;
  element.style.width = `${size}px`;
  element.style.height = `${size}px`;
  element.style.left = `${Math.max(0, Math.min(x - size / 2, canvas.clientWidth - size))}px`;
  element.style.top = `${Math.max(0, Math.min(y - size / 2, canvas.clientHeight - size))}px`;
  
  element.addEventListener('mousedown', startDrag);
  element.addEventListener('click', selectElement);
  
  canvas.appendChild(element);
  elements.push({
    element: element,
    id: elementCounter,
    x: parseFloat(element.style.left),
    y: parseFloat(element.style.top),
    width: size,
    height: size
  });
  
  updateCanvasState();
}

function selectElement(e) {
  e.stopPropagation();
  
  if (selectedElement) {
    selectedElement.classList.remove('selected');
  }
  
  selectedElement = e.currentTarget;
  selectedElement.classList.add('selected');
  updateButtonStates();
}

canvas.addEventListener('click', (e) => {
  if (e.target === canvas || e.target.classList.contains('canvas-label')) {
    if (selectedElement) {
      selectedElement.classList.remove('selected');
      selectedElement = null;
      updateButtonStates();
    }
  }
});

function startDrag(e) {
  e.preventDefault();
  draggedElement = e.currentTarget;
  
  const rect = draggedElement.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect();
  
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
  if (!draggedElement) return;
  
  const canvasRect = canvas.getBoundingClientRect();
  let x = e.clientX - canvasRect.left - offsetX;
  let y = e.clientY - canvasRect.top - offsetY;
  
  const width = draggedElement.offsetWidth;
  const height = draggedElement.offsetHeight;
  
  x = Math.max(0, Math.min(x, canvas.clientWidth - width));
  y = Math.max(0, Math.min(y, canvas.clientHeight - height));
  
  draggedElement.style.left = `${x}px`;
  draggedElement.style.top = `${y}px`;
}

function stopDrag() {
  if (draggedElement) {
    const elementData = elements.find(e => e.element === draggedElement);
    if (elementData) {
      elementData.x = parseFloat(draggedElement.style.left);
      elementData.y = parseFloat(draggedElement.style.top);
    }
  }
  
  draggedElement = null;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
}

removeBtn.addEventListener('click', () => {
  if (selectedElement) {
    const index = elements.findIndex(e => e.element === selectedElement);
    if (index > -1) {
      elements.splice(index, 1);
    }
    
    selectedElement.remove();
    selectedElement = null;
    updateButtonStates();
    updateCanvasState();
  }
});

sizeSlider.addEventListener('input', (e) => {
  if (selectedElement) {
    const newSize = parseInt(e.target.value);
    selectedElement.style.width = `${newSize}px`;
    selectedElement.style.height = `${newSize}px`;
    
    const elementData = elements.find(el => el.element === selectedElement);
    if (elementData) {
      elementData.width = newSize;
      elementData.height = newSize;
      
      const x = Math.max(0, Math.min(elementData.x, canvas.clientWidth - newSize));
      const y = Math.max(0, Math.min(elementData.y, canvas.clientHeight - newSize));
      selectedElement.style.left = `${x}px`;
      selectedElement.style.top = `${y}px`;
      elementData.x = x;
      elementData.y = y;
    }
  }
});

viewBtn.addEventListener('click', () => {
  showCodeView();
});

generateBtn.addEventListener('click', () => {
  showCodeView();
});

function showCodeView() {
  const html = generateHTML();
  
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Generated HTML</h2>
      <pre>${escapeHtml(html)}</pre>
      <button onclick="this.parentElement.parentElement.remove()">Close</button>
      <button onclick="copyToClipboard(this)" style="margin-left: 10px;">Copy</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

function generateHTML() {
  let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n';
  html += '  <meta charset="UTF-8">\n';
  html += '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
  html += '  <title>Generated Layout</title>\n';
  html += '  <style>\n';
  html += '    .container { position: relative; width: 800px; height: 600px; }\n';
  html += '    .element { position: absolute; background-color: #007acc; border: 2px solid #005a9e; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; }\n';
  html += '  </style>\n';
  html += '</head>\n<body>\n';
  html += '  <div class="container">\n';
  
  elements.forEach(el => {
    html += `    <div class="element" style="left: ${el.x}px; top: ${el.y}px; width: ${el.width}px; height: ${el.height}px;">\n`;
    html += `      ${el.element.textContent}\n`;
    html += `    </div>\n`;
  });
  
  html += '  </div>\n';
  html += '</body>\n</html>';
  
  return html;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

window.copyToClipboard = function(button) {
  const pre = button.parentElement.querySelector('pre');
  const text = pre.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
};

function updateButtonStates() {
  removeBtn.disabled = !selectedElement;
}

function updateCanvasState() {
  if (elements.length > 0) {
    canvas.classList.add('has-elements');
  } else {
    canvas.classList.remove('has-elements');
  }
}

updateButtonStates();
updateCanvasState();
