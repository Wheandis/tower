module com {
	function getParticleByRes(json: string, texture: string): particle.GravityParticleSystem {
		return new particle.GravityParticleSystem(RES.getRes(texture), RES.getRes(json))
	}
	export class Particle extends egret.Sprite {
		private effect: particle.GravityParticleSystem
		private note: egret.Bitmap
		public constructor() {
			super()
			this.effect = getParticleByRes('effect_particle_json', 'star_0_png')
			this.addChild(this.effect)
			this.note = new egret.Bitmap()
			this.addChild(this.note)
		}
		public async show(props: any = {}): Promise<any> {
			this.alpha = 1
			const {type = 'perfect', w = 200, time = 500} = props
			let icon
			if (type === 'perfect') {
				icon = 'star_0_png'
				this.note.texture = RES.getRes('perfect_png')
			} else {
				icon = 'star_1_png'
				this.note.texture = RES.getRes('good_png')
			}
			this.note.anchorOffsetX = this.note.width >> 1
			this.note.anchorOffsetY = this.note.height >> 1
			this.note.scaleX = this.note.scaleY = this.note.alpha = 0

			this.effect.changeTexture(RES.getRes(icon))
			this.effect['emitterXVariance'] = w
			this.effect.maxParticles = w / 10 | 0
			this.effect.start(time)
			await new Promise((resolve, reject) => {
				egret.Tween.get(this.note).to({
					alpha: 1,
					scaleX: 1,
					scaleY: 1
				}, 200).to({
					alpha: 0
				}, time - 200).call(resolve)
			})
			this.parent && this.parent.removeChild(this)
		}
	}
}