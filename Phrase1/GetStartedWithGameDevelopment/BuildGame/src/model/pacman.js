import { MovePacman } from "../handle/movePacman.js"; 
import { Animation } from "../handle/animation.js";


export class Pacman {
    constructor(ctx, x, y, pacmanImage, collisionHandle) {
        this.ctx = ctx;
        this.sizePacman = 25;
        this.x = x * this.sizePacman;
        this.y = y * this.sizePacman;
        this.speed = 1;
        this.pacmanImage = pacmanImage;
        this.animation = new Animation(pacmanImage);

        this.movePacman = new MovePacman(this, collisionHandle);

    }

    draw(ctx) {
        if (this.movePacman.pacman.currentMovingDirection !== null) {  
            this.animation.animate(); 
        }
        this.movePacman.move();
        if (!this.pacmanImage.length) {
            console.warn("Pacman images not loaded.");
            return;
        }
        ctx.drawImage(
            this.pacmanImage[this.animation.pacmanImageIndex],
            this.x,
            this.y,
            this.sizePacman,
            this.sizePacman
        );
    }
    
}
