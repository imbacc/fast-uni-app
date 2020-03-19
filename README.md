# fast-uni-app
快速构建uniapp框架
<br/>
<br/>
<br/>
<h1>common lib</h1>
<br/>
common/config/api.js 管理api接口<br/>
common/config/cfg.js 管理请求地址<br/>
common/lib	js库
common/minix	vue minix
common/router/index 管理页面路由地址<br/>
common/router/module 管理页面路由分模块<br/>
common/vuex/index 管理全局变量和事务<br/>
common/tools/http_request.js 请求封装<br/>
common/tools/http_interceptor.js 请求拦截,响应拦截<br/>
common/tools/http_action.js 请求加缓存二次封装<br/>
common/tools/cmake_tools.js 定义工具<br/>
common/tools/cmake_router 路由跳转封装<br/>
common/tools/cache_time.js 时间缓存封装<br/>
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
pages.json
页面配置 页面属性
配置好 记得添到router
<br/>
<br/>
<br/>
manifest.json
配置h5 devServer 可代理
<br/>
<br/>
<br/>
uni.scss
scss 预处理 常用样式变量
<br/>
<br/>
<br/>
