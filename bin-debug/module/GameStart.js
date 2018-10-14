var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    /**
     *
     * @author gn
     * 游戏开始
     */
    var GameStart = (function (_super) {
        __extends(GameStart, _super);
        function GameStart() {
            var _this = _super.call(this) || this;
            _this.sceneEvent = new game.SceneEvent(game.SceneEvent.ChangeScene);
            _this.skinName = "resource/eui_skins/mySkins/gameStartSkin.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
            return _this;
        }
        // 添加到舞台
        GameStart.prototype.onAdded = function (e) {
            console.log('onAdded');
            this.sceneEvent.eventType = game.SceneEvent.GAME_PLAYING;
            this.gameBg.width = game.Store.stageW;
            this.gameBg.height = game.Store.stageH;
            this.gameBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayStart, this);
            this.selectCar1.width = 160;
            this.selectCar1.height = 119;
            this.selectCar1.x = 50;
            this.selectCar1.y = 690;
            this.selectCar1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.car1center, this);
            this.selectCar2.width = 160;
            this.selectCar2.height = 119;
            this.selectCar2.x = 250;
            this.selectCar2.y = 690;
            this.selectCar2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.car2center, this);
            this.selectCar3.width = 160;
            this.selectCar3.height = 119;
            this.selectCar3.x = 440;
            this.selectCar3.y = 690;
            this.selectCar3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.car3center, this);
        };
        // 从舞台移除
        GameStart.prototype.onRemoved = function (e) {
            this.gameBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayStart, this);
        };
        // 点击继续游戏按钮
        GameStart.prototype.onPlayStart = function (e) {
            console.log('onPlayStart');
            game.ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        };
        // 摩托车在中间1
        GameStart.prototype.car1center = function (e) {
            this.selectCar1.x = 250;
            this.selectCar2.x = 50;
            this.selectCar3.x = 440;
        };
        // 蓝色跑车在中间2
        GameStart.prototype.car2center = function (e) {
            this.selectCar1.x = 50;
            this.selectCar2.x = 250;
            this.selectCar3.x = 440;
        };
        // 黄色跑车在中间3
        GameStart.prototype.car3center = function (e) {
            this.selectCar1.x = 50;
            this.selectCar2.x = 440;
            this.selectCar3.x = 250;
        };
        return GameStart;
    }(eui.Component));
    game.GameStart = GameStart;
    __reflect(GameStart.prototype, "game.GameStart");
})(game || (game = {}));
