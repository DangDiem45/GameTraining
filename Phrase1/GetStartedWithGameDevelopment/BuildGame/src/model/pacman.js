export class Pacman {
    constructor(ctx, x, y, images) {
        this.ctx = ctx;
        this.sizePacman = 25;
        this.x = x * this.sizePacman;
        this.y = y * this.sizePacman;
        this.speed = 2;
        this.direction = { x: 0, y: 0 };
        this.pacmanImage = images;
        this.pacmanImageIndex = 0;
    }

    draw(ctx) {
        if (!this.pacmanImage.length) {
            console.warn("Pacman images not loaded.");
            return;
        }
        ctx.drawImage(
            this.pacmanImage[this.pacmanImageIndex],
            this.x,
            this.y,
            this.sizePacman,
            this.sizePacman
        );
    }

    

    
}
