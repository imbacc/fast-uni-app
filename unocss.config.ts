import presetWeapp from 'unocss-preset-weapp'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

export default {
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
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
