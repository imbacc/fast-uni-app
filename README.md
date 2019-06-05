# fast-uni-app
快速构建uniapp框架


common lib

config/api 管理api接口
router/index 管理页面路由地址
vmeitime-http/interface.js 请求封装的插件
vuex/index 管理全局变量和事务
common/api_request.js 请求封装，请求缓存
common/http_request.js 拦截请求，拦截响应
common/is_fun_tools.js 工具lib封装
common/setting_cache_time.js 时间缓存封装





components 组件            插件市场地址

cmd-icon                  https://ext.dcloud.net.cn/plugin?id=175
cmd-nav-bar               https://ext.dcloud.net.cn/plugin?id=199
cmd-transition            https://ext.dcloud.net.cn/plugin?id=211
lazy-image	              https://ext.dcloud.net.cn/plugin?id=153
mehaotian-search-revision	https://ext.dcloud.net.cn/plugin?id=91
mht-loader
mix-advert
mix-load-more             https://ext.dcloud.net.cn/plugin?id=29
mix-loading
mix-pulldown-refresh      https://ext.dcloud.net.cn/plugin?id=315
tab-nvue
uni-icon                  
uni-nav-bar
uni-status-bar
wuc-tab



hybrid/html 混合html
...


node_modules node模块包
...


pages 页面
...pagesA
...pagesB
可配置分包路由 https://uniapp.dcloud.io/collocation/pages?id=subpackages


App.vue
公共css
生命周期 onLaunch、onShow、onHide


main.js
全局载入lazy-image



pages.json
页面配置 页面属性
配置好 记得添到router


uni.scss
scss 预处理 常用样式变量
