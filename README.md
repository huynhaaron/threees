## Threees

[Play now!](https://threees.herokuapp.com/)
## Game summary

[Threes](http://asherv.com/threes/) is designed by Asher Vollmer. The game is available to download on iOS [here](https://itunes.apple.com/us/app/threes/id779157948?mt=8).


Threes is a numbers game in a 4 by 4 grid. You can merge the grid up, down, left and right.  The tiles merge and sum up if :

1) The tiles are 1 & 2

2) The tiles are the same numbers

else, the tiles stay where they are.

Moving tiles in one direction will add one new tile to the bottom row or right column depending on which way the user moves the tiles. New tiles can be 1, 2, 3, or a wild card that is the highest value on the board divided by 2.

Screen shot:

<img src="http://res.cloudinary.com/booklog/image/upload/v1490977474/Screen_Shot_2017-03-31_at_9.23.58_AM_oyacm1.png" alt="screenshot">

## Features

1) On screen controls or keyboard controls

Users can click on the arrows to shift the grid or they can use their keyboard. jQuery event listeners fire off functions depending on the user input.

<img src="http://res.cloudinary.com/booklog/image/upload/v1490982872/Screen_Shot_2017-03-31_at_10.50.48_AM_gdd06l.png" alt="controls" width="200px">

2) Ability to see the next tile

3) Current score and High score

Canvas draws out the grid on after each move and updates the current Tile to change depending on the next one that will appear. Javascript handles the logic behind the tile

<img src="https://res.cloudinary.com/booklog/image/upload/v1490982787/Screen_Shot_2017-03-31_at_10.51.11_AM_ozgnjf.png" alt="next tile" width="300px">

4) Automatic check for Game Over

The games will automatically end if there is no move possible for the user. The screen changes opacity and the user can click the new game button or hit the n key to start a new game.

<img src="http://res.cloudinary.com/booklog/image/upload/v1490983405/Screen_Shot_2017-03-31_at_11.02.54_AM_wqxan2.png" alt="game over" width="300px">




## Future Direction for the Project
- [ ] Add some animations
- [ ] Add mobile swipe controls
- [ ] Night theme or Dark theme
