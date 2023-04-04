// 全局状态
const state = {
  baseUrl: '',
  iframeUrl: '',
}

// 同步方法
const mutations = {
  setbaseUrl(state, baseUrl) {
    state.baseUrl = baseUrl === '/' ? '' : baseUrl
  },
  setiframeUrl(state, url) {
    state.iframeUrl = url
  },
}

// get方法
const getters = {

}

// 异步方法
const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
