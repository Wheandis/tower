module com {
    export class Game extends eui.Component {
        // 当层级达到多少层时，停止上升
        public static STLAYER: number = 7
        // 空滑块的高度


        public eventLayer: eui.Group
        public undoBtn: eui.Button
        public keepBtn: eui.Button
        public restartBtn: eui.Button
        public moveLayer: eui.Group
        public scroll: eui.Scroller


        private gameInfo: any = {
            bestScore: 0,
            score: 0,
            gold: 0
        }

        private info: any = {
            scrollV: 0,
            emptyBlockHeight: 0,
            isShowFrontBg: false
        }

        private collection: eui.ArrayCollection = new eui.ArrayCollection([])
        public constructor() {
            super()
            new model.Data()
            this.info.emptyBlockHeight = 895 - 69 * Game.STLAYER
            this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this)
            this.skinName = 'resource/eui_skins/home.exml'
        }
        private onComplete(): void {
            // 实例化游戏逻辑
            new Manager(this)
        }
        /** 
         * 渲染函数
         */
        public async render(): Promise<any> {
            const length = model.Data.ins.List.length
            const l = this.collection.length
            let type = 'add'
            if (length) {
                if (length === l + 1) {
                    this.collection.addItemAt(model.Data.ins.List[l], 0)
                    type = 'add'
                } else if (length === l - 1) {
                    this.collection.removeItemAt(0)
                    type = 'minus'
                } else {
                    this.collection = new eui.ArrayCollection(model.Data.ins.List.reverse())
                }
            } else {
                this.collection.length && this.collection.removeAll()
                type = 'minus'
            }
            await this.scrollAnim(type)
            this.info.isShowFrontBg = !length
            this.gameInfo.score = length
        }
        /**
         * 滚动动画
         */
        private async scrollAnim(type): Promise<any> {
            const l = this.collection.length
            if (type === 'add') {
                if (l <= Game.STLAYER) {
                    return Promise.resolve()
                }
                this.info.scrollV = 69
            } else {
                if (l >= Game.STLAYER || l === 0) {
                    this.info.scrollV = -69
                } else if (l > 0) {
                    return Promise.resolve()
                }
            }
            await new Promise((resolve, reject) => {
                egret.Tween.get(this.info).to({
                    scrollV: 0
                }, 400).call(resolve)
            })
        }
    }
}