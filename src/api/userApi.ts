import http from '@/tools/Request.js'

export const getUser = () => http.request(['api/user', 'GET'], {})
