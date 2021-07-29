<template>
	<view>
		<view class="searchBar">
			<u-search
				placeholder="热门课程名称/搜索热词"
				:show-action="showAction"
				v-model="keyword"
				@focus="focus"
				@custom="select(keyword)"
				@search="select(keyword)"
				@change="change"
				
			></u-search>
		</view>
		<view class="history" v-show="!keyword && searchBarShow">
			<view class="flex justify-between">
				<text>历史搜索</text>
				<u-icon name="trash" color="#DADADA"></u-icon>
			</view>
			<view class="history-tagList flex">
				<view class="history-tagList-tag" v-for="(lab, idx) in search_list" :key="idx" @click="select(lab)">{{ lab }}</view>
			</view>
		</view>
		<view class="searchBar-content" v-show="keyword && searchBarShow">
			<view class="searchBar-content-box">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'search',
	props: {
		showAction: {
			type: Boolean,
			default: false
		},
		searchBarShow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			keyword: '',
			search_list: uni.getStorageSync('search_list') || []
		}
	},
	methods: {
		// 输入框获得焦点
		focus() {
			this.$emit('focus')
		},
		// 右侧控件
		custom() {
			this.keyword = ''
			this.$emit('custom')
		},
		// 历史记录点击
		select(e) {
			this.keyword = e
			this.$emit('select', e)
		},
		change(e) {
			this.$emit('change', e)
		}
	}
}
</script>

<style lang="scss" scoped>
.searchBar {
	position: relative;
	padding: 20rpx 30rpx;
	background-color: #fff;
}

.history {
	width: 750rpx;
	height: calc(100vh - 104rpx);
	background-color: #fff;
	padding: 0 30rpx;
	font-size: 28rpx;
	color: #333;

	&-tagList {
		margin-top: 20rpx;

		&-tag {
			padding: 4rpx 15rpx;
			background-color: #f4f4f4;
			margin-right: 20rpx;
			border-radius: 24rpx;
		}
	}
}

.searchBar-content {
	width: 750rpx;
	height: calc(100vh - 104rpx);
	background-color: #fff;
	padding: 0 30rpx;
	font-size: 28rpx;
	color: #333;
	&-box {
		border: 1px solid #d4d4d4;
	}
}
</style>
