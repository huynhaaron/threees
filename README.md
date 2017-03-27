## Threees

### Background

[Threes](http://asherv.com/threes/) is designed by Asher Vollmer.


Threes is a numbers game in a 4 by 4 grid. You can swipe the grid up, down, left and right.  The cells merge and sum up if :

1) The tiles are 1 & 2

2) The tiles are the same numbers

else, the tiles stay where they are.

Moving tiles in one direction will add one new tile to the bottom row or right column depending on which way the user moves the tiles. New tiles can be 1, 2, or 3 (no other possible numbers will spawn).



### Functionality & MVP  

Users will be able to:

- [ ] Swipe and move tiles
- [ ] Know what tile will appear next
- [ ] See the total score the user obtained
- [ ] Restart the game when the game is over

In addition, this project will include:

- [ ] Rules on how to play the game
- [ ] A production Readme

### Wireframes

This app will consist of a single screen with game board, and nav links to the Github, my LinkedIn,
and the Gameplay/Rules image.  Game controls will include Up, Down, Left, Right, and Space (space to restart the game or new game). The main part is the grid, to the left or top will be a next tile and the score. Rules will be underneath the grid.
LinkedIn, Github, About, will be used as a footer.

![wireframes](https://res.cloudinary.com/booklog/image/upload/v1490590354/Threees_iwdukk.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `Easel.js`(?) with `HTML5 Canvas` for DOM manipulation and rendering,


`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.


`tile.js`: this lightweight script will house the constructor and update functions for the `Tile` objects.  Each `Tile` will contain a `value` (hexagon, triangle, or square).

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Learn the basics of `Easel.js`.  Goals for the day:

- Learn enough `Easel.js` to render an object to the `Canvas` element, mainly the grid and rules.
- Add some styling to the grid

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `Tile` object to connect to the `Board` object.  Then, use `board.js` to create and render at least the square grid.  Goals for the day:

- Complete the `tile.js` module (constructor, update functions)
- Render a square grid to the `Canvas` using `Easel.js`
- Add some styling to the tiles


**Day 3**: Dedicate this day to move the tiles and create the losing conditions.

- Complete the movement of the grids and have it mapped to the keys.
- Add more styling to the page.


**Day 4**: Dedicate this day to last minute styling and uploading to a live website.

- Bug checks and final checks to make sure everything runs.
- Clean up README and refactor code.

### Bonus features

- [ ] High scores for current session
- [ ] Night theme or Dark theme
