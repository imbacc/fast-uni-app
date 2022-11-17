import pages from '@/pages.json'
import { createRouter, useAfterEach, useBeforeEach, useRouterError } from 'imba-uni-router'

export default {
	install: () => {
		createRouter(pages as any)

		useAfterEach((to, from) => {
			console.log('%c [ to ]-7', 'font-size:14px; background:#41b883; color:#ffffff;', to)
			console.log('%c [ from ]-7', 'font-size:14px; background:#41b883; color:#ffffff;', from)
		})

		useBeforeEach((to, from, next) => {
			console.log('%c [ to ]-12', 'font-size:14px; background:#41b883; color:#ffffff;', to)
			console.log('%c [ from ]-12', 'font-size:14px; background:#41b883; color:#ffffff;', from)
			next()
		})

		useRouterError((err: any) => {
			console.log('%c [ err ]-18', 'font-size:14px; background:#41b883; color:#ffffff;', err)
		})
	}
}
