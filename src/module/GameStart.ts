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
		public selectCar1: eui.Image;
		public selectCar2: eui.Image;
		public selectCar3: eui.Image;

		// 添加到舞台
		private onAdded(e:egret.Event) {
			console.log('onAdded');
			this.sceneEvent.eventType = SceneEvent.GAME_PLAYING;
			this.gameBg.width = Store.stageW;
			this.gameBg.height = Store.stageH;
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

		// 摩托车在中间1
		private car1center(e: egret.TouchEvent) {
			this.selectCar1.x = 250;
			this.selectCar2.x = 50;
			this.selectCar3.x = 440;
		}

		// 蓝色跑车在中间2
		private car2center(e: egret.TouchEvent) {
			this.selectCar1.x = 50;
			this.selectCar2.x = 250;
			this.selectCar3.x = 440;
		}

		// 黄色跑车在中间3
		private car3center(e: egret.TouchEvent) {
			this.selectCar1.x = 50;
			this.selectCar2.x = 440;
			this.selectCar3.x = 250;
		}
	}
}