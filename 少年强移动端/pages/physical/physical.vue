<template>
	<view class="main">
		<student-info selShow />
		<skeleton v-if="!sel_student_com.id" />
		<skeleton v-else-if="loading" />
		<template v-else-if="!loading && !growup_res"></template>
		<template v-else-if="!round_chartData && !colum_chartData1 && !colum_chartData2 && !colum_chartData3"></template>
		<template v-else>
			<view class="chart">
				<!-- 筛选 -->
				<view class="tabs flex justify-between">
					<view class="filtrate">
						<u-dropdown :border-bottom="false">
							<u-dropdown-item v-model="left_cur" :title="left_title" :options="left_option" @change="left_change" />
						</u-dropdown>
					</view>
					<u-tabs
						:list="right_list"
						:current="right_cur"
						style=" flex-grow:1"
						font-size="28"
						active-color="#E62234"
						@change="right_change"
					></u-tabs>
				</view>
				<!-- 图表 -->
				<view class="physical">
					<view class="physical-time">测试时间 : {{ cur_avg_info && cur_avg_info.time_format }}</view>
					<view class="charts-box">
						<qiunDataCharts lineType="dash" type="diyradar" :chartData="round_chartData" background="none" />
					</view>
				</view>
				<!-- 成绩 -->
				<view class="grade">
					<wyb-table
						ref="table"
						:headers="headers"
						:contents="contents"
						width="690rpx"
						header-bg-color="#F3F3F3"
						first-col-bg-color="#fff"
						border-color="none"
						:show-vert-border="false"
						header-ft-color="#555555"
						:font-size="[26, 28]"
						content-ft-color="#555555"
						first-line-fixed
						:default-col-width="173"
					/>
					<view v-if="cur_avg_info" class="grade-title">
						<view class="flex_align">
							<u-icon name="star-fill" color="#D81E06" />
							<view class="ml10 flex_align">
								综合平均得分:
								<view class="fbold">{{ cur_avg_info.total_avg_score }}分</view>
							</view>
						</view>
						<view class="flex_align">
							<u-icon name="star-fill" color="#D81E06" />
							<view class="ml10 flex_align">
								最高得分:
								<view class="fbold">{{ cur_avg_info.max_score }}分</view>
							</view>
						</view>
						<view class="flex_align">
							<u-icon name="star-fill" color="#D81E06" />
							<view class="ml10 flex_align">
								最低得分:
								<view class="fbold">{{ cur_avg_info.min_score }}分</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="chart-box">
				<view class="chart-box-title">较上一次测试的对比分析</view>
				<qiunDataCharts type="diycolumn" :chartData="colum_chartData1" background="none" />
				<view class="chart-box-text">
					<view>对比分析说明：</view>
					<view>{{ (colum_chartData1 && colum_chartData1.explain_info) || '' }}</view>
				</view>
			</view>
			<view class="chart-box">
				<view class="chart-box-title">较上一次测试的对比分析</view>
				<qiunDataCharts
					type="diycolumn"
					:chartData="colum_chartData2"
					:opts="{ color: ['#17993F', '#FFAC06'] }"
					background="none"
				/>
				<view class="chart-box-text">
					<view>对比分析说明：</view>
					<view>{{ (colum_chartData2 && colum_chartData2.explain_info) || '' }}</view>
				</view>
			</view>
			<view class="chart-box">
				<view class="chart-box-title">较上一次测试的对比分析</view>
				<qiunDataCharts
					type="diycolumn"
					:chartData="colum_chartData3"
					background="none"
					:opts="{ color: ['#09A690', '#BA2300'] }"
				/>
				<view class="chart-box-text">
					<view>对比分析说明：</view>
					<view>{{ (colum_chartData3 && colum_chartData3.explain_info) || '' }}</view>
				</view>
			</view>
			<view v-if="!create_loading" class="but" @click="savePic">
				<u-icon name="photo" />
				保存手机
			</view>
		</template>
	</view>
</template>

<script>
import studentInfo from '@/components/studentInfo.vue'
import qiunDataCharts from '@/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue'
import wybTable from '@/components/wyb-table/wyb-table.vue'
import html2canvas from './html2canvas.js'

