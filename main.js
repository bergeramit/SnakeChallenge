let backColor = "#34495e";
let ROWS = 30;
let COLS = 50;
let snake = {
    'size': 0,
    'direction': 'r',
    'place': []
}
let addBlock = [];
let fruit = {
    placex: 0,
    placey: 0
};
window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    switch (code) {
        case 38:
            if (snake.direction != 'd')
                snake.direction = 'u';
            //up keycode
            break;
        case 39:
            if (snake.direction != 'l')
                snake.direction = 'r';
            //right keycode
            break;
        case 40:
            if (snake.direction != 'u')
                snake.direction = 'd';
            //down
            break;
        case 37:
            if (snake.direction != 'r')
                snake.direction = 'l';
            //left
            break;
    }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



let paintBack = function(){
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; ++j) {
            var li = document.getElementById('u' + i + 'l' + j);
            li.style.backgroundColor = backColor;
        }
    }
}

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
    snake.size = 1;
    snake.place.push(square);
    drawSnake();
    snake.size = 2;
    snake.place.push(square1);
    drawSnake();
    snake.size = 3;
    snake.place.push(square2);
    drawSnake();
    snake.direction = 'r';
}

let drawSnake = function () {
    let squareToColor = snake.place[snake.size - 1];
    block = document.getElementById('u' + squareToColor.x + 'l' + squareToColor.y);
    block.style.backgroundColor = "white";
}


let createFruit = function () {
    let placex = Math.floor(Math.random() * ROWS);
    let placey = Math.floor(Math.random() * COLS);
    while (!noConflictFruit(placex, placey)) {
        placex = Math.floor(Math.random() * ROWS);
        placey = Math.floor(Math.random() * COLS);
    }
    block = document.getElementById('u' + placex + 'l' + placey);
    block.style.backgroundColor = "orange";
    fruit.placex = placex;
    fruit.placey = placey;
}

let noConflictFruit = function (x, y) {
    for (let i = 0; i < snake.size; ++i) {
        if (snake.place[i].x == x && snake.place[i].y == y) {
            return false;
        }
    }
    return true;
}

async function startMovement() {
    await sleep(100);
    while (snakeStep()) {
        await sleep(100);
        if (hitFruit()) {
            var place = {
                x: fruit.placex,
                y: fruit.placey
            }
            addBlock.push(place);
            createFruit();
        }
    }
    let endingtext = document.createElement("h1");
    endingtext.innerText = "Congrats, your score is " + snake.size;
    endingtext.setAttribute("id","h1");
    document.body.appendChild(endingtext);
    let endingbutton= document.createElement("button");
    endingbutton.setAttribute("onclick","resetGame()");
    endingbutton.innerText = "Play Again";
    endingbutton.setAttribute("id","button");
    document.body.appendChild(endingbutton);
}

let hitFruit = function () {
    if (fruit.placex == snake.place[snake.size - 1].x && fruit.placey == snake.place[snake.size - 1].y) {
        return true;
    }
    return false;
}

let noConflictNextStep = function () {
    switch (snake.direction) {
        case 'r':
            var s = {
                'x': snake.place[snake.size - 1].x,
                'y': snake.place[snake.size - 1].y + 1
            }
            break;
        case 'l':
            var s = {
                'x': snake.place[snake.size - 1].x,
                'y': snake.place[snake.size - 1].y - 1
            }
            break;
        case 'u':
            var s = {
                'x': snake.place[snake.size - 1].x - 1,
                'y': snake.place[snake.size - 1].y
            }
            break;
        case 'd':
            var s = {
                'x': snake.place[snake.size - 1].x + 1,
                'y': snake.place[snake.size - 1].y
            }
            break;
    }
    if(s.x == ROWS || s.x == -1 || s.y == COLS || s.y == -1){
        return false;
    }
    return true;
}

let snakeStep = function () {
    switch (snake.direction) {
        case 'r':
            var s = {
                'x': snake.place[snake.size - 1].x,
                'y': snake.place[snake.size - 1].y + 1
            }
            break;
        case 'l':
            var s = {
                'x': snake.place[snake.size - 1].x,
                'y': snake.place[snake.size - 1].y - 1
            }
            break;
        case 'u':
            var s = {
                'x': snake.place[snake.size - 1].x - 1,
                'y': snake.place[snake.size - 1].y
            }
            break;
        case 'd':
            var s = {
                'x': snake.place[snake.size - 1].x + 1,
                'y': snake.place[snake.size - 1].y
            }
            break;
    }
    if(s.x == ROWS || s.x == -1 || s.y == COLS || s.y == -1 || hitSelf(s)){
        return false;
    }
    snake.place.push(s);
    if (!needToStay()) {
        var li = document.getElementById('u' + snake.place[0].x + 'l' + snake.place[0].y);
        li.style.background = backColor;
        snake.place.splice(0, 1);
    } else {
        snake.size++;
    }
    drawSnake();
    return true;
}

let needToStay = function () {
    for (let i = 0; i < addBlock.length; ++i) {
        if (snake.place[0].x == addBlock[i].x && snake.place[0].y == addBlock[i].y) {
            addBlock.splice(i, 1);
            return true;
        }
    }
    return false;
}


initiateBoard();
ceateSnake();
createFruit();
startMovement();

let hitSelf = function(s){
    for(let i=0;i<snake.place.length;++i){
        if(s.x == snake.place[i].x && s.y == snake.place[i].y)
            return true;
    }
    return false;
}


let resetGame = function(){
    var h = document.getElementById("h1");
    var b = document.getElementById("button");
    h.remove();
    b.remove();
    paintBack();
    while(snake.place.length != 0){
        snake.place.pop();
    }
    snake.size=0;
    ceateSnake();
    createFruit();
    startMovement();
}


