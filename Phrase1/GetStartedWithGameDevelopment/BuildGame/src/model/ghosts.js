export class Ghost {
    constructor(ctx, x, y, board, ghostImage) {
        this.ctx = ctx;
        this.sizeGhost = 25;
        this.x = x * this.sizeGhost;
        this.y = y * this.sizeGhost;
        this.ghostImage = ghostImage;
        this.board = board;
    }

    draw() {
        this.ctx.drawImage(
            this.ghostImage,
            this.x,
            this.y,
            this.sizeGhost,
            this.sizeGhost
        );
    }

    static createGhosts(ctx, board, levelData, ghostImages) {
        return levelData.ghosts.map(({ x, y }, index) => {
            const ghostImage = ghostImages[index % ghostImages.length];
            return new Ghost(ctx, x, y, board, ghostImage);
        });
    }

    static async loadImages() {
        const imagePaths = [
            "asset/images/Blinky.png",
            "asset/images/Clyde.png",
            "asset/images/Inky.png",
            "asset/images/Pinky.png"
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
