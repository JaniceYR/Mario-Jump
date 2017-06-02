const Mario = require('./mario');
const Goomba = require('./goomba');
const Brick = require('./brick');
const Mushroom = require('./mushroom');
const Cloud = require('./cloud');
const Utils = require('./utils');
// const  = require('./');

class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.utils = new Utils();
    this.mario = new Mario(this.ctx);

    this.gameReset = this.gameReset.bind(this);
    this.loadNewGame = this.loadNewGame.bind(this);
    this.start = this.start.bind(this);
    this.gameLoop = this.gameLoop.bind(this);

    this.addDefaultBricks = this.addDefaultBricks.bind(this);
    this.addBrick = this.addBrick.bind(this);
    this.addGoombaMushroom = this.addGoombaMushroom.bind(this);
    this.addScore = this.addScore.bind(this);
    this.moveObjects = this.moveObjects.bind(this);

    this.marioHitSomething = this.marioHitSomething.bind(this);
    this.marioFallDown = this.marioFallDown.bind(this);
    this.canvasReset = this.canvasReset.bind(this);
    this.gameOver = this.gameOver.bind(this);
    // this. = this..bind(this);

    this.utils.muteHandler();
    this.gameReset();

  }

  gameReset() {
    this.gameWasStarted = false;
    this.gameIsOver = false;
    this.score = 0;
    this.ateMushroom = 0;
    this.bricks = [];
    this.goombas = [];
    this.mushrooms = [];
    this.clouds = [];
    document.getElementById("game-over-page").style.color = "black";
    this.mario.reset();
  }

  loadNewGame() {
    document.addEventListener("keypress", this.start, false);
    this.utils.playBGM("opening");
    this.mario.y = Game.DIM_Y;
    this.mario.vy = -8.0;
    this.newGame = setInterval(() => {
      this.canvasReset();
      this.mario.jumpingMario();
    }, 15);
  }

  start(e) {
    if (e.keyCode === 13 && (!this.gameWasStarted || this.gameIsOver)) {
      document.getElementById("press-enter-key").style.color = "black";
      clearInterval(this.newGame);
      //나중에 사운드 넣기(로딩 시간 0.5초로 셋팅)
      this.utils.playBGM("gameStart");
      this.gameReset();
      this.gameWasStarted = true;
      setTimeout(() => {
        this.utils.showFrame("game-score-page");
        this.utils.hideFrame("game-over-page");
        this.utils.hideFrame("game-default-page");
        this.addDefaultBricks();
        this.gameLoop();
      }, 500);
    }
  }

  gameLoop() {
    document.addEventListener("keydown", this.mario.goDirection, false);
    document.addEventListener("keyup", this.mario.stopDirection, false);

    this.gameLoopInterval = setInterval(() => {
      if (!this.gameIsOver) {
        this.canvasReset();
        this.addScore();
        this.moveObjects();
        this.marioHitSomething();
        this.marioFallDown();
        this.addBrick();
      }
    }, 15);

  }

  addDefaultBricks() {
    for (let i = 0; i < Game.BRICKS_COUNT; i++) {
      let length = Math.floor(Math.random() * 5) + 1;
      let brickx = (Math.random() * Game.DIM_X) - (20.0 * length);
      let bricky = Game.DIM_Y - ((Game.DIM_Y / Game.BRICKS_COUNT) * i) - 20;
      this.bricks.push(new Brick(this.ctx, brickx, bricky, length));
    }
  }

  addBrick() {
    let oldestBrick = this.bricks[0];
    if (oldestBrick.y - oldestBrick.height > Game.DIM_Y) {
      let length = (Math.random() * 5) + 1;
      let brickx = (Math.random() * Game.DIM_X) - (20.0 * length);
      let bricky = 0;
      let brickWidth = 20 * length;
      delete this.bricks.shift(); // Delete oldest brick
      this.bricks.push(new Brick(this.ctx, brickx, bricky, length));
      this.addGoombaMushroom(brickx, brickWidth, bricky-20);
      this.addCloud();
    }
  }

  addGoombaMushroom(x, width, y) {
    let randomx = (Math.random() * (width)) + x;
    let probability = Math.random();
    if (probability < Game.GOOMBA_PROBABILITY) {
      this.goombas.push(new Goomba(this.ctx, randomx, y));
    } else if (probability < Game.GOOMBA_PROBABILITY + Game.MUSHROOM_PROBABILITY) {
      this.mushrooms.push(new Mushroom(this.ctx, randomx, y));
    }
  }

  addCloud() {
    let probability = Math.random();
    if (probability < Game.CLOUD_PROBABILITY) {
      this.clouds.push(new Cloud(this.ctx));
    }
  }

  addScore() {
    this.score += 0.1;
    document.getElementById("score").textContent= `${Math.floor(this.score)}`;
    document.getElementById("ate-mushroom").textContent= `${Math.floor(this.ateMushroom)}`;
  }

  moveObjects() {
    this.clouds.forEach((cloud) => (
      cloud.moveCloud()
    ));
    this.bricks.forEach((brick) => (
      brick.moveBrick()
    ));
    this.goombas.forEach((goomba) => (
      goomba.moveGoomba()
    ));
    this.mushrooms.forEach((mushroom) => (
      mushroom.moveMushroom()
    ));
    this.mario.moveMario();
  }

  marioHitSomething() {
    let hit = this.utils.collisionWithSomething(this.mario, this.bricks,
                                      this.goombas, this.mushrooms);
    switch (hit) {
      case "bricks":
        this.utils.playSound("jump");
        this.mario.jump();
        break;
      case "goomba":
        this.gameOver();
        break;
      case "mushroom":
        this.utils.playSound("powerUp");
        this.score += 20;
        this.ateMushroom += 1;
    }
  }

  marioFallDown() {
    if ((this.mario.y) > Game.DIM_Y) {
      this.gameOver();
    }
  }

  canvasReset() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.fillStyle = Game.BG_COLOR;
    this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  }

  gameOver() {
    this.gameIsOver = true;
    clearInterval(this.gameLoopInterval);
    this.utils.playBGM("gameOver");
    document.getElementById("game-over-page").style.color = "white";
    this.utils.showFrame("game-over-page");
  }



}
module.exports = Game;

Game.DIM_X = 325;
Game.DIM_Y = 490;
Game.BG_COLOR = "rgb(93,148,251)"; // Mario blue
Game.BRICKS_COUNT = 12;
Game.GOOMBA_PROBABILITY = 0.08;
Game.MUSHROOM_PROBABILITY = 0.1;
Game.CLOUD_PROBABILITY = 0.3;
