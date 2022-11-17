export type METHOD = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'OPTIONS'
export type METHOD_DTYPE = { [key in METHOD]: METHOD }
export type api_DTYPE = { [key in string]: string | [string, METHOD] | [string, METHOD, number] }
