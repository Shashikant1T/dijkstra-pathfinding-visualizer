const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ROWS = 30;
const SIZE = canvas.width / ROWS;

// Cell states
const EMPTY = 0;
const WALL = 1;
const START = 2;
const END = 3;
const VISITED = 4;
const PATH = 5;

let grid = [];
let start = null;
let end = null;
let mouseDown = false;

/* ---------------- GRID INITIALIZATION ---------------- */

function initGrid() {
    grid = Array.from({ length: ROWS }, () =>
        Array(ROWS).fill(EMPTY)
    );
    start = null;
    end = null;
}

/* ---------------- DRAWING ---------------- */

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < ROWS; c++) {
            ctx.strokeStyle = "grey";
            ctx.strokeRect(c * SIZE, r * SIZE, SIZE, SIZE);

            switch (grid[r][c]) {
                case WALL:
                    ctx.fillStyle = "black";
                    break;
                case START:
                    ctx.fillStyle = "green";
                    break;
                case END:
                    ctx.fillStyle = "red";
                    break;
                case VISITED:
                    ctx.fillStyle = "blue";
                    break;
                case PATH:
                    ctx.fillStyle = "yellow";
                    break;
                default:
                    continue;
            }

            ctx.fillRect(c * SIZE, r * SIZE, SIZE, SIZE);
        }
    }
}

/* ---------------- MOUSE POSITION ---------------- */

function getCellFromEvent(e) {
    const rect = canvas.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left) / SIZE);
    const row = Math.floor((e.clientY - rect.top) / SIZE);
    return [row, col];
}

/* ---------------- MOUSE EVENTS (DRAG WALLS) ---------------- */

canvas.addEventListener("mousedown", e => {
    mouseDown = true;
    handleCell(e);
});

canvas.addEventListener("mousemove", e => {
    if (mouseDown) handleCell(e);
});

canvas.addEventListener("mouseup", () => mouseDown = false);
canvas.addEventListener("mouseleave", () => mouseDown = false);

/* ---------------- CELL HANDLING ---------------- */

function handleCell(e) {
    const [r, c] = getCellFromEvent(e);

    if (!start) {
        start = [r, c];
        grid[r][c] = START;
    }
    else if (!end && grid[r][c] !== START) {
        end = [r, c];
        grid[r][c] = END;
    }
    else if (grid[r][c] === EMPTY) {
        grid[r][c] = WALL;
    }

    drawGrid();
}

/* ---------------- RUN DIJKSTRA ---------------- */

async function runDijkstra() {
    if (!start || !end) return;

    // Convert grid for backend (only walls matter)
    const backendGrid = grid.map(row =>
        row.map(cell => cell === WALL ? 1 : 0)
    );

    const diagonalEnabled =
        document.getElementById("diagonalToggle")?.checked || false;

    const response = await fetch("/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            grid: backendGrid,
            start: start,
            end: end,
            diagonal: diagonalEnabled
        })
    });

    const data = await response.json();

    /* -------- CLEAR OLD VISUALIZATION -------- */

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < ROWS; c++) {
            if (grid[r][c] === VISITED || grid[r][c] === PATH) {
                grid[r][c] = EMPTY;
            }
        }
    }

    /* -------- VISITED ANIMATION (BLUE) -------- */

    for (let [r, c] of data.visited) {
        if (
            grid[r][c] !== START &&
            grid[r][c] !== END &&
            grid[r][c] !== WALL
        ) {
            grid[r][c] = VISITED;
            drawGrid();
            await sleep(15);
        }
    }

    /* -------- SHORTEST PATH (YELLOW) -------- */

    for (let [r, c] of data.path) {
        if (
            grid[r][c] !== START &&
            grid[r][c] !== END
        ) {
            grid[r][c] = PATH;
            drawGrid();
            await sleep(30);
        }
    }
}

/* ---------------- CLEAR GRID ---------------- */

function clearGrid() {
    initGrid();
    drawGrid();
}

/* ---------------- UTILITY ---------------- */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* ---------------- INIT ---------------- */

initGrid();
drawGrid();
