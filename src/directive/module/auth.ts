import Vue from 'Vue'
import store from '@/store/index'

export default () => {
  Vue.directive('auth', {
    bind(el, binding, vnode) {
      if (!el || !binding.value) return
      if (!store.state.user.getters.hasAuth(binding.value)) {
        el?.parentNode?.removeChild(el)
      } else {
        el.onclick = () => console.log('有权限click!', binding.value)
      }
    },
    inserted() { },
    update() { },
    componentUpdated() { },
    unbind() { },
  })
}
