const router = {}
const shallow = []

// webpack str json
const pageJson = JSON.parse(PAGES_JSON)
const tabBarJson = pageJson.tabBar.list

for (let tabbar of tabBarJson) {
	tabbar.iconPath = `/${tabbar.iconPath}`
	tabbar.pagePath = `/${tabbar.pagePath}`
	tabbar.selectedIconPath = `/${tabbar.selectedIconPath}`
}

// 转换为router键值格式
const forRouter = (list, space) => {
	let main = {}
	list.forEach((page) => {
		let info = page, path = info.path, spl = path.split('/')
		info.path = `${space !== 'pages' ? `/${space}` : ''}/${path}`
		const name = spl[spl.length - 1]
		main[name] = info
		info.name = name
		info.space = space
		shallow.push(info)
	})
	return main
}

// 主包
router['pages'] = forRouter(pageJson.pages, 'pages')
// 子包
pageJson.subPackages.forEach(({ root, pages }) => router[root] = forRouter(pages, root))	
// 广度列表
router['_shallow'] = shallow
// tabbar
router['_tablist'] = tabBarJson

console.log('router chunks=', router);

export default router
