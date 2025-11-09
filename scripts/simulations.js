import { copy2DArray, make2DArray, reset2DArray } from "./utils.js";

// First simulation logic
const cellSize = 5;
const sandCanvas = document.getElementById('simulation-one');
const sandCtx = sandCanvas.getContext('2d');
const height = sandCanvas.height;
const width = sandCanvas.width;
const cols = width / cellSize;
const rows = height / cellSize;

let sandGrid = make2DArray(rows, cols);
let nextSandGrid = make2DArray(rows, cols);

sandCtx.strokeStyle = 'gray';
sandCtx.fillStyle = 'gray';

let isMouseDown = false;

// Mouse interactivity
sandCanvas.addEventListener('mousemove', (e) => {
    const rect = sandCanvas.getBoundingClientRect();

    let mouseX = Math.round((e.x - rect.left) / cellSize);
    let mouseY = Math.round((e.y - rect.top) / cellSize);

    let active = 1;

    if (isMouseDown) {
        sandGrid[mouseX][mouseY] = active;
    }
});

sandCanvas.addEventListener('mousedown', () => {
    isMouseDown = true;
});

sandCanvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});

let isTouching = false;

// Mobile interactivity
sandCanvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const rect = sandCanvas.getBoundingClientRect();
    const touch = e.touches[0];

    let touchX = Math.round((touch.clientX - rect.left) / cellSize);
    let touchY = Math.round((touch.clientY - rect.top) / cellSize);

    let active = 1;

    if (isTouching) {
        sandGrid[touchX][touchY] = active;
    }
}, {passive: false});

sandCanvas.addEventListener('touchstart', () => {
    isTouching = true;
});

sandCanvas.addEventListener('touchend', () => {
    isTouching = false;
});

// Draw loop for the simulation
function sandDrawLoop() {
    sandCtx.clearRect(0, 0, width, height);

    drawSand();
    sandBehaviour();

    requestAnimationFrame(sandDrawLoop);
}
sandDrawLoop();

// Function responsible for recognizing active cells and display them
function drawSand() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (sandGrid[i][j] != 0) {
                sandCtx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
                sandCtx.fill();
            }
        }
    }
}


// Function responsible for the sand behaviour within the data structure
function sandBehaviour() {
    const active = 1;
    const unactive = 0;
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            const left = i - 1;
            const right = i + 1;
            const below = j + 1;
            const hasLeftNeighbor =  i > 0 && sandGrid[left][j] !== undefined;
            const hasRightNeighbor = i < cols - 1 && sandGrid[right][j] !== undefined;
            const hasBothNeighbors = (hasLeftNeighbor && hasRightNeighbor);

            if (sandGrid[i][j] == active) {
                if (j + 1 < rows && sandGrid[i][below] == unactive) {
                    nextSandGrid[i][below] = active;
                    nextSandGrid[i][j] = unactive;
                }
                else if (hasBothNeighbors && sandGrid[left][below] == unactive && sandGrid[right][below] == unactive) {
                    let direction = Math.random() > 0.5 ? 1 : -1;

                    nextSandGrid[i + direction][below] = active;
                    nextSandGrid[i][j] = unactive;
                }
                else if (hasLeftNeighbor && sandGrid[left][below] == unactive) {
                    nextSandGrid[left][below] = active;
                    nextSandGrid[i][j] = unactive;
                }
                else if (hasRightNeighbor && sandGrid[right][below] == unactive ){
                    nextSandGrid[right][below] = active;
                    nextSandGrid[i][j] = unactive;
                } 

                else{
                    nextSandGrid[i][j] = active;
                }
            }
        }
    }
    copy2DArray(nextSandGrid, sandGrid);
    reset2DArray(nextSandGrid);
}

