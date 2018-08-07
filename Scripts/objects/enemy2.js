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
var objects;
(function (objects) {
    var Enemy2 = /** @class */ (function (_super) {
        __extends(Enemy2, _super);
        /**
         * Creates an instance of Plane.
         * @memberof enemy2
         */
        function Enemy2() {
            var _this = _super.call(this, "level3") || this;
            _this.Start();
            return _this;
        }
        // private methods
        Enemy2.prototype._checkBounds = function () {
            // check right boundary
            if (this.y > config.Screen.HEIGHT - this.halfHeight) {
                this.y = config.Screen.HEIGHT - this.halfHeight;
            }
            // check left boundary
            if (this.y < this.halfHeight) {
                this.y = this.halfHeight;
            }
        };
        // public methods
        Enemy2.prototype.Start = function () {
            this.regX = this.halfWidth + 65;
            this.regY = this.halfHeight;
            this.y = 200;
            this.x = 600;
        };
        Enemy2.prototype.Update = function () {
            //this.y = managers.Game.Stage.mouseY;
            this._checkBounds();
        };
        Enemy2.prototype.Reset = function () { };
        return Enemy2;
    }(objects.GameObject));
    objects.Enemy2 = Enemy2;
})(objects || (objects = {}));
//# sourceMappingURL=enemy2.js.map