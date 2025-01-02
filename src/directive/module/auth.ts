import type { App } from 'vue'

export default (app: App) => {
  const authStore = useAuthStore()

  // #ifdef H5
  // app.directive('auth', {
  //   created() { },
  //   beforeMount() { },
  //   mounted(el, binding, vnode) {
  //     if (!el || !binding.value) return
  //     if (!authStore.hasMeshAuth(binding.value)) {
  //       console.log('%c [ el ]-11', 'font-size:14px; background:#41b883; color:#ffffff;', el)
  //       el?.parentNode?.removeChild(el)
  //     } else {
  //       el.onclick = () => console.log('有权限click!', binding.value)
  //     }
  //   },
  //   beforeUpdate() { },
  //   updated() { },
  //   beforeUnmount() { },
  //   unmounted() { },
  //   // deep: true,
  // })
  // #endif

  // #ifdef MP
  // console.log('mixin')
  // app.mixin({
  //   props: {
  //     vAuth: {
  //       type: Array,
  //       default: () => [],
  //     },
  //   },
  // })
  // #endif
}
