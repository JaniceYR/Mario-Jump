/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Goomba {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    // Size of Goomba
    this.width = 20.0;
    this.height = 20.0;
    this.length = 1.0;
    // Going Down Speed
    this.vy = 3.0;
    // Gravity
    // this.gravity = 0.2;
    // Goomba location on canvas(depending on bricks location)
    this.x = x;
    this.y = y;
    // Goomba Image
    this.image =  document.getElementById("img-goomba");

    // this. = this..bind(this);
    this.moveGoomba = this.moveGoomba.bind(this);
    this.drawGoomba = this.drawGoomba.bind(this);

  }

  moveGoomba() {
    this.y += this.vy;
    this.drawGoomba();
  }

  drawGoomba() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

}
module.exports = Goomba;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Mushroom {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    // Size of Mushroom
    this.width = 20.0;
    this.height = 20.0;
    this.length = 1.0;
    // Going Down Speed
    this.vy = 3.0;
    // Gravity
    // this.gravity = 0.2;
    // Mushroom location on canvas(depending on bricks location)
    this.x = x;
    this.y = y;
    // Mushroom Image
    this.image =  document.getElementById("img-mushroom");

    // this. = this..bind(this);
    this.moveMushroom = this.moveMushroom.bind(this);
    this.drawMushroom = this.drawMushroom.bind(this);

  }

  moveMushroom() {
    this.y += this.vy;
    this.drawMushroom();
  }

  drawMushroom() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

}
module.exports = Mushroom;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Mario = __webpack_require__(4);
const Goomba = __webpack_require__(0);
const Brick = __webpack_require__(3);
const Mushroom = __webpack_require__(1);
const Cloud = __webpack_require__(7);
const Utils = __webpack_require__(6);
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Goomba = __webpack_require__(0);
const Mushroom = __webpack_require__(1);

class Brick {
  constructor(ctx, x, y, length) {
    this.ctx = ctx;
    // Size of Brick
    this.width = 20.0;
    this.height = 20.0;
    this.length = length;
    // Going Down Speed
    this.vy = 3.0;
    // Brick location on canvas
    this.x = x;
    this.y = y;
    // Brick Image
    this.image =  document.getElementById("img-brick");

    // this. = this..bind(this);
    this.moveBrick = this.moveBrick.bind(this);
    this.drawBricks = this.drawBricks.bind(this);

  }

  moveBrick() {
    this.y += this.vy;
    this.drawBricks();
  }

  drawBricks() {
    for (var i = 0; i < this.length; i++) {
      this.ctx.drawImage(this.image, this.x + (this.width * i), this.y,
                                    this.width, this.height);
    }
  }

}
module.exports = Brick;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Mario {
  constructor(ctx) {
    this.ctx = ctx;
    // Size of Mario
    this.width = 30.0;
    this.height = 30.0;
    // Jump Speed(Velocity)
    this.vy = -8.0;
    this.vx = 0.0;
    // Gravity
    this.gravity = 0.3;
    // Mario initial location on canvas
    this.x = 80.0;
    this.y = 490.0;
    // Mario Image
    this.image =  document.getElementById("img-mario-jump-right");

    this.reset = this.reset.bind(this);
    this.jump = this.jump.bind(this);
    this.powerUp = this.powerUp.bind(this);
    this.jumpingMario = this.jumpingMario.bind(this);
    this.moveMario = this.moveMario.bind(this);
    this.drawMario = this.drawMario.bind(this);
    this.goDirection = this.goDirection.bind(this);
    this.stopDirection = this.stopDirection.bind(this);

    // this. = this..bind(this);
  }

  reset() {
    this.vy = -12.0;
    this.vx = 0.0;
    this.x = 80.0;
  }

  jump() {
    this.vy = -8.0;
  }

  powerUp() {
    this.vy = -10.0;
  }

  jumpingMario() {
    this.moveMario();
    if (this.y > 490.0) {
      this.y = 490.0;
      this.jump();
    }
  }

  moveMario() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.y <= 0 ) {
      this.y = 0;
      this.vy = 0;
    }
    if (this.x <= 0 ) {
      this.x = 0;
    } else if (this.x + this.width >= 325) {
      this.x = 325 - this.width;
    }
    this.drawMario();
  }

  drawMario() {
    this.ctx.drawImage(this.image, this.x, this.y-30, this.width, this.height);
  }

  goDirection(e) {
    if (e.keyCode === 39) {
      this.image = document.getElementById("img-mario-jump-right");
      this.vx = 4.0;
    } else if(e.keyCode === 37) {
      this.image = document.getElementById("img-mario-jump-left");
      this.vx = -4.0;
    }
  }

  stopDirection(e) {
    if (e.keyCode === 39) {
      this.vx -= 3.9;
    } else if(e.keyCode === 37) {
      this.vx += 3.9;
    }
  }

}
module.exports = Mario;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("mario-jump-canvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game(ctx);
  game.loadNewGame();
});


