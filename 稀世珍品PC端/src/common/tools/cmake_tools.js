// 克隆
export const clone = (obj) => {
	let o = obj instanceof Array ? [] : {}
	for (let k in obj) o[k] = typeof obj[k] === Object ? clone(obj[k]) : obj[k]
	return o
}

// 到时间隐藏
export const timeHide = (time) => {
	return new Promise((resovle) => {
		let t = setTimeout(() => {
			clearTimeout(t)
			resovle()
		}, time)
	})
}

// 初始化打印
var hiprintTemplate, choosePrinter
export const initPrint = () => {
	hiprint.init()
	hiprintTemplate = new hiprint.PrintTemplate()

	if (hiwebSocket.opened) hiwebSocket.stop()
	hiwebSocket.start()

	const printerList = hiprintTemplate.getPrinterList()
	if (printerList.length > 0) {
		choosePrinter = printerList.filter((f) => f.name === 'XP-58')[0]
	}

	// console.log('choosePrinter=', choosePrinter)
	// console.log('printerList=', printerList)
	// console.log('hiprint=', hiprint)
	// console.log('hiwebSocket=', hiwebSocket)
	// console.log('hiprintTemplate=', hiprintTemplate)
	return hiprintTemplate
}

// 打印输出
export const outPrint = (template) => {
	hiprintTemplate = new hiprint.PrintTemplate({ template })
	hiprintTemplate.print2(template, { printer: choosePrinter, title: '稀世珍品' })
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

		if (`${code}`.length === 12) {
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
