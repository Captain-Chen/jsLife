const print = console.log.bind(console);

let gridWidth = 40;
let gridHeight = 20;

function Point(x, y){
    this.x = x;
    this.y = y;
}

let offSet = [
    new Point(-1, -1), new Point(-1, 0), new Point(-1, 1),
    new Point(0, -1),  new Point(0, +1),
    new Point(1, -1), new Point(1, 0), new Point(1, 1)
];

function init(width, height){
    return new Array(width * height).fill('.');
}

function randomize(col){
    for(let j = 0; j < gridHeight; j++){
        for(let i = 0; i < gridWidth; i++){
            const val = Math.round(Math.random());
            set(i, j, val); 
        }
    }
}

function update(){
    for(let j = 0; j < gridHeight; j++){
        for(let i = 0; i < gridWidth; i++){
            let liveCells = 0;
            liveCells = (getNeighbours(i, j));

            switch(liveCells){
                case 2:
                    // nothing happened
                    break;
                case 3:
                    set(i, j, 1);
                    // alive
                    break;
                default:
                    set(i, j, 0);
                    // dead
            }
        }
    }
}

function get(x, y){
    return grid[y * gridWidth + x];
}

function set(x, y, val){
    grid[y * gridWidth + x] = val;
}

function isInBounds(x, y){
    return x < gridWidth && x >= 0 && y < gridHeight && y >=0;
}

function getNeighbours(x, y){
    let count = 0;
    for(let i = 0; i < offSet.length; i++){
        count += get(x + offSet[i].x, y + offSet[i].y) || 0;
    }
    return count;
}

function render(){
    let result = '';
    for(let j = 0; j < gridHeight; j++){
        for(let i = 0; i < gridWidth; i++){
            if(get(i, j) === 1){
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

let grid = init(gridWidth, gridHeight);
randomize(grid);

let iter = 0;
let maxIterations = 10000;

let fps = 1000/30;

let id = animate();

function animate(){
    return setInterval(()=>{
        console.reset();
        update();
        print(render());
        if(iter++ > maxIterations){
            clearInterval(id);
        }
    }, fps);
}
