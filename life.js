const print = console.log.bind(console);

let gridWidth = 40;
let gridHeight = 20;

function Grid(width, height){
    this.grid = new Array(width * height).fill(0);
}

Grid.prototype.get = function(x, y){
    return this.grid[y * gridWidth + x];
}

Grid.prototype.set = function(x, y, val){
    this.grid[y * gridWidth + x] = val;
}

function isInBounds(x, y){
    return x < gridWidth && x >= 0 && y < gridHeight && y >=0;
}  

Grid.prototype.getNeighbours = function(x, y){
    let count = 0;
    for(let i = 0; i < offSet.length; i++){
        if(isInBounds(x + offSet[i].x, y + offSet[i].y)){
            const currCell = this.get(x + offSet[i].x, y + offSet[i].y);
            count += currCell || 0; // may return undefined
        }
    }
    return count;
}

function Point(x, y){
    this.x = x;
    this.y = y;
}

let offSet = [
    new Point(-1, -1), new Point(0, -1), new Point(1, -1),
    new Point(-1, 0),  new Point(1, 0),
    new Point(-1, 1), new Point(0, 1), new Point(1, 1)
];

function randomize(col){
    for(let j = 0; j < gridHeight; j++){
        for(let i = 0; i < gridWidth; i++){
            const val = Math.round(Math.random());
            col.set(i, j, val); 
        }
    }
}

function update(){
    for(let j = 0; j < gridHeight; j++){
        for(let i = 0; i < gridWidth; i++){
            let liveCells = 0;
            let result = '';
            liveCells = grid.getNeighbours(i, j);

            switch(liveCells){
                case 2:
                    grid2.set(i, j, grid.get(i,j));
                    result = 'nothing happened';
                    break;
                case 3:
                    grid2.set(i, j, 1);
                    result = 'alive';
                    // alive
                    break;
                default:
                    grid2.set(i, j, 0);
                    result = 'dead';
                    // dead
            }
        }
    }
    // swap buffer
    let temp = grid;
    grid = grid2;
    grid2 = temp;
}

function render(col){
    let result = '';
    for(let j = 0; j < gridHeight; j++){
        for(let i = 0; i < gridWidth; i++){
            if(col.get(i, j) === 1){
                result += '*';
            } else {
                result += '.';
            }
        }
        result += '\n';
    }
    return result;
}

console.reset = function(){
    return process.stdout.write('\033c');
}

let grid = new Grid(gridWidth, gridHeight);
let grid2 = new Grid(gridWidth, gridHeight);
//randomize(grid);

// square
grid.set(1, 8, 1);
grid.set(0, 8, 1);
grid.set(1, 9, 1);
grid.set(0, 9, 1);

grid.set(10, 8, 1);
grid.set(10, 9, 1);
grid.set(10, 10, 1);
grid.set(11, 7, 1);
grid.set(11, 11, 1);
grid.set(12, 6, 1);
grid.set(12, 12, 1);
grid.set(13, 6, 1);
grid.set(13, 12, 1);
grid.set(14, 9, 1);
grid.set(15, 7, 1);
grid.set(15, 11, 1);
grid.set(16, 8, 1);
grid.set(16, 9, 1);
grid.set(16, 10, 1);
grid.set(17, 9, 1);

grid.set(20, 8, 1);
grid.set(21, 8, 1);
grid.set(20, 7, 1);
grid.set(21, 7, 1);
grid.set(20, 6, 1);
grid.set(21, 6, 1);
grid.set(22, 5, 1);
grid.set(22, 9, 1);
grid.set(24, 5, 1);
grid.set(24, 9, 1);
grid.set(24, 4, 1);
grid.set(24, 10, 1);

grid.set(34, 6, 1);
grid.set(35, 6, 1);
grid.set(34, 7, 1);
grid.set(35, 7, 1);

print(render(grid));

let iter = 0;
let maxIterations = 10000;

let fps = 1000 / 60;
let id = animate();

function animate(){
    return setInterval(()=>{
        console.reset();
        update();
        print(render(grid));
        if(iter++ > maxIterations){
            clearInterval(id);
        }
    }, fps);
}
