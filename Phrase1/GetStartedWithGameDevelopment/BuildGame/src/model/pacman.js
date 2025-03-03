import { MovePacman } from "../handle/movePacman.js"; 
import { Animation } from "../handle/animation.js";

export class Pacman {
    constructor(ctx, x, y, pacmanImage, collisionHandle, board) {
        this.ctx = ctx;
        this.sizePacman = 25;
        this.x = x * this.sizePacman;
        this.y = y * this.sizePacman;
        this.speed = 1;
        this.pacmanImage = pacmanImage;
        this.animation = new Animation(pacmanImage);
        this.board = board;

        this.movePacman = new MovePacman(this, collisionHandle);
    }

    draw(ctx) {
        this.board.eatDot(this.x, this.y);
        if (this.movePacman.pacman.currentMovingDirection !== null) {  
            this.animation.animate(); 
        }
        this.movePacman.move();
        if (!this.pacmanImage.length) {
            console.warn("Pacman images not loaded.");
            return;
        }
        
        // ctx.drawImage(
        //     this.pacmanImage[this.animation.pacmanImageIndex],
        //     this.x,
        //     this.y,
        //     this.sizePacman,
        //     this.sizePacman
        // );

        const size = this.sizePacman / 2;

        ctx.save();
        ctx.translate(this.x + size, this.y + size);
        ctx.rotate((this.movePacman.rotation * 90 * Math.PI) / 180);
        ctx.drawImage(
            this.pacmanImage[this.animation.pacmanImageIndex],
            -size,
            -size,
            this.sizePacman,
            this.sizePacman
        )
        ctx.restore();
    }
    
}
