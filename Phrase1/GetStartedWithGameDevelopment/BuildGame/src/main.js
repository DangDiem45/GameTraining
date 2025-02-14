import { Board } from "./model/board.js";
import { LevelManager } from "./level/level_manager.js";
import { Level } from "./level/level.js";
import { Pacman } from "./model/pacman.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const board = new Board(ctx, new Level());
const levelManager = new LevelManager(board);
let pacman;
let pacmanImages = [];

async function loadPacmanImages() {
  const imagePaths = [
      "asset/images/pac0.png",
      "asset/images/pac1.png",
      "asset/images/pac2.png",
      "asset/images/pac1.png"
  ];

  const promises = imagePaths.map((path) => {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = path;
          img.onload = () => resolve(img);
          img.onerror = () => reject(`Failed to load ${path}`);
      });
  });

  try {
      pacmanImages = await Promise.all(promises);
      console.log("All Pacman images loaded.");
  } catch (error) {
      console.error(error);
  }
}

async function startGame() {
    await loadPacmanImages();
    await levelManager.loadLevel("level_1.json");

    if (levelManager.currentLevel) {
        canvas.width = levelManager.currentLevel.boardMatrix[0].length * board.tileSize;
        canvas.height = levelManager.currentLevel.boardMatrix.length * board.tileSize;

        pacman = new Pacman(ctx, levelManager.currentLevel.startingPos.x, levelManager.currentLevel.startingPos.y, pacmanImages);

        gameLoop();
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pacman.draw(ctx);
    board.drawWalls();
    board.drawDot();
  

    requestAnimationFrame(gameLoop);
}

startGame();
