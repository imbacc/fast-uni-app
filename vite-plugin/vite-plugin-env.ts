import type { ENV_DTYPE } from '../types/vite-plugin/auto-env'
import type { PluginOption } from 'vite'

const createProxy = (list: any) => {
  list = JSON.parse(list)
  const result: Record<string, any> = {}
  for (const [prefix, target] of list) {
    result[prefix] = {
      target,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(new RegExp(`^${prefix}`), ''),
    }
  }
  return result
}

export const formatEnv = (viteEnv: Record<string, any>): ENV_DTYPE => {
  const entries = Object.entries(viteEnv)
  for (const [key, val] of entries) {
    if (val === 'true') {
      viteEnv[key] = true
      continue
    }

    if (val === 'false') {
      viteEnv[key] = false
      continue
    }

    if (!isNaN(val)) {
      viteEnv[key] = parseInt(val)
      continue
    }

    if (key === 'VITE_PROXY') {
      viteEnv[key] = createProxy(val)
      continue
    }
  }
  return viteEnv as ENV_DTYPE
}

export default (VITE_ENV: ENV_DTYPE): PluginOption => {
  const { VITE_HOST, VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_LEGACY } = VITE_ENV

  return {
    name: 'env-config',
    config: () => {
      return {
        base: VITE_PUBLIC_PATH,
        server: {
          host: VITE_HOST,
          port: VITE_PORT,
          proxy: VITE_PROXY,
          open: false,
        },
        build: {
          polyfillDynamicImport: Boolean(VITE_LEGACY) || false,
          terserOptions: {
            compress: {
              keep_infinity: true,
              drop_console: Boolean(VITE_DROP_CONSOLE) || false,
            },
          },
        },
      }
    },
  }
}
