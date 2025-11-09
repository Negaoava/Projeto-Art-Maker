import { cellSize } from "./simulations.js";

const sandCanvas = document.getElementById('simulation-one');
const rect = sandCanvas.getBoundingClientRect();

let mouseX, mouseY;

sandCanvas.addEventListener('mousemove', (e) => {
    mouseX = Math.round((e.x - rect.left) / cellSize);
    mouseY = Math.round((e.y - rect.top) / cellSize);

    console.log(mouseX, mouseY);
});


sandCanvas.addEventListener('mousedown')