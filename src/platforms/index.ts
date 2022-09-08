import type { App } from 'vue'

const modules = import.meta.glob('./modules/*.ts')

// 不同平台条件编译
export default {
	install: (app: App) => {
		Object.values(modules).forEach((mod: any) => {
			if (typeof mod === 'object') mod.default(app)
			if (typeof mod === 'function') mod().then((res: any) => res.default(app))
		})
	}
}
