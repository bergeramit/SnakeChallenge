
let ROWS = 20;
let COLS = 50;


initiateBoard();





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function demo() {
    console.log('Taking a break...');
    await sleep(1000);
    console.log('one second later');
  }

  //demo();
var initiateBoard = function(){
    let board = document.getElementById("board");
    for(let i=0;i<ROWS;i++){
        let ul = document.createElement("ul");
        ul.setAttribute("id",i)
        for(let j=0;j<COLS;++j){
            let li = document.createElement("li");
            li.setAttribute("id",j);
            ul.appendChild(li);
        }
        board.appendChild(ul);
    }
}







