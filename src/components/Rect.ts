module com {
	export class Rect extends eui.Group {
		private w: number
		private r1: eui.Image
		private r2: eui.Image
		private r3: eui.Image
		public constructor() {
			super()
			this.init()
			this.cacheAsBitmap = true
		}
		private init(): void {
			this.r1 = new eui.Image()
			this.r1.source = 'rect_0_png'
			this.r1.y = 10
			this.r1.horizontalCenter = 0
			this.r2 = new eui.Image()
			this.r2.source = 'rect_1_png'
			this.r2.y = 28

			this.r3 = new eui.Image()
			this.r3.source = 'rect_1_png'

			this.addChild(this.r1)
			this.addChild(this.r2)
			this.addChild(this.r3)
		}
		public setSize(w: number): void {
			this.r1.width = w - 6
			this.r2.width = this.r3.width = w
		}
	}
}