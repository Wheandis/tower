module model {
	export class Data {
		public static ins: Data
		public constructor() {
			Data.ins = this
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

		@mobx.action.bound
		public setStatus(status: string): void {
			this.Status = status
		}
	}
}