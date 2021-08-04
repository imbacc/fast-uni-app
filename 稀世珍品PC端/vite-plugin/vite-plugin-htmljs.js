import html from 'vite-plugin-html'
const env = process.env.NODE_ENV
const path = env === 'development' ? 'src/assets/hiprint' : 'assets/hiprint'

export default () => {
	return html({
		inject: {
			injectData: {
				// injectHeader:
				// 	env === 'development'
				// 		? ''
				// 		: `
				// 	<link defer="defer" href="${path}/css/hiprint.css" rel="stylesheet">
				// 	<link defer="defer" href="${path}/css/print-lock.css" media="print" rel="stylesheet">
				// `,
				injectScript: `
					<script crossorigin defer="defer" type="text/javascript" src="${path}/plugins/jq-3.31.js"></script>
					<script crossorigin defer="defer" type="text/javascript" src="${path}/plugins/socket.io.js"></script>
					<script crossorigin defer="defer" type="text/javascript" src="${path}/polyfill.min.js"></script>
					<script crossorigin defer="defer" type="text/javascript" src="${path}/hiprint.bundle.js"></script>
					<script crossorigin defer="defer" type="text/javascript" src="${path}/plugins/jquery.hiwprint.js"></script>
					<script crossorigin defer="defer" type="text/javascript" src="${path}/plugins/jquery.minicolors.min.js"></script>
				`
				// <script defer="defer" src="${path}/plugins/jq-3.31.js"></script>
				// <!-- scoket io -->
				// <script defer="defer" src="${path}/plugins/socket.io.js"></script>
				// <!-- polyfill.min.js解决浏览器兼容性问题v6.26.0 -->
				// <script defer="defer" src="${path}/polyfill.min.js"></script>
				// <!-- hiprint 核心js-->
				// <script defer="defer" src="${path}/hiprint.bundle.js"></script>
				// <!-- 调用浏览器打印窗口helper类，可自行替换-->
				// <script defer="defer" src="${path}/plugins/jquery.hiwprint.js"></script>
				// <!-- jquery minicolors -->
				// <script defer="defer" src="${path}/plugins/jquery.minicolors.min.js"></script>
				// <!-- 二维码生成组件-->
				// <script defer="defer" src="${path}/plugins/qrcode.js"></script>
				// <!-- 条形码生成组件-->
				// <script defer="defer" src="${path}/plugins/JsBarcode.all.min.js"></script>
			}
		},
		minify: true
	})
}
