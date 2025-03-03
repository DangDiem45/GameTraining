import { MoveGhost } from "../handle/moveGhost.js";
import { CollisionHandle } from "../handle/collisionHandle.js";
export class Ghost {
    constructor(ctx, x, y, board, ghostImage, pacman, strategy, blinky = null) {
        this.ctx = ctx;
        this.sizeGhost = 25;
        this.x = x * this.sizeGhost;
        this.y = y * this.sizeGhost;
        this.ghostImage = ghostImage;
        this.board = board;
        this.moveGhost = new MoveGhost(this, new CollisionHandle(board), pacman, strategy, blinky);
    }

    draw() {
        this.moveGhost.move();
        this.ctx.drawImage(this.ghostImage, this.x, this.y, this.sizeGhost, this.sizeGhost);
    }

    static createGhosts(ctx, board, levelData, ghostImages, pacman) {
        const ghosts = [];
        const ghostStrategies = ["blinky", "pinky", "inky", "clyde"];
        let blinky = null;

        levelData.ghosts.forEach(({ x, y }, index) => {
            const strategy = ghostStrategies[index % ghostStrategies.length];
            const ghostImage = ghostImages[index % ghostImages.length];
            const ghost = new Ghost(ctx, x, y, board, ghostImage, pacman, strategy, strategy === "inky" ? blinky : null);
            ghosts.push(ghost);
            if (strategy === "blinky") blinky = ghost; // Lưu Blinky để truyền cho Inky
        });

        return ghosts;
    }

    static async loadImages() {
        const imagePaths = [
            "asset/images/Blinky.png",
            "asset/images/Pinky.png",
            "asset/images/Inky.png",
            "asset/images/Clyde.png"
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
            return await Promise.all(promises);
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}