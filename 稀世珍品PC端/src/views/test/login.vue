<template>
	<div>login user</div>
	<button @click="login">login</button>
</template>

<script setup>
//setup 方式书写 实验阶段正式环境不建议
// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'

// const { replace } = useRouter()
// const { commit } = useStore()

const login = () => {
	commit('user_vuex/set_cache', ['token', 'vue3 token'])
	commit('user_vuex/set_cache', ['user_info', { username: 'imbacc', password: 'vite2vue3' }])
	commit('user_vuex/set_vuex', ['is_login_page', false])

	replace({ path: '/' })
	// registerRouter(['init_module', 'action_module', 'test_module']).then((router) => {
	// 	router.replace({ path: '/' })
	// })
}
</script>
