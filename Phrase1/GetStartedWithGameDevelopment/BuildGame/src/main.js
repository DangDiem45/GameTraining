import { Board } from "./model/board.js";
import { LevelManager } from "./level/level_manager.js";
import { Level } from "./level/level.js";
import { Pacman } from "./model/pacman.js";
import { CollisionHandle } from "./handle/collisionHandle.js";
import { Ghost } from "./model/ghosts.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let board = new Board(ctx, new Level());
const levelManager = new LevelManager(board);
let pacman;
let pacmanImages = [];
let collisionHandle;
let ghosts = [];

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

        collisionHandle = new CollisionHandle(board);
        pacman = new Pacman(
            ctx,
            levelManager.currentLevel.startingPos.x, 
            levelManager.currentLevel.startingPos.y, 
            pacmanImages, 
            collisionHandle, 
            board
        );
        
        const ghostImages = await Ghost.loadImages();
        ghosts = Ghost.createGhosts(
            ctx, 
            board, 
            levelManager.currentLevel, 
            ghostImages,
            pacman
        );

        gameLoop();
    }
}

let gameOver = false;

function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pacman.draw(ctx);
    board.drawWalls();
    board.drawDot();

    ghosts.forEach(ghost => {
        ghost.draw();
        if (ghost.moveGhost.checkPacmanCollision()) {
            gameOver = true;
        }
    });

    requestAnimationFrame(gameLoop);
}

startGame();
