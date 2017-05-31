const Mario = require('./mario');
const Goomba = require('./goomba');
const Brick = require('./brick');
const Mushroom = require('./mushroom');
const Utils = require('./utils');
// const  = require('./');

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.utils = new Utils();
    this.started = false;

    this.score = 0;
    this.bricks = [];
    this.goombas = [];
    this.mushrooms = [];

    this.loadNewGame = this.loadNewGame.bind(this);
    this.start = this.start.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.addDefaultBricks = this.addDefaultBricks.bind(this);
    this.addBrick = this.addBrick.bind(this);
    this.addGoombaMushroom = this.addGoombaMushroom.bind(this);
    this.moveObjects = this.moveObjects.bind(this);
    this.marioHitSomething = this.marioHitSomething.bind(this);
    this.canvasReset = this.canvasReset.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.gameReset = this.gameReset.bind(this);
    // this. = this..bind(this);
  }

  loadNewGame() {
    document.addEventListener("keypress", this.start, false);
    this.mario = new Mario(this.ctx);
    this.newGame = setInterval(() => {
      this.canvasReset();
      this.mario.jumpingMario();
      // this.utils.textBlink(document.getElementById("press-enter-key"));
    }, 15);


  }

  start(e) {
    clearInterval(this.newGame);
    document.getElementById("press-enter-key").style.color = "black";
    if (e.keyCode === 13 && !this.started) {
      //나중에 사운드 넣기(로딩 시간 0.5초로 셋팅)
      this.started = true;
      setTimeout(() => {
        document.getElementById("game-default-page").style.zIndex = "-1";
        console.log("wait");
        this.addDefaultBricks();
        this.gameLoop();
      }, 500);
    }
  }

  gameLoop() {
    document.addEventListener("keydown", this.mario.goDirection, false);
    document.addEventListener("keyup", this.mario.stopDirection, false);

    let gameLoopInterval = setInterval(() => {

      this.canvasReset();
      this.moveObjects();
      this.marioHitSomething();
      this.addBrick();
    }, 15);

  }

  addDefaultBricks() {
    for (let i = 0; i < Game.BRICKS_COUNT; i++) {
      let length = (Math.random() * 5) + 2;
      let brickx = (Math.random() * Game.DIM_X) - (20.0 * length);
      let bricky = Game.DIM_Y - ((Game.DIM_Y / Game.BRICKS_COUNT) * i) - 20;
      this.bricks.push(new Brick(this.ctx, brickx, bricky, length));
    }
  }

  addBrick() {
    let oldestBrick = this.bricks[0];
    if (oldestBrick.y - oldestBrick.height > 490) {
      let length = (Math.random() * 5) + 2;
      let brickx = (Math.random() * Game.DIM_X) - (20.0 * length);
      let bricky = 0;
      let brickWidth = 20 * length;
      this.bricks.shift(); // Delete oldest brick
      this.bricks.push(new Brick(this.ctx, brickx, bricky, length));
      this.addGoombaMushroom(brickx, brickWidth, bricky-20);
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

  moveObjects() {
    this.bricks.forEach((brick) => (
      brick.moveBrick()
    ));
    this.mario.moveMario();
    this.goombas.forEach((goomba) => (
      goomba.moveGoomba()
    ));
    this.mushrooms.forEach((mushroom) => (
      mushroom.moveMushroom()
    ));
  }

  marioHitSomething() {
    let hit = this.utils.marioHitSomething(this.mario, this.bricks,
                                      this.goombas, this.mushrooms);
    switch (hit) {
      case "bricks":
        this.mario.jump();
        break;
      case "goomba":
        this.gameOver();
        break;
      case "mushroom":
        this.mario.powerUp();
    }
  }

  canvasReset() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.fillStyle = Game.BG_COLOR;
    this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  }

  gameOver() {
    //게임오버 화면 만들기
    console.log("Game Over");
  }

  gameReset() {
    // 게임오버 후 게임 리셋
    // this.gameStart = false;
    // this.gameOver = false;
    //
    // this.score = 0;
    // this.bricks = [];
    // this.goombas = [];
    // this.mushrooms = [];
  }

  showFrame(frameName) {
    let frame = document.getElementById(frameName);
	  frame.style.zIndex = 1;
  }

  hideFrame(frameName) {
    let frame = document.getElementById(frameName);
	  frame.style.zIndex = -1;
  }

}
module.exports = Game;

Game.DIM_X = 325;
Game.DIM_Y = 490;
Game.BG_COLOR = "rgb(93,148,251)"; // Mario blue
Game.BRICKS_COUNT = 10;
Game.GOOMBA_PROBABILITY = 0.15;
Game.MUSHROOM_PROBABILITY = 0.1;
