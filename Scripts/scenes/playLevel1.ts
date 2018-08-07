namespace scenes {
  export class PlayLevel1 extends objects.Scene {
    // member variables
    private _yellowSeahorse: objects.SeaHorse_yellow;
    private _pinkSeahorse: objects.SeaHorse_pink;
    private _orangeSeahorse: objects.SeaHorse_orange;
    private _multiSeahorse: objects.SeaHorse_multi;
    private _enemy: objects.Enemy;

    private _ocean: objects.Ocean;
    private _shark: objects.Shark[];
    private _sharkNum: number;

    private _redFishes: objects.Red_fish[];
    private _redFishNum: number;

    private _orangeFishes: objects.Orange_fish[];
    private _orangeFishNum: number;

    private _greenFishes: objects.Green_fish[];
    private _greenFishNum: number;

    private _purpleFishes: objects.Purple_fish[];
    private _purpleFishNum: number;

    private _life: objects.Life[];
    private _lifeNum: number;

    private _bulletClicked: objects.Bullet[];
    private _enemyCollision:  Boolean;

    private engineSound: createjs.AbstractSoundInstance;
    private num=0;
    private enemyNum=0;
    // constructors
    constructor() {
      super();

      this.Start();
    }

    private _removeCurrentBullet(bullet): void {
      let temp = bullet;
      this._bulletClicked = this._bulletClicked.filter(obj => obj !== bullet);  
      this.removeChild(temp);
    }


    // private methods
    private _buildRedFishes(): void {
      for (let count = 0; count < this._redFishNum; count++) {
        this._redFishes.push(new objects.Red_fish());
        //this._clouds[count] = new objects.Cloud();
      }
    }

    private _buildOrangeFishes(): void {
      for (let count = 0; count < this._orangeFishNum; count++) {
        this._orangeFishes.push(new objects.Orange_fish());
        //this._clouds[count] = new objects.Cloud();
      }
    }
    private _buildGreenFishes(): void {
      for (let count = 0; count < this._greenFishNum; count++) {
        this._greenFishes.push(new objects.Green_fish());
        //this._clouds[count] = new objects.Cloud();
      }
    }
    private _buildPurpleFishes(): void {
      for (let count = 0; count < this._purpleFishNum; count++) {
        this._purpleFishes.push(new objects.Purple_fish());
        //this._clouds[count] = new objects.Cloud();
      }
    }
    
    private _buildLife(): void {
      for (let count = 0; count < this._lifeNum; count++) {
        this._life.push(new objects.Life());
        //this._clouds[count] = new objects.Cloud();
      }
    }

    private _buildShark(): void {
      for (let count = 0; count < this._sharkNum; count++) {
        this._shark.push(new objects.Shark());
        //this._clouds[count] = new objects.Cloud();
      }
    }

    // public methods
    public Start(): void {
      

      this._yellowSeahorse = new objects.SeaHorse_yellow();

      this._ocean = new objects.Ocean();

      // creates an empty array of type Cloud
      this._redFishes = new Array<objects.Red_fish>();
      this._redFishNum = 2;

      this._greenFishes = new Array<objects.Green_fish>();
      this._greenFishNum = 2;

      this._orangeFishes = new Array<objects.Orange_fish>();
      this._orangeFishNum = 2;

      this._purpleFishes = new Array<objects.Purple_fish>();
      this._purpleFishNum = 2;

     

      this._life = new Array<objects.Life>();
      this._lifeNum = 1;

      this._shark = new Array<objects.Shark>();
      this._sharkNum = 2;

      // bullet
      this._bulletClicked = new Array<objects.Bullet>();
      this._enemy=new objects.Enemy();

      this._buildGreenFishes();
      this._buildOrangeFishes();
      this._buildShark();
      this._buildRedFishes();
      this._buildPurpleFishes();
      this._buildLife();

      this.Main();
    }

    public Update(): void {
      this._yellowSeahorse.Update();

      this._ocean.Update();

      this._redFishes.forEach(fish => {
        fish.Update();
        if (managers.Collision.check(this._yellowSeahorse, fish)) {
          console.log("collision");
        }
      });

      this._greenFishes.forEach(fish => {
        fish.Update();
        if (managers.Collision.check(this._yellowSeahorse, fish)) {
          console.log("collision");
        }
      });
      this._orangeFishes.forEach(fish => {
        fish.Update();
        if (managers.Collision.check(this._yellowSeahorse, fish)) {
          console.log("collision");
        }
      });
      this._purpleFishes.forEach(fish => {
        fish.Update();
        if (managers.Collision.check(this._yellowSeahorse, fish)) {
          console.log("collision");
        }
      });

      this._life.forEach(fish => {
        fish.Update();
        if (managers.Collision.check(this._yellowSeahorse, fish)) {
          console.log("collision");
        }
      });

      if(this.num<8 && this.num>=0){

      
      this._shark.forEach(fish => {
        
        fish.Update();
        if (managers.Collision.check(this._yellowSeahorse, fish)) {
          console.log("collision");
        }
      });
    }else{
      this.num=-1;
      console.log(this.num);
      this._shark.forEach(shark => {
        this.removeChild(shark);
      }); 
        this.addChild(this._enemy);
       
    }
      this._bulletClicked.forEach(bullet => {
        if (bullet.Update()) {
          // it will check the boundary of bullet and will updated if bullete reach to boundary
          this._removeCurrentBullet(bullet);
        } else {
          // check cololision between enemy and bullet
          this._shark.forEach(enemy => {
            this._enemyCollision = managers.Collision.check(enemy, bullet);

            if (this._enemyCollision) {
              // reset and remove enemy
              enemy.Reset();
              this.num+=1;
              managers.Game.ScoreBoard.Score+=200;
              this.removeChildAt(enemy.x);

              //   reset and remove bullet
              this._removeCurrentBullet(bullet);
            }
          });
        }
      });

      this._bulletClicked.forEach(bullet => {
        if (bullet.Update()) {
          // it will check the boundary of bullet and will updated if bullete reach to boundary
          this._removeCurrentBullet(bullet);
        } else {
          // check cololision between enemy and bullet
          //this._shark.forEach(enemy => {
            if(this.enemyNum<=20){
            this._enemyCollision = managers.Collision.check(this._enemy, bullet);

            if (this._enemyCollision) {
              // reset and remove enemy
              this._enemy.Reset();
              this.enemyNum+=1;
              managers.Game.ScoreBoard.Score+=300;
              console.log("enemy collide"+this.enemyNum);

              
              //   reset and remove bullet
              this._removeCurrentBullet(bullet);
            }
          }
          else{
            managers.Game.CurrentState = config.Scene.LEVEL3;
          }
          //});
        }
      });
      
    
    }


    public Reset(): void {}

    public Destroy(): void {
      this.removeAllChildren();
    }

    public Main(): void {
      console.log(`Starting - PLAY SCENE`);

      // adding the ocean to the scene
      this.addChild(this._ocean);

      for (const fish of this._redFishes) {
        this.addChild(fish);
      }

      for (const fish of this._orangeFishes) {
        this.addChild(fish);
      }
      for (const fish of this._greenFishes) {
        this.addChild(fish);
      }
      for (const fish of this._purpleFishes) {
        this.addChild(fish);
      }
      
      for (const fish of this._life) {
        this.addChild(fish);
      }
      for (const fish of this._shark) {
        this.addChild(fish);
      }

      // adding the seehorse to the scene
      this.addChild(this._yellowSeahorse);
      

      this._ocean.on(
        "click",
        function() {
          let bullet: objects.Bullet;
          bullet = new objects.Bullet();
          bullet.y = this._yellowSeahorse.y-30;
          bullet.x = this._yellowSeahorse.x+15;
          this._bulletClicked.push(bullet);
          this.addChild(bullet);
          let bulletSound = createjs.Sound.play("bulletsound");
              bulletSound.volume = 0.2;
        },
        this
      );

      this.addChild(managers.Game.ScoreBoard.LivesLabel);
      this.addChild(managers.Game.ScoreBoard.ScoreLabel);      
    }
  }
}