export default {
	components: {
		studentInfo,
		qiunDataCharts,
		wybTable
	},
	data() {
		return {
			// 测试次数
			loading: true,
			left_cur: 0,
			left_title: '',
			left_option: [],
			right_cur: 0,
			right_list: [],
			// 成绩表格
			headers: [],
			contents: [],
			// 雷达
			round_chartData: null,
			// 对比上次测试数据 柱状图
			colum_chartData1: null,
			colum_chartData2: null,
			colum_chartData3: null,
			growup_res: null,
			cur_avg_info: null,
			lazy_round: false,
			create_loading: false
		}
	},
	computed: {
		sel_student_com() {
			return this.is_vuex.state.course_vuex.sel_student
		}
	},
	onShow() {
		this.left_cur = 0
		this.right_cur = 0
		this.left_title = ''
		this.headers = []
		this.contents = []
		this.left_option = []
		this.right_list = []
		this.right_list = []
		this.growup_res = []
		this.round_chartData = null
		this.colum_chartData1 = null
		this.colum_chartData2 = null
		this.colum_chartData3 = null
		this.cur_avg_info = null
		this.loading = true
		this.init()
		this.init_round_one()
	},
	onPageScroll({ scrollTop }) {
		if (!this.lazy_round && scrollTop >= 150) {
			this.lazy_round = true
			this.init_round_one('vs_yester_year')
			this.init_round_one('vs_class_avg')
		}
	},
	methods: {
		async init() {
			this.is_api('growup_api/radar_map').then((res) => {
				if (res) {
					this.growup_res = res
					this.cur_data(true)
				} else {
					this.is_tools.to_msg('没有数据记录!')
				}
				this.loading = false
			})
		},
		async init_round_one(name = 'vs_up_history') {
			// ready go
			const list = ['vs_up_history', 'vs_yester_year', 'vs_class_avg']
			this.is_api(`growup_api/${name}`).then((res) => {
				if (res) {
					this[`colum_chartData${list.findIndex((f) => f === name) + 1}`] = res
				}
			})
		},
		option_change(res, init = false) {
			let key_list = Object.keys(res),
				option_list = [],
				right_list = []
			key_list.forEach((key, idx) => option_list.push({ label: key, value: idx }))
			this.right_list = right_list
			this.left_option = option_list
			if (init) this.left_cur = this.left_option.length - 1
			const cur_left_list = res[key_list[this.left_cur]]
			cur_left_list.forEach((info, idx) => right_list.push({ name: `第${idx + 1}次` })) // info.extra.time_format

			this.left_title = option_list[this.left_cur].label
			this.right_list = right_list
			return cur_left_list
		},
		cur_data(init = false) {
			if (!this.growup_res) return
			const res = this.growup_res
			const cur_left_list = this.option_change(res, init)

			let left_cur = this.left_cur,
				right_cur = this.right_cur,
				last = cur_left_list,
				categories = Array.from(last[right_cur].categories, ({ value }) => value),
				series = [],
				header = [{ label: '项目名称', key: 'name' }],
				contents = [{ name: '描述' }, { name: '成绩' }]

			last[right_cur].categories.forEach((info, idx) => {
				header.push({
					label: info.value,
					key: `val${idx}`
				})
				contents[0][`val${idx}`] = info.intro
			})

			last[right_cur].series.data.forEach((info, idx) => {
				contents[1][`val${idx}`] = info
			})

			// 圆形雷达
			series = [
				{
					name: '成绩',
					data: Array.from(last[right_cur].series.data, (n) => parseInt(n))
				}
			]

			this.cur_avg_info = last[right_cur].extra
			this.headers = header
			this.contents = contents
			this.round_chartData = { categories, series }
		},
		left_change(e) {
			this.left_cur = e
			this.option_change(this.growup_res)
		},
		right_change(e) {
			this.right_cur = e
			this.cur_data()
		},
		savePic() {
			this.create_loading = true
			uni.showLoading({ title: '生成中...' })
			window.scrollTo(0, 0)
			html2canvas(document.querySelector('.main'), { scale: 1 }).then((canvas) => {
				const contractData = canvas.toDataURL('image/jpeg')
				uni.hideLoading()
				uni.previewImage({
					 current: 0,
					 urls: [contractData],
					 longPressActions: true
				})
				this.create_loading = false
			})
		}
	}
}
</script>

<style lang="scss" scoped>
/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
.charts-box {
	width: 100%;
	height: 300px;
}

.chart {
	margin-top: 20rpx;
	background-color: #fff;
	border-radius: 12rpx;
	overflow: hidden;
}

.tabs {
	background-color: #fff;
	border-bottom: 1px solid #e6e6e6;

	.filtrate {
		width: 170rpx;
		z-index: 99;
	}
}

.physical {
	&-time {
		font-size: 28rpx;
		color: #999;
		padding: 14rpx 20rpx;
	}
}

.grade {
	&-title {
		padding: 10rpx 30rpx;
		font-size: 26rpx;
		line-height: 1.5;
		color: #555;
		border-top: 1px solid #e6e6e6;
	}
}

.chart-box {
	margin-top: 20rpx;
	padding: 16rpx 25rpx;
	background-color: #fff;
	border-radius: 12rpx;

	&-title {
		font-size: 30rpx;
		color: #333;
		margin-bottom: 20rpx;
	}

	&-text {
		view:nth-child(1) {
			padding: 20rpx;
			font-size: 28rpx;
			color: #333;
			border-bottom: 1px solid #e6e6e6;
		}

		view:nth-child(2) {
			padding: 20rpx;
			font-size: 26rpx;
			color: #999;
		}
	}
}

.but {
	width: 100%;
	height: 90rpx;
	background-color: #e62234;
	border-radius: 42rpx;
	font-size: 36rpx;
	color: #fff;
	line-height: 90rpx;
	text-align: center;
	margin-top: 20rpx;
}

::v-deep .wyb-table-header-item {
	white-space: nowrap;
}

.ml10 {
	margin-left: 10rpx;
}

.fbold {
	font-weight: bold;
	margin-left: 5rpx;
}
</style>
