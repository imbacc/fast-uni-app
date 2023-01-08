import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
      },
      fontFamily: {
        PFSC: ['PingFang SC, Arial, Microsoft YaHei, sans-serif'],
      },
    },
  },
  shortcuts: {
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
    'flex-rowmn': 'flex flex-row',
    'flex-column': 'flex flex-col',
  },
  plugins: [],
})
