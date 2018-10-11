var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     *
     * @author gn
     * 游戏状态
     */
    var Store = (function () {
        function Store() {
        }
        Store.gameResult = false; //默认为true,表示是成功，继续挑战；false表示失败，再试一次
        Store.failReason = 1; //失败原因，默认为1,表示掉水里了，如果为2表示飞出去了
        Store.distanceLength = 0; //记录走过的路程距离
        Store.targetDistance = 1350; //目标距离
        // public static stageH:number = 910;//舞台高
        Store.stageH = 1080; //舞台高
        Store.stageW = 640; //舞台宽
        Store.currentSpeedY = 0; //当前车速度
        Store.isGameOver = false; //游戏结束状态
        return Store;
    }());
    game.Store = Store;
    __reflect(Store.prototype, "game.Store");
})(game || (game = {}));
