import type { pagesJson_DTYPE, shallowInfo_DTYPE, shallow_DTYPE, tablist_DTYPE, pagesKV_DTYPE, newPagesJson_DTYPE } from '#/router/index'

import pages_JSON from '@/pages.json'
import cmakeRouter from '@/tools/cmakeRouter'

const router: newPagesJson_DTYPE = {}
const shallow: shallow_DTYPE = []

const pageJson = pages_JSON as pagesJson_DTYPE
const tabBarJson = pageJson.tabBar?.list as tablist_DTYPE

for (let tabbar of tabBarJson) {
	tabbar.iconPath = `/${tabbar.iconPath}`
	tabbar.pagePath = `/${tabbar.pagePath}`
	tabbar.selectedIconPath = `/${tabbar.selectedIconPath}`
}

// 转换为router键值格式

const forRouter = (list: Array<shallowInfo_DTYPE>, space: string): pagesKV_DTYPE => {
	let main: pagesKV_DTYPE = {}
	list.forEach((page: shallowInfo_DTYPE) => {
		let info = page,
			path = info.path,
			spl = path.split('/')
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
pageJson.subPackages?.forEach(({ root, pages }) => (router[root as keyof newPagesJson_DTYPE] = forRouter(pages, root)))
// 广度列表
router['shallow'] = shallow
// tabbar
router['tablist'] = tabBarJson

let makeRouter: any = null
export const useRouter = () => {
	if (!makeRouter) makeRouter = cmakeRouter(router)
	return makeRouter
}

export default {
	install: () => {
		return useRouter()
	}
}
