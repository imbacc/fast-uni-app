const fun = {
	
	//显示showToast
	to_msg:(msg = '服务器打瞌睡了...',mask = false) => uni.showToast({ title: msg,icon: 'none',mask: mask}),
}

export default fun