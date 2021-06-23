// module.exports = {  
//     chainWebpack: (config) => {  
        // 发行或运行时启用了压缩时会生效  
        // config.optimization.minimizer('terser').tap((args) => {  
        //     const compress = args[0].terserOptions.compress  
        //     compress.drop_console = true  
        //     compress.pure_funcs = [  
        //         '__f__', // App 平台 vue 移除日志代码  
        //         // 'console.debug' // 可移除指定的 console 方法  
        //     ]  
        //     return args  
        // })  
//     }  
// }