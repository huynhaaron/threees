//variables
var cols = 4;
var rows = 4;
var xPad = 10;
var yPad = 10;
var startXOffset = 10;
var startYOffset = 10;
var tileWidth = 100;
var tileHeight = 100;

var board = new Array();
let moved = false;


for (let i = 0; i < cols; i++) {
  board[i] = new Array();
  for (let j = 0; j < rows; j++) {
    board[i][j] = { val: 0};
  }
}

starting_numbers1 = [1,1,1,2,2,2,3,3,3];
starting_numbers2 = [1,1,1,1,2,2,3,3,3];
starting_numbers3 = [1,1,1,2,2,3,3,3,3];
starting_numbers4 = [1,1,2,2,2,3,3,3,3];

function generateStartingNumbers () {
  let options = [1,2,3];
  let numbers = []
  while (numbers.length < 9) {
    let number = options[Math.floor(Math.random() * options.length)];
    if (countItems(numbers,number) > 3) {
      continue;
    } else {
      numbers.push(number);
    }
  }
  return shuffleArray(numbers);
  console.log(numbers);
}





board[0][0] = {val: 1};
board[0][1] = {val: 2};
board[1][0] = {val: 3};
board[1][1] = {val: 3};
board[3][3] = {val: 1};
board[2][2] = {val: 2};


console.log(board);

function drawGrid() {
  var grid = document.getElementById('grid');
  if (grid.getContext) {
    var ctx = grid.getContext('2d');

    //draw background
    ctx.fillStyle = "#aaa0a0";
    ctx.fillRect (0,0, grid.width, grid.height);

    //draw grid and tiles
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        //colors of tiles
        if (board[i][j].val === 1) {
          ctx.fillStyle = '#66CCFF';
        } else if (board[i][j].val === 2) {
          ctx.fillStyle = '#FF6680';
        } else {
        ctx.fillStyle = '#FFFFFF';
        }
        ctx.strokeRect((i * 100), (j * 100), tileWidth, tileHeight);
        ctx.fillRect((i * 100), (j * 100), tileWidth, tileHeight);
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        if (board[i][j].val === 0) {
          ctx.fillText(" " , (i * 100) + 40, (j * 100 ) + 55);
        } else {
          ctx.fillText(board[i][j].val , (i * 100) + 40, (j * 100 ) + 55);
        }
      }
    }
  }
}


//Move using keyboard
window.addEventListener('keydown',this.keyDown,false);
function keyDown(e) {
  let code = e.keyCode;
  if (!moved) {
    switch (code) {
        case 37: moveLeft(); moved = true; break; //Left key
        case 38: moveUp(); moved = true; break; //Up key
        case 39: moveRight(); moved = true;  break;//Right key
        case 40: moveDown(); moved = true; break;//Down key
    }
  }
  moved = false;
}



//Logic for merging
function attempt_tile_move(i, j, target_i, target_j) {
  //no tile to move
  if (board[i][j].val === 0){
    return;
  }
  //tiles are the same numbers
  if ((board[i][j].val === board[target_i][target_j].val)
   && (board[i][j].val !== 2) && (board[i][j].val !== 1)) {
    board[target_i][target_j].val *= 2;
    board[i][j].val = 0;
  }

  //tiles are different numbers
  else if ((board[i][j].val === 1 && board[target_i][target_j].val === 2) ||
       (board[i][j].val === 2 && board[target_i][target_j].val === 1)) {
      board[target_i][target_j].val = 3;
      board[i][j].val = 0;
      //combine 1 and 2
  } else if (board[i][j].val != 0 &&  board[target_i][target_j].val === 0) {
    //move the tile
    board[target_i][target_j].val = board[i][j].val;
    //set left behind tile to 0
    board[i][j].val = 0;
  }

}

//Generate new tile after a move
function generateNewRightColTile() {
  let empty_cells = [];
  for (let j = 0; j <= 3; j++) {
    if (board[3][j].val === 0) {
      empty_cells.push(j)
    }
  }
  if (empty_cells.length > 0) {
    let selected_row = empty_cells[Math.floor(Math.random()*empty_cells.length)];
    let value = Math.floor(Math.random() * 3) + 1;
    board[3][selected_row].val = value;
  }
}
function generateNewLeftColTile() {
  let empty_cells = [];
  for (let j = 0; j <= 3; j++) {
    if (board[0][j].val === 0) {
      empty_cells.push(j)
    }
  }
  if (empty_cells.length > 0) {
    let selected_row = empty_cells[Math.floor(Math.random()*empty_cells.length)];
    let value = Math.floor(Math.random() * 3) + 1;
    board[0][selected_row].val = value;
  }
}
function generateNewBottomRowTile() {
  let empty_cells = [];
  for (let i = 0; i <= 3; i++) {
    if (board[i][3].val === 0) {
      empty_cells.push(i)
    }
  }
  if (empty_cells.length > 0) {
    let selected_col = empty_cells[Math.floor(Math.random()*empty_cells.length)];
    let value = Math.floor(Math.random() * 3) + 1
    board[selected_col][3].val = value;
  }
}
function generateNewTopRowTile() {
  let empty_cells = [];
  for (let i = 0; i <= 3; i++) {
    if (board[i][0].val === 0) {
      empty_cells.push(i)
    }
  }
  if (empty_cells.length > 0) {
    let selected_col = empty_cells[Math.floor(Math.random()*empty_cells.length)];
    let value = Math.floor(Math.random() * 3) + 1
    board[selected_col][0].val = value;
  }
}

//Move direction
function moveUp() {
  for (var i = 0; i <= 3; i++) {
    for (var j = 0; j <= 3; j++) {
      if (j === 0) {
        continue;
      }
      attempt_tile_move(i, j, i, j - 1);
    }
  }
  generateNewBottomRowTile();
  drawGrid();
}
function moveDown() {
  for (var i = 0; i < 4; i++) {
    for (var j = 3; j >= 0 ; j--) {
      if (j === 3) {
        continue;
      }
      attempt_tile_move(i, j, i, j + 1);
    }
  }
  generateNewTopRowTile();
  drawGrid();
}
function moveLeft() {
  for (var i = 0; i <=3 ; i++) {
    for (var j = 0; j <= 3 ; j++) {
      if (i === 0) {
        continue;
      }
      attempt_tile_move(i, j, i - 1, j);
    }
  }
  generateNewRightColTile();
  drawGrid();
}
function moveRight() {
  for (var i = 3; i >=0; i--) {
    for (var j = 0; j <= 3 ; j++) {
      if (i === 3) {
        continue;
      }
      attempt_tile_move(i, j, i + 1, j);
    }
  }
  generateNewLeftColTile()
  drawGrid();
}

//Helper functions
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function countItems(arr, item){
    var count= 0, i;
    while((i= arr.indexOf(item, i))!= -1){
        ++count;
        ++i;
    }
    return count
}
