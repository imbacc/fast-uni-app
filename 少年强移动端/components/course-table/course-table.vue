<template>
	<view>
		<view class="course_table">
			<scroll-view scroll-x :style="`height: ${85 + 104 * plan_json_list.length}rpx;`">
				<view class="course_head flex_align">
					<view class="course_head_lab flex_center_align">
						<image src="/static/images/courseDetail/time_ico.png" mode="aspectFill" />
					</view>
					<view class="course_top flex_align">
						<view class="course_top_lab flex_center_align" v-for="(head, index) in headers" :key="index">
							{{ head.label }}
						</view>
					</view>
				</view>
				<view class="course_body flex_row">
					<view class="frist_course">
						<view
							v-for="(info, index) of plan_json_list"
							:key="index"
							class="frist_course_lab flex_column flex_align"
						>
							<image class="sun_ico" src="/static/images/courseDetail/sun_ico.png" mode="aspectFill" />
							<view class="min_lab">{{ info.timePicker }}</view>
						</view>
					</view>
					<view v-for="(head, index) of headers" :key="index" class="content_course">
						<view
							v-for="(info, idx) of plan_json_list"
							:key="idx"
							v-if="course_render_com(info, head, idx)"
							class="min_course flex_center_align"
							:style="course_style_com(info, head, idx)"
						>
							<view class="min_plan flex_column flex_center_align" :style="plan_style_com(info, head, idx)">
								<view v-if="plan_style_com(info, head, idx) !== ''" class="plan_title u-line-2">{{ plan_info_name_com(info, head) }}</view>
								<view class="plan_time">{{ plan_info_com(info, head) }}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"course-table",
		data() {
			return {
				headers: [
					{
						label: '周一',
						key: 'Monday'
					},
					{
						label: '周二',
						key: 'Tuesday'
					},
					{
						label: '周三',
						key: 'Wednesday'
					},
					{
						label: '周四',
						key: 'Thursday'
					},
					{
						label: '周五',
						key: 'Friday'
					},
					{
						label: '周六',
						key: 'Saturday'
					},
					{
						label: '周日',
						key: 'Sunday'
					}
				],
				plan_json_list: []
			};
		},
		computed: {
			course_render_com() {
				return (plan, head, idx) => {
					let { key } = head, day = plan[key]
					return day && day.show === false ? false : true
				}
			},
			course_style_com() {
				return (plan, head, idx) => {
					let { key } = head, day = plan[key],
						result = `background:url('/static/images/courseDetail/df_ico.png');`
					if (day.num && parseInt(day.num) > 1) result += `height: ${day.num * 104}rpx;`
					if (day.id === '') return result
					return result
				}
			},
			plan_style_com() {
				return (plan, head, idx) => {
					let { key } = head, day = plan[key],
						result = `background: #D81C30;border-radius: 22rpx;color: #FFFFFF;font-size: 18rpx;`
					if (day.id === '') return ''
					if (day.name.indexOf('混龄') !== -1) result += 'background: #81348F;'
					if (day.num && parseInt(day.num) > 1) result += `height: ${day.num * 97}rpx;`
					return result
				}
			},
			plan_info_com() {
				return (plan, head) => {
					let { key } = head, day = plan[key]
					if (day.id === '') return ''
					if (day.id !== '' && day.time === '') return plan.timePicker
					return day.time && day.time.join(' - ')
				}
			},
			plan_info_name_com() {
				return (plan, head) => {
					let { key } = head, info = plan[key]
					if (info.id !== '') return `${info.name}`
				}
			}
		},
		methods: {
			set_val(key, val) {
				this[key] = val
			},
			set_plan(res_plan_json) {
				let key_list = Array.from(this.headers, ({ key }) => key)
				if(!res_plan_json || res_plan_json === '') res_plan_json = []
				let plan_list = res_plan_json
				let time_list = Array.from(plan_list, ({ timeRange, timePicker }) => {
					let [r_start, r_end] = timeRange
					return [parseInt(r_start.split(':')[0]), parseInt(r_end.split(':')[0])]
				})
				// 套娃
				const time_reduce = (index, num, result, key) => {
					let idx = index + 1, p_time = time_list[idx]
					let [p_start, p_end] = p_time
					if (!plan_list[idx] || !p_time) return result
					plan_list[idx][key].show = false
					if (num > p_start && num > p_end) {
						time_reduce(idx, num, result)
					} else {
						result += 1
					}
					return result
				}
				
				/**
				 * 模拟reduce 
				 * 循环 -> plan_json -> Array 
				 * 数据结构 -> 
				 *  Friday: {id: "8", name: "小班精英课基础班", time: "", count: "20"}
				 *	Monday: {id: "8", name: "小班精英课基础班", time: "", count: "20"}
				 *	Saturday: {id: "9", name: "小班精英课幼儿运动（1）班", time: "", count: "20"}
				 *	Sunday: {id: "6", name: "小班精英课能力班", time: "", count: "20"}
				 *	Tuesday: {id: "", name: "", time: "", count: "0"}
				 *	Thursday: {id: "7", name: "小班精英课混龄班", time: "", count: "20"}
				 *	Wednesday: {id: "7", name: "小班精英课混龄班", time: ["10:20", "15:00"], count: "20"}
				 *	timePicker: "10:20 - 11:20"
				 *	timeRange: ["10:20", "11:20"]
				 *	timeSelectEnd: "11:20"
				 *	timeSelectStart: "10:20"
				 * 
				 * 通过 this.headers key 获得 key_list集合
				 * 检测每个星期课程没有time 赋值 timeRange
				 * 有ID的表示有课程安排
				 */
				let t, v = null
				plan_list.forEach((plan, idx) => {
					for (let key of key_list) {
						v = plan
						let v_val = v[key], t_val = t
						if (t_val) {
							let [t_start, t_end] = t_val.time === '' ? v.timeRange : t_val.time, [v_start, v_end] = v.timeRange
							if (t_end === v_end && t_val.key && t_val.key === key) {
								v_val.show = false
								v_val = v_val
							} else {
								if (t_val.key === key) t.num = t.num + 1
								t = t
							}
						}
						if (v_val && v_val.id !== '') {
							if (Array.isArray(v_val.time)) {
								v_val.num = 1
								v_val.key = key
								t = v_val
								let [v_start, v_end] = v_val.time
								let [p_split_h, p_split_m] = plan.timeSelectEnd.split(':')
								let [v_split_h, v_split_m] = v_end.split(':')
								// 如果当前课程时间end 大于当前 plan时间段end课时 表示占多个时间段格子N+1
								// idx !== 最后一行课程安排 表示不需要在套娃延长列了
								if (v_split_h > p_split_h && idx !== plan_list.length - 1) {
									v_val.num = time_reduce(idx, v_split_h, 1, key)
								}
							} else if (v_val.time.toString() !== v.timeRange.toString()) {
								v_val.num = 1
								v_val.key = key
								t = v_val
							}
						}
					}
				})
				
				this.plan_json_list = plan_list
				console.log('plan_list=', plan_list);
			}
		}
	}
