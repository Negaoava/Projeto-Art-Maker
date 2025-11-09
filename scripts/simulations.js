import { copy2DArray, make2DArray, reset2DArray } from "./utils.js";

// First simulation logic
export const cellSize = 5;
const sandCanvas = document.getElementById('simulation-one');
const sandCtx = sandCanvas.getContext('2d');
const height = sandCanvas.height;
const width = sandCanvas.width;
const cols = width / cellSize;
const rows = height / cellSize;
const rect = sandCanvas.getBoundingClientRect();

let sandGrid = make2DArray(rows, cols);
let nextSandGrid = make2DArray(rows, cols);

sandCtx.strokeStyle = 'gray';
sandCtx.fillStyle = 'gray';

sandGrid[1][1] = 1;

let mouseX, mouseY;
let isMouseDown = false;
sandCanvas.addEventListener('mousemove', (e) => {
    mouseX = Math.round((e.x - rect.left) / cellSize);
    mouseY = Math.round((e.y - rect.top) / cellSize);

    let active = 1;

    if (isMouseDown) {
        sandGrid[mouseX][mouseY] = active;
    }
});

sandCanvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;
});

sandCanvas.addEventListener('mouseup', (e) => {
    isMouseDown = false;
});

function sandDrawLoop() {
    sandCtx.clearRect(0, 0, width, height);

    drawSand();
    sandBehaviour();

    requestAnimationFrame(sandDrawLoop);
}
sandDrawLoop();

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

function sandBehaviour() {
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            let active = 1;
            let unactive = 0;

            if (sandGrid[i][j] != 0) {
                if (j + 1 <= rows && sandGrid[i][j + 1] == 0) {
                    nextSandGrid[i][j + 1] = active;
                    nextSandGrid[i][j] = unactive;
                }
                else {
                    nextSandGrid[i][j] = active;
                }
            }
        }
    }
    copy2DArray(nextSandGrid, sandGrid);
    reset2DArray(nextSandGrid);
}