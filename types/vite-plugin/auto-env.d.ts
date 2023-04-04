export type ENV_DTYPE = {
  VITE_HOST: string // HOST
  VITE_GLOB_APP_TITLE: string // 标题
  VITE_USE_MOCK: boolean // mock
  VITE_BUILD_GZIP: boolean // gzip
  VITE_GLOB_API_URL: string // 接口地址
  VITE_GLOB_UPLOAD_URL: string // 上传地址
  VITE_PORT: number // 启动端口
  VITE_PUBLIC_PATH: string // 公共路径
  VITE_PROXY: Record<string, any> // 代理数组
  VITE_DROP_CONSOLE: boolean // 删除console
  VITE_LEGACY: boolean // 兼容老版本浏览器
}
