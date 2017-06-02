# Mario Jump

[Mario Jump](http://mariojump.herokuapp.com/) is a web application inspired by **Doodle Jump** using Mario theme. It is built using Vanilla Javascript, Canvas and HTML/CSS only.

## Mario Jump Rules:
1) Mario only can jump for upside, left side, right side.
2) When Mario land over the bricks, will automatically jump again.
3) If Mario eat super Mushroom, Mario can jump farther and get extra +20 points.
4) If Mario hit a Goomba or fall down, Game will be over.


## Features & Implementation
- [ ] Users can start and replay the game.
- [ ] Mario will jump and go left or right until users hit the goomba or fall down.
- [ ] User can mute or unmute the sound
(BGM and sound effect for game start, jump, upgrade, and game over).
- [ ] User can check their score.

### Jump effect using Velocity and Gravity
To make object(mario) jump smooth, apply law of physics about velocity and gravity.
Before render object, add gravity to horizontal velocity(vy) so that object can go down after jump.
``` javascript
// mario.js
class Mario {
  constructor(ctx) {
    ...
    // Jump Speed(Velocity)
    this.vy = -8.0;
    this.vx = 0.0;
    // Gravity
    this.gravity = 0.3;
    // Mario initial location on canvas
    this.x = 80.0;
    this.y = 490.0;
    ...
  }
```

``` javascript
// mario.js
moveMario() {
  this.vy += this.gravity;  // Add Gravity for changing velocity(this.vy)
  this.x += this.vx;        // Change current location
  this.y += this.vy;
  ...
  // After changing location, draw Mario on canvas
  this.drawMario();
}
```

### Randomness and Probability
Using `Math.random()` for generating objects(bricks, goombas, mushrooms, clouds) and setting the size and the location, Mario jump can keep its unpredictability.

 ```javascript
// game.js
addGoombaMushroom(x, width, y) {
  let randomx = (Math.random() * (width)) + x;
  let probability = Math.random();
  if (probability < Game.GOOMBA_PROBABILITY) {
    this.goombas.push(new Goomba(this.ctx, randomx, y));
  } else if (probability < Game.GOOMBA_PROBABILITY + Game.MUSHROOM_PROBABILITY) {
    this.mushrooms.push(new Mushroom(this.ctx, randomx, y));
  }
}
```

### Garbage Collection
After object turn to be useless, for instance, go out of sight from canvas, delete it to keep the game light.

``` javascript
// game.js
addBrick() {
  let oldestBrick = this.bricks[0];
  // Check whether the object's location
  // if it's out of sight and it's not gonna be used, delete
  if (oldestBrick.y - oldestBrick.height > Game.DIM_Y) {
    ...
    delete this.bricks.shift(); // Delete oldest brick
    ...
  }
}
```

### Object-Oriented Programming
Implemented in OOP concept, code in Mario Jump can easily be reused and recycled.
```
.
│ index.html
│ lib
│ └─ mario_jump.js
│ └─ game.js
│ └─ mario.js
│ └─ goomba.js
│ └─ mushroom.js
│ └─ brick.js
│ └─ cloud.js
│ └─ utils.js
```

## Project Design
Mario Jump was designed and built in 4 days.
This app consists of a single screen with game board, game instruction, developer information.
The original
[proposal](https://github.com/JaniceYR/Mario-Jump/blob/master/docs/README.md) included:
* Functionality & MVP
* Architecture and Technologies
* Implementation Timeline
* [Wireframe](https://github.com/JaniceYR/Mario-Jump/blob/master/docs/wireframe/mario_jump_main_page.png)

## Technologies
### Frontend only
* Vanilla `Javascript`
* `CSS`
* `HTML5`/`Canvas`

## Additional Features
Some anticipated updates are:
* Make level; game should be getting harder
* Display user's high score
* Display All users' top 10 high score
