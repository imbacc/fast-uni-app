# fast-uni-app

### 命令安装

```
# npm
npm i -g imba-uni
# yarn
yarn global add imba-uni
# pnpm
pnpm i -g imba-uni
```

### 使用

```
imba create <name> [-f|--force]
cd <name>
npm install or yarn install or pnpm install
```

# 对象

-> class/*
用于对象模式复用/继承或集成

# 接口配置

-> config/module
配置格式定义API [地址,请求类型,缓存时间] 缓存时间默认 0
例: 文件名:app_api.js

**内容:**

```
export default {
    app_333: ['api/ddd/:id', 'GET'],
    app_444: ['api/www', 'GET', 10],
    app_555: ['api/eee', 'POST', 20],
    app_666: ['api/qqq/:id/update', 'POST']
}
```

**this 使用**

```
...
methods: {
    test() {
        this.is_api('app_api/app_333', { _id: 1 }).then((res) => {
            if (res) {
                // ....
            }
        })
    },
    async test2() {
       const res = await this.is_api('app_api/app_333', { _id: 1 })
    }
}
```

**import 使用**

```
import api from '@/common/config/api.js'
// :id为1 -> api/ddd/1
api('app_api/app_333', { _id: 1 })
// 改变设置的缓存时间
api('app_api/app_444', { _cache: 1 })
// 传body内容 默认 application/json
api('app_api/app_555', {}, { body: '传body内容' })
// 表单形式 application/x-www-form-urlencoded
api('app_api/app_555', {}, { _formData: true, body: '传body内容' })
// :id为1 -> api/ddd/1 为POST请求
api('app_api/app_666', { _id: 1 }, { body: '传body内容')
```

# js包

-> lib/*
js引入包

# minix

-> minix/*
用于混入函数写法 少用

# 路由

-> router/index
借鉴uni-simple-router的webpack获取pages.json文件内容。
从pages.json生成 主包/分包/广度列表/tabbar 组成router模块内容。
pages.json里可直接配置权限字段，参数字段，自定义字段(uni-app文档没有的关键字)

# 状态管理

-> store/module
多个store模块自动导入。

# 框架内容和工具

-> tools/*

# 分页

-> class/append_data.js

例:

```
// 引入
import appendData from '@/common/class/appned_data.js'

export default {
    data() {
        return {
            pageData: null
        }
    },
    // 页面滚动到底部的事件
    onReachBottom() {
        if (this.pageData) {
            this.pageData.next_fun().then(() => {
                // 下一页执行完
            })
        }
    },
    methods: {
        select(page = 1) {
            if (!this.pageData) {
                const page = new appendData()
                page.name = 'test_api/get_test222' // <接口文件名>/<对象名称>
                page.param = {}
                page.body = {}
                page.size = 10
                page.method = 'GET'
                page.key = 'data'                  // -> res.data 获取数据
                page.lastKey = 'lastPage'          // -> res.lastPage 获取最后一页数据
                this.pageData = page
            }
            this.pageData.fun(page)
        }
    }
}
```

```
 ├── node_modules                依赖包
 ├── common                      源码
 │   ├── class                   对象
 │   │      ├── append_data.js            为了能复用
 │   │      ├── send_code.js              为了能复用
 │   ├── config                  配置
 │   │      ├── module           api模块配置
 │   │      ├── api.js           api入口配置
 │   │      ├── cfg.js           全局配置设定
 │   ├── lib                     js包
 │   ├── minix                   混入函数
 │   ├── router                  路由页面地址配置
 │   │      ├── index.js         router通过webpack获取pages.json
 │   ├── store                   全局状态管理
 │   │      ├── module           store模块配置
 │   │      ├── index.js         store入口管理
 │   ├── tools                   路由页面地址配置
 │   │      ├── cmake_action.js  请求封装
 │   │      ├── cmake_router.js  路由跳转封装和路由验证拦截
 │   │      ├── cmake_tools.js   自定义工具
 │   │      ├── cmake_zinterceptor.js  请求和响应拦截
 │   │      ├── cmake_zrequest.js  对uni API request封装
 ├── components                  组件 插件市场 https://ext.dcloud.net.cn/plugin
 ├── hybrid                      混合html
 ├── pages                       页面
 ├── pagesA                      可配置分包路由 https://uniapp.dcloud.io/collocation/pages?id=subpackages
 ├── static                      静态资源
 ├── App.vue                     入口生命周期
 ├── main.js                     入口文件
 ├── manifest.json               权限配置 配置h5 devServer 可代理
 ├── package.json                依赖包及配置信息文件
 ├── pages.json                  页面配置
 ├── uni.scss                    预处理 常用样式 全局主题
 ├── vue.config.js               vue.config
```
