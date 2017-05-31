const Mario = require('./mario');
const Goomba = require('./goomba');
const Brick = require('./brick');
const Mushroom = require('./mushroom');
// const  = require('./');

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.gameStart = false;
    this.gameOver = false;

    this.score = 0;
    this.bricks = [];

    this.loadNewGame = this.loadNewGame.bind(this);
    this.start = this.start.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.addDefaultBricks = this.addDefaultBricks.bind(this);
    this.addBrick = this.addBrick.bind(this);
    this.moveObjects = this.moveObjects.bind(this);
    this.canvasReset = this.canvasReset.bind(this);
    // this.gameOver = this.gameOver.bind(this);
    this.gameReset = this.gameReset.bind(this);

    // this. = this..bind(this);
  }

  loadNewGame(e) {
    document.addEventListener("keypress", this.start, false);
    this.mario = new Mario(this.ctx);
    this.newGame = setInterval(() => {
      this.canvasReset();
      this.mario.jumpingMario();
    }, 15);

  }
  start(e) {
    clearInterval(this.newGame);
    if (e.keyCode === 13) {
      //나중에 사운드 넣기(로딩 시간 0.5초로 셋팅)
      setTimeout(() => {
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
    }, 15);

    let brickInterval = setInterval(() => {
      this.addBrick();
    }, 500);

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
    let length = (Math.random() * 5) + 2;
    let brickx = (Math.random() * Game.DIM_X) - (20.0 * length);
    let bricky = 0;
    this.bricks.shift();
    this.bricks.push(new Brick(this.ctx, brickx, bricky, length));
  }

  moveObjects() {
    this.bricks.forEach((brick) => (
      brick.moveBrick()
    ));
    this.mario.moveMario();
    // this.goomba.moveGoomba();
    // this.mushroom.moveMushroom();
  }

  canvasReset() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.fillStyle = Game.BG_COLOR;
    this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  }

  gameOver() {
    //게임오버 화면 만들기
  }

  gameReset() {
    // 게임오버 후 게임 리셋
    this.gameStart = false;
    this.gameOver = false;

    this.score = 0;
    this.bricks = [];
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
Game.GOOMBA_PROBABILITY = 0.1;
Game.MUSHROOM_PROBABILITY = 0.1;
