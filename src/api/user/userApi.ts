import http from '@/api/request'

export const getUser = () => http.request(['api/user', 'GET'], {})
