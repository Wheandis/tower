module model {
	export class Data {
		private static SCORE_KEY: string = 'ttt_best_score'
		public static ins: Data
		public constructor() {
			Data.ins = this
			// this.BestScore = parseInt(localStorage.getItem(Data.SCORE_KEY)) || 0
			this.setBest()
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
			const score = localStorage.getItem(Data.SCORE_KEY)
			if (score) {
				if (this.List.length > parseInt(score)) {
					localStorage.setItem(Data.SCORE_KEY, this.List.length + '')
					this.BestScore = this.List.length
				} else {
					this.BestScore = parseInt(score)
				}
			} else {
				localStorage.setItem(Data.SCORE_KEY, this.List.length + '')
				this.BestScore = this.List.length
			}
		}
	}
}