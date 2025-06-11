const DEFAULT_COLOR = '#ff0000';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

let mouseDown = false;
let cells = [];

const colorPicker = document.getElementById('colorPicker');
const btnColor = document.getElementById('btnColor');
const btnRainbow = document.getElementById('btnRainbow');
const btnEraser = document.getElementById('btnEraser');
const btnClear = document.getElementById('btnClear');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const grid = document.getElementById('grid');

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
btnColor.onclick = () => setCurrentMode('color');
btnRainbow.onclick = () => setCurrentMode('rainbow');
btnEraser.onclick = () => setCurrentMode('eraser');
btnClear.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

function clearGrid() {
    grid.innerHTML = '';
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    cells = [];

    for (let i = 0; i < size * size; i++) {
        const cell = { color: '#fefefe' };
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', (e) => changeColor(e, i));
        gridElement.addEventListener('mousedown', (e) => changeColor(e, i));
        grid.appendChild(gridElement);
        cells.push({ element: gridElement, ...cell });
    }
}

function changeColor(e, index) {
    if (e.type === 'mouseover' && !mouseDown) return;
    let newColor;
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        newColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === 'color') {
        newColor = currentColor;
    } else if (currentMode === 'eraser') {
        newColor = '#fefefe';
    }
    cells[index].color = newColor;
    cells[index].element.style.backgroundColor = newColor;
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        btnRainbow.classList.remove('active');
    } else if (currentMode === 'color') {
        btnColor.classList.remove('active');
    } else if (currentMode === 'eraser') {
        btnEraser.classList.remove('active');
    }

    if (newMode === 'rainbow') {
        btnRainbow.classList.add('active');
    } else if (newMode === 'color') {
        btnColor.classList.add('active');
    } else if (newMode === 'eraser') {
        btnEraser.classList.add('active');
    }
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
}