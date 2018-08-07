namespace objects {
    export class Enemy2 extends objects.GameObject {
      /**
       * Creates an instance of Plane.
       * @memberof enemy2
       */
      constructor() {
        super("level3");
        
        this.Start();
      }
  
      // private methods
      private _checkBounds(): void {
        // check right boundary
        if (this.y > config.Screen.HEIGHT - this.halfHeight) {
          this.y = config.Screen.HEIGHT - this.halfHeight;
        }
  
        // check left boundary
        if (this.y < this.halfHeight) {
          this.y = this.halfHeight;
        }
      }
  
      // public methods
      public Start(): void {
        this.regX = this.halfWidth + 65;
        this.regY = this.halfHeight;
        this.y = 200;
        this.x = 600;
      }
  
      public Update(): void {
        //this.y = managers.Game.Stage.mouseY;
        this._checkBounds();
      }
  
      public Reset(): void {}
    }
  }
  