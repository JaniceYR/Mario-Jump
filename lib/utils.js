class Utils {
  constructor() {
    this.collisionWithSomething = this.collisionWithSomething.bind(this);
    this.collisionArray = this.collisionArray.bind(this);
    this.collision = this.collision.bind(this);
    // this.textBlink = this.textBlink.bind(this);
    // this. = this..bind(this);
  }

  collisionWithSomething(mario, bricks, goombas, mushrooms) {
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
    if (mario.vy < 0) {
      return false;
    }
    if ( (mario.x + mario.width) >= object.x
        && mario.x <= (object.x + (object.width * object.length))
        && mario.y >= object.y
        && mario.y <= object.y + object.height) {
      return true;
    }
    return false;
  }

  // textBlink(dom) {
  //   this.ms = 0;
  //
  // }
}
module.exports = Utils;
