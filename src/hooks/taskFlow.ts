class Flow {
	private effects: Array<Function> = []

	constructor(effects: Array<Function>) {
		this.effects = effects
	}

	push(fun: Function) {
		this.effects.push(fun)
	}

	async run(cb?: Function) {
		const tasklist = this.effects.flat()
		for (const task of tasklist) {
			if (typeof task === 'function') {
				await task()
			} else if ((task as unknown) instanceof Flow) {
				await (task as any).run()
			} else if (Array.isArray(task)) {
				await new Flow(task).run()
			}
		}

		cb?.()
	}
}

export default (effects = []) => new Flow(effects)
