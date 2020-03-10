//minix 继承

import load_append from './module/load_append.js';		//初始化数据和上拉,下拉加载
import load_info from './module/load_info.js';		//根据ID查询数据
import update_data from './module/update_data.js';		//更新数据
import check_data from './module/check_data.js';		//check选中选项
import week_str from './module/week_str.js';			//格式化显示 日期 - 周期

export {
	load_append,
	load_info,
	update_data,
	check_data,
	week_str,
}