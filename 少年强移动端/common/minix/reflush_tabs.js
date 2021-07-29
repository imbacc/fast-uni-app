export default {
    data() {
        return {
            show_tabs: false
        };
    },
	onShow() {
		this.show_tabs = true
	},
	onHide() {
		this.show_tabs = false
	}
}