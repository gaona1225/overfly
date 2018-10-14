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
     * 游戏结束
     */
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            var _this = _super.call(this) || this;
            _this.sceneEvent = new game.SceneEvent(game.SceneEvent.ChangeScene);
            _this.skinName = "resource/eui_skins/mySkins/gameOverSkin.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
            return _this;
        }
        // private soundChannelSuccess:egret.SoundChannel;
        // 添加到舞台
        GameOver.prototype.onAdded = function (e) {
            this.sceneEvent.eventType = game.SceneEvent.GAME_START;
            if (game.Store.gameResult) {
                this.result.source = "success_jpg";
                var timeTemp = game.Store.gameTimer / 1000;
                this.failReasonMsg.text = '太棒啦！用时' + timeTemp.toFixed(2) + 's，超过95%的小伙伴！';
                // 添加音效--欢呼
                // var soundSuccess:egret.Sound = RES.getRes("success_m4a");
                // let channelSuccess:egret.SoundChannel = soundSuccess.play(0, 1);
                // this.soundChannelSuccess = channelSuccess;
            }
            else {
                this.result.source = "fail_jpg";
                // 失败原因，默认为1,表示掉水里了，如果为2表示飞出去了
                switch (game.Store.failReason) {
                    case 1:
                        this.failReasonMsg.text = '掉水里啦！下次努力跨过河流哦';
                        break;
                    case 2:
                        this.failReasonMsg.text = '飞出去啦！下次速度放慢点哦';
                        break;
                    default: break;
                }
            }
            this.result.width = game.Store.stageW;
            this.result.height = game.Store.stageH;
            this.failReasonMsg.left = game.Store.stageW / 2 - this.failReasonMsg.width / 2;
            this.failReasonMsg.top = 670;
            this.carMsg.left = game.Store.stageW / 2 - this.carMsg.width / 2;
            this.carMsg.bottom = 80;
            this.result.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayAgain, this);
        };
        // 从舞台移除
        GameOver.prototype.onRemoved = function (e) {
            this.result.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayAgain, this);
        };
        // 点击继续按钮
        GameOver.prototype.onPlayAgain = function (e) {
            document.location.reload();
            // ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        };
        return GameOver;
    }(eui.Component));
    game.GameOver = GameOver;
    __reflect(GameOver.prototype, "game.GameOver");
})(game || (game = {}));
