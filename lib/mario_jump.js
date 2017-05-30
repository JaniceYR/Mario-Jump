const Game = require("./game");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("mario-jump-canvas");
  canvasEl.width = 325;
  canvasEl.height = 490;

  const ctx = canvasEl.getContext("2d");
  const game = new Game(ctx);
  document.addEventListener("keypress", game.start, false);
});
