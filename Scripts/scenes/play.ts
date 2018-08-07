module scenes {
  export class Play extends objects.Scene {
      // member variables
      private _seahorse:objects.SeaHorse_yellow;
      //private _seehorse:objects.SeeHorse;
      private _ocean:objects.Ocean;
      private _shark:objects.Shark;
      private _fishes:objects.Red_fish[];
      private _fishNum:number;
      private _bulletClicked: objects.Bullet[];
      private _enemyCollision:  Boolean;
      private num=0;
      private _seahorseMessage: objects.Label;

      public engineSound:createjs.AbstractSoundInstance;

      // constructors
      constructor() {
          super();

          this.Start();
      }

      // private methods
      private _buildFishes():void {
          for (let count = 0; count < this._fishNum; count++) {
              this._fishes.push(new objects.Red_fish());
              //this._clouds[count] = new objects.Cloud();
          }
      }

      // public methods
      public Start():void {
          this.engineSound = createjs.Sound.play("background");
          this.engineSound.loop = -1;
          this.engineSound.volume = 0.1;


          this._seahorse = new objects.SeaHorse_yellow();
         // this._seehorse = new objects.SeeHorse();
          this._ocean = new objects.Ocean();
          this._shark = new objects.Shark();

          // creates an empty array of type Cloud
          this._fishes = new Array<objects.Red_fish>();
          this._fishNum = 3;

          this._bulletClicked = new Array<objects.Bullet>();

          this._seahorseMessage = managers.Game.ScoreBoard.DynamicLabel("Click to shoot shark",this._seahorse.x,this._seahorse.y-10,false);

          this._buildFishes();
         
          this.Main();
      }

      private _removeCurrentBullet(bullet): void {
        let temp = bullet;
        this._bulletClicked = this._bulletClicked.filter(obj => obj !== bullet);  
        this.removeChild(temp);
      }

      public Update():void {
          this._seahorse.Update();
          //this._seehorse.Update();
          this._ocean.Update();
          this._shark.Update();

          managers.Collision.check(this._seahorse, this._shark);

          this._fishes.forEach(fish => {
              fish.Update();
              if(managers.Collision.check(this._seahorse, fish)){
                  console.log("collision");
              }
          });
          
          if(this.num<8 && this.num>=0){

      
            //this._shark.forEach(fish => {
              
              this._shark.Update();
              if (managers.Collision.check(this._seahorse, this._shark)) {
                console.log("collision");
              }
            //});
          }else{
            this.num=-1;
            console.log(this.num);
            //this._shark.forEach(shark => {
              //this.removeChild(this._shark);
              //alert("next level");
              managers.Game.CurrentState = config.Scene.LEVEL2;
            //}); 
              //this.addChild(this._enemy);
             
          }
          if(this.num>0)
            {
            this.removeChild(this._seahorseMessage);
            }

          this._bulletClicked.forEach(bullet => {
            if (bullet.Update()) {
              // it will check the boundary of bullet and will updated if bullete reach to boundary
              this._removeCurrentBullet(bullet);
            } else {
              // check cololision between enemy and bullet
              //this._shark.forEach(enemy => {
                this._enemyCollision = managers.Collision.check(this._shark, bullet);
    
                if (this._enemyCollision) {
                  // reset and remove enemy
                  this._shark.Reset();
                  this.num+=1;
                  this.removeChildAt(this._shark.x);
                  managers.Game.ScoreBoard.Score+=200;
    
                  //   reset and remove bullet
                  this._removeCurrentBullet(bullet);
                }
              //});
            } 
          });
      }

      public Reset():void {

      }

      public Destroy():void {
          this.removeAllChildren();
      }

      public Main():void {
          console.log(`Starting - PLAY SCENE`);

          // adding the ocean to the scene
          this.addChild(this._ocean);
         
          for (const fish of this._fishes) {
              this.addChild(fish);
          }
          
          // adding the seehorse to the scene
          this.addChild(this._seahorse);

          // adding the shark to the scene
          this.addChild(this._shark);

          this._ocean.on(
            "click",
            function() {
              let bullet: objects.Bullet;
              bullet = new objects.Bullet();
              bullet.y = this._seahorse.y-30;
              bullet.x = this._seahorse.x+15;
              this._bulletClicked.push(bullet);
              this.addChild(bullet);
              let bulletSound = createjs.Sound.play("bulletsound");
              bulletSound.volume = 0.2;
            },
            this
          );
          this.addChild(this._seahorseMessage);
          this.addChild(managers.Game.ScoreBoard.LivesLabel);
          this.addChild(managers.Game.ScoreBoard.ScoreLabel);
      }
  }
}