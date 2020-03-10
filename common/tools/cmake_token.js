/*
 * js lib
 * by imbacc
 * Do have faith in what you're doing.
 * 
*/

let az_list = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const sf_key = 873243031

const cmake_token_fun_lvup = () => {
	let date = new Date()
	let time = date.getTime()
	let year = date.getFullYear()
	let month = ((date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1))
	let day = date.getDate() < 10 ?  "0"+date.getDate() : date.getDate()
	let key = year + '' + month + '' + day
	let math = Math.random()
	let random = Math.ceil(math*9999999+999)
	let token = parseInt(time) + parseInt(parseInt(key) * parseInt(random))
	token += sf_key
	
	console.log("math: " + math)
	console.log("time: " + time)
	console.log("key: " + key)
	console.log("random: " + random)
	console.log("token: " + token)
	
	let sub_token = token + '' 
	sub_token = sub_token.substring(0,9);
	
	console.log("token="+token)
	console.log("sub_token="+sub_token)

	let i = az_list.length, t, j
	while (i) {
		j = Math.floor(math * i--)
		t = az_list[i]
		az_list[i] = az_list[j]
		az_list[j] = t
	}
	
	let cmake_token = "",sub_str_token = sub_token + ''
	for(let i = 0,j = sub_str_token.length;i < j;i++){
		let z = sub_str_token.substring(i,i+1)
		cmake_token += az_list[z] + z
	}
	
	console.log("cmake_token="+cmake_token)
	console.log("cmake_token.length="+cmake_token.length)
	console.log("az_list="+az_list)
	console.log("cmake_token finish="+cmake_token)
	
	math += ''
	math = math.replace('.','')
	
	return cmake_token + "." + math
}

const cmake_token_fun = () => {
	let date = new Date()
	let time = date.getTime()
	let year = date.getFullYear()
	let month = ((date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1))
	let day = date.getDate() < 10 ?  "0"+date.getDate() : date.getDate()
	let key = year + '' + month + '' + day
	let random = Math.ceil(Math.random()*9999999+999)
	let token = parseInt(time) + parseInt(parseInt(key) * parseInt(random))
	token += sf_key
	
	// console.log("time: " + time)
	// console.log("key: " + key)
	// console.log("random: " + random)
	// console.log("token: " + token)
	
	return parseInt(token) + "." + random
}

// api服务程序
export default {
	cmake_token_fun,
	cmake_token_fun_lvup
}