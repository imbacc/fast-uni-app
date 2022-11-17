export default {
	uniEmit(key: string, val: any) {
		uni.$emit(key, val)
	},

	uniOn(key: string, fun: (result: any) => void) {
		uni.$off(key, fun)
		uni.$on(key, fun)
	},

	uniOff(key: string, fun: (result: any) => void) {
		uni.$off(key, fun)
	},

	uniOnce(key: string, fun: (result: any) => void) {
		uni.$once(key, fun)
	}
}
