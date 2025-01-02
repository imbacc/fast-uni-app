const plugins = import.meta.glob('./plugins/*.ts', { eager: true }) as Record<string, any>

export const createPiniaStore = () => {
  const store = createPinia()
  Object.values(plugins).forEach((res) => {
    const plugin = res.default
    store.use(plugin)
  })
  return store
}
