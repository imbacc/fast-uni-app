const sql_exec = (sql,type = 'exec')=>{
	console.log(sql)
	return new Promise((resolve, reject)=>{
		
		let json = {
			name: 'mysql',
			sql: sql,
			success: (e) =>{
				resolve(type === 'exec' ? true : e)
			},
			fail: (e) =>{
				this.is_fun_tools.to_msg('执行数据失败')
				console.log('执行失败',JSON.stringify(e))
				resolve(false)
			}
		}
		
		type === 'exec' ? plus.sqlite.executeSql(json) : plus.sqlite.selectSql(json)
	})
}

const get_date_time = ()=> (fmt_datetime = 'YYYY-MM-DD HH:mm:ss')=> {
	return moment().format(fmt_datetime)
}

//全局状态
const state = {
	sys_push_info: '', //app 唯一CID 用于推送
	chat_userinfo: {}, //当前聊天用户
	get_msg_id:-1,		//消息ID
	get_msg_text:'',	//消息文本
	get_msg_num:0,		//消息数量
	is_msg_page:false,	//是否在消息当前页
	sql_exec:sql_exec,	//执行sql
}

//同步方法
const mutations = {
	/**
	 * @param {Object} info
	 * 0是状态属性名称
	 * 1是赋予状态属性的值
	 */
	set_vuex_push(state, info) {
		console.log(state)
		state[info[0]] = info[1]
	},
}

//get方法
const getters = {
	
}

//异步方法
const actions = {
	//推送
	open_push({commit}) {
		let _this = this
		
		var if_text = (msg,content,nickname,headimg,id) => {
			if(content.indexOf('url') !== -1 && content.indexOf('length') === -1){
				content = JSON.parse(content)
				msg.type = 'img'
			}else if(content.indexOf('length') !== -1){
				content = JSON.parse(content)
				msg.type = 'voice'
			}else{
				msg.type = 'text'
			}
			
			msg.id = id
			msg.msg = {content:content}
			msg.title = nickname
			msg.avatar = headimg
			msg.time = get_date_time()
			
			return msg
		}
		
		uni.getProvider({
			service: 'push',
			success: (res) => {
				// uni.showModal({
				// 	title: 'one - push',
				// 	content: JSON.stringify(res)
				// })
			}
		})
	
		uni.subscribePush({
			provider: 'igexin',
			success: (res) => {
				// uni.showModal({
				// 	title: 'two - push',
				// 	content: JSON.stringify(res)
				// })
				store.commit('set_push_vuex', ['sys_push_info', res])
			}
		})
	
		uni.onPush({
			provider: 'igexin',
			success: () => {
				uni.showModal({
					title: 'igexin',
					content: '监听透传成功!'
				})
			},
			callback: (data) => {
				let json = data.data
				
				try{
					json = JSON.parse(json)
				}catch(e){
					console.log('is ios push...')
				}
				
				console.log('-----------------------callback-------------------')
				console.log(data)
	
				// uni.showModal({
				// 	title: '用户推送过来的消息',
				// 	content: json.sendUserId + ':' + json.content
				// })
				
				if(json.type == 2 || json.type == "2"){
					let userid = json.sendUserId,
						content = json.content,
						nickname = json.nickName,
						headimg = json.avatar,
						myid = store.state.userInfo.id
					
					if(store.state.is_msg_page){
						commit('set_push_vuex',['get_msg_id',userid])
						commit('set_push_vuex',['get_msg_text',content])
					}else{
						sql_exec(`select * from user_msg where send_str = '${userid}_${myid}'`,'select').then((res)=>{
							// console.log("res: " + JSON.stringify(res))
							
							let is_len_zero = res.length === 0
							let msg = {send_uid:userid,take_uid:myid},
							obj_msg = if_text(msg,content,nickname,headimg,is_len_zero ? 1 : res[0].id+1),
							msg_list = is_len_zero ? [] : JSON.parse(res[0].msg),
							msg_imglist = is_len_zero ? [] : JSON.parse(res[0].imglist),
							sel_read = is_len_zero ? 0 : res[0].read + 1,
							str_msg = '',
							str_imglist = ''
							
							msg_list.push(obj_msg)
							if(obj_msg.is_type === 'img') msg_imglist.push(obj_msg.is_msg.msg.content.url)
							
							str_msg = JSON.stringify(msg_list)
							str_imglist = JSON.stringify(msg_imglist)
							
							let insert = `insert into user_msg values(${userid},'${userid}_${myid}','${str_msg}','${str_imglist}',1)`
							let update = `update user_msg set msg = '${str_msg}',imglist = '${str_imglist}',read = ${sel_read} where send_str = '${userid}_${myid}'`
							
							sql_exec(res.length === 0 ? insert : update).then((res)=>{
								console.log(res)
								if(res) commit('set_push_vuex',['get_msg_num',sel_read])
							})
						})
					}
				}
				
				return Promise.resolve()
			}
		})
	},
	open_mysql({}){
		let is_open = plus.sqlite.isOpenDatabase({name:'mysql',path:'_doc/mysql.db'})
		const sql_db1 = 'create table if not exists user_msg("send_uid" INT(6),"send_str" VARCHAR(20),"msg" VARCHAR(9000),"imglist" VARCHAR(9000),"read" INT(6))'
		const fail_msg = () => uni.showToast({ title: '打开数据库失败!',icon: 'none'})
		
		if(is_open){
			console.log('数据库已经是打开状态!')
		}else{
			plus.sqlite.openDatabase({
				name: 'mysql',
				path: '_doc/mysql.db',
				success: (e) =>{
					console.log('打开数据库 success!')
					sql_exec(sql_db1).then((res)=>{
						if(!res) fail_msg()
					})
				},
				fail: (e) =>{
					console.log('打开数据库 failed: '+JSON.stringify(e))
					fail_msg()
				}
			})
		}
	}
}

export default {
	state,
	mutations,
	getters,
	actions
}