module game {
    /**
	 *
	 * @author gn
	 * 场景舞台
	 */
	export class ViewManager extends egret.Sprite{
		public constructor() {
			super();
		}

		private static instance: ViewManager;
		private gameStart: GameStart;
		private gamePlaying: GamePlaying;
		private gameOver: GameOver;

		// 获取单例
		public static getInstance(): ViewManager {
			if (ViewManager.instance == null) {
                ViewManager.instance = new ViewManager();
            }
            return ViewManager.instance;
		}

		// 开始
		public start() {
			this.init();
			this.initListener();
		}

		// 初始化数据
		private init() {
			this.gameStart = new GameStart();
			this.gamePlaying = new GamePlaying();
			this.gameOver = new GameOver();
			this.addChild(this.gameStart);
			// this.addChild(this.gamePlaying);
			// this.addChild(this.gameOver);
		}

		// 初始化事件监听
		private initListener() {
			this.addEventListener(SceneEvent.ChangeScene, this.onChangeScene, this);
		}

		// 场景切换
		private onChangeScene(e: SceneEvent) {
			// 切换到gameover时要延迟1s，让玩家看清楚现在小车的情况
			if (e.eventType === SceneEvent.GAME_OVER) {
				setTimeout(()=> {
					this.removeChildren();
					this.addChild(this.gameOver);
				}, 500);
			} else {
				// 移除所有子对象
				this.removeChildren();
				// 判断事件，接下来添加场景到舞台展现
				switch (e.eventType) {
					case SceneEvent.GAME_START:
						this.addChild(this.gameStart);
						break;

					case SceneEvent.GAME_PLAYING:
						this.addChild(this.gamePlaying);
						break;
					
					default: break;
				}
			}
			
		}
	}
}