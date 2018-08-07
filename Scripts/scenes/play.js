var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // constructors
        function Play() {
            var _this = _super.call(this) || this;
            _this.num = 0;
            _this.Start();
            return _this;
        }
        // private methods
        Play.prototype._buildFishes = function () {
            for (var count = 0; count < this._fishNum; count++) {
                this._fishes.push(new objects.Red_fish());
                //this._clouds[count] = new objects.Cloud();
            }
        };
        // public methods
        Play.prototype.Start = function () {
            this.engineSound = createjs.Sound.play("background");
            this.engineSound.loop = -1;
            this.engineSound.volume = 0.1;
            this._seahorse = new objects.SeaHorse_yellow();
            // this._seehorse = new objects.SeeHorse();
            this._ocean = new objects.Ocean();
            this._shark = new objects.Shark();
            // creates an empty array of type Cloud
            this._fishes = new Array();
            this._fishNum = 3;
            this._bulletClicked = new Array();
            this._seahorseMessage = managers.Game.ScoreBoard.DynamicLabel("Click to shoot shark", this._seahorse.x, this._seahorse.y - 10, false);
            this._buildFishes();
            this.Main();
        };
        Play.prototype._removeCurrentBullet = function (bullet) {
            var temp = bullet;
            this._bulletClicked = this._bulletClicked.filter(function (obj) { return obj !== bullet; });
            this.removeChild(temp);
        };
        Play.prototype.Update = function () {
            var _this = this;
            this._seahorse.Update();
            //this._seehorse.Update();
            this._ocean.Update();
            this._shark.Update();
            managers.Collision.check(this._seahorse, this._shark);
            this._fishes.forEach(function (fish) {
                fish.Update();
                if (managers.Collision.check(_this._seahorse, fish)) {
                    console.log("collision");
                }
            });
            if (this.num < 8 && this.num >= 0) {
                //this._shark.forEach(fish => {
                this._shark.Update();
                if (managers.Collision.check(this._seahorse, this._shark)) {
                    console.log("collision");
                }
                //});
            }
            else {
                this.num = -1;
                console.log(this.num);
                //this._shark.forEach(shark => {
                //this.removeChild(this._shark);
                //alert("next level");
                managers.Game.CurrentState = config.Scene.LEVEL2;
                //}); 
                //this.addChild(this._enemy);
            }
            if (this.num > 0) {
                this.removeChild(this._seahorseMessage);
            }
            this._bulletClicked.forEach(function (bullet) {
                if (bullet.Update()) {
                    // it will check the boundary of bullet and will updated if bullete reach to boundary
                    _this._removeCurrentBullet(bullet);
                }
                else {
                    // check cololision between enemy and bullet
                    //this._shark.forEach(enemy => {
                    _this._enemyCollision = managers.Collision.check(_this._shark, bullet);
                    if (_this._enemyCollision) {
                        // reset and remove enemy
                        _this._shark.Reset();
                        _this.num += 1;
                        _this.removeChildAt(_this._shark.x);
                        managers.Game.ScoreBoard.Score += 200;
                        //   reset and remove bullet
                        _this._removeCurrentBullet(bullet);
                    }
                    //});
                }
            });
        };
        Play.prototype.Reset = function () {
        };
        Play.prototype.Destroy = function () {
            this.removeAllChildren();
        };
        Play.prototype.Main = function () {
            console.log("Starting - PLAY SCENE");
            // adding the ocean to the scene
            this.addChild(this._ocean);
            for (var _i = 0, _a = this._fishes; _i < _a.length; _i++) {
                var fish = _a[_i];
                this.addChild(fish);
            }
            // adding the seehorse to the scene
            this.addChild(this._seahorse);
            // adding the shark to the scene
            this.addChild(this._shark);
            this._ocean.on("click", function () {
                var bullet;
                bullet = new objects.Bullet();
                bullet.y = this._seahorse.y - 30;
                bullet.x = this._seahorse.x + 15;
                this._bulletClicked.push(bullet);
                this.addChild(bullet);
                var bulletSound = createjs.Sound.play("bulletsound");
                bulletSound.volume = 0.2;
            }, this);
            this.addChild(this._seahorseMessage);
            this.addChild(managers.Game.ScoreBoard.LivesLabel);
            this.addChild(managers.Game.ScoreBoard.ScoreLabel);
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map