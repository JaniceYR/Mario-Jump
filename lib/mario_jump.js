// const Board = require("./board");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("mario-jump-canvas");
  canvasEl.width = 325;
  canvasEl.height = 490;

  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle ="white";
  ctx.fillRect(0,0,100,100);

});
