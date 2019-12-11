//minix 继承

import init_append from './module/init_append.js';		//加载数据分页
import load_by_id from './module/load_by_id.js';		//加载不分页数据
import update_data from './module/update_data.js';		//更新数据
import check_data from './module/check_data.js';		//check选中选项
import refresh_page from './module/refresh_page.js';	//准备刷新-返回页面
import refresh_page2 from './module/refresh_page2.js';	//监听刷新-刷新数据
import week_str from './module/week_str.js';			//格式化显示 日期 - 周期

export {
	init_append,
	load_by_id,
	update_data,
	check_data,
	refresh_page,
	refresh_page2,
	week_str,
}