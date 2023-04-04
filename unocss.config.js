import presetWeapp from 'unocss-preset-weapp'
import { transformerClass } from 'unocss-preset-weapp/transformer'

export default {
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp({
      // h5兼容
      // 只开发小程序可删除
      platform: 'uniapp',
      isH5: process.env.UNI_PLATFORM === 'h5',
      taroWebpack: 'webpack5',
    }),
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

  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    // transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
}
