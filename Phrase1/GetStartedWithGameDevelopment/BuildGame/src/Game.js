import TileMap  from "./TileMap.js";

const tileSize = 40;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);

function gameLoop(){
    tileMap.draw(ctx);
    // console.log("game loop");
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000/75);