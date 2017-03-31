//variables
let cols = 4;
let rows = 4;
// let startXOffset = 10;
// let startYOffset = 10;
let tileWidth = 100;
let tileHeight = 100;

let board = new Array();
let moved = false;
let setOfTiles = shuffleArray([1,1,1,2,2,2,3,3,3]);
let highScore = 0;

//generates a new tile (to reduce string of the same number)
function grabNewTile() {
  let tiles = setOfTiles;
  if (setOfTiles.length <= 1) {
    setOfTiles = shuffleArray([1,1,1,2,2,2,3,3,3]) ;
    tiles = shuffleArray(setOfTiles);
    return tiles.shift();
  } else {
    return tiles.shift();
  }
}

//check if there are valid moves(false if over, true if possible to mv)
function possibleToMove() {
  let result = false;
  //check bottom numbers
  for (let i = 0; i <= 2; i++) {
    if (board[i][3].val === 0) {
      return true;
      break;
    } else if ((board[i][3].val === 1) && (board[i+1][3].val === 2) ) {
      return true;
      break;
    } else if ((board[i][3].val) === 2 && (board[i+1][3].val === 1) ) {
      return true;
      break;
    } else if (board[i][3].val >= 3) {
      if ((board[i][3].val) === (board[i+1][3].val)) {
        return true;
        break;
      }
    }
  }
  //check right numbers
  for (let j = 0; j <= 2; j++) {
    if (board[3][j].val === 0) {
      return true;
      break;
    } else if ((board[3][j].val === 1) && (board[3][j+1].val === 2) ) {
      return true;
      break;
    } else if ((board[3][j].val) === 2 && (board[3][j+1].val === 1) ) {
      return true;
      break;
    } else if (board[3][j].val >= 3) {
      if ((board[3][j].val) === (board[3][j+1].val)) {
        return true;
        break;
      }
    }
  }

  for (let j = 0; j <= 2; j++) {
    if (board[3][j].val === (board[3][j].val * 2)) {
      return true;
      break;
    }
  }

  //regular loop
  for (let j = 0; j <= 2; j++) {
    for (let i = 0; i <= 2; i++) {
      //continue if cell is empty, you can move!!!
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

//score
function score() {
  let score = 0;
  for (let j = 0; j <= 3; j++) {
    for (let i = 0; i <= 3; i++) {
      score += board[i][j].val;
    }
  }
  return score;
}

//high score
function isHighScore() {
  if (score() >= highScore) {
    highScore = score();
  }
}
//Gameover overlay
function gameOver() {
  let grid = document.getElementById('grid');
  let ctx = grid.getContext('2d');
  ctx.fillStyle = "rgba(255, 255, 255, 0.70)";
  ctx.fillRect(0, 0, 400, 400);
  //gameover
  ctx.font = "31px Kavoon";
  ctx.fillStyle = "black";
  ctx.fillText("Game Over!", 125, 215);
  isHighScore();
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
    ctx.fillStyle = "#ffffff";
    ctx.fillRect (0,0, grid.width , grid.height);

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
        ctx.font = "31px Kavoon";
        ctx.fillStyle = "black";
        if (board[i][j].val === 0) {
          ctx.fillText(" " , (i * 100) + 40, (j * 100 ) + 55);
        } else {
          ctx.fillText(board[i][j].val , (i * 100) + 40, (j * 100 ) + 55);
        }
      }
    }

    ctx.update;

    //draw next tile
    ctx.font = "18px";
    ctx.fillStyle = "#AAAAAA";
    ctx.fillText("Next Tile:", 30, 440 );
    //logic for next tile
    if (setOfTiles[0] === 1) {
      ctx.fillStyle = '#66CCFF';
    } else if (setOfTiles[0] === 2) {
      ctx.fillStyle = '#FF6680';
    } else {
    ctx.fillStyle = '#FFFFFF';
    }
    ctx.strokeRect(180, 410, 40, 40);
    ctx.fillRect(180, 410, 40, 40);
    ctx.fillStyle = "black";
    ctx.fillText(setOfTiles[0], 193, 440);
    //draw score
    ctx.font = "18px";
    ctx.fillStyle = "#AAAAAA";
    ctx.fillText("Score: ", 230 , 440);
    ctx.fillText(score(), 330 , 440 );
    //draw high score
    ctx.font = "18px";
    ctx.fillStyle = "#AAAAAA";
    ctx.fillText("High Score: ", 10 , 480 );
    ctx.fillText(highScore, 200 , 480 );
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
    let value = grabNewTile();
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
    let value = grabNewTile();
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
    let value = grabNewTile();
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
    let value = grabNewTile();
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
  if (!possibleToMove()) {
    gameOver();
  }
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
  if (!possibleToMove()) {
    gameOver();
  }
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

  if (!possibleToMove()) {
    gameOver();
  }
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

  if (!possibleToMove()) {
    gameOver();
  }
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
