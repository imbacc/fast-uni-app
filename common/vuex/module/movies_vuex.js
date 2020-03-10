
//全局状态
const state = {
	movies_obj:{}				//影视信息
}

//同步方法
const mutations = {
	/**
	 * @param {Object} info
	 * 0是状态属性名称
	 * 1是赋予状态属性的值
	 */
	set_vuex_movies(state, info) {
		console.log(state)
		state[info[0]] = info[1]
	},
}

//get方法
const getters = {
	
}

//异步方法
const actions = {
	get_MoviesInfo({commit}) {
		return Promise.resolve(http_request(api_config.get_MoviesInfo,{id:id},'get',30))
	},
	get_MoviesLabels({commit},info) {
		return Promise.resolve(http_request(api_config.get_MoviesLabels,{types:info[0],labels:info[1],page:info[2],size:info[3]},'get',30))
	},
	get_Random_Like_isType({commit},type = 1) {
		return Promise.resolve(http_request(api_config.get_Random_Like_isType,{typestr:type},'get',1))
	},
	find_iqylive_GetUrlInfo({commit},info) {
		return Promise.resolve(http_request(api_config.find_iqylive_GetUrlInfo,{albumId:info[0],size:info[1],page:info[2],needPrevue:false,needVipPrevue:false},'get',5))
	},
	find_iqylive_GetUrlInfo_More({commit},info) {
		return Promise.resolve(http_request(api_config.find_iqylive_GetUrlInfo_More,{'if':'html5','key':info[0],'pageNum':info[1],'pageSize':info[2]},'get',5))
	},
	find_iqylive_MoviesInfo({commit},info) {
		return Promise.resolve(http_request(api_config.find_iqylive_MoviesInfo,{key:info[0],platform:info[1],rltnum:info[2]},'get',5))
	},
	find_qqlive_MoviesInfo({commit},info) {
		return Promise.resolve(http_request(api_config.find_qqlive_MoviesInfo,{plat:2,ver:0,query:info[0],num:info[1],otype:'json'},'get',5))
	},
	find_qqlive_GetUrlInfo({commit},url) {
		return Promise.resolve(http_request(api_config.find_qqlive_GetUrlInfo,{html:url},'get',5))
	},
	get_m3u8_api({commit},info) {
		let api_url = ''
		info[1] == 1 ? api_url = api_config.get_m3u8_api1 : api_url = api_config.get_m3u8_api2
		return Promise.resolve(http_request(api_url,{url:url},'get',5))
	}
}

export default {
	state,
	mutations,
	getters,
	actions
}