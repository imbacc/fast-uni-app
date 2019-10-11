const CHAT_EMOJI = [
	[{"url":"100.gif",alt:"[微笑]"},{"url":"101.gif",alt:"[伤心]"},{"url":"102.gif",alt:"[美女]"},{"url":"103.gif",alt:"[发呆]"},{"url":"104.gif",alt:"[墨镜]"},{"url":"105.gif",alt:"[哭]"},{"url":"106.gif",alt:"[羞]"},{"url":"107.gif",alt:"[哑]"},{"url":"108.gif",alt:"[睡]"},{"url":"109.gif",alt:"[哭]"},{"url":"110.gif",alt:"[囧]"},{"url":"111.gif",alt:"[怒]"},{"url":"112.gif",alt:"[调皮]"},{"url":"113.gif",alt:"[笑]"},{"url":"114.gif",alt:"[惊讶]"},{"url":"115.gif",alt:"[难过]"},{"url":"116.gif",alt:"[酷]"},{"url":"117.gif",alt:"[汗]"},{"url":"118.gif",alt:"[抓狂]"},{"url":"119.gif",alt:"[吐]"},{"url":"120.gif",alt:"[笑]"},{"url":"121.gif",alt:"[快乐]"},{"url":"122.gif",alt:"[奇]"},{"url":"123.gif",alt:"[傲]"}],
	[{"url":"124.gif",alt:"[饿]"},{"url":"125.gif",alt:"[累]"},{"url":"126.gif",alt:"[吓]"},{"url":"127.gif",alt:"[汗]"},{"url":"128.gif",alt:"[高兴]"},{"url":"129.gif",alt:"[闲]"},{"url":"130.gif",alt:"[努力]"},{"url":"131.gif",alt:"[骂]"},{"url":"132.gif",alt:"[疑问]"},{"url":"133.gif",alt:"[秘密]"},{"url":"134.gif",alt:"[乱]"},{"url":"135.gif",alt:"[疯]"},{"url":"136.gif",alt:"[哀]"},{"url":"137.gif",alt:"[鬼]"},{"url":"138.gif",alt:"[打击]"},{"url":"139.gif",alt:"[bye]"},{"url":"140.gif",alt:"[汗]"},{"url":"141.gif",alt:"[抠]"},{"url":"142.gif",alt:"[鼓掌]"},{"url":"143.gif",alt:"[糟糕]"},{"url":"144.gif",alt:"[恶搞]"},{"url":"145.gif",alt:"[什么]"},{"url":"146.gif",alt:"[什么]"},{"url":"147.gif",alt:"[累]"}],
	[{"url":"148.gif",alt:"[看]"},{"url":"149.gif",alt:"[难过]"},{"url":"150.gif",alt:"[难过]"},{"url":"151.gif",alt:"[坏]"},{"url":"152.gif",alt:"[亲]"},{"url":"153.gif",alt:"[吓]"},{"url":"154.gif",alt:"[可怜]"},{"url":"155.gif",alt:"[刀]"},{"url":"156.gif",alt:"[水果]"},{"url":"157.gif",alt:"[酒]"},{"url":"158.gif",alt:"[篮球]"},{"url":"159.gif",alt:"[乒乓]"},{"url":"160.gif",alt:"[咖啡]"},{"url":"161.gif",alt:"[美食]"},{"url":"162.gif",alt:"[动物]"},{"url":"163.gif",alt:"[鲜花]"},{"url":"164.gif",alt:"[枯]"},{"url":"165.gif",alt:"[唇]"},{"url":"166.gif",alt:"[爱]"},{"url":"167.gif",alt:"[分手]"},{"url":"168.gif",alt:"[生日]"},{"url":"169.gif",alt:"[电]"},{"url":"170.gif",alt:"[炸弹]"},{"url":"171.gif",alt:"[刀子]"}],
	[{"url":"172.gif",alt:"[足球]"},{"url":"173.gif",alt:"[瓢虫]"},{"url":"174.gif",alt:"[翔]"},{"url":"175.gif",alt:"[月亮]"},{"url":"176.gif",alt:"[太阳]"},{"url":"177.gif",alt:"[礼物]"},{"url":"178.gif",alt:"[抱抱]"},{"url":"179.gif",alt:"[拇指]"},{"url":"180.gif",alt:"[贬低]"},{"url":"181.gif",alt:"[握手]"},{"url":"182.gif",alt:"[剪刀手]"},{"url":"183.gif",alt:"[抱拳]"},{"url":"184.gif",alt:"[勾引]"},{"url":"185.gif",alt:"[拳头]"},{"url":"186.gif",alt:"[小拇指]"},{"url":"187.gif",alt:"[拇指八]"},{"url":"188.gif",alt:"[食指]"},{"url":"189.gif",alt:"[ok]"},{"url":"190.gif",alt:"[情侣]"},{"url":"191.gif",alt:"[爱心]"},{"url":"192.gif",alt:"[蹦哒]"},{"url":"193.gif",alt:"[颤抖]"},{"url":"194.gif",alt:"[怄气]"},{"url":"195.gif",alt:"[跳舞]"}],
	[{"url":"196.gif",alt:"[发呆]"},{"url":"197.gif",alt:"[背着]"},{"url":"198.gif",alt:"[伸手]"},{"url":"199.gif",alt:"[耍帅]"},{"url":"200.png",alt:"[微笑]"},{"url":"201.png",alt:"[生病]"},{"url":"202.png",alt:"[哭泣]"},{"url":"203.png",alt:"[吐舌]"},{"url":"204.png",alt:"[迷糊]"},{"url":"205.png",alt:"[瞪眼]"},{"url":"206.png",alt:"[恐怖]"},{"url":"207.png",alt:"[忧愁]"},{"url":"208.png",alt:"[眨眉]"},{"url":"209.png",alt:"[闭眼]"},{"url":"210.png",alt:"[鄙视]"},{"url":"211.png",alt:"[阴暗]"},{"url":"212.png",alt:"[小鬼]"},{"url":"213.png",alt:"[礼物]"},{"url":"214.png",alt:"[拜佛]"},{"url":"215.png",alt:"[力量]"},{"url":"216.png",alt:"[金钱]"},{"url":"217.png",alt:"[蛋糕]"},{"url":"218.png",alt:"[彩带]"},{"url":"219.png",alt:"[礼物]"},]				
]

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

const get_date_time = ()=> {
	let change = (t) => {
		return t < 10 ? "0" + t : t
	}
	
	let d = new Date(),
	year = d.getFullYear(),
	month = change(d.getMonth()+1),
	day = change(d.getDate()),
	hour = change(d.getHours()),
	minute = change(d.getMinutes()),
	second = change(d.getSeconds())
	
	return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
}

//全局状态
const state = {
	sys_push_info: '', //app 唯一CID 用于推送
	chat_userinfo: {}, //当前聊天用户
	get_msg_id:-1,		//消息ID
	get_msg_text:'',	//消息文本
	get_msg_num:0,		//消息数量
	is_msg_page:false,	//是否在消息当前页
	is_emoji:CHAT_EMOJI	,//消息表情
	sql_exec:sql_exec,	//执行sql
}

//同步方法
const mutations = {
	
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
				store.commit('set_vuex', ['sys_push_info', res])
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
						commit('set_vuex',['get_msg_id',userid])
						commit('set_vuex',['get_msg_text',content])
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
								if(res) commit('set_vuex',['get_msg_num',sel_read])
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