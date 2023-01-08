import http from '@/tools/request'

export const getUser = () => http.request(['api/user', 'GET'], {})
