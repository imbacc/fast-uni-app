import http from '@/tools/Request'

export const getTest = (data = {}) => http.request(['api/get_test', 'GET'], data)
export const getTest222 = (data = {}) => http.request(['api/get_test/:id', 'GET'], data)
export const getTest333 = (data = {}) => http.request(['api/get_test/three', 'GET'], data)