</script>

<style lang="scss" scoped>

.course_table {
	// min-height: 489rpx;
	position: relative;
}

.course_head {
	height: 85rpx;
	width: 100%;
}

.course_head_lab {
	height: 85rpx;
	width: 175rpx;
	background: url('/static/images/courseDetail/red_right.png');
	background-size: 100%;
	position: absolute;
}

.course_head_lab image {
	height: 36rpx;
	width: 36rpx;
}

.course_top {
	height: 85rpx;
	background: #003893;
	border-radius: 45rpx;
	padding-left: 175rpx;
}

.ff_fw500_fff {
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #ffffff;
}

.course_top_lab {
	height: 60rpx;
	width: 204rpx;
	font-size: 28rpx;
	@extend .ff_fw500_fff;
}

.frist_course {
	min-width: 175rpx;
	background: #d81c30;
	border-radius: 0rpx 0rpx 24rpx 24rpx;
}

.frist_course_lab {
	height: 104rpx;
	width: 100%;
}

.sun_ico {
	height: 39rpx;
	width: 39rpx;
	margin-top: 14rpx;
	margin-bottom: 9rpx;
}

.min_lab {
	font-size: 22rpx;
	margin-bottom: 14rpx;
	@extend .ff_fw500_fff;
}

.min_course {
	height: 104rpx;
	width: 204rpx;
	background-size: 100% 100% !important;
	// background-position-y: 6px !important;
	background-repeat: no-repeat !important;
}

.min_plan {
	width: 151rpx;
	height: 94rpx;
}

.plan_title {
	width: 82%;
	text-align: center;
	font-size: 22rpx;
}

.plan_time {
	font-size: 22rpx;
	margin-top: 5rpx;
}
</style>
