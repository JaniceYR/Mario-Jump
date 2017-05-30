const Mario = require('./mario');

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
    this.gameOver = this.gameOver.bind(this);
    this.gameReset = this.gameReset.bind(this);
    this.canvasReset = this.canvasReset.bind(this);

    // this. = this..bind(this);
  }

  loadNewGame(e) {
    document.addEventListener("keypress", this.start, false);
    this.newGame = setInterval(() => {
      //나중에 제자리에서 점프하는 마리오 추가하기
      console.log('mario jump!');
    }, 1000);

  }
  start(e) {
    clearInterval(this.newGame);
    let image =  document.getElementById("img-mario-jump-right");
    if (e.keyCode === 13) {
      //나중에 사운드 넣기(로딩 시간 0.5초로 셋팅)
      setTimeout(() => {
        console.log("wait");
        this.ctx.drawImage(image, 100, 100, 30, 30);
      }, 500);
    }
  }

  gameLoop() {
    let gameLoopInterval = setInterval(() => {
      this.canvasReset();
    }, 30);

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
Game.BG_COLOR = "rbg(93,148,251)"; // Mario blue
Game.DIM_Y = 490;
Game.BRICKS_COUNT = 10;
