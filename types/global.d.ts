export {}
declare global {
  type keyof_CONVERT<T> = keyof T
  type key_valueof_CONVERT<T> = { [key in keyof_CONVERT<T>]: key extends keyof_CONVERT<T> ? T[key] : never }
}