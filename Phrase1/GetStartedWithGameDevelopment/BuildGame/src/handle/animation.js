export class Animation{
    constructor(pacmanImages, animationFrameSpeed=10){
        this.pacmanImages = pacmanImages;
        this.pacmanImageIndex = 0;
        this.animationFrameSpeed = animationFrameSpeed;
        this.animationTimer = this.animationFrameSpeed;

    }
    animate(){
        if(this.animationTimer > 0){
            this.animationTimer--;
        }
        if(this.animationTimer===0){
            this.animationTimer = null;
            this.pacmanImageIndex++;
            if(this.pacmanImageIndex==this.pacmanImages.length){
                this.pacmanImageIndex = 0;
            }
        }
    }

}