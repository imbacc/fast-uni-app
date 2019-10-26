//minix 继承

import init_append from './module/init_append.js';		//加载数据分页
import load_by_id from './module/load_by_id.js';		//加载不分页数据
import update_data from './module/update_data.js';		//更新数据
import check_data from './module/check_data.js';		//check选中选项
import refresh_page from './module/refresh_page.js';	//准备刷新-返回页面
import refresh_page2 from './module/refresh_page2.js';	//监听刷新-刷新数据
import week_str from './module/week_str.js';			//格式化显示 日期 - 周期
import create_task from './module/create_task.js';		//创建任务视图 文本 - 语音 - 图片 - 视频
import money_count from './module/money_count.js';		//统计不同规格类型的 数值计算 和 总价之和

export {
	init_append,
	load_by_id,
	update_data,
	check_data,
	refresh_page,
	refresh_page2,
	week_str,
	create_task,
	money_count,
}