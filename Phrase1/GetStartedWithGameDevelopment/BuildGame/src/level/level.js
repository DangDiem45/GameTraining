export class Level {
  constructor() {
    this.boardMatrix = [];
    this.startingPos = { x: 0, y: 0 };
    this.energizers = [];
    this.pillAmount = 0;
  }

  // Create level from json
  init(levelData) {
    
    this.boardMatrix = levelData.boardMatrix || [];
    this.startingPos = levelData.startingPos || { x: 0, y: 0 };
    this.energizers = levelData.energizers || [];
    this.pillAmount = levelData.pillAmount || 0;

  }

  update() {
    
  }
}
