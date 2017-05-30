const Mario = require('./mario');

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.start = this.start.bind(this);
  }

  start(e) {
    if (e.keyCode === 13) {
      let image =  document.getElementById("img-mario-jump-right");
      this.ctx.drawImage(image, 100, 100, 30, 30);
    }
  }
}
module.exports = Game;
