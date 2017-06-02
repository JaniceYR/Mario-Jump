class Utils {
  constructor() {
    this.loadBGMs = this.loadBGMs.bind(this);
    this.playBGM = this.playBGM.bind(this);

    this.muteHandler = this.muteHandler.bind(this);
    this.muteAndUnmuteByKeyboard = this.muteAndUnmuteByKeyboard.bind(this);
    this.muteAndUnmute = this.muteAndUnmute.bind(this);

    this.collisionWithSomething = this.collisionWithSomething.bind(this);
    this.collisionBricks = this.collisionBricks.bind(this);
    this.collisionGoombas = this.collisionGoombas.bind(this);
    this.collisionMushrooms = this.collisionMushrooms.bind(this);
    this.collision = this.collision.bind(this);

    this.showFrame = this.showFrame.bind(this);
    this.hideFrame = this.hideFrame.bind(this);
    // this. = this..bind(this);

    this.allSounds = [];
    this.loadBGMs();
    this.nowPlayingBGM = this.bgmOpening;

    this.muted = false;
  }

  loadBGMs() {
    this.bgmOpening = document.getElementById("bgm_opening");
    this.bgmGameStart = document.getElementById("bgm_gamestart");
    // this.bgmDies = document.getElementById("bgm_dies");
    this.bgmGameOver = document.getElementById("bgm_gameover");
    this.bgmOpening.loop = true;
    this.bgmGameStart.loop = true;
    // this.bgmGameOver.loop = true;

    this.soundEnter = document.getElementById("sound_enter");
    this.soundJump = document.getElementById("sound_jump");
    this.soundPowerUp = document.getElementById("sound_powerup");
    // this. = document.getElementById("");
    this.allSounds.push(this.bgmOpening);
    this.allSounds.push(this.bgmGameStart);
    // this.allSounds.push(this.bgmDies);
    this.allSounds.push(this.bgmGameOver);
    this.allSounds.push(this.soundEnter);
    this.allSounds.push(this.soundJump);
    this.allSounds.push(this.soundPowerUp);
  }

  playBGM(bgm) {
    this.nowPlayingBGM.pause();
    this.nowPlayingBGM.load();
    switch (bgm) {
      case "opening":
        this.nowPlayingBGM = this.bgmOpening;
        this.bgmOpening.play();
        break;
      case "gameStart":
        this.nowPlayingBGM = this.bgmGameStart;
        this.bgmGameStart.play();
        break;
      case "gameOver":
        this.nowPlayingBGM = this.bgmGameOver;
        this.bgmGameOver.play();
    }
  }

  playSound(sound) {
    switch (sound) {
      case "enter":
        this.soundEnter.play();
        break;
      case "jump":
        this.soundJump.play();
        break;
      case "powerUp":
        this.soundPowerUp.play();
    }
  }

  muteHandler() {
    document.getElementById("button-mute")
            .addEventListener("click", this.muteAndUnmute);
    document.getElementById("button-unmute")
            .addEventListener("click", this.muteAndUnmute);
    document.addEventListener("keypress", this.muteAndUnmuteByKeyboard);
    document.addEventListener("keypress", this.muteAndUnmuteByKeyboard);
  }

  muteAndUnmuteByKeyboard(e) {
    if (e.keyCode === 109) {
      this.muteAndUnmute();
    }
  }

  muteAndUnmute() {
    this.allSounds.forEach((sound) => {
      sound.muted = !(sound.muted);
    });
    this.muted = this.allSounds[0].muted;
    if (this.muted) {
      document.getElementById("button-mute").style.visibility = "hidden";
      document.getElementById("button-unmute").style.visibility = "visible";
    } else {
      document.getElementById("button-unmute").style.visibility = "hidden";
      document.getElementById("button-mute").style.visibility = "visible";
    }
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

  showFrame(frameName) {
    let frame = document.getElementById(frameName);
    frame.style.zIndex = 1;
  }

  hideFrame(frameName) {
    let frame = document.getElementById(frameName);
    frame.style.zIndex = -1;
  }
}
module.exports = Utils;
