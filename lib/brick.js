const Goomba = require('./goomba');
const Mushroom = require('./mushroom');

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
