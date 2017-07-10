module com {
	// 尺寸 364 * 69
	export class Block extends eui.Component implements eui.UIComponent {
		private _props: any = {}
		private info: any = {
			w1: 0,
			w2: 0,
			w3: 0,

			x1: 0,
			x2: 0,
			x3: 0
		}
		public set props(p: any) {
			this._props = { ...this.props, ...p }
			const {w, x} = this._props
			this.info.w1 = w - 6
			this.info.w2 = w
			this.info.w3 = w - 12
			this.info.x3 = w - 10

			this.info.x1 = x
			this.info.x2 = x + 6

		}
		public get props(): any {
			return this._props
		}
		public constructor() {
			super()
			// this.cacheAsBitmap = true
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance)
		}


		protected childrenCreated(): void {
			super.childrenCreated()
		}
	}
}