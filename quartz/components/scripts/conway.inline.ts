const canvas: HTMLCanvasElement = document.getElementById('conway') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

let gridSize = 50;
let cellSize = 300 / gridSize;
let grid: number[][] = [];
let nextGrid: number[][] = [];
let isRunning: boolean = true;
let animationId: number;
let speed: number = 60;

let generation: number = 0;
let population: number = 0;

let generationCnt = document.getElementById("generationCnt");
let populationCnt = document.getElementById("populationCnt")


function initGrid(): void {
    grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));
    nextGrid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));
    canvas.width = gridSize * cellSize;
    canvas.height = gridSize * cellSize;
}

function randomizeGrid(): void {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = Math.random() > 0.7 ? 1 : 0;
        }
    }
}

function drawGrid(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw cells
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            // ctx.fillStyle = grid[i][j] ? '#5296c4' : '#faf8f8';
            if (grid[i][j] == 0){ctx.fillStyle = '#faf8f8'}
            else if (grid[i][j] == 1){ctx.fillStyle = '#284b63'}
            else if (grid[i][j] == 2){ctx.fillStyle = '#5296c4'}
             
            ctx.fillRect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);
        }
    }
}

function countNeighbors(i: number, j: number): number {
    let count: number = 0;
    for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
            if (di === 0 && dj === 0) continue;
            let ni: number = (i + di + gridSize) % gridSize;
            let nj: number = (j + dj + gridSize) % gridSize;
            count += grid[ni][nj];
        }
    }
    return count;
}

// Update grid
function updateGrid(): void {
     generation++;
    population = 0;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let neighbors: number = countNeighbors(i, j);
            if (grid[i][j] === 1) {
                nextGrid[i][j] = (neighbors === 2 || neighbors === 3) ? 1 : 2;
            } else {
                nextGrid[i][j] = (neighbors === 3) ? 1 : 0;
            }

            if (nextGrid[i][j] === 1) population++;
        }
    }
    [grid, nextGrid] = [nextGrid, grid];

    generationCnt.textContent = generation;
    populationCnt.textContent = population;

}

function animate(): void {
    if (isRunning) {
        updateGrid();
        drawGrid();
        setTimeout(() => {
            animationId = requestAnimationFrame(animate);
        }, speed);
    }
}

initGrid();
randomizeGrid();
drawGrid();
animate();
