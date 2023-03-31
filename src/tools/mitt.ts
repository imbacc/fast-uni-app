export const uniEmit = (key: string, val: any) => {
  uni.$emit(key, val)
}

export const uniOn = (key: string, fun: (result: any) => void) => {
  uni.$off(key, fun)
  uni.$on(key, fun)
}

export const uniOff = (key: string, fun: (result: any) => void) => {
  uni.$off(key, fun)
}

export const uniOnce = (key: string, fun: (result: any) => void) => {
  uni.$once(key, fun)
}

export default {
  uniEmit,
  uniOn,
  uniOff,
  uniOnce,
}
