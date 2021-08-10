<script>
	import './index.css'
	export default {
		// #ifdef H5
		onLaunch: function() {
			const list = ['/']
			let name = false
			this.show()
			this.$router.beforeEach((to, from, next) => {
				name = list.includes(to.path) ? 'animation-after-index' : ''
				this.hide(name, next)
			})
			this.$router.afterEach((to) => {
				name = list.includes(to.path) ? 'animation-after-index' : ''
				let time = setTimeout(() => {
					clearTimeout(time)
					this.show(name)
				}, 50)
			})
		},
		methods: {
			hide(name, callback) {
				const doc = document.querySelector('uni-page')
				if (!doc) {
					callback && callback()
					return
				}
				const classList = doc.classList
				classList.add(name ? name : 'animation-before', 'animation-leave')
				classList.remove('animation-show')
				let time = setTimeout(() => {
					clearTimeout(time)
					classList.remove(name ? name : 'animation-before', 'animation-leave')
					callback && callback()
				}, 150)
			},
			show(name, callback) {
				const doc = document.querySelector('uni-page')
				if (!doc) {
					callback && callback()
					return
				}
				const classList = doc.classList
				// const classList = document.querySelector('uni-page').classList
				classList.add(name ? 'animation-before-index' : 'animation-before')
				let time = setTimeout(() => {
					clearTimeout(time)
					classList.add('animation-enter', name ? name : 'animation-after', 'animation-show')
					let t = setTimeout(() => {
						clearTimeout(t)
						classList.remove('animation-before', name ? name : 'animation-after', 'animation-enter')
						callback && callback()
					}, 150)
				}, 20)
			}
		},
		// #endif
	}
</script>
