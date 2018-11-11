const print = console.log.bind(console);

let gridWidth = 80;
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
randomize(grid);

// oscillator
//grid.set(1, 2, 1);
//grid.set(2, 2, 1);
//grid.set(3, 2, 1);

print(render(grid));

let iter = 0;
let maxIterations = 10000;

let fps = 1000 / 10;
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
