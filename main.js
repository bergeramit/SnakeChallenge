
let ROWS = 30;
let COLS = 50;
let snake = {
    'size': 0,
    'direction': 'r',
    'place': []
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function demo() {
    console.log('Taking a break...');
    await sleep(1000);
    console.log('one second later');
}

//demo();
var initiateBoard = function () {
    let board = document.getElementById("board");
    for (let i = 0; i < ROWS; i++) {
        let ul = document.createElement("ul");
        ul.setAttribute("id", 'u' + i)
        for (let j = 0; j < COLS; ++j) {
            let li = document.createElement("li");
            li.setAttribute("id", 'u' + i + 'l' + j);
            ul.appendChild(li);
        }
        board.appendChild(ul);
    }
}



var ceateSnake = function () {

    var square = {
        'x': 5,
        'y': 5,
    }
    var square1 = {
        'x': 5,
        'y': 6,
    }
    var square2 = {
        'x': 5,
        'y': 7,
    }
    snake.place.push(square);

    snake.place.push(square1);
    snake.place.push(square2);


    snake.size = 3;
    snake.direction = 'r';

    drawSnake();
}

let drawSnake = function () {
    for (let i = 0; i < snake.size; ++i) {
        let squareToColor = snake.place[i];
        block = document.getElementById('u' + squareToColor.x + 'l' + squareToColor.y);
        block.style.backgroundColor = "white";
    }
}


let createFruit = function () {
    let placex = Math.floor(Math.random() * ROWS);
    let placey = Math.floor(Math.random() * COLS);
    while (!noConflict(placex,placey)) {
        placex = Math.floor(Math.random() * ROWS);
        placey = Math.floor(Math.random() * COLS);
    }
    block = document.getElementById('u' + placex + 'l' + placey);
    block.style.backgroundColor = "orange";
}

let noConflict = function (x,y) {
    for(let i=0;i<snake.size;++i){
        if(snake.place[i].x == x && snake.place[i].y == y){
            return false;
        }
    }
    return true;
}



initiateBoard();
ceateSnake();
createFruit();
