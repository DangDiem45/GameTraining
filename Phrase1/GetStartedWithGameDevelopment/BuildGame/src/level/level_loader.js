export class LevelLoader {
    async loadLevel(levelFile) {
      try{
        const response = await fetch(`./levels/${levelFile}`);
        if(!response.ok){
          throw new Error(`Error load level: ${response.statusText}`);
        }
        return await response.json(); 
      }catch(error){
        console.error("Error load level: ", error);
        return null;
      }
      
    }
  }
  