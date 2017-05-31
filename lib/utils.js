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
