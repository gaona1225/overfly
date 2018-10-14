module game {
	/**
	 *
	 * @author gn
	 * 游戏状态
	 */
	export class Store {

        public static gameResult: boolean = false; //默认为true,表示是成功，继续挑战；false表示失败，再试一次

		public static failReason: Number = 1; //失败原因，默认为1,表示掉水里了，如果为2表示飞出去了
		
		public static distanceLength: number = 0;//记录走过的路程距离
		
		public static targetDistance:number = 1200;//目标距离

		public static stageH:number = 1083;//舞台高
		
		public static stageW:number = 640;//舞台宽
		
		public static currentSpeedY:number = 0;//当前车速度
		
		public static isGameOver:boolean = false;//游戏结束状态

		public static gameTimer:number = 0; //游戏时间
	}
}
