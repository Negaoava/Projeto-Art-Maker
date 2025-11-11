import { copy2DArray, make2DArray, reset2DArray, map } from "./utils.js";

// First simulation logic -----------------------------------------------------------------------------------------------------------
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
    const radius = 3;

    let mouseX = Math.round((e.x - rect.left) / cellSize);
    let mouseY = Math.round((e.y - rect.top) / cellSize);

    let active = 1;

    if (isMouseDown) {
        for (let x = -radius; x < radius; x++) {
            for (let y = -radius; y < radius; y++) {
                if (x * x + y * y <= radius * radius) {
                    if (Math.random() > 0.67) {
                        sandGrid[mouseX + x][mouseY + y] = active;
                    }
                }
            }
        }
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
    const radius = 3;

    let touchX = Math.round((touch.clientX - rect.left) / cellSize);
    let touchY = Math.round((touch.clientY - rect.top) / cellSize);

    let active = 1;

    if (isTouching) {
        for (let x = -radius; x < radius; x++) {
            for (let y = -radius; y < radius; y++) {
                if (x * x + y * y <= radius * radius) {
                    if (Math.random() > 0.67) {
                        sandGrid[x + touchX][y + touchY] = active;
                        
                    }
                }
            }
        }
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

// Function responsible for recognizing active cells and then drawing them on the grid
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
                    const left = -1;
                    const right = 1;
                    let direction = Math.random() > 0.5 ? left : right;

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

// Second simulation logic -----------------------------------------------------------------------------------------------

const fractalTreeCanvas = document.getElementById('simulation-two');
const fractalTreeCtx = fractalTreeCanvas.getContext('2d');

let separationAngle = Math.PI / 6;
let angle = Math.PI / 2
let branchLength = 125;
fractalTreeCtx.strokeStyle = 'white';

function drawFractalTree() {
    // Setup of the canvas for the simulation to work
    fractalTreeCtx.setTransform(1, 0, 0, 1, 0, 0);
    fractalTreeCtx.clearRect(0, 0, width, height);
    fractalTreeCtx.translate(width / 2, height);
    fractalTreeCtx.scale(1, -1);

    drawBranch(branchLength, 0, 0, angle);
    
    requestAnimationFrame(drawFractalTree);
}
drawFractalTree();

// Function responsible for drawing the branches of the fractal tree
function drawBranch(length, x, y, angle) {
    let endX = x + length * Math.cos(angle);
    let endY = y + length * Math.sin(angle);
    
    fractalTreeCtx.beginPath();
    fractalTreeCtx.moveTo(x, y);
    fractalTreeCtx.lineTo(endX, endY);
    fractalTreeCtx.stroke();

    if (length > 3) {
        drawBranch(length * 2/3, endX, endY, angle + separationAngle);
        drawBranch(length * 2/3, endX, endY, angle - separationAngle);
    }
}

// Events responsible for mouse interactivity
fractalTreeCanvas.addEventListener('mousemove', (e) => {
    const rect = fractalTreeCanvas.getBoundingClientRect();

    let mouseX = e.x - rect.left;
    let mouseY = e.y - rect.top;

    separationAngle = map(mouseX, 0, width, 0, Math.PI * 2);
    branchLength = map(mouseY, 0, height, 50, 200);
});

fractalTreeCanvas.addEventListener('mouseout', () => {
    separationAngle = Math.PI / 6;
    branchLength = 125;
});

// Events responsible for touch interactivity
fractalTreeCanvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const rect = fractalTreeCanvas.getBoundingClientRect();

    let touch = e.touches[0];

    let touchX = touch.clientX - rect.left;
    let touchY = touch.clientY - rect.top;

    separationAngle = map(touchX, 0, width, 0, Math.PI * 2);
    branchLength = map(touchY, 0, height, 50, 200);
}, {passive: false});

fractalTreeCanvas.addEventListener('touchend', () => {
    separationAngle = Math.PI / 6;
    branchLength = 125;
});

// Third simulation logic ---------------------------------------------------------------------------------------------

const fourierCanvas = document.getElementById('simulation-three');
const fourierCtx = fourierCanvas.getContext('2d');
const fourierCanvasHeight = fourierCanvas.height;
const fourierCanvasWidth = fourierCanvas.width;

fourierCtx.strokeStyle = 'white';
fourierCtx.fillStyle = 'white';

let fourierAngle = 0;
let waves = [];

function fourierDrawLoop() {
    fourierCtx.setTransform(1, 0, 0, 1, 0, 0);
    fourierCtx.clearRect(0, 0, fourierCanvasWidth, fourierCanvasHeight);
    fourierCtx.translate(fourierCanvasWidth / 2 - 200, fourierCanvasHeight / 2);
    fourierCtx.scale(1, -1);

    drawCircles(0, 0);

    fourierAngle += 0.02;
    requestAnimationFrame(fourierDrawLoop);
}
fourierDrawLoop();


function drawCircles(x, y) {
    const radius = 100;

    
    fourierCtx.beginPath();
    fourierCtx.arc(x, y, radius, 0, Math.PI * 2);
    fourierCtx.stroke();
    
    let xCord = radius * Math.cos(fourierAngle);
    let yCord = radius * Math.sin(fourierAngle)

    fourierCtx.beginPath();
    fourierCtx.arc(xCord, yCord, 4, 0, Math.PI * 2);
    fourierCtx.fill()

    fourierCtx.beginPath();
    fourierCtx.moveTo(x, y);
    fourierCtx.lineTo(xCord, yCord);
    fourierCtx.stroke();

    drawWaves(xCord, yCord);
}

function drawWaves(x, y) {
    waves.unshift(y);

    let offSet = 250

    for (let i = 0; i < waves.length; i++) {
        fourierCtx.beginPath();
        fourierCtx.moveTo(i - 1 + offSet, waves[i]);
        fourierCtx.lineTo(i + offSet, waves[i])
        fourierCtx.stroke();
    }

    fourierCtx.beginPath();
    fourierCtx.moveTo(x, y);
    fourierCtx.lineTo(offSet, waves[0])
    fourierCtx.stroke();

    if (waves.length > 500) waves.pop()
}