import { presetUni } from '@uni-helper/unocss-preset-uni'
import { defineConfig } from 'unocss'

// <view class="bg-gradient-to-t from-#f39c12/60 via-#2ecc71:80 to-#9b59b6_70"></view>
// <view class="animate-pulse"></view>
// <view class="animate-back-in-down animate-iteration-infinite"></view>
// <view class="animate-[4s_linear_0s_infinite_alternate_bounce]"></view>

// .animate--fl-4s_linear_0s_infinite_alternate_bounce-fr- {
//   -webkit-animation: 4s linear 0s infinite alternate bounce;
//   animation: 4s linear 0s infinite alternate bounce;
// }

// p-safe	padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)
// pt-safe	padding-top: env(safe-area-inset-top)
// pb-safe	padding-bottom: env(safe-area-inset-bottom)
// pl-safe	padding-left: env(safe-area-inset-left)
// pr-safe	padding-right: env(safe-area-inset-right)

export default defineConfig({
  content: {
    pipeline: {
      exclude: [
        /node_modules/,
        /dist/,
        /\.git/,
        /\.husky/,
        /\.vscode/,
        /public/,
        /build/,
        /mock/,
        /\.history/,
      ],
    },
  },

  presets: [
    presetUni(),
  ],

  shortcuts: [
    {
      'h100b': 'h-[100%]',
      'w100b': 'w-[100%]',
      'hw100b': 'h-[100%] w-[100%]',
      'fw400': 'font-PFSC font-normal',
      'flex-center': 'flex justify-center',
      'flex-align': 'flex items-center',
      'flex-center-align': 'flex justify-center items-center',
      'flex-end': 'flex justify-end',
      'flex-nowrap': 'flex flex-nowrap',
      'flex-wrap': 'flex flex-wrap',
      'flex-between': 'flex justify-between',
      'flex-around': 'flex justify-around',
      'flex-evenly': 'flex justify-evenly',
      'flex-rowmn': 'flex flex-row',
      'flex-column': 'flex flex-col',
    },
  ],

  theme: {
    colors: {
      primary: 'var(--primary-color)',
      primary_hover: 'var(--primary-color-hover)',
      primary_pressed: 'var(--primary-color-pressed)',
      primary_active: 'var(--primary-color-active)',
      info: 'var(--info-color)',
      info_hover: 'var(--info-color-hover)',
      info_pressed: 'var(--info-color-pressed)',
      info_active: 'var(--info-color-active)',
      success: 'var(--success-color)',
      success_hover: 'var(--success-color-hover)',
      success_pressed: 'var(--success-color-pressed)',
      success_active: 'var(--success-color-active)',
      warning: 'var(--warning-color)',
      warning_hover: 'var(--warning-color-hover)',
      warning_pressed: 'var(--warning-color-pressed)',
      warning_active: 'var(--warning-color-active)',
      error: 'var(--error-color)',
      error_hover: 'var(--error-color-hover)',
      error_pressed: 'var(--error-color-pressed)',
      error_active: 'var(--error-color-active)',
      dark: '#18181c',
    },
    // v0.1.9 加入动画预设
    // https://github.com/MellowCo/unocss-preset-weapp#animation-v019
    // 设置自定义动画
    animation: {
      keyframes: {
        'my-animation': '{0% {letter-spacing: -0.5em;transform: translateZ(-700px);opacity: 0;}40% {opacity: 0.6;}100% {transform: translateZ(0);opacity: 1;}}',
      },
      durations: {
        'my-animation': '0.8s',
      },
      counts: {
        'my-animation': 'infinite',
      },
      timingFns: {
        'my-animation': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
      },
    },
  },

  rules: [
    ['p-safe', { padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)' }],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
    ['pl-safe', { 'padding-left': 'env(safe-area-inset-left)' }],
    ['pr-safe', { 'padding-right': 'env(safe-area-inset-right)' }],
  ],

  transformers: [
  ],
})
