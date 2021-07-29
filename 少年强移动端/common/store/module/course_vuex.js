import api from '@/common/config/api.js'

const week = {
	Monday: '星期一',
	Tuesday: '星期二',
	Wednesday: '星期三',
	Thursday: '星期四',
	Friday: '星期五',
	Saturday: '星期六',
	Sunday: '星期日'
}

//全局状态
const state = {
	type_list: [],	// 类别集合
	cur_student: {},// 选择学生
	sel_student: {}, // 查看学生
	week,	// 星期key值对应
	my_course: {}	// 我的课程 学生id: 课程集合
}

//同步方法
const mutations = {
	set_vuex(state, [key, val]) {
		state[key] = val
	},
	set_my_course(state, { id, list }) {
		state.my_course[id] = list
	}
}

//get方法
const getters = {
	
}

//异步方法
const actions = {
	
}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}