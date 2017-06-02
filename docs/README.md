## Mario Jump

### Background

Mario Jump is a web application inspired by **Doodle Jump** built using Javascript and HTML/CSS only.

Mario Jump will follow these rules:
1) Mario only can jump for upside, left side, right side.
2) When Mario land the bricks, will automatically jump again.
3) If Mario eat super Mushroom, Mario can jump farther.
4) If Mario hit a Goomba or fall down, Game will be over.

By the end of Week 10, this app will, at a minimum, satisfy the following **Functionality & MVP**. section with smooth, bug-free navigation, adequate seed data and sufficient CSS styling:

### Functionality & MVP  

With this Mario Jump, users will be able to:

- [ ] Start and replay the game.
- [ ] Jump and go left or right until users hit the goomba or fall down.
- [ ] Mute the sound (BGM and sound effect for game start, jump, upgrade, and game over).
- [ ] Check their score.

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, game instruction, development information and nav links to its Github, my LinkedIn, Facebook and email.

![wireframes](https://github.com/JaniceYR/Mario-Jump/blob/master/docs/wireframe/mario_jump_main_page.png)

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

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up. Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all five scripts outlined above. Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Canvas` element

**Day 2**: Create the `Mario` and `Bricks` at least they should be connected and rendered in `Board` object. Goals for the day:

- Complete the `mario.js` module (constructor, update functions)
- Create proper amount of `Bricks` on `Board`.
- `Mario` can jump over the `Bricks`.

**Day 3**: Create the `Goombas` and `Mushrooms` which have their own effect. Goals for the day:

- Add functions on `Goombas` and `Mushrooms`.
- `Mushrooms` can make `Mario` faster, and game should be over when `Mario` hit a `Goomba`.

**Day 4**: Style the frontend, making it polished and professional.  Goals for the day:

- Game start and over effect.
- Sound effect.
- Have a styled `Canvas`, nice looking controls and title.

### Bonus features

Some anticipated updates are:
- [ ] Display user's high score
- [ ] Display All users' top 10 high score
