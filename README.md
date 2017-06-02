# Mario Jump

[Mario Jump](http://mariojump.herokuapp.com/) is a web application inspired by **Doodle Jump** using Mario theme. It is built using Vanilla Javascript, Canvas and HTML/CSS only.

## Mario Jump Rules:
1) Mario only can jump for upside, left side, right side.
2) When Mario land over the bricks, will automatically jump again.
3) If Mario eat super Mushroom, Mario can jump farther and get extra +20 points.
4) If Mario hit a Goomba or fall down, Game will be over.


## Functionality & MVP  
With this Mario Jump, users will be able to:

- [ ] Start and replay the game.
- [ ] Jump and go left or right until users hit the goomba or fall down.
- [ ] Mute the sound (BGM and sound effect for game start, jump, upgrade, and game over).
- [ ] Check their score.

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README


### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be five scripts involved in this project:

`board.js`: this script will handle the main logic including game start and game over functions and creating objects.

`mario.js`: this script will handle creating `Mario` object.

`bricks.js`: this script will handle creating `bricks` objects. `Bricks` length will be various.
Using `Math.random()`, random amount of `Bricks` will be created.

`goomba.js`: this script will handle creating `Goomba` objects.

`mushroom.js`: this script will handle creating `Mushroom` objects.

`util.js`: this script will handle the actions including jump, turn, power_up.

## Project Design
Clone-Instagram was designed and built in 4 days.
This app consists of a single screen with game board, game instruction, developer information.
The original

### Wireframes


![wireframes](https://github.com/JaniceYR/Mario-Jump/blob/master/docs/wireframe/mario_jump_main_page.png)


## Additional Features
Some anticipated updates are:
* Display user's high score
* Display All users' top 10 high score
