namespace scenes {
  export class Setting extends objects.Scene {
    // member variables
    private _avtarButton: objects.Button;
    private _welcomeLabel: objects.Label;
    private _rulesButton: objects.Button;
    private _cancleButton: objects.Button;
    private _ocean: objects.Ocean;
    // constructors
    constructor() {
      super();

      this.Start();
    }

    // private methods

    // public methods
    public Start(): void {
      this._cancleButton = new objects.Button("CancelButton", config.Screen.HALF_WIDTH, 510, false);
      this._welcomeLabel = new objects.Label(
        "1. Tap to Shoot\n\n2. Kill some Shark to reach at Next Level."+
        "\n\n3. Eat snail to increase live\n\n4. Kill octopus to reach at Next Level.\n\n"+
        "5. Eat star fish to get bonus.\n\n6. Kill water gragen to win.\n\n7. Eat Red-fish to collect point",
        "20px",
        "Consolas",
        "#660066",
        500,
        320,
        true
      );
      
      this._ocean = new objects.Ocean();
      this.Main();
    }

    public Update(): void {
      this._ocean.Update();
    }

    public Reset(): void {}

    public Destroy(): void {
      this.removeAllChildren();
    }

    public Main(): void {
      console.log(`Starting - Setting SCENE`);
      this.addChild(this._ocean);
      this.addChild(this._cancleButton);
      this.addChild(this._welcomeLabel);

      this._cancleButton.on(
        "click",
        function() {
          managers.Game.CurrentState = config.Scene.START;
          let button = createjs.Sound.play("button");
        },
        this
      );

     
    }
  }
}
