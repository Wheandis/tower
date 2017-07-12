module model {
	function setStorage(key: string, value: any): void {
		localStorage.setItem(key, value)
	}
	function getStorage(key): number {
		let value = localStorage.getItem(key) || '0'
		return parseInt(value)
	}
	export class Data {
		private static SCORE_KEY: string = 'ttt_best_score'
		private static GOLD_KEY: string = 'ttt_gold'
		public static ins: Data
		public constructor() {
			Data.ins = this
			// this.BestScore = parseInt(localStorage.getItem(Data.SCORE_KEY)) || 0
			this.setBest()
			this.addGold(0)
		}
		/**
		 * 建筑的列表
		 * type：类型
		 * x：x轴位置
		 * w：宽度
		 */
		@mobx.observable
		public List: Array<any> = []

		/**
		 * 游戏状态
		 * stop 停止
		 * playing 进行中
		 */
		@mobx.observable
		public Status: string = 'playing'

		/**
		 * 最高分
		 */
		@mobx.observable
		public BestScore: number = 0
		/**
		 * 金币
		 */
		@mobx.observable
		public GoldNum: number = 0
		/**
		 * 添加一个层
		 */
		@mobx.action.bound
		public add(i: any): void {
			this.List.push(i)
		}
		/**
		 * 删除一个层（最顶层）
		 */
		@mobx.action.bound
		public pop(): any {
			return this.List.pop()
		}

		@mobx.action.bound
		public clear(): void {
			this.List.splice(0)
		}
		/**
		 * 保留前几层
		 */
		@mobx.action.bound
		public splice(num: number): void {
			this.List.splice(num)
		}
		@mobx.action.bound
		public setStatus(status: string): void {
			this.Status = status
		}
		@mobx.action.bound
		public setBest(): void {
			let score = Math.max(getStorage(Data.SCORE_KEY), this.List.length)
			setStorage(Data.SCORE_KEY, score)
			this.BestScore = score
		}

		@mobx.action.bound
		public addGold(num: number): void {
			let gold = getStorage(Data.GOLD_KEY)
			gold = Math.max(0, gold + num)
			this.GoldNum = gold
			setStorage(Data.GOLD_KEY, gold)
		}
	}
}