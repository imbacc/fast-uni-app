interface window {
    pages_JSON: any
}

export type pagesJson_DTYPE = {
    /**
     ** 描述: 设置默认页面的窗口表现
     ** 平台差异说明: -
     */
    globalStyle?: globalStyle_DTYPE
    /**
     ** 描述: 设置页面路径及窗口表现
     ** 平台差异说明: -
     */
    pages: Array<pages_DTYPE>
    /**
     ** 描述: 组件自动引入规则
     ** 平台差异说明: 2.5.5+
     */
    easycom?: easycom_DTYPE
    /**
     ** 描述: 设置底部 tab 的表现
     ** 平台差异说明: -
     */
    tabBar?: tabBar_DTYPE
    /**
     ** 描述: 启动模式配置
     ** 平台差异说明: -
     */
    condition?: condition_DTYPE
    /**
     ** 描述: 分包加载配置
     ** 平台差异说明: -
     */
    subPackages?: Array<subPackages_DTYPE>
    /**
     ** 描述: 分包预下载规则
     ** 平台差异说明: 微信小程序
     */
    preloadRule?: preloadRule_DTYPE
    /**
     ** 描述: Worker 代码放置的目录
     ** 平台差异说明: 微信小程序
     */
    workers?: string
    /**
     ** 描述: 大屏左侧窗口
     ** 平台差异说明: H5
     */
    leftWindow?: leftWindow_DTYPE
    /**
     ** 描述: 大屏顶部窗口
     ** 平台差异说明: H5
     */
    topWindow?: topWindow_DTYPE
    /**
     ** 描述: 大屏右侧窗口
     ** 平台差异说明: H5
     */
    rightWindow?: rightWindow_DTYPE
    /**
     ** 描述: 自动跳转相关配置，新增于HBuilderX 3.5.0
     ** 平台差异说明: -
     */
    uniIdRouter?: uniIdRouter_DTYPE
}

type animationType =
    | 'auto'
    | 'none'
    | 'slide-in-right'
    | 'slide-in-left'
    | 'slide-in-top'
    | 'slide-in-bottom'
    | 'fade-in'
    | 'zoom-out'
    | 'zoom-fade-out'
    | 'pop-in'

