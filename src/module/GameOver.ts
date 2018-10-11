module game {
    /**
	 *
	 * @author gn
	 * 游戏结束
	 */
	export class GameOver extends eui.Component{
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/mySkins/gameOverSkin.exml";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
		}

		private sceneEvent: SceneEvent = new SceneEvent(SceneEvent.ChangeScene);
		public result: eui.Image;
		public failReasonMsg: eui.Label;
		public carMsg: eui.Label;

		private soundChannelSuccess:egret.SoundChannel;

		// 添加到舞台
		private onAdded(e:egret.Event) {
			this.sceneEvent.eventType = SceneEvent.GAME_START;

			if (Store.gameResult) {
				this.result.source = "success_jpg";
				this.failReasonMsg.text = '';
				// 添加音效--欢呼
				var soundSuccess:egret.Sound = RES.getRes("success_m4a");
				let channelSuccess:egret.SoundChannel = soundSuccess.play(0, 1);
				this.soundChannelSuccess = channelSuccess;
			} else {
				this.result.source = "fail_jpg";
				// 失败原因，默认为1,表示掉水里了，如果为2表示飞出去了
				switch (Store.failReason) {
					case 1:
						this.failReasonMsg.text = '掉水里啦！下次努力跨过河流哦';
						break;

					case 2:
						this.failReasonMsg.text = '飞出去啦！下次速度放慢点哦';
						break;
					
					default: break;
				}
			}

			this.result.width = Store.stageW;
			this.result.height = Store.stageH;

			this.failReasonMsg.left = Store.stageW/2 - this.failReasonMsg.width/2;
			this.failReasonMsg.top = 630;

			this.carMsg.left = Store.stageW/2 - this.carMsg.width/2;
			this.carMsg.bottom = 80;

			this.result.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlayAgain,this);
		}

		// 从舞台移除
		private onRemoved(e:egret.Event) {
			this.result.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlayAgain,this);
		}

		// 点击继续按钮
		private onPlayAgain(e: egret.TouchEvent) {
			document.location.reload();
			// ViewManager.getInstance().dispatchEvent(this.sceneEvent);
		}
	}
}