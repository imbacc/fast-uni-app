# fast-uni-app
```
 ├── node_modules                依赖包
 ├── common                      源码
 │   ├── class                   对象
 │   │      ├── append_data.js            minix里appendData.js对象为了能重复利用
 │   │      ├── send_code.js              minix里sendCode.js对象为了能重复利用
 │   ├── config                  配置
 │   │      ├── module           api模块配置
 │   │      ├── api.js           api入口配置
 │   │      ├── cfg.js           全局配置设定
 │   ├── lib                     js包
 │   ├── minix                   混入函数
 │   │      ├── module           minix模块模块
 │   │      ├── index.js         minix入口管理
 │   ├── router                  路由页面地址配置
 │   │      ├── module           router模块配置
 │   │      ├── index.js         router入口管理
 │   ├── store                   全局状态管理
 │   │      ├── module           store模块配置
 │   │      ├── index.js         store入口管理
 │   ├── tools                   路由页面地址配置
 │   │      ├── cache_time.js    缓存数据时间设定
 │   │      ├── cmake_router.js  路由跳转封装和路由验证拦截
 │   │      ├── cmake_tools.js   自定义工具
 │   │      ├── cmake_action.js   请求封装
 │   │      ├── cmake_interceptor.js  请求和响应拦截
 │   │      ├── cmake_request.js  对uni API request封装
 ├── components                  组件 插件市场 https://ext.dcloud.net.cn/plugin
 ├── hybrid                      混合html
 ├── pages                       页面
 ├── pagesA                      可配置分包路由 https://uniapp.dcloud.io/collocation/pages?id=subpackages
 ├── static                      静态资源
 ├── .gitignore                  忽略提交到git目录文件
 ├── App.vue                     入口生命周期
 ├── main.js                     入口文件
 ├── manifest.json               权限配置 配置h5 devServer 可代理
 ├── package.json                依赖包及配置信息文件
 ├── pages.json                  页面配置 页面属性配置好 记得添到router统一管理路径
 ├── uni.scss                    预处理 常用样式 全局主题
```