/***/ }),
/* 6 */
/***/ (function(module, exports) {

class Utils {
  constructor() {
    this.loadBGMs = this.loadBGMs.bind(this);
    this.playBGM = this.playBGM.bind(this);

    this.muteHandler = this.muteHandler.bind(this);
    this.muteAndUnmuteByKeyboard = this.muteAndUnmuteByKeyboard.bind(this);
    this.muteAndUnmute = this.muteAndUnmute.bind(this);

    this.collisionWithSomething = this.collisionWithSomething.bind(this);
    this.collisionBricks = this.collisionBricks.bind(this);
    this.collisionGoombas = this.collisionGoombas.bind(this);
    this.collisionMushrooms = this.collisionMushrooms.bind(this);
    this.collision = this.collision.bind(this);

    this.showFrame = this.showFrame.bind(this);
    this.hideFrame = this.hideFrame.bind(this);
    // this. = this..bind(this);

    this.allSounds = [];
    this.loadBGMs();
    this.nowPlayingBGM = this.bgmOpening;

    this.muted = false;
  }

  loadBGMs() {
    this.bgmOpening = document.getElementById("bgm_opening");
    this.bgmGameStart = document.getElementById("bgm_gamestart");
    // this.bgmDies = document.getElementById("bgm_dies");
    this.bgmGameOver = document.getElementById("bgm_gameover");
    this.bgmOpening.loop = true;
    this.bgmGameStart.loop = true;
    // this.bgmGameOver.loop = true;

    this.soundEnter = document.getElementById("sound_enter");
    this.soundJump = document.getElementById("sound_jump");
    this.soundPowerUp = document.getElementById("sound_powerup");
    // this. = document.getElementById("");
    this.allSounds.push(this.bgmOpening);
    this.allSounds.push(this.bgmGameStart);
    // this.allSounds.push(this.bgmDies);
    this.allSounds.push(this.bgmGameOver);
    this.allSounds.push(this.soundEnter);
    this.allSounds.push(this.soundJump);
    this.allSounds.push(this.soundPowerUp);
  }

  playBGM(bgm) {
    this.nowPlayingBGM.pause();
    this.nowPlayingBGM.load();
    switch (bgm) {
      case "opening":
        this.nowPlayingBGM = this.bgmOpening;
        this.bgmOpening.play();
        break;
      case "gameStart":
        this.nowPlayingBGM = this.bgmGameStart;
        this.bgmGameStart.play();
        break;
      case "gameOver":
        this.nowPlayingBGM = this.bgmGameOver;
        this.bgmGameOver.play();
    }
  }

  playSound(sound) {
    switch (sound) {
      case "enter":
        this.soundEnter.play();
        break;
      case "jump":
        this.soundJump.play();
        break;
      case "powerUp":
        this.soundPowerUp.play();
    }
  }

  muteHandler() {
    document.getElementById("button-mute")
            .addEventListener("click", this.muteAndUnmute);
    document.getElementById("button-unmute")
            .addEventListener("click", this.muteAndUnmute);
    document.addEventListener("keypress", this.muteAndUnmuteByKeyboard);
    document.addEventListener("keypress", this.muteAndUnmuteByKeyboard);
  }

  muteAndUnmuteByKeyboard(e) {
    if (e.keyCode === 109) {
      this.muteAndUnmute();
    }
  }

  muteAndUnmute() {
    this.allSounds.forEach((sound) => {
      sound.muted = !(sound.muted);
    });
    this.muted = this.allSounds[0].muted;
    if (this.muted) {
      document.getElementById("button-mute").style.visibility = "hidden";
      document.getElementById("button-unmute").style.visibility = "visible";
    } else {
      document.getElementById("button-unmute").style.visibility = "hidden";
      document.getElementById("button-mute").style.visibility = "visible";
    }
  }

  collisionWithSomething(mario, bricks, goombas, mushrooms) {
    if (this.collisionBricks(mario, bricks)) {
      return "bricks";
    } else if (this.collisionGoombas(mario, goombas)) {
      return "goomba";
    } else if (this.collisionMushrooms(mario, mushrooms)) {
      return  "mushroom";
    } else {
      return "none";
    }
  }

  collisionBricks(mario, bricks) {
    return bricks.some((brick) => {
      if (mario.vy < 0) {
        return false;
      } else {
        return (this.collision(mario, brick));
      }
    });
  }

  collisionGoombas(mario, goombas) {
    return goombas.some((goomba) => {
      return (this.collision(mario, goomba));
    });
  }

  collisionMushrooms(mario, mushrooms) {
    return mushrooms.some((mushroom, idx) => {
      if (this.collision(mario, mushroom)) {
        mario.powerUp();
        delete mushrooms[idx];
        return true;
      }
    });
  }

  collision(mario, object) {
    if ( (mario.x + mario.width) >= object.x
        && mario.x <= (object.x + (object.width * object.length))
        && mario.y >= object.y
        && mario.y <= object.y + object.height) {
      return true;
    }
    return false;
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
module.exports = Utils;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

class Cloud {
  constructor(ctx) {
    this.ctx = ctx;
    // Size of Cloud
    this.width = [30.0, 55.0, 75.0];
    this.height = 30.0;
    this.length = 1.0;
    // Going Down Speed
    this.vy = 1.0;
    // Gravity
    // this.gravity = 0.2;
    // Cloud location on canvas(depending on bricks location)
    this.x = Math.random() * 325;
    this.y = -30;

    // this. = this..bind(this);
    this.moveCloud = this.moveCloud.bind(this);
    this.drawCloud = this.drawCloud.bind(this);
    this.choseRandomCloud = this.choseRandomCloud.bind(this);

    // Cloud Image
    this.choseRandomCloud();
  }
  choseRandomCloud() {
    this.length = Math.floor(Math.random() * 3) + 1;
    this.image =  document.getElementById(`img-cloud-${this.length}`);
  }

  moveCloud() {
    this.y += this.vy;
    this.drawCloud();
  }

  drawCloud() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width[this.length], this.height);
    // this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

}
module.exports = Cloud;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map