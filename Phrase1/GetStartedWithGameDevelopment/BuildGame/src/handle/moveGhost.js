import MovingDirection from "./movePacman.js";

export class MoveGhost {
    constructor(ghost, collisionHandle, pacman, strategy, blinky = null) {
        this.ghost = ghost;
        this.collisionHandle = collisionHandle;
        this.pacman = pacman;
        this.blinky = blinky;
        this.strategy = strategy;
        this.speed = 1;
        this.currentMovingDirection = null;
        this.requestedMovingDirection = null; 
        this.directions = [MovingDirection.up, MovingDirection.down, MovingDirection.left, MovingDirection.right];
        this.chooseInitialDirection(); 
    }

    // Tính khoảng cách
    getDistance(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    }

    // Kiểm tra va chạm
    checkPacmanCollision() {
        const distance = this.getDistance(this.ghost.x, this.ghost.y, this.pacman.x, this.pacman.y);
        const collisionDistance = (this.ghost.sizeGhost + this.pacman.sizePacman) / 2;
        return distance < collisionDistance;
    }

    // Chọn hướng ban đầu ngẫu nhiên
    chooseInitialDirection() {
        const validDirections = this.directions.filter(direction => 
            !this.collisionHandle.collisionWall(this.ghost.x, this.ghost.y, direction)
        );
        this.currentMovingDirection = validDirections[Math.floor(Math.random() * validDirections.length)] || MovingDirection.right;
    }

    // Chọn hướng tốt nhất dựa trên mục tiêu
    chooseDirection(targetX, targetY) {
        let bestDirection = null;
        let minDistance = null;

        this.directions.forEach(direction => {
            let nextX = this.ghost.x;
            let nextY = this.ghost.y;
            switch (direction) {
                case MovingDirection.up: nextY -= this.speed; break;
                case MovingDirection.down: nextY += this.speed; break;
                case MovingDirection.left: nextX -= this.speed; break;
                case MovingDirection.right: nextX += this.speed; break;
            }

            if (!this.collisionHandle.collisionWall(nextX, nextY, direction)) {
                const distance = this.getDistance(nextX, nextY, targetX, targetY);
                if (distance < minDistance) {
                    minDistance = distance;
                    bestDirection = direction;
                }
            }
        });

        return bestDirection || this.currentMovingDirection; // Giữ hướng cũ nếu không tìm thấy hướng mới
    }

    // Xác định mục tiêu theo các con ghost
    getTargetPosition() {
        const pacmanX = this.pacman.x;
        const pacmanY = this.pacman.y;

        switch (this.strategy) {
            case "blinky":
                return { 
                    x: pacmanX,
                    y: pacmanY 
                };
            case "pinky":
                let offsetX = pacmanX;
                let offsetY = pacmanY;
                switch (this.pacman.movePacman.currentMovingDirection) {
                    case MovingDirection.up: 
                        offsetY -= 4 * this.ghost.sizeGhost; 
                        break;
                    case MovingDirection.down: 
                        offsetY += 4 * this.ghost.sizeGhost; 
                        break;
                    case MovingDirection.left: 
                        offsetX -= 4 * this.ghost.sizeGhost; 
                        break;
                    case MovingDirection.right: 
                        offsetX += 4 * this.ghost.sizeGhost; 
                        break;
                }
                return { 
                    x: offsetX, 
                    y: offsetY 
                };
            case "inky":
                if (!this.blinky) 
                    return { 
                        x: pacmanX, 
                        y: pacmanY 
                    };
                const blinkyX = this.blinky.x;
                const blinkyY = this.blinky.y;
                let pivotX = pacmanX;
                let pivotY = pacmanY;
                switch (this.pacman.movePacman.currentMovingDirection) {
                    case MovingDirection.up: 
                        pivotY -= 2 * this.ghost.sizeGhost; 
                        break;
                    case MovingDirection.down: 
                        pivotY += 2 * this.ghost.sizeGhost; 
                        break;
                    case MovingDirection.left: 
                        pivotX -= 2 * this.ghost.sizeGhost; 
                        break;
                    case MovingDirection.right: 
                        pivotX += 2 * this.ghost.sizeGhost; 
                        break;
                }
                const targetX = blinkyX + 2 * (pivotX - blinkyX);
                const targetY = blinkyY + 2 * (pivotY - blinkyY);
                return { 
                    x: targetX, 
                    y: targetY 
                };
            case "clyde":
                const distanceToPacman = this.getDistance(this.ghost.x, this.ghost.y, pacmanX, pacmanY);
                if (distanceToPacman > 8 * this.ghost.sizeGhost) {
                    return { 
                        x: pacmanX, 
                        y: pacmanY 
                    };
                } else {
                    const boardWidth = this.ghost.board.level.boardMatrix[0].length * this.ghost.sizeGhost;
                    const boardHeight = this.ghost.board.level.boardMatrix.length * this.ghost.sizeGhost;
                    return { 
                        x: boardWidth - this.ghost.sizeGhost, 
                        y: boardHeight - this.ghost.sizeGhost 
                    };
                }
            default:
                return { 
                    x: pacmanX, 
                    y: pacmanY 
                };
        }
    }

    move() {
        // Kiểm tra va chạm với Pacman
        if (this.checkPacmanCollision()) {
            return;
        }

        // Kiểm tra các ô phải là số nguyên thì mới đổi hướng
        if (Number.isInteger(this.ghost.x / this.ghost.sizeGhost) && Number.isInteger(this.ghost.y / this.ghost.sizeGhost)) {
            const target = this.getTargetPosition();
            this.requestedMovingDirection = this.chooseDirection(target.x, target.y);

            // Kiểm tra và cập nhật hướng mới
            if (this.currentMovingDirection !== this.requestedMovingDirection) {
                if (!this.collisionHandle.collisionWall(
                    this.ghost.x,
                    this.ghost.y,
                    this.requestedMovingDirection
                )) {
                    this.currentMovingDirection = this.requestedMovingDirection;
                }
            }

            // Nếu hướng hiện tại va chạm tường, chọn hướng mới
            if (this.collisionHandle.collisionWall(this.ghost.x, this.ghost.y, this.currentMovingDirection)) {
                this.currentMovingDirection = this.chooseDirection(target.x, target.y);
            }
        }

        // Di chuyển Ghost nếu không va chạm tường
        let nextX = this.ghost.x;
        let nextY = this.ghost.y;
        switch (this.currentMovingDirection) {
            case MovingDirection.up: nextY -= this.speed; break;
            case MovingDirection.down: nextY += this.speed; break;
            case MovingDirection.left: nextX -= this.speed; break;
            case MovingDirection.right: nextX += this.speed; break;
        }

        if (!this.collisionHandle.collisionWall(nextX, nextY, this.currentMovingDirection)) {
            this.ghost.x = nextX;
            this.ghost.y = nextY;
        }
    }
}