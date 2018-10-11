module game {
    /**
	 *
	 * @author gn
	 * 游戏开始
	 */
	export class GameStart extends eui.Component{
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/mySkins/gameStartSkin.exml";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
		}

		private sceneEvent: SceneEvent = new SceneEvent(SceneEvent.ChangeScene);
		public gameBg: eui.Image;

		// 添加到舞台
		private onAdded(e:egret.Event) {
			console.log('onAdded');
			this.sceneEvent.eventType = SceneEvent.GAME_PLAYING;
			this.gameBg.width = Store.stageW;
			this.gameBg.height = Store.stageH;
			this.gameBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayStart, this);
		}

		// 从舞台移除
		private onRemoved(e:egret.Event) {
			this.gameBg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlayStart,this);
		}

		// 点击继续游戏按钮
		private onPlayStart(e: egret.TouchEvent) {
			console.log('onPlayStart');
			ViewManager.getInstance().dispatchEvent(this.sceneEvent);
		}
	}
}