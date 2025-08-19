export interface ENV_DTYPE {
  VITE_HOST: string // HOST
  VITE_APP_TITLE: string // 标题
  VITE_USE_MOCK: boolean // mock
  VITE_BUILD_GZIP: boolean // gzip
  VITE_API_URL: string // 接口地址
  VITE_UPLOAD_URL: string // 上传地址
  VITE_PORT: number // 启动端口
  VITE_PUBLIC_PATH: string // 公共路径
  VITE_PROXY: Record<string, any> // 代理数组
  VITE_DROP_CONSOLE: boolean // 删除console
  VITE_LEGACY: boolean // 兼容老版本浏览器

  VITE_UNI_APPID: string // uniapp 项目id
  VITE_APP_VERSION: string // 应用版本号
  VITE_WECHAT_APPID: string // 微信appid
  VITE_WECHAT_APPSECRET: string // 微信appsecret
  VITE_APP_PACKAGE_NAME: string // 发行安卓和IOS包名
  VITE_APP_LINKS_DOMAIN: string // 域名links
}
