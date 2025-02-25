export class Level {
  constructor() {
    this.boardMatrix = [];
    this.startingPos = { x: 0, y: 0 };
    this.ghosts = [];
  }

  // Create level from json
  init(levelData) {
    
    this.boardMatrix = levelData.boardMatrix || [];
    this.startingPos = levelData.startingPos || { x: 0, y: 0 };
    this.ghosts = levelData.ghosts || [];

  }

  update() {
    
  }
}
