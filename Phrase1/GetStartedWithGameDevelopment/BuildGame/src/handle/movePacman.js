
const MovingDirection = {
    up: 0,
    down: 1,
    left: 2,
    right: 3,
  };

export default MovingDirection;
export class MovePacman{
    constructor(pacman, collisionHandle) {
        this.pacman = pacman;
        this.pacman.currentMovingDirection = null;  
        this.pacman.requestedMovingDirection = null;  
        this.collisionHandle = collisionHandle;
        this.animation = pacman.animation;

        document.addEventListener("keydown", this.keydown);
    }

    keydown = (event) => {
        // Up
        if (event.keyCode == 38) { 
            if (this.pacman.currentMovingDirection === MovingDirection.down)
                this.pacman.currentMovingDirection = MovingDirection.up;
            this.pacman.requestedMovingDirection = MovingDirection.up;
        }
        // Down
        if (event.keyCode == 40) {
            if (this.pacman.currentMovingDirection === MovingDirection.up)
                this.pacman.currentMovingDirection = MovingDirection.down;
            this.pacman.requestedMovingDirection = MovingDirection.down;
        }
        // Left
        if (event.keyCode == 37) { 
            if (this.pacman.currentMovingDirection === MovingDirection.right)
                this.pacman.currentMovingDirection = MovingDirection.left;
            this.pacman.requestedMovingDirection = MovingDirection.left;
        }
        // Right
        if (event.keyCode == 39) { 
            if (this.pacman.currentMovingDirection === MovingDirection.left)
                this.pacman.currentMovingDirection = MovingDirection.right;
            this.pacman.requestedMovingDirection = MovingDirection.right;
        }
    }

    move() {
        if (this.pacman.currentMovingDirection !== this.pacman.requestedMovingDirection) {
            if (
                Number.isInteger(this.pacman.x / this.pacman.sizePacman) &&
                Number.isInteger(this.pacman.y / this.pacman.sizePacman)
            ) {
                if(!this.collisionHandle.collisionWall(
                    this.pacman.x,
                    this.pacman.y,
                    this.pacman.requestedMovingDirection
                )
            )
                this.pacman.currentMovingDirection = this.pacman.requestedMovingDirection;
            }
        }

        if(
            this.collisionHandle.collisionWall(
                this.pacman.x,
                this.pacman.y,
                this.pacman.currentMovingDirection
            )
        ){
            this.animation.pacmanImageIndex = 1;
            return;
            
        }else if(
            this.pacman.currentMovingDirection != null &&
            this.animation.animationTimer == null
        ){
            this.animation.animationTimer = this.animation.animationFrameSpeed;
        }
        switch (this.pacman.currentMovingDirection) {
            case MovingDirection.up:
                this.pacman.y -= this.pacman.speed;
                break;
            case MovingDirection.down:
                this.pacman.y += this.pacman.speed;
                break;
            case MovingDirection.left:
                this.pacman.x -= this.pacman.speed;
                break;
            case MovingDirection.right:
                this.pacman.x += this.pacman.speed;
                break;
        }
    }
}