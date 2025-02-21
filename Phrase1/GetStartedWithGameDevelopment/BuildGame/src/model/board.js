 export class Board{
    constructor(ctx, level){
        this.ctx = ctx;
        this.level = level;
        this.fps = 30;
        this.tileSize = 25;
        this.wallSpaceWidth = this.tileSize / 1.2;
        this.wallOffset = (this.tileSize - this.wallSpaceWidth) /2;
        this.wallColor = "black";
        this.dotColor = "yellow";
        this.dotSize = 3;
    }

    updateLevel(level){
        this.level = level;
    }


    createRect(ctx, x, y, width, height, color){
       ctx.fillStyle = color;
       ctx.fillRect(x, y, width, height); 
    }

    createCircle(ctx, x, y, radius, color){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    drawWalls(){
        for(let row =0; row < this.level.boardMatrix.length; row++){
            for(let col=0; col < this.level.boardMatrix[row].length; col++){
                if(this.level.boardMatrix[row][col]==1){
                    this.createRect(
                        this.ctx,
                        col*this.tileSize,
                        row*this.tileSize,
                        this.tileSize,
                        this.tileSize,
                        "#342DCA"
                    );
                    if (col > 0 && this.level.boardMatrix[row][col - 1] == 1) {
                        this.createRect(
                            this.ctx,
                            col * this.tileSize,
                            row * this.tileSize + this.wallOffset,
                            this.wallSpaceWidth + this.wallOffset,
                            this.wallSpaceWidth,
                            this.wallColor
                        );
                    }
                    if(this.level.boardMatrix[row][col + 1]==1){
                        this.createRect(
                            this.ctx,
                            col * this.tileSize + this.wallOffset,
                            row * this.tileSize + this.wallOffset,
                            this.wallSpaceWidth + this.wallOffset,
                            this.wallSpaceWidth,
                            this.wallColor
                        )
                    }
                    if(row < this.level.boardMatrix.length - 1 && this.level.boardMatrix[row + 1][col]==1){
                        this.createRect(
                            this.ctx,
                            col * this.tileSize + this.wallOffset,
                            row * this.tileSize + this.wallOffset,
                            this.wallSpaceWidth,
                            this.wallSpaceWidth + this.wallOffset,
                            this.wallColor
                        )
                    }
                    if(row > 0 && this.level.boardMatrix[row - 1][col] ==1){
                        this.createRect(
                            this.ctx,
                            col * this.tileSize + this.wallOffset,
                            row * this.tileSize,
                            this.wallSpaceWidth,
                            this.wallSpaceWidth + this.wallOffset,
                            this.wallColor
                        );
                    }
                    
                }
        
            }
        }
    }

    drawDot(){
        for(let row = 0; row < this.level.boardMatrix.length; row++){
            for(let col = 0; col < this.level.boardMatrix[row].length; col++){
                if(this.level.boardMatrix[row][col]==2){
                    this.createCircle(
                        this.ctx,
                        col * this.tileSize + this.tileSize / 2,
                        row * this.tileSize + this.tileSize / 2,
                        this.dotSize,
                        this.dotColor
                    )
                }
            }
        }
    }


    eatDot(x, y){
        const row = y / this.tileSize;
        const col = x / this.tileSize;

        if(Number.isInteger(row) && Number.isInteger(col)){
            if(this.level.boardMatrix[row][col] == 2){
                this.level.boardMatrix[row][col] = 0;
            }
        }
    }
 }