import { copy2DArray, make2DArray, reset2DArray } from "./utils.js";

// First simulation logic
export const cellSize = 10;
const sandCanvas = document.getElementById('simulation-one');
const sandCtx = sandCanvas.getContext('2d');
const height = sandCanvas.height;
const width = sandCanvas.width;
const cols = width / cellSize;
const rows = height / cellSize;

let sandGrid = make2DArray(rows, cols);
let nextSandGrid = make2DArray(rows, cols);

sandCtx.strokeStyle = 'white';
sandCtx.fillStyle = 'white';

sandGrid[1][1] = 1;

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
            if (sandGrid[i][j] != 0) {
                if (sandGrid[i][j + 1] == 0) {
                    nextSandGrid[i][j + 1] = 1
                    nextSandGrid[i][j] = 0;
                }
            }
        }
    }
    copy2DArray(nextSandGrid, sandGrid);
    reset2DArray(nextSandGrid);
}