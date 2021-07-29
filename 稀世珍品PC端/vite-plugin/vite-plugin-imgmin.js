import viteImagemin from 'vite-plugin-imagemin'

export default () => {
	return viteImagemin({
		gifsicle: {
			optimizationLevel: 7,
			interlaced: false
		},
		optipng: {
			optimizationLevel: 7
		},
		webp: {
			quality: 75
		},
		mozjpeg: {
			quality: 65
		},
		pngquant: {
			quality: [0.65, 0.9],
			speed: 4
		},
		svgo: {
			plugins: [
				{
					removeViewBox: false
				},
				{
					removeEmptyAttrs: false
				}
			]
		}
	})
}
