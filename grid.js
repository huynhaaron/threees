//variables
let cols = 4;
let rows = 4;
let xPad = 10;
let yPad = 10;
// let startXOffset = 10;
// let startYOffset = 10;
let tileWidth = 100;
let tileHeight = 100;

let board = new Array();
let moved = false;
let highScore = 0;

//check if there are valid moves(false if over, true if possible to mv)
function possibleToMove() {
  let result = false;
  for (let j = 0; j <= 2; j++) {
    for (let i = 0; i <= 2; i++) {
      //continue if board is empty, skip check
      // console.log(`${i},${j}`);
      if (board[i][j].val === 0) {
        return true;
      }
      //check if val is 1
      if (board[i][j].val === 1) {
        if (board[i+1][j].val === 2) {
          result = true;
          break;
        } else if (board[i][j+1].val === 2) {
          result = true;
          break;
        }
      }
      //check if val is  2
      else if (board[i][j].val === 2) {
        if (board[i+1][j].val === 1) {
          result = true;
          break;
        } else if (board[i][j + 1].val === 1) {
          result = true;
          break;
        }
      }
      //check for number > 2
      else {
        let currentval = board[i][j].val;
        if (board[i+1][j].val === currentval) {
          result = true;
          break;
        } else if (board[i][j + 1].val === currentval) {
          result = true;
          break;
        }
      }
    }
  }
  return result;
}

//clears the board (does not populate grid)
function clearBoard () {
  for (let i = 0; i < cols; i++) {
    board[i] = new Array();
    for (let j = 0; j < rows; j++) {
      board[i][j] = { val: 0};
    }
  }
  drawGrid();
};

//clears the board and generates a new board
function populateBoard () {
  clearBoard();
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
  }

  let startingNumbers = generateStartingNumbers();

  while (startingNumbers.length > 0) {
    let i = Math.floor(Math.random() * 4);
    let j = Math.floor(Math.random() * 4);
    if (board[i][j].val === 0) {
      board[i][j].val = startingNumbers.pop();
    } else {
      continue;
    }
  }
  drawGrid();
}

//draw grid
function drawGrid() {
  let grid = document.getElementById('grid');
  if (grid.getContext) {
    let ctx = grid.getContext('2d');

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
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
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
  for (let i = 0; i < 4; i++) {
    for (let j = 3; j >= 0 ; j--) {
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
  for (let j = 0; j <= 3 ; j++) {
    for (let i = 0; i <=3 ; i++) {
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
  for (let j = 0; j <= 3 ; j++) {
    for (let i = 3; i >=0; i--) {
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
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function countItems(arr, item){
    let count= 0, i;
    while((i= arr.indexOf(item, i))!= -1){
        ++count;
        ++i;
    }
    return count
}
