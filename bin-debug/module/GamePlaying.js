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
     * 游戏进行中
     */
    var GamePlaying = (function (_super) {
        __extends(GamePlaying, _super);
        function GamePlaying() {
            var _this = _super.call(this) || this;
            _this.sceneEvent = new game.SceneEvent(game.SceneEvent.ChangeScene);
            _this.gameMapArray = [];
            _this.isTouching = false;
            _this.orientationObj = null;
            _this.skinName = "resource/eui_skins/mySkins/gamePlayingSkin.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
            return _this;
        }
        // 添加到舞台
        GamePlaying.prototype.onAdded = function (e) {
            console.log('play onAdded');
            this.sceneEvent.eventType = game.SceneEvent.GAME_OVER;
            this.gameBg.width = game.Store.stageW;
            this.gameBg.height = game.Store.stageH;
            //this.gameBg.y = 0;
            this.gameBgClone.width = game.Store.stageW;
            this.gameBgClone.height = game.Store.stageH;
            this.gameBgClone2.width = game.Store.stageW;
            this.gameBgClone2.height = game.Store.stageH;
            this.gameBgClone3.width = game.Store.stageW;
            this.gameBgClone3.height = game.Store.stageH;
            //this.gameBgClone.y = -2*Store.stageH;
            // 车的位置，保持在屏幕下方
            this.gameCar.x = game.Store.stageW / 2 - this.gameCar.width / 2;
            this.gameCar.y = game.Store.stageH - this.gameCar.height - 100;
            // this.gameCar.y = 977,  this.gameCar.height = 159, Store.stageH = 1136。
            console.log(game.Store.stageH);
            // 先拼接一段路，以便开始的路比较长
            var bg = null;
            bg = new game.MoveUtil(this.gameBgClone, false);
            this.gameBgClone.y = 0;
            bg.startPos = new egret.Point(0, 0);
            bg.endPos = new egret.Point(0, 3 * game.Store.stageH);
            this.gameMapArray.push(bg);
            // 再拼接带河流的路
            bg = new game.MoveUtil(this.gameBg, false);
            this.gameBg.y = -game.Store.stageH;
            bg.startPos = new egret.Point(0, -game.Store.stageH);
            bg.endPos = new egret.Point(0, 2 * game.Store.stageH);
            this.gameMapArray.push(bg);
            // 在河流后面再拼2段路
            // 第一段
            bg = new game.MoveUtil(this.gameBgClone2, false);
            this.gameBgClone2.y = -2 * game.Store.stageH;
            bg.startPos = new egret.Point(0, -2 * game.Store.stageH);
            bg.endPos = new egret.Point(0, game.Store.stageH);
            this.gameMapArray.push(bg);
            // 第二段
            bg = new game.MoveUtil(this.gameBgClone3, false);
            this.gameBgClone3.y = -3 * game.Store.stageH;
            bg.startPos = new egret.Point(0, -3 * game.Store.stageH);
            bg.endPos = new egret.Point(0, 0);
            this.gameMapArray.push(bg);
            console.log(this.gameMapArray);
            this.gameMapArray[0].getDistance(true); //这里只需要一个设置为true就可以。
            // this.addEventListener(egret.Event.ENTER_FRAME, this.startAnimationFrame, this);
            // 陀螺仪
            // 创建 DeviceOrientation 类
            this.orientationObj = new egret.DeviceOrientation();
            ;
            // 添加事件监听器
            this.orientationObj.addEventListener(egret.Event.CHANGE, this.startAnimation, this);
            //开始监听设备方向变化
            this.orientationObj.start();
            // 添加音效--发动机
            // var sound:egret.Sound = RES.getRes("sound_mp3");
            var sound = RES.getRes("soundCar_m4a");
            // play() 方法播放音频，有2个参数。startTime：声音开始播放的位置，默认为0。loops：声音播放的次数，小于等于0均为无限循环播放，大于0按照对应的值播放次数。
            var channel = sound.play(0, -1);
            this.soundChannel = channel;
            this.soundChannel.volume = 1;
        };
        // 从舞台移除
        GamePlaying.prototype.onRemoved = function (e) {
            console.log('onRemoved--gamePlaying');
            this.resetData();
        };
        // 遇到河流处理
        GamePlaying.prototype.isHitRiver = function () {
            this.gameCar.scaleX = 0.8;
            this.gameCar.scaleY = 0.8;
        };
        // 跨越河流处理
        GamePlaying.prototype.isAcrossRiver = function () {
            egret.Tween.get(this.gameCar).to({ scaleX: 0.8, scaleY: 0.8 }, 100, egret.Ease.backIn);
            game.Store.gameResult = true;
            this.onGameOver();
        };
        // 落水处理
        GamePlaying.prototype.isFallInRiver = function () {
            // egret.Tween.get(this.gameCar).to({ scaleX: 0, scaleY: 0 },100,egret.Ease.backIn);
            // 添加音效--落水
            var soundFallInRiver = RES.getRes("soundFallInRiver_mp3");
            var channelFallInRiver = soundFallInRiver.play(0, 1);
            this.soundChannelFallInRiver = channelFallInRiver;
            game.Store.gameResult = false;
            game.Store.failReason = 1;
            this.onGameOver();
        };
        // 重置数据
        GamePlaying.prototype.resetData = function () {
            this.gameBg.y = -game.Store.stageH;
            this.gameBgClone.y = 0;
            this.gameBgClone2.y = -2 * game.Store.stageH;
            this.gameBgClone3.y = -3 * game.Store.stageH;
            game.Store.distanceLength = 0;
            game.Store.currentSpeedY = 0;
            game.Store.isGameOver = false;
            // Store.failReason = 1;
            this.gameCar.scaleX = 1;
            this.gameCar.scaleY = 1;
            this.soundChannel = null;
            if (this.orientationObj && this.orientationObj.removeEventListener) {
                this.orientationObj.removeEventListener(egret.Event.CHANGE, this.startAnimation, this);
            }
            this.orientationObj = null;
            // this.removeEventListener(egret.Event.ENTER_FRAME, this.startAnimationFrame, this);
        };
        // 游戏结束抛事件
        GamePlaying.prototype.onGameOver = function () {
            if (this.soundChannel && this.soundChannel.stop) {
                this.soundChannel.stop();
            }
            game.ViewManager.getInstance().dispatchEvent(this.sceneEvent);
            this.resetData();
        };
        GamePlaying.prototype.startAnimationFrame = function () {
            // 检测游戏是否结束
            if (game.Store.isGameOver) {
                this.onGameOver();
            }
            // 检测是否遇到河流
            if (game.Store.distanceLength >= 1000) {
                this.isHitRiver();
            }
            // 检测是否落水
            if (game.Store.distanceLength > 1000 && game.Store.distanceLength < 2000) {
                this.isFallInRiver();
            }
            // 检测是否跨越河流，河流宽200，车身长159，所以是300 + 359 取1000
            if (game.Store.distanceLength >= 2000) {
                this.isAcrossRiver();
            }
            // alert(e.beta);
            var random = Math.random();
            var _aSpeed = 0.1;
            if (random > 0.5) {
                _aSpeed = random * 5;
            }
            else {
                _aSpeed = -random;
            }
            // 调节音量
            if (this.soundChannel && this.soundChannel.volume >= 0) {
                this.soundChannel.volume = this.soundChannel.volume + _aSpeed;
            }
            this.gameMapArray.forEach(function (item) {
                item.onEnterFrame(_aSpeed);
            });
        };
        /**
         * 描述文件加载成功，开始播放动画
         * Description file loading is successful, start to play the animation
         */
        GamePlaying.prototype.startAnimation = function (e) {
            // 检测游戏是否结束
            if (game.Store.isGameOver) {
                this.onGameOver();
            }
            // 检测是否遇到河流
            if (game.Store.distanceLength >= 825) {
                this.isHitRiver();
            }
            if (game.Store.currentSpeedY == 0) {
                if (game.Store.distanceLength > 825 && game.Store.distanceLength < 1050) {
                    // 检测是否落水
                    this.isFallInRiver();
                }
                else if (game.Store.distanceLength >= 1050 && game.Store.distanceLength <= game.Store.targetDistance) {
                    // 检测是否跨越河流
                    this.isAcrossRiver();
                }
            }
            if (game.Store.distanceLength >= game.Store.targetDistance) {
                game.Store.gameResult = false;
                game.Store.failReason = 2;
                this.onGameOver();
            }
            var _aSpeed = -Math.floor(e.beta - 50) / 20;
            // 调节音量
            if (this.soundChannel && this.soundChannel.volume >= 0) {
                var _aSound = _aSpeed > 0 ? 0.1 : -0.05;
                this.soundChannel.volume = this.soundChannel.volume + _aSound;
            }
            else if (this.soundChannel && this.soundChannel.volume < 0) {
                this.soundChannel.volume = 0;
            }
            // document.getElementById('myConsole2').innerHTML = 'distance: ' + Store.distanceLength.toString();
            this.gameMapArray.forEach(function (item) {
                item.onEnterFrame(_aSpeed);
            });
        };
        return GamePlaying;
    }(eui.Component));
    game.GamePlaying = GamePlaying;
    __reflect(GamePlaying.prototype, "game.GamePlaying");
})(game || (game = {}));
