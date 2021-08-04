import copy from 'rollup-plugin-copy'

export default () => {
	return {
		name: 'vite-plugin-copy',
		// outputOptions: (option) => {
		// 	buildEnd: () => {

		// 	},
		// }
		plugin: [
			copy({
				targets: [{ src: 'src/assets/*', dest: 'dist/assets/hiprint', copyOnce: true }],
				verbose: true
			})
		]
	}
}
