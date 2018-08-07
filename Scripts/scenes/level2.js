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
    var Level2 = /** @class */ (function (_super) {
        __extends(Level2, _super);
        // constructors
        function Level2() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        Level2.prototype.Start = function () {
            /*this.engineSound = createjs.Sound.play("background");
            this.engineSound.loop = -1;
            this.engineSound.volume = 0.1;
            */
            this._welcomeLabel = new objects.Label("Level 2", "80px", "Consolas", "#660066", 500, 120, true);
            this._welcomeLabelby = new objects.Label("Tap to Play!", "48px", "Consolas", "#ff0066", 500, 240, true);
            this._ocean = new objects.Ocean();
            this.Main();
        };
        Level2.prototype.Update = function () {
        };
        Level2.prototype.Reset = function () { };
        Level2.prototype.Destroy = function () {
            this.removeAllChildren();
        };
        Level2.prototype.Main = function () {
            console.log("Starting - START SCENE");
            // adding the ocean to the scene
            this.addChild(this._ocean);
            this.addChild(this._welcomeLabel);
            this.addChild(this._welcomeLabelby);
            this._ocean.on("click", function () {
                managers.Game.CurrentState = config.Scene.PLAYLEVEL1;
                var buttonSound = createjs.Sound.play("button");
            }, this);
        };
        return Level2;
    }(objects.Scene));
    scenes.Level2 = Level2;
})(scenes || (scenes = {}));
//# sourceMappingURL=level2.js.map