namespace objects {
  export class Shark extends objects.GameObject {
    // member variables
    private _horizontalSpeed: number;

    /**
     * Creates an instance of Plane.
     * @memberof Shark
     */
    constructor() {
      super("shark");

      this.Start();
    }

    // private methods
    private _checkBounds(): void {
      // check bottom boundary
      if (this.x < this.halfWidth) {
        this.Reset();
      }
    }

    // public methods
    public Start(): void {
      this.regX = this.width;
      this.regY = this.height;
      this._horizontalSpeed = 5;
      this.Reset();
    }

    
    public Update(): void {
      this.x -= this._horizontalSpeed;
      this._checkBounds();
    }

    public Reset(): void {
      this._horizontalSpeed = Math.floor(Math.random() * 4 + 2); // between -2 and 2 ppf
      this.x = config.Screen.WIDTH;
      this.y = Math.floor(
        Math.random() * (config.Screen.HEIGHT - this.height) + this.halfHeight
      );
      console.log(this._horizontalSpeed);
    }
  }
}
