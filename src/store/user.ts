import { setCacheLoca, getCacheLoca, delCache } from 'imba-cache'
import { defineStore } from 'pinia'

const TOKEN = uni.getStorageSync('token') || ''
const USER_INFO = getCacheLoca('userInfo') || {}
const USER_ROLE = getCacheLoca('userRole') || []

type user_DTYPE = {
	token: string
	userInfo: {}
	userRole: Array<any>
}

export const useUserStore = defineStore('user', {
	state: (): user_DTYPE => {
		return {
			token: TOKEN, // 用户token
			userInfo: USER_INFO, // 用户信息
			userRole: USER_ROLE //用户角色权限
		}
	},
	getters: {
		hasLogin(): boolean {
			return (this.token || this.userInfo || false) as boolean
		},
		getRole(): Array<any> {
			return this.userRole
		}
	},
	actions: {
		setCache(key: string, val: any) {
			this.$patch({ [key]: val })
			setCacheLoca(key, val)
		},
		setRole(role: Array<any>) {
			this.userRole = [...new Set([...this.userRole, ...role])]
			setCacheLoca('userRole', this.userRole)
		},
		setLogout() {
			this.$patch({ token: '', userInfo: false, userRole: [] })
			delCache('token')
			delCache('userInfo')
			delCache('userRole')
		}
	}
})
