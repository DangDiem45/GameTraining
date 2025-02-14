export class Level {
  constructor() {
    this.boardMatrix = [];
    this.startingPos = { x: 0, y: 0 };
    this.energizers = [];
    this.pillAmount = 0;
  }

  // Create level from json
  init(levelData) {
    if (!levelData) {
      console.error("Dữ liệu cấp độ không hợp lệ!");
      return;
    }
    
    this.boardMatrix = levelData.boardMatrix || [];
    this.startingPos = levelData.startingPos || { x: 0, y: 0 };
    this.energizers = levelData.energizers || [];
    this.pillAmount = levelData.pillAmount || 0;

    console.log("Cấp độ đã được tải:", this);
  }

  update() {
    
  }
}
