
$(document).keydown(function(e) {
    switch(e.which) {
        case 37: moveLeft(); break; // left
        case 38: moveUp(); break;  // up
        case 39: moveRight(); break; // right
        case 40: moveDown(); break; // down
        case 78: populateBoard(); break; // n - new game
        case 67: clearBoard(); break; // c - clear game
        default: return;
    }
    e.preventDefault();
})

$( "#up" ).click(function() {
  moveUp();
});
$( "#down" ).click(function() {
  moveDown();
});
$( "#left" ).click(function() {
  moveLeft();
});
$( "#right" ).click(function() {
  moveRight();
});

$( "#newgame" ).click(function() {
  populateBoard();
});
$( "#clearboard" ).click(function() {
  clearBoard();
});
