import type { ENV_DTYPE } from './types/vite-plugin/auto-env'

// manifest.config.js
import process from 'node:process'
import { loadEnv } from 'vite'

import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'
import { formatEnv } from './vite-plugin/vite-plugin-env'

// 获取环境变量的范例
const VITE_ENV = formatEnv(loadEnv(process.env.NODE_ENV || '', process.cwd())) as ENV_DTYPE

const { VITE_APP_TITLE, VITE_UNI_APPID, VITE_PUBLIC_PATH, VITE_APP_VERSION, VITE_WECHAT_APPID, VITE_WECHAT_APPSECRET, VITE_APP_LINKS_DOMAIN } = VITE_ENV

function versionToNumber(version) {
  return `${Number(version.replace(/\./g, ''))}`
}

// 配置 https://uniapp.dcloud.net.cn/collocation/manifest-app.html
export default defineManifestConfig({
  'name': VITE_APP_TITLE,
  'appid': VITE_UNI_APPID,
  'description': '',
  'versionName': VITE_APP_VERSION,
  'versionCode': versionToNumber(VITE_APP_VERSION),
  'transformPx': false,
  'locale': 'zh-ch',
  'uniStatistics': {
    enable: false,
  },
  'vueVersion': '3',
  /* 5+App特有相关 */
  'app-plus': {
    allowsInlineMediaPlayback: true, // 是否h5中视频非全屏播放，3.8.5版本开始默认值为 true （仅iOS生效）
    mediaPlaybackRequiresUserAction: false, // 配置h5中的音视频是否可通过API自动播放，注意当设置为false时允许API控制自动播放，3.8.5版本开始默认值为 false（仅iOS生效 3.0.1 + 版本支持）
    nvueCompiler: 'uni-app', // nvue页面编译模式，可取值uni-app、weex
    nvueStyleCompiler: 'uni-app', // nvue页面样式编译模式，可取值uni-app、weex
    renderer: 'native', // 可不加载基于 webview 的运行框架，可取值native
    compilerVersion: 3, // 编译器版本，可取值2、3
    nvueLaunchMode: 'normal', // nvue首页启动模式，compilerVersion值为3时生效，可取值normal、fast
    nvue: { // nvue页面相关配置
      'flex-direction': 'row', // nvue页面的flex-direction默认值，可取值row、row-reverse、column、column-reverse
    },
    optimization: { // 分包配置
      // #ifdef H5
      subPackages: true, // 是否开启分包优化
      // #endif
    },
    uniStatistics: { // uni统计配置
      enable: true, // 是否开启uni统计
    },
    screenOrientation: [ // 应用支持的横竖屏
      'portrait-primary', // 支持竖屏
      'portrait-secondary', // 支持反向竖屏
      'landscape-primary', // 支持横屏
      'landscape-secondary', // 支持反向横屏
    ],
    usingComponents: true,
    compatible: {
      ignoreVersion: true,
    },
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0,
    },
    /* 模块配置 */
    modules: {
      // "Bluetooth": {                      //Bluetooth(低功耗蓝牙)
      //       "description": "低功耗蓝牙"
      //   },
      //   "Contacts": {                       //Contact(通讯录)
      //       "description": "通讯录"
      //   },
      //   "FaceID": {                         //FaceID(人脸识别)，仅iOS支持
      //       "description": "人脸识别"
      //   },
      //   "Fingerprint": {                    //Fingerprint(指纹识别)
      //       "description": "指纹识别"
      //   },
      //   "Geolocation": {                    //Geolocation(定位)
      //       "description": "定位"
      //   },
      //   "iBeacon": {                        //iBeacon
      //       "description": "iBeacon"
      //   },
      //   "LivePusher": {                     //LivePusher(直播推流)
      //       "description": "直播推流"
      //   },
      //   "Maps": {                           //Maps(地图)
      //       "description": "地图"
      //   },
      //   "Messaging": {                      //Messaging(短彩邮件消息)
      //       "description": "短彩邮件消息"
      //   },
      //   "OAuth": {                          //OAuth(登录鉴权)
      //       "description": "登录鉴权"
      //   },
      //   "Payment": {                        //Payment(支付)
      //       "description": "iBeacon"
      //   },
      //   "Push": {                           //Push(消息推送)
      //       "description": "iBeacon"
      //   },
      //   "Share": {                          //Share(分享)
      //       "description": "iBeacon"
      //   },
      //   "Speech": {                         //Speech(语音输入)
      //       "description": "iBeacon"
      //   },
      //   "Statistic": {                      //Statistic(统计)
      //       "description": "iBeacon"
      //   },
      //   "SQLite": {                         //SQLite(统计)
      //       "description": "iBeacon"
      //   },
      //   "VideoPlayer": {                    //VideoPlayer(视频播放)
      //       "description": "iBeacon"
      //   },
      //   "Webview-x5": {                     //Android X5 Webview(腾讯TBS)，仅Android支持
      //       "description": "iBeacon"
      //   },
      //   "UIWebview": {                      //UIWebview，仅iOS支持
      //       "description": "iBeacon"
      //   }
    },
    webView: { // 3.5.0 + 当系统webview低于指定版本时，会弹出提示。或者下载x5内核后继续启动，仅Android支持
      minUserAgentVersion: '95.0.4638.75', // 最小webview版本
      x5: { // 此属性需要勾选 Android X5 Webview 模块，详细参见下面的说明
        timeOut: 3000, // 超时时间
        showTipsWithoutWifi: true, // 是否在非WiFi网络环境时，显示用户确认下载x5内核的弹窗。
        allowDownloadWithoutWiFi: false, // 是否允许用户在非WiFi网络时进行x5内核的下载。（如果为true，就不会显示用户确认的弹窗。）
      },
    },
    checkPermissionDenied: false, // 是否校验已拒绝权限 如果拒绝则不会再申请 默认false 不校验已拒绝权限
    /* 应用发布信息 */
    distribute: {
      /* android打包配置 */
      android: {
        // 使用hbuilder打包app 下面四个字段不用配
        // "packagename": VITE_APP_PACKAGE_NAME,          //Android包名
        // "keystore": "",             //Android签名证书文件路径
        // "password": "",             //Android签名证书文件的密码
        // "aliasname": "",            //Android签名证书别名
        schemes: '', // 参考：https://uniapp.dcloud.io/tutorial/app-android-schemes
        minSdkVersion: 30,
        targetSdkVersion: 30,
        abiFilters: ['armeabi-v7a', 'arm64-v8a'],
        permissions: [
          // "<uses-permission android:name=\"android.permission.INTERNET\" />",
          // "<uses-permission android:name=\"android.permission.READ_EXTERNAL_STORAGE\" />",
          // "<uses-permission android:name=\"android.permission.WRITE_EXTERNAL_STORAGE\" />",
          // "<uses-permission android:name=\"android.permission.INSTALL_PACKAGES\" />",
          // "<uses-permission android:name=\"android.permission.REQUEST_INSTALL_PACKAGES\" />",
          // "<uses-permission android:name=\"android.permission.CHANGE_NETWORK_STATE\"/>",
          // "<uses-permission android:name=\"android.permission.MOUNT_UNMOUNT_FILESYSTEMS\"/>",
          // "<uses-permission android:name=\"android.permission.VIBRATE\"/>",
          // "<uses-permission android:name=\"android.permission.READ_LOGS\"/>",
          // "<uses-permission android:name=\"android.permission.ACCESS_WIFI_STATE\"/>",
          // "<uses-feature android:name=\"android.hardware.camera.autofocus\"/>",
          // "<uses-permission android:name=\"android.permission.ACCESS_NETWORK_STATE\"/>",
          // "<uses-permission android:name=\"android.permission.CAMERA\"/>",
          // "<uses-permission android:name=\"android.permission.GET_ACCOUNTS\"/>",
          // "<uses-permission android:name=\"android.permission.READ_PHONE_STATE\"/>",
          // "<uses-permission android:name=\"android.permission.CHANGE_WIFI_STATE\"/>",
          // "<uses-permission android:name=\"android.permission.WAKE_LOCK\"/>",
          // "<uses-permission android:name=\"android.permission.FLASHLIGHT\"/>",
          // "<uses-feature android:name=\"android.hardware.camera\"/>",
          // "<uses-permission android:name=\"android.permission.WRITE_SETTINGS\"/>"
        ],
      },
      /* ios打包配置 */
      ios: {
        // 使用hbuilder打包app 下面四个字段不用配
        // "appid": VITE_APP_PACKAGE_NAME,                    //iOS平台Bundle ID
        // "mobileprovision": "",          //iOS打包使用的profile文件路径
        // "p12": "",                      //iOS打包使用的证书文件路径
        // "password": "",                 //iOS打包使用的证书密码
        // "devices": "iphone",            //iOS支持的设备类型，可取值iphone、ipad、universal
        urlschemewhitelist: 'baidumap', // 应用访问白名单列表，参考：https://uniapp.dcloud.io/tutorial/app-ios-schemewhitelist
        urltypes: '',
        dSYMs: false,
        idfa: false,
        capabilities: {
          entitlements: {
            'com.apple.developer.applesignin': ['Default'],
            'com.apple.developer.associated-domains': [`applinks:${VITE_APP_LINKS_DOMAIN}`],
          },
        },
        deploymentTarget: '10.0', // iOS支持的最低版本
        privacyDescription: { // iOS隐私信息访问的许可描述
          // "NSPhotoLibraryUsageDescription": "更换用户头像",                       //系统相册读取权限描述
          // "NSPhotoLibraryAddUsageDescription": "",                    //系统相册写入权限描述
          // "NSCameraUsageDescription": "",                             //摄像头使用权限描述
          // "NSMicrophoneUsageDescription": "",                         //麦克风使用权限描述
          // "NSLocationWhenInUseUsageDescription": "",                  //运行期访问位置权限描述
          // "NSLocationAlwaysUsageDescription": "",                     //后台运行访问位置权限描述
          // "NSLocationAlwaysAndWhenInUseUsageDescription": "",         //运行期后后台访问位置权限描述
          // "NSCalendarsUsageDescription": "",                          //使用日历权限描述
          // "NSContactsUsageDescription": "",                           //使用通讯录权限描述
          // "NSBluetoothPeripheralUsageDescription": "",                //使用蓝牙权限描述
          // "NSBluetoothAlwaysUsageDescription": "",                    //后台使用蓝牙权限描述
          // "NSSpeechRecognitionUsageDescription": "",                  //系统语音识别权限描述
          // "NSRemindersUsageDescription": "",                          //系统提醒事项权限描述
          // "NSMotionUsageDescription": "",                             //使用运动与健康权限描述
          // "NSHealthUpdateUsageDescription": "",                       //使用健康更新权限描述
          // "NSHealthShareUsageDescription": "",                        //使用健康分享权限描述
          // "NSAppleMusicUsageDescription": "",                         //使用媒体资料库权限描述
          // "NFCReaderUsageDescription": "",                            //使用NFC权限描述
          // "NSHealthClinicalHealthRecordsShareUsageDescription": "",   //访问临床记录权限描述
          // "NSHomeKitUsageDescription": "",                            //访问HomeKit权限描述
          // "NSSiriUsageDescription": "",                               //访问Siri权限描述
          // "NSFaceIDUsageDescription": "",                             //使用FaceID权限描述
          // "NSLocalNetworkUsageDescription": "",                       //访问本地网络权限描述
          // "NSUserTrackingUsageDescription": ""                        //跟踪用户活动权限描述
        },
      },
      /* SDK配置 */
      sdkConfigs: {
        oauth: {
          weixin: {
            appid: VITE_WECHAT_APPID,
            appsecret: VITE_WECHAT_APPSECRET,
            UniversalLinks: `https://${VITE_APP_LINKS_DOMAIN}/`,
          },
          apple: {},
        },
        payment: {
          weixin: {
            __platform__: ['ios', 'android'],
            appid: VITE_WECHAT_APPID,
            appsecret: VITE_WECHAT_APPSECRET,
            UniversalLinks: `https://${VITE_APP_LINKS_DOMAIN}/`,
          },
          appleiap: {},
        },
        share: {
          weixin: {
            appid: VITE_WECHAT_APPID,
            appsecret: VITE_WECHAT_APPSECRET,
            UniversalLinks: `https://${VITE_APP_LINKS_DOMAIN}/`,
          },
        },
      },
    },
    icons: {
      android: {
        hdpi: 'unpackage/res/icons/72x72.png',
        xhdpi: 'unpackage/res/icons/96x96.png',
        xxhdpi: 'unpackage/res/icons/144x144.png',
        xxxhdpi: 'unpackage/res/icons/192x192.png',
      },
      ios: {
        appstore: 'unpackage/res/icons/1024x1024.png',
        ipad: {
          'app': 'unpackage/res/icons/76x76.png',
          'app@2x': 'unpackage/res/icons/152x152.png',
          'notification': 'unpackage/res/icons/20x20.png',
          'notification@2x': 'unpackage/res/icons/40x40.png',
          'proapp@2x': 'unpackage/res/icons/167x167.png',
          'settings': 'unpackage/res/icons/29x29.png',
          'settings@2x': 'unpackage/res/icons/58x58.png',
          'spotlight': 'unpackage/res/icons/40x40.png',
          'spotlight@2x': 'unpackage/res/icons/80x80.png',
        },
        iphone: {
          'app@2x': 'unpackage/res/icons/120x120.png',
          'app@3x': 'unpackage/res/icons/180x180.png',
          'notification@2x': 'unpackage/res/icons/40x40.png',
          'notification@3x': 'unpackage/res/icons/60x60.png',
          'settings@2x': 'unpackage/res/icons/58x58.png',
          'settings@3x': 'unpackage/res/icons/87x87.png',
          'spotlight@2x': 'unpackage/res/icons/80x80.png',
          'spotlight@3x': 'unpackage/res/icons/120x120.png',
        },
      },
    },
  },
  /* 快应用特有相关 */
  'quickapp': {},
  /* 小程序特有相关 */
  'mp-weixin': {
    appid: VITE_WECHAT_APPID,
    setting: {
      urlCheck: false,
    },
    usingComponents: true,
    // __usePrivacyCheck__: true,
  },
  'mp-alipay': {
    usingComponents: true,
    styleIsolation: 'shared',
  },
  'mp-baidu': {
    usingComponents: true,
  },
  'mp-toutiao': {
    usingComponents: true,
  },
  'h5': {
    title: '',
    template: 'index.html',
    router: {
      mode: 'history',
      base: VITE_PUBLIC_PATH,
    },
    async: {
      loading: 'AsyncLoading',
      error: 'AsyncError',
      delay: 200,
      timeout: 3000,
    },
  },
})
