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
    this.vy = 2.0;
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
    this.vy = 2.0;
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
const Utils = __webpack_require__(6);
// const  = require('./');

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.utils = new Utils();
    this.gameStart = false;

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
      // collision();
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
      this.marioHitSomething();
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
    let brickWidth = 20 * length;
    this.bricks.shift(); // Delete oldest brick
    this.bricks.push(new Brick(this.ctx, brickx, bricky, length));
    this.addGoombaMushroom(brickx, brickWidth, bricky-20);
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
    console.log(hit);
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
    this.vy = 2.0;
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
    this.gravity = 0.2;
    // Mario initial location on canvas
    this.x = 80.0;
    this.y = 490.0;
    // Mario Image
    this.image =  document.getElementById("img-mario-jump-right");

    this.jump = this.jump.bind(this);
    this.powerUp = this.powerUp.bind(this);
    this.moveMario = this.moveMario.bind(this);
    this.jumpingMario = this.jumpingMario.bind(this);
    this.drawMario = this.drawMario.bind(this);
    this.goDirection = this.goDirection.bind(this);
    this.stopDirection = this.stopDirection.bind(this);

    // this. = this..bind(this);
  }

  jump() {
    this.vy = -8.0;
  }

  powerUp() {
    this.vy = -12.0;
  }

  jumpingMario() {
    this.x = 80.0;
    this.vx = 0.0;

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
    // 여긴 나중에 벽돌 생기면 지울 것
    else if (this.y > 490.0) {
      this.y = 490.0;
      this.jump();
    }
    // 여기까지
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
    this.marioHitSomething = this.marioHitSomething.bind(this);
    this.collisionArray = this.collisionArray.bind(this);
    this.collision = this.collision.bind(this);
    // this. = this..bind(this);
  }

  marioHitSomething(mario, bricks, goombas, mushrooms) {
    if (this.collisionArray(mario, bricks)) {
      return "bricks";
    } else if (this.collisionArray(mario, goombas)) {
      return "goomba";
    } else if (this.collisionArray(mario, mushrooms)) {
      return "mushroom";
    } else {
      return "none";
    }
  }

  collisionArray(mario, objects) {
    return objects.some((object) => {
      return (this.collision(mario, object));
    });
  }

  collision(mario, object) {
    // console.log(mario.vy);
    if (mario.vy < 0) {
      return false;
    }
    if ( (mario.x + mario.width) >= object.x
        && mario.x <= (object.x + (object.width * object.length))
        && mario.y + mario.height -10 >= object.y
        && mario.y + mario.height <= object.y + object.height) {
      return true;
    }
    return false;
  }
}
module.exports = Utils;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map