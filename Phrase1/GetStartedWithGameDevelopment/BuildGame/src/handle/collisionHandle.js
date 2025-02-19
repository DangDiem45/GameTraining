import MovingDirection from "./movePacman.js";
export class CollisionHandle{
    constructor(board){
        this.board = board;
    }

    collisionWall(x, y, direction) {
        if (direction == null) return false;
    
        if (
            Number.isInteger(x / this.board.tileSize) &&
            Number.isInteger(y / this.board.tileSize)
        ) {
            let column = 0;
            let row = 0;
            let nextColumn = 0;
            let nextRow = 0;
    
            switch (direction) {
                case MovingDirection.right:
                    nextColumn = x + this.board.tileSize;
                    column = Math.floor((nextColumn) / this.board.tileSize);
                    row = y / this.board.tileSize;
                    break;
                case MovingDirection.left:
                    nextColumn = x - this.board.tileSize;
                    column = Math.floor((nextColumn) / this.board.tileSize);
                    row = y / this.board.tileSize;
                    break;
                case MovingDirection.up:
                    nextRow = y - this.board.tileSize;
                    column = x / this.board.tileSize;
                    row = Math.floor((nextRow) / this.board.tileSize);
                    break;
                case MovingDirection.down:
                    nextRow = y + this.board.tileSize;
                    column = x / this.board.tileSize;
                    row = Math.floor((nextRow) / this.board.tileSize);
                    break;
            }
    
            const rowArray = this.board.level.boardMatrix[row];

            if (!rowArray) {
                // console.error(`Row ${row} is undefined in boardMatrix!`);
                return true;
            }

            const tile = rowArray[column];

            // console.log(`Tile value at (${row}, ${column}):`, tile);

            if(tile==1){
                return true;
            }

    
            // Check wall
            if (
                row < 0 || row >= this.board.level.boardMatrix.length ||
                column < 0 || column >= this.board.level.boardMatrix[0].length
            ) {
                // console.warn(`Invalid row/column: (${row}, ${column})`);
                return true;
            }
    
        }
        return false;
    }
    
}