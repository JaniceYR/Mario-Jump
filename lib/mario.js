const Game = require("./game");

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
    // Mario location on canvas
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
    this.vy = -8;
  }

  powerUp() {
    this.vy = -13;
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
    this.ctx.drawImage(this.image, this.x, this.y-30, 30, 30);
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
      this.vx -= 3.8;
    } else if(e.keyCode === 37) {
      this.vx += 3.8;
    }
  }

}
module.exports = Mario;
