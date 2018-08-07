namespace scenes {
    export class Level2 extends objects.Scene {
      // member variables
      private _welcomeLabel: objects.Label;
      private _welcomeLabelby: objects.Label;
      
      private _ocean: objects.Ocean;
  
      private engineSound: createjs.AbstractSoundInstance;
  
      // constructors
      constructor() {
        super();
  
        this.Start();
      }
  
      // private methods
  
      // public methods
      public Start(): void {
        /*this.engineSound = createjs.Sound.play("background");
        this.engineSound.loop = -1;
        this.engineSound.volume = 0.1;
        */
        this._welcomeLabel = new objects.Label(
          "Level 2",
          "80px",
          "Consolas",
          "#660066",
          500,
          120,
          true
        );
        this._welcomeLabelby = new objects.Label(
          "Tap to Play!",
          "48px",
          "Consolas",
          "#ff0066",
          500,
          240,
          true
        );
        this._ocean = new objects.Ocean();
        this.Main();
      }
  
      public Update(): void {
      }
  
      public Reset(): void {}
  
      public Destroy(): void {
        this.removeAllChildren();
      }
  
      public Main(): void {
        console.log(`Starting - START SCENE`);
        // adding the ocean to the scene
        this.addChild(this._ocean);
        this.addChild(this._welcomeLabel);
        this.addChild(this._welcomeLabelby);
        
  
        
  
        this._ocean.on(
          "click",
          function() {
            managers.Game.CurrentState = config.Scene.PLAYLEVEL1;
            let buttonSound = createjs.Sound.play("button");
          },
          this
        );
  
        
      }
    }
  }
  