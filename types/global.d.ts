export {}
declare global {
  export type keyof_CONVERT<T> = keyof T
  export type key_valueof_CONVERT<T> = { [key in keyof_CONVERT<T>]: key extends keyof_CONVERT<T> ? T[key] : never }
  export type API_DTYPE<T = keyof T> = Record<T, string | [string, METHOD_DTYPE] | [string, METHOD_DTYPE, number]>
}
