module game {
    /**
	 *
	 * @author gn
	 * 游戏进行中
	 */
	export class GamePlaying extends eui.Component{
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/mySkins/gamePlayingSkin.exml";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
		}

		private sceneEvent: SceneEvent = new SceneEvent(SceneEvent.ChangeScene);
		public gameBg: eui.Image;
		public gameBgClone: eui.Image;
		public gameBgClone2: eui.Image;
		public gameBgClone3: eui.Image;
		public gameCar: eui.Image;
		public gameMapArray: any[] = [];

		private isTouching: boolean = false;

		private orientationObj: any = null;

    	private soundChannel:egret.SoundChannel;
		private soundChannelFallInRiver:egret.SoundChannel;



		// 添加到舞台
		private onAdded(e:egret.Event) {
			console.log('play onAdded');
			this.sceneEvent.eventType = SceneEvent.GAME_OVER;
			this.gameBg.width = Store.stageW;
			this.gameBg.height = Store.stageH;

			this.gameBgClone.width = Store.stageW;
			this.gameBgClone.height = Store.stageH;

			this.gameBgClone2.width = Store.stageW;
			this.gameBgClone2.height = Store.stageH;

			this.gameBgClone3.width = Store.stageW;
			this.gameBgClone3.height = Store.stageH;
			// 车的位置，保持在屏幕下方
			this.gameCar.x = Store.stageW/2 - this.gameCar.width/2;
			this.gameCar.y = Store.stageH - this.gameCar.height - 100;
			// 先拼接一段路，以便开始的路比较长
			let bg = null;
			bg = new MoveUtil(this.gameBgClone, false);
			this.gameBgClone.y = 0;
			bg.startPos = new egret.Point(0, 0);
			bg.endPos = new egret.Point(0, 3*Store.stageH);
			this.gameMapArray.push(bg);
			// 再拼接带河流的路
			bg = new MoveUtil(this.gameBg, false);
			this.gameBg.y = -Store.stageH;
			bg.startPos = new egret.Point(0, -Store.stageH);
			bg.endPos = new egret.Point(0, 2*Store.stageH);
			this.gameMapArray.push(bg);
			// 在河流后面再拼2段路
			// 第一段
			bg = new MoveUtil(this.gameBgClone2, false);
			this.gameBgClone2.y = -2*Store.stageH;
			bg.startPos = new egret.Point(0, -2*Store.stageH);
			bg.endPos = new egret.Point(0, Store.stageH);
			this.gameMapArray.push(bg);
			// 第二段
			bg = new MoveUtil(this.gameBgClone3, false);
			this.gameBgClone3.y = -3*Store.stageH;
			bg.startPos = new egret.Point(0, -3*Store.stageH);
			bg.endPos = new egret.Point(0, 0);
			this.gameMapArray.push(bg);
			console.log(this.gameMapArray);

			this.gameMapArray[0].getDistance(true); //这里只需要一个设置为true就可以。
			
			// 陀螺仪
			// 创建 DeviceOrientation 类
			this.orientationObj = new egret.DeviceOrientation();;
			// 添加事件监听器
			this.orientationObj.addEventListener(egret.Event.CHANGE,this.startAnimation,this);
			//开始监听设备方向变化
        	this.orientationObj.start();
			
			// 添加音效--发动机
			var sound:egret.Sound = RES.getRes("soundCar_m4a");
			// play() 方法播放音频，有2个参数。startTime：声音开始播放的位置，默认为0。loops：声音播放的次数，小于等于0均为无限循环播放，大于0按照对应的值播放次数。
			let channel:egret.SoundChannel = sound.play(0, -1);
			this.soundChannel = channel;
			this.soundChannel.volume = 1;

		}

		// 从舞台移除
		private onRemoved(e:egret.Event) {
			console.log('onRemoved--gamePlaying');
			this.resetData();
		}

		// 遇到河流处理
		private isHitRiver(): void {
			this.gameCar.scaleX = 0.8;
			this.gameCar.scaleY = 0.8;
		}

		// 跨越河流处理
		private isAcrossRiver(): void {
			egret.Tween.get(this.gameCar).to({ scaleX: 0.8, scaleY: 0.8 },100,egret.Ease.backIn);
			Store.gameResult = true;
			this.onGameOver();
		}

		// 落水处理
		private isFallInRiver(): void {
			// 添加音效--落水
			var soundFallInRiver:egret.Sound = RES.getRes("soundFallInRiver_mp3");
			let channelFallInRiver:egret.SoundChannel = soundFallInRiver.play(0, 1);
			this.soundChannelFallInRiver = channelFallInRiver;

			Store.gameResult = false;
			Store.failReason = 1;
			this.onGameOver();
		}

		// 重置数据
		private resetData() {
			this.gameBg.y = -Store.stageH;
			this.gameBgClone.y = 0;
			this.gameBgClone2.y = -2*Store.stageH;
			this.gameBgClone3.y = -3*Store.stageH;
			Store.distanceLength = 0;
			Store.currentSpeedY = 0;
			Store.isGameOver = false;
			this.gameCar.scaleX = 1;
			this.gameCar.scaleY = 1;
			this.soundChannel = null;
			if (this.orientationObj && this.orientationObj.removeEventListener) {
				this.orientationObj.removeEventListener(egret.Event.CHANGE,this.startAnimation,this);
			}
			this.orientationObj = null;
		}

		// 游戏结束抛事件
		private onGameOver() {
			if (this.soundChannel && this.soundChannel.stop) {
				this.soundChannel.stop();
			}

			ViewManager.getInstance().dispatchEvent(this.sceneEvent);
			this.resetData();
		}

		/**
		 * 描述文件加载成功，开始播放动画
		 * Description file loading is successful, start to play the animation
		 */
		private startAnimation(e:egret.OrientationEvent): void {
			
			// 检测游戏是否结束
			if (Store.isGameOver) {
				this.onGameOver();
			}

			// 检测是否遇到河流
			if (Store.distanceLength >= 870) {
				this.isHitRiver();
			} 

			if (Store.currentSpeedY == 0) {
				if (Store.distanceLength > 850 && Store.distanceLength < 1070) {
					// 检测是否落水
					this.isFallInRiver();
				} else if (Store.distanceLength >= 1070 && Store.distanceLength <= Store.targetDistance) {
					// 检测是否跨越河流
					this.isAcrossRiver();
				}
			}

			if (Store.distanceLength >= Store.targetDistance) {
				Store.gameResult = false;
				Store.failReason = 2;
				this.onGameOver();
			}
			let _aSpeed = -Math.floor(e.beta-50)/20;
			// 调节音量
			if (this.soundChannel && this.soundChannel.volume >= 0){
				var _aSound = _aSpeed > 0 ? 0.1 : -0.05;
				this.soundChannel.volume = this.soundChannel.volume + _aSound;
			} else if (this.soundChannel && this.soundChannel.volume < 0) {
				this.soundChannel.volume = 0;
			}
			this.gameMapArray.forEach(item => {
				item.onEnterFrame(_aSpeed);
			})
		}
	}
}