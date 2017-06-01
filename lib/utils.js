class Utils {
  constructor() {
    this.loadBGMs = this.loadBGMs.bind(this);
    this.collisionWithSomething = this.collisionWithSomething.bind(this);
    this.collisionBricks = this.collisionBricks.bind(this);
    this.collisionGoombas = this.collisionGoombas.bind(this);
    this.collisionMushrooms = this.collisionMushrooms.bind(this);
    this.collision = this.collision.bind(this);
    // this. = this..bind(this);
    this.loadBGMs();
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

}
module.exports = Utils;
