<template>
	<view class="pack flex_column flex_between flex_align">
		<view class="input_div flex_center_align">
			<u-input v-model="name" />
		</view>

		<u-button class="input_button" :loading="loading" :hair-line="false" ripple shape="circle" @click="update_name">确认修改</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			name: '',
			loading: false
		}
	},
	computed: {
		user_com() {
			return this.is_vuex.state.user_vuex.user_info
		}
	},
	created() {
		const name = this.user_com.name
		this.name = name
	},
	methods: {
		update_name() {
			let name = this.name
			if (!name) {
				this.is_tools.to_msg('请正确填写!')
				return
			}
			this.loading = true
			this.is_api('user_api/edit_nickname', {}, { name }).then((res) => {
				this.loading = false
				const user = this.user_com
				user.name = name
				this.is_vuex.commit('user_vuex/set_user_info', user)
				this.is_tools.to_msg(res ? '修改成功' : '修改失败')
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./update.scss";
</style>
