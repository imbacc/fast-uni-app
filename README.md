# uni-app-vue3-ts

# cli创建安装
```
# npm
npm i -g imba-uni
# yarn
yarn global add imba-uni
# pnpm
pnpm i -g imba-uni
```

# 使用
```
imba create <name> [-f|--force]
```

```
 ├── node_modules
 ├── src
 |     ├── api                     接口
 |     ├── components              组件 插件市场 https://ext.dcloud.net.cn/plugin
 |     ├── config                  配置
 |     ├── hooks                   hooks
 |     ├── pages                   页面
 |     ├── pagesA                  可配置分包路由 https://uniapp.dcloud.io/collocation/pages?id=subpackages
 |     ├── pagesB                  可配置分包路由 https://uniapp.dcloud.io/collocation/pages?id=subpackages
 |     ├── platforms               各个环境代码
 |     ├── router                  路由
 |     ├── static                  静态资源
 |     ├── store                   pinia状态管理
 |     ├── tools                   主要实现工具
 |     ├── App.vue                 入口生命周期
 |     ├── main.ts                 入口文件
 |     ├── manifest.json           权限配置 配置h5 devServer 可代理
 |     ├── package.json            依赖包及配置信息文件
 |     ├── pages.json              页面配置
 |     ├── uni.scss                预处理 常用样式 全局主题
 ├── vite.config.ts                vite.config
 ├── windi.config.ts               windicss
```
