# fast-uni-app
 ├── node_modules                依赖包<br/>
 ├── common                      源码<br/>
 │   ├── class                   对象<br/>
 │   │      ├── append_data_class.js            minix里append_data.js对象为了能重复利用<br/>
 │   │      ├── send_code_class.js              minix里send_code.js对象为了能重复利用<br/>
 │   ├── config                  配置<br/>
 │   │      ├── module           api子配置<br/>
 │   │      ├── api.js           api接口配置设定<br/>
 │   │      ├── cfg.js           全局配置设定<br/>
 │   ├── lib                     js包<br/>
 │   ├── minix                   混入函数<br/>
 │   │      ├── module           minix子模块<br/>
 │   │      ├── index.js         minix统一管理<br/>
 │   ├── router                  路由页面地址配置<br/>
 │   │      ├── module           router子配置<br/>
 │   │      ├── index.js         router统一管理<br/>
 │   ├── tools                   路由页面地址配置<br/>
 │   │      ├── cache_time.js    缓存数据时间设定<br/>
 │   │      ├── cmake_router.js  路由跳转封装和路由验证拦截<br/>
 │   │      ├── cmake_tools.js   自定义工具<br/>
 │   │      ├── http_action.js   请求封装<br/>
 │   │      ├── http_interceptor.js  请求和响应拦截<br/>
 │   │      ├── http_request.js  对uni API request封装<br/>
 ├── components                  组件 插件市场 https://ext.dcloud.net.cn/plugin<br/>
 ├── hybrid                      混合html<br/>
 ├── pages                       页面<br/>
 ├── pagesA                      分包页面 可配置分包路由 https://uniapp.dcloud.io/collocation/pages?id=subpackages<br/>
 ├── static                      静态资源<br/>
 ├── .gitignore                  忽略提交到git目录文件<br/>
 ├── App.vue                     入口生命周期<br/>
 ├── main.js                     入口文件<br/>
 ├── manifest.json               权限配置 配置h5 devServer 可代理<br/>
 ├── package.json                依赖包及配置信息文件<br/>
 ├── pages.json                  页面配置 页面属性配置好 记得添到router统一管理路径<br/>
 ├── uni.scss                    预处理 常用样式 全局主题<br/>
<br/>
<br/>
