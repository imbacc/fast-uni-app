// 克隆
export const clone = (obj) => {
	let o = obj instanceof Array ? [] : {}
	for (let k in obj) o[k] = typeof obj[k] === Object ? clone(obj[k]) : obj[k]
	return o
}

// 到时间隐藏
export const timeHide = (time = 300) => {
	return new Promise((resovle) => {
		let t = setTimeout(() => {
			clearTimeout(t)
			resovle()
		}, time)
	})
}

// 扫描枪
export const keyScan = (fun) => {
	let code = ''
	let lastTime, nextTime
	let lastCode, nextCode
	document.onkeypress = function (e) {
		if (window.event) {
			// IE
			nextCode = e.keyCode
		} else if (e.which) {
			// Netscape/Firefox/Opera
			nextCode = e.which
		}
		nextTime = new Date().getTime()
		if (!lastTime && !lastCode) {
			code += e.key
		}

		if (lastCode && lastTime && nextTime - lastTime > 30) {
			// 当扫码前有keypress事件时,防止首字缺失
			code = e.key
		} else if (lastCode && lastTime) {
			code += e.key
		}

		if (`${code}`.length === 13 || `${code}`.length === 12) {
			fun && fun(code)

			code = ''
			lastCode = ''
			lastTime = ''
			return
		}
		lastCode = nextCode
		lastTime = nextTime
	}
}

import template from '@/common/tools/panel.js'
// 初始化打印
export const initPrint = () => {
	hiprint.init()

	if (hiwebSocket.opened) hiwebSocket.stop()
	hiwebSocket.start()

	// const printerList = hiprintTemplate.getPrinterList()
	// if (printerList.length > 0) {
	// 	choosePrinter = printerList.filter((f) => f.name === 'XP-58')[0]
	// }
	// console.log('choosePrinter=', choosePrinter)
	// console.log('printerList=', printerList)
	// console.log('hiprint=', hiprint)
	// console.log('hiwebSocket=', hiwebSocket)
	// console.log('hiprintTemplate=', hiprintTemplate)
	// return hiprintTemplate
}

// 创建打印模板
// 打印输出
var hiprintTemplate = null
export const outPrint = ({ list, shop_name, order_no, order_time, keys, sum_count, sum_price, pay_type, pay_price }) => {
	if (hiprintTemplate) hiprintTemplate.clear()
	hiprintTemplate = null
	hiprintTemplate = new hiprint.PrintTemplate({ template })
	let shop_list_top = (idx) => idx * 30
	let other_top = list.length * 30
	let [num_key, name_key, sum_key] = keys
	let panel = hiprintTemplate.getPanel()
	let append_top_sum = 0
	panel.printElements[1].options.title = shop_name
	panel.printElements[2].options.title = `单号：${order_no}`
	panel.printElements[3].options.title = `时间：${order_time}`
	// 添加商品列表
	list.forEach((info, idx) => {
		let list_top = 179 + shop_list_top(idx)
		let name = `${info[name_key]}`,
			num = `${info[num_key]}`,
			sum = `${info[sum_key]}`,
			append_top = name.length > 10 ? 20 : 0
		append_top_sum += append_top
		panel.addPrintText({
			options: {
				left: 156,
				top: list_top + append_top,
				height: 9.75,
				width: 83,
				title: num,
				fontSize: 16,
				fontWeight: 'bold',
				textAlign: 'center'
			},
			printElementType: { type: 'text' }
		})
		panel.addPrintText({
			options: {
				left: 36,
				top: list_top + append_top,
				height: 31.5,
				width: 162,
				title: name,
				fontSize: 16,
				fontWeight: 'bold',
				lineHeight: 15
			},
			printElementType: { type: 'text' }
		})
		panel.addPrintText({
			options: {
				left: 202.5,
				top: list_top + append_top,
				height: 9.75,
				width: 103.5,
				title: sum,
				textAlign: 'center',
				fontSize: 16,
				fontWeight: 'bold'
			},
			printElementType: { type: 'text' }
		})
	})
	// 添加虚线
	panel.addPrintHline({
		options: { left: 12, top: 201 + other_top + append_top_sum - 10, height: 1, width: 280.5, borderStyle: 'dashed' },
		printElementType: { type: 'hline' }
	})

	panel.addPrintText({
		options: {
			left: 37,
			top: 259 + other_top + append_top_sum,
			height: 15,
			width: 235,
			title: `总计：${new Number(sum_price).toFixed(2)}`,
			fontWeight: 'bold',
			fontSize: 16
		},
		printElementType: { type: 'text' }
	})

	panel.addPrintText({
		options: {
			left: 37,
			top: 279 + other_top + append_top_sum,
			height: 15,
			width: 235,
			title: `${pay_type}支付：${new Number(pay_price).toFixed(2)}`,
			fontWeight: 'bold',
			fontSize: 16
		},
		printElementType: {
			type: 'text'
		}
	})

	panel.addPrintText({
		options: {
			left: 37,
			top: 299 + other_top + append_top_sum,
			height: 15,
			width: 235,
			title: `应收：${new Number(sum_price).toFixed(2)}`,
			fontSize: 16,
			fontWeight: 'bold'
		},
		printElementType: {
			type: 'text'
		}
	})

	panel.addPrintText({
		options: {
			left: 37,
			top: 319 + other_top + append_top_sum,
			height: 15,
			width: 235,
			title: `实收：${new Number(pay_price).toFixed(2)}`,
			fontSize: 16,
			fontWeight: 'bold'
		},
		printElementType: {
			type: 'text'
		}
	})

	// panel.addPrintText({
	// 	options: {
	// 		left: 37,
	// 		top: 339 + other_top + append_top_sum,
	// 		height: 15,
	// 		width: 235,
	// 		title: `找零：${new Number(pay_price - sum_price < 0 ? 0 : pay_price - sum_price).toFixed(2)}`,
	// 		fontSize: 16,
	// 		fontWeight: 'bold'
	// 	},
	// 	printElementType: {
	// 		type: 'text'
	// 	}
	// })

	// 添加底部文字
	panel.addPrintText({
		options: {
			left: 24,
			top: 439 + (list.length > 1 ? other_top + append_top_sum : 0),
			height: 16.5,
			width: 250.5,
			title: '谢谢惠顾，欢迎下次光临',
			textAlign: 'center',
			fontSize: 16,
			fontWeight: 'bold'
		},
		printElementType: { type: 'text' }
	})

	const panel_top = Array.from(panel.printElements, ({ options }) => options.top)
	const max_panel_top = Math.max(...panel_top)
	const compute_height = (max_panel_top - (list.length * 10 - list.length)) / 2
	panel.height = compute_height < 167 ? 167 : compute_height
	panel.paperFooter = max_panel_top + 30
	console.log(JSON.stringify(hiprintTemplate.getJson()))
	hiprintTemplate.print2({}, { title: '稀世珍品' })
}
