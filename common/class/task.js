// 队列
class Flow {
	constructor(effects) {
		this.effects = effects
	}

	async run(cb) {
		const tasklist = this.effects.flat()
		for (const task of tasklist) {
			if (typeof task === 'function') {
				await task()
			} else if (task instanceof Flow) {
				await task.run()
			} else if (Array.isArray(task)) {
				await new Flow(task).run()
			}
		}

		cb && cb()
	}
}

export default (effects = []) => new Flow(effects)
