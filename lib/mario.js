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
