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
    var Rules = /** @class */ (function (_super) {
        __extends(Rules, _super);
        // constructors
        function Rules() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        Rules.prototype.Start = function () {
            /*this.engineSound = createjs.Sound.play("background");
            this.engineSound.loop = -1;
            this.engineSound.volume = 0.1;
            */
            this._welcomeLabel = new objects.Label("Marino ", "80px", "Consolas", "#660066", 500, 120, true);
            this._welcomeLabelby = new objects.Label("Tidal Wave ", "48px", "Consolas", "#ff0066", 500, 240, true);
            this._infoButton = new objects.Button("InfoButton", 0, 550, true);
            this._ocean = new objects.Ocean();
            this.Main();
        };
        Rules.prototype.Update = function () {
            this._ocean.Update();
        };
        Rules.prototype.Reset = function () { };
        Rules.prototype.Destroy = function () {
            this.removeAllChildren();
        };
        Rules.prototype.Main = function () {
            console.log("Starting - START SCENE");
            // adding the ocean to the scene
            this.addChild(this._ocean);
            this.addChild(this._welcomeLabel);
            this.addChild(this._welcomeLabelby);
            this.addChild(this._infoButton);
            this._infoButton.on("click", function () {
                managers.Game.CurrentState = config.Scene.INFORMATION;
                var buttonSound = createjs.Sound.play("button");
            }, this);
        };
        return Rules;
    }(objects.Scene));
    scenes.Rules = Rules;
})(scenes || (scenes = {}));
//# sourceMappingURL=rules.js.map