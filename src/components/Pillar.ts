module com {
	export class Pillar extends eui.Component implements eui.UIComponent {
		private gap: number = 0
		private _props: any = {}
		private container: eui.Group
		private collection: eui.ArrayCollection = new eui.ArrayCollection([])
		public set props(p: any) {
			this._props = { ...this.props, ...p }
			if (p && p.type === 'pillar') {
				this.render()
				this.addStuff()
			}
		}
		public get props(): any {
			return this._props
		}
		public constructor() {
			super()
		}
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance)
		}
		protected childrenCreated(): void {
			super.childrenCreated()
		}
		private render(): void {
			this.collection.removeAll()
			const {w, x} = this._props
			if (w < 33) {
				return
			}
			const n = Math.floor(w / 33)
			const f = n - 1 > 0 ? (w % 33) / (n - 1) : 0
			for (let i = 0; i < n; i++) {
				this.collection.addItem({ icon: 'pillar_1_png' })
			}
			this.gap = f
		}
		private addStuff(): void {
			if (!this.container) {
				return
			}
			this.container.numChildren && this.container.removeChildren()
			const res: Array<string> = ['cacti_png', 'grass_png', 'greenstripes_png', 'pinkbubbles_png', 'rabit_png']
			const n = this.collection.length * Math.random() | 0
			for (let i = 0, bitmap: eui.Image; i < n; i++) {
				bitmap = new eui.Image()
				if (Math.random() > 0.5) {
					bitmap.source = res[Math.random() * res.length | 0]
					bitmap.bottom = 0
				} else {
					bitmap.source = 'cuimianshu_png'
				}
				bitmap.x = Math.random() * this._props.w | 0
				this.container.addChild(bitmap)
			}
		}
	}
}