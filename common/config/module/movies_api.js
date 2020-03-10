
//影视API
export default {
	get_MoviesIndex: 'movies/index', //主页影视信息
	get_MoviesInfo: 'movies/moviesinfo', //影视信息详情
	get_MoviesLabels: 'movies/labels', //根据标签筛选分类
	
	get_Random_Like_isType: 'movies/randomlikeistype', //猜你喜欢影视信息 传 类型字符串 “电影”
	
	find_iqylive_MoviesInfo: 'http://suggest.video.iqiyi.com', //根据关键字 爱奇艺接口搜索
	find_iqylive_GetUrlInfo: 'http://pub.m.iqiyi.com/jp/h5/videoList', //根据爱奇艺ID获取HTML链接
	find_iqylive_GetUrlInfo_More: 'https://search.video.iqiyi.com/o', //根据爱奇艺ID获取HTML链接
	
	find_qqlive_MoviesInfo: 'https://s.video.qq.com/smartbox', //根据关键字 腾讯视频接口搜索
	find_qqlive_GetUrlInfo: 'movies/getqqhtml', //根据腾讯视频相关信息获取HTML链接
	
	get_m3u8_api1: 'http://106.13.36.210:3030/getm3u8', //获取m3u8
	get_m3u8_api2: 'http://5.5252e.com/jx.php',			//解析地址
}