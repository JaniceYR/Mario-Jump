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
