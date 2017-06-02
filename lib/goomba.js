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
