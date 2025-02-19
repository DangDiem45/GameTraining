import { Level } from "./level.js";
import { LevelLoader } from "./level_loader.js";

export class LevelManager {
  constructor(board) { 
    this.currentLevel = null;
    this.levelLoader = new LevelLoader();
    this.board = board;
  }

  async loadLevel(levelFile) {
    const levelData = await this.levelLoader.loadLevel(levelFile);
    this.currentLevel = new Level();
    this.currentLevel.init(levelData); 
    if (this.board) {
      this.board.updateLevel(this.currentLevel);
    } else {
      console.error("Board not create in LevelManager!");
    }
    
  } 
  
}