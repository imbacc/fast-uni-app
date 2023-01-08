export type before_DTYPE = (to: {}, from: {}, next: Function) => any
export type after_DTYPE = (to: {}, from?: {}) => any
export type result_DTYPE = {
    tips: string
    key: string
    result: boolean
    hook: () => any
    beforeEach: () => any
    afterEach: () => any
    gotoPage: () => any
    gotoRouter: () => any
}
