# fast-uni-app
快速构建uniapp框架
<br/>
<br/>
<br/>
<h1>common lib</h1>
<br/>
config/api 管理api接口<br/>
router/index 管理页面路由地址<br/>
vmeitime-http/interface.js 请求封装的插件<br/>
vuex/index 管理全局变量和事务<br/>
common/api_request.js 请求封装，请求缓存<br/>
common/http_request.js 拦截请求，拦截响应<br/>
common/is_fun_tools.js 工具lib封装<br/>
common/setting_cache_time.js 时间缓存封装<br/>
<br/>
<br/>
<br/>
<h1>components 组件            插件市场地址</h1>
<br/>
lazy-image	              https://ext.dcloud.net.cn/plugin?id=153<br/>
mht-loader<br/>
<br/>
<br/>
<br/>
<h1>hybrid/html 混合html</h1>
...
<br/>
<br/>
<br/>
<h1>node_modules node模块包</h1>
...
<br/>
<br/>
<br/>
<h1>pages 页面</h1>
...pagesA
...pagesB
可配置分包路由 https://uniapp.dcloud.io/collocation/pages?id=subpackages
<br/>
<br/>
<br/>
App.vue
公共css
生命周期 onLaunch、onShow、onHide
<br/>
<br/>
<br/>
main.js
全局载入lazy-image
<br/>
<br/>
<br/>
pages.json
页面配置 页面属性
配置好 记得添到router
<br/>
<br/>
<br/>
uni.scss
scss 预处理 常用样式变量