export type globalStyle_DTYPE = {
    /**
     ** 描述: 导航栏背景颜色（同状态栏背景色）
     ** 平台差异说明: APP与H5为#F7F7F7，小程序平台请参考相应小程序文档
     */
    navigationBarBackgroundColor?: string | '#F7F7F7'
    /**
     ** 描述: 导航栏标题颜色及状态栏前景颜色，仅支持 black/white
     ** 平台差异说明: -
     */
    navigationBarTextStyle?: 'white' | 'black'
    /**
     ** 描述: 导航栏标题文字内容
     ** 平台差异说明: -
     */
    navigationBarTitleText?: string
    /**
     ** 描述: 导航栏样式，仅支持 default/custom。custom即取消默认的原生导航栏，需看使用注意https://uniapp.dcloud.net.cn/collocation/pages.html#customnav
     ** 平台差异说明: -
     */
    navigationStyle?: 'default' | 'custom'
    /**
     ** 描述: 下拉显示出来的窗口的背景色
     ** 平台差异说明: 微信小程序
     */
    backgroundColor?: string | '#ffffff'
    /**
     ** 描述: 下拉 loading 的样式，仅支持 dark / light
     ** 平台差异说明: 微信小程序
     */
    backgroundTextStyle?: 'dark' | 'light'
    /**
     ** 描述: 是否开启下拉刷新，详见页面生命周期。https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle
     ** 平台差异说明: -
     */
    enablePullDownRefresh?: boolean
    /**
     ** 描述: 页面上拉触底事件触发时距页面底部距离，单位只支持px，详见页面生命周期https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle
     ** 平台差异说明: -
     */
    onReachBottomDistance?: number | 50
    /**
     ** 描述: 顶部窗口的背景色（bounce回弹区域）
     ** 平台差异说明: 仅 iOS 平台
     */
    backgroundColorTop?: string | '#ffffff'
    /**
     ** 描述: 底部窗口的背景色（bounce回弹区域）
     ** 平台差异说明: 仅 iOS 平台
     */
    backgroundColorBottom?: string | '#ffffff'
    /**
     ** 描述: 导航栏图片地址（替换当前文字标题），支付宝小程序内必须使用https的图片链接地址
     ** 平台差异说明: 支付宝小程序、H5、APP
     */
    titleImage?: string
    /**
     ** 描述: 导航栏整体（前景、背景）透明设置。支持 always 一直透明 / auto 滑动自适应 / none 不透明
     ** 平台差异说明: 支付宝小程序、H5、APP
     */
    transparentTitle?: 'always' | 'auto' | 'none'
    /**
     ** 描述: 导航栏点击穿透
     ** 平台差异说明: 支付宝小程序、H5
     */
    titlePenetrate?: string | 'NO'
    /**
     ** 描述: 横屏配置，屏幕旋转设置，仅支持 auto / portrait / landscape 详见 响应显示区域变化https://developers.weixin.qq.com/miniprogram/dev/framework/view/resizable.html
     ** 平台差异说明: 支付宝小程序、H5
     */
    pageOrientation?: 'auto' | 'portrait' | 'landscape'
    /**
     ** 描述: 窗口显示的动画效果，详见：窗口动画https://uniapp.dcloud.net.cn/api/router#animation
     ** 平台差异说明: App
     */
    animationType?: animationType
    /**
     ** 描述: 窗口显示动画的持续时间，单位为 ms
     ** 平台差异说明: App
     */
    animationDuration?: number | 300
    /**
     ** 描述: 窗口显示动画的持续时间，单位为 ms
     ** 平台差异说明: App
     */
    'app-plus'?: Object
    /**
     ** 描述: 设置编译到 H5 平台的特定样式，配置项参考下方 H5
     ** 平台差异说明: H5
     */
    h5?: Object
    /**
     ** 描述: 设置编译到 mp-alipay 平台的特定样式，配置项参考下方 MP-ALIPAY
     ** 平台差异说明: 支付宝小程序
     */
    'mp-alipay'?: Object
    /**
     ** 描述: 设置编译到 mp-weixin 平台的特定样式
     ** 平台差异说明: 微信小程序
     */
    'mp-weixin'?: Object
    /**
     ** 描述: 设置编译到 mp-baidu 平台的特定样式
     ** 平台差异说明: 百度小程序
     */
    'mp-baidu'?: Object
    /**
     ** 描述: 设置编译到 mp-toutiao 平台的特定样式
     ** 平台差异说明: 字节跳动小程序
     */
    'mp-toutiao'?: Object
    /**
     ** 描述: 设置编译到 mp-lark 平台的特定样式
     ** 平台差异说明: 飞书小程序
     */
    'mp-lark'?: Object
    /**
     ** 描述: 设置编译到 mp-lark 平台的特定样式
     ** 平台差异说明: 飞书小程序
     */
    'mp-qq'?: Object
    /**
     ** 描述: 设置编译到 mp-kuaishou 平台的特定样式
     ** 平台差异说明: 快手小程序
     */
    'mp-kuaishou'?: Object
    /**
     ** 描述: 设置编译到 mp-jd 平台的特定样式
     ** 平台差异说明: 京东小程序
     */
    'mp-jd'?: Object
    /**
     ** 描述: 引用小程序组件，参考 小程序组件https://uniapp.dcloud.net.cn/tutorial/miniprogram-subject.html#小程序自定义组件支持
     ** 平台差异说明: 京东小程序
     */
    usingComponents?: Object
    /**
     ** 描述: 同层渲染，webrtc(实时音视频) 无法正常时尝试配置 seperated 强制关掉同层
     ** 平台差异说明: 微信小程序
     */
    renderingMode?: string
    /**
     ** 描述: 当存在 leftWindow 时，默认是否显示 leftWindow
     ** 平台差异说明: H5
     */
    leftWindow?: boolean
    /**
     ** 描述: 当存在 topWindow 时，默认是否显示 topWindow
     ** 平台差异说明: H5
     */
    topWindow?: boolean
    /**
     ** 描述: 当存在 rightWindow 时，默认是否显示 rightWindow
     ** 平台差异说明: H5
     */
    rightWindow?: boolean
    /**
     ** 描述: rpx 计算所支持的最大设备宽度，单位 px
     ** 平台差异说明: App（vue2 且不含 nvue）、H5（2.8.12+）
     */
    rpxCalcMaxDeviceWidth?: number | 960
    /**
     ** 描述: rpx 计算使用的基准设备宽度，设备实际宽度超出 rpx 计算所支持的最大设备宽度时将按基准宽度计算，单位 px
     ** 平台差异说明: App（vue2 且不含 nvue）、H5（2.8.12+）
     */
    rpxCalcBaseDeviceWidth?: number | 375
    /**
     ** 描述: rpx 计算特殊处理的值，始终按实际的设备宽度计算，单位 rpx
     ** 平台差异说明: App（vue2 且不含 nvue）、H5（2.8.12+）
     */
    rpxCalcIncludeWidth?: number | 750
    /**
     ** 描述: 动态 rpx，屏幕大小变化会重新渲染 rpx
     ** 平台差异说明: App-nvue（vue2 且不含 vue3） 3.2.13+
     */
    dynamicRpx?: boolean
    /**
     ** 描述: 单位px，当浏览器可见区域宽度大于maxWidth时，两侧留白，当小于等于maxWidth时，页面铺满；不同页面支持配置不同的maxWidth；maxWidth = leftWindow(可选)+page(页面主体)+rightWindow(可选)
     ** 平台差异说明: H5（2.9.9+）
     */
    maxWidth?: number
}

