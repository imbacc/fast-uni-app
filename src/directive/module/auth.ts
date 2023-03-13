import type { App } from 'vue'

export default (app: App) => {
  const authStore = useAuthStore()

  app.directive('auth', {
    created() {},
    beforeMount() {},
    mounted(el, binding, vnode) {
      if (!el || !binding.value) return
      if (!authStore.hasAuth(binding.value)) {
        el?.parentNode?.removeChild(el)
      } else {
        el.onclick = () => console.log('有权限click!', binding.value)
      }
    },
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() { },
    // deep: true,
  })
}