type omitPageType = Omit<
    globalStyle_DTYPE,
    'pageOrientation' | 'renderingMode' | 'rpxCalcMaxDeviceWidth' | 'rpxCalcBaseDeviceWidth' | 'rpxCalcIncludeWidth' | 'dynamicRpx'
>
export type pages_DTYPE = {
    /**
     ** 描述: 配置页面路径
     */
    path: string
    /**
     ** 描述: 配置页面窗口表现，配置项参考下方 pageStyle https://uniapp.dcloud.net.cn/collocation/pages.html#style
     */
    style?: omitPageType & {
        /**
         ** 描述: 导航栏背景颜色（同状态栏背景色）
         ** 平台差异说明: APP与H5为#F7F7F7，小程序平台请参考相应小程序文档
         */
        navigationBarShadow?: Object
        /**
         ** 描述: 设置为 true 则页面整体不能上下滚动（bounce效果），只在页面配置中有效，在globalStyle中设置无效
         ** 平台差异说明: 微信小程序（iOS）、百度小程序（iOS）
         */
        disableScroll?: boolean
        /**
         ** 描述: 是否禁用滑动返回
         ** 平台差异说明: App-iOS（3.4.0+）
         */
        disableSwipeBack?: boolean
    }
}
export type easycom_DTYPE = {
    /**
     ** 描述: 是否开启自动扫描，开启后将会自动扫描符合components/组件名称/组件名称.vue目录结构的组件
     */
    autoscan?: boolean
    /**
     ** 描述: 以正则方式自定义组件匹配规则。如果autoscan不能满足需求，可以使用custom自定义匹配规则
     */
    custom?: Object
}
export type tabBarList_DTYPE = {
    /**
     ** 描述: 页面路径，必须在 pages 中先定义
     ** 平台差异说明: -
     */
    pagePath: string
    /**
     ** 描述: tab 上按钮文字，在 App 和 H5 平台为非必填。例如中间可放一个没有文字的+号图标
     ** 平台差异说明: -
     */
    text: string
    /**
     ** 描述: 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 position 为 top 时，此参数无效，不支持网络图片，不支持字体图标
     ** 平台差异说明: -
     */
    iconPath?: string
    /**
     ** 描述: 选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 position 为 top 时，此参数无效
     ** 平台差异说明: -
     */
    selectedIconPath?: string
    /**
     ** 描述: 该项是否显示，默认显示
     ** 平台差异说明: App (3.2.10+)、H5 (3.2.10)+
     */
    visible?: string
    /**
     ** 描述: 字体图标，优先级高于 iconPath
     ** 平台差异说明: App（3.4.4+）
     */
    iconfont?: string
}
type tabBarMidButtonType = {
    /**
     ** 描述: 中间按钮的宽度，tabBar 其它项为减去此宽度后平分，默认值为与其它项平分宽度
     */
    width?: string | '80px'
    /**
     ** 描述: 中间按钮的高度，可以大于 tabBar 高度，达到中间凸起的效果
     */
    height?: string | '50px'
    /**
     ** 描述: 中间按钮的文字
     */
    text?: string
    /**
     ** 描述: 中间按钮的图片路径
     */
    iconPath?: string
    /**
     ** 描述: 图片宽度（高度等比例缩放）
     */
    iconWidth?: string | '24px'
    /**
     ** 描述: 中间按钮的背景图片路径
     */
    backgroundImage?: string
    /**
     ** 描述: 字体图标，优先级高于 iconPath
     */
    iconfont?: {
        /**
         ** 描述: 字库 Unicode 码
         */
        text?: string
        /**
         ** 描述: 选中后字库 Unicode 码
         */
        selectedText?: string
        /**
         ** 描述: 字体图标字号(px)
         */
        fontSize?: string
        /**
         ** 描述: 字体图标颜色
         */
        color?: string
        /**
         ** 描述: 字体图标选中颜色
         */
        selectedColor?: string
    }
}
export type tabBar_DTYPE = {
    /**
     ** 描述: tab 上的文字默认颜色
     ** 平台差异说明: -
     */
    color: string
    /**
     ** 描述: tab 上的文字选中时的颜色
     ** 平台差异说明: -
     */
    selectedColor: string
    /**
     ** 描述: tab 的背景色
     ** 平台差异说明: -
     */
    backgroundColor: string
    /**
     ** 描述: tabbar 上边框的颜色，可选值 black/white，也支持其他颜色值
     ** 平台差异说明: App 2.3.4+ 、H5 3.0.0+
     */
    borderStyle?: string | 'white' | 'black'
    /**
     ** 描述: iOS 高斯模糊效果，可选值 dark/extralight/light/none(参考:使用说明) https://ask.dcloud.net.cn/article/36617
     ** 平台差异说明: App 2.4.0+ 支持、H5 3.0.0+（只有最新版浏览器才支持）
     */
    blurEffect?: 'dark' | 'extralight' | 'light' | 'none'
    /**
     ** 描述: tab 的列表，详见 list 属性说明，最少2个、最多5个 tab
     ** 平台差异说明: -
     */
    list: Array<tabBarList_DTYPE>
    /**
     ** 描述: 可选值 bottom、top
     ** 平台差异说明: top 值仅微信小程序支持
     */
    position?: string
    /**
     ** 描述: 文字默认大小
     ** 平台差异说明: App 2.3.4+、H5 3.0.0+
     */
    fontSize?: string | '10px'
    /**
     ** 描述: 图标默认宽度（高度等比例缩放）
     ** 平台差异说明: App 2.3.4+、H5 3.0.0+
     */
    iconWidth?: string | '24px'
    /**
     ** 描述: 图标和文字的间距
     ** 平台差异说明: App 2.3.4+、H5 3.0.0+
     */
    spacing?: string | '3px'
    /**
     ** 描述: tabBar 默认高度
     ** 平台差异说明: App 2.3.4+、H5 3.0.0+
     */
    height?: string | '50px'
    /**
     ** 描述: 中间按钮 仅在 list 项为偶数时有效
     ** 平台差异说明: App 2.3.4+、H5 3.0.0+
     */
    midButton?: tabBarMidButtonType
}
type conditionListType = {
    /**
     ** 描述: 启动模式名称
     */
    name: string
    /**
     ** 描述: 启动页面路径
     */
    path: string
    /**
     ** 描述: 启动参数，可在页面的 onLoad 函数里获得 https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle
     */
    query?: string
}
export type condition_DTYPE = {
    /**
     ** 描述: 当前激活的模式，list节点的索引值
     */
    current: number
    /**
     ** 描述: 启动模式列表
     */
    list: Array<conditionListType>
}
export type subPackages_DTYPE = {
    /**
     ** 描述: 子包的根目录
     */
    root: string
    /**
     ** 描述: 子包的根目录
     */
    pages: Array<pages_DTYPE>
}
export type preloadRule_DTYPE = {
    /**
     ** 描述: 进入页面后预下载分包的 root 或 name。__APP__ 表示主包。
     */
    packages: Array<string>
    /**
     ** 描述: 在指定网络下预下载，可选值为：all（不限网络）、wifi（仅wifi下预下载）
     */
    network?: 'all' | 'wifi'
}
export type leftWindow_DTYPE = {
    /**
     ** 描述: 配置页面路径
     */
    path?: string
    /**
     ** 描述: 配置页面窗口表现，配置项参考下方 pageStyle https://uniapp.dcloud.net.cn/collocation/pages.html#style
     */
    style?: Object
    /**
     ** 描述: 配置显示该窗口的规则，配置项参考下方 matchMedia
     */
    matchMedia?: {
        /**
         ** 描述: 当设备可见区域宽度 >= minWidth 时，显示该 window
         */
        minWidth?: number | 768
    }
}
export type topWindow_DTYPE = {} & leftWindow_DTYPE
export type rightWindow_DTYPE = {} & leftWindow_DTYPE
export type uniIdRouter_DTYPE = {
    loginPage: string
    needLogin: Array<string>
    resToLogin: boolean
}

// 应用type
export type shallowInfo_DTYPE = pages_DTYPE & { name?: string; space?: string; auth?: Array<string>; param?: Object; body?: Object }
export type shallow_DTYPE = Array<shallowInfo_DTYPE>
export type tablist_DTYPE = Array<tabBarList_DTYPE>
export type pagesKV_DTYPE = { [key in string]: shallowInfo_DTYPE }
export type newPagesJson_DTYPE = {
    shallow?: shallow_DTYPE
    tablist?: tablist_DTYPE
    pages?: pagesKV_DTYPE
} & { [key in string]: pagesKV_DTYPE }
