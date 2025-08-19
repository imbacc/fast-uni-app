type Task = Function | Flow | Task[]

class Flow {
  private effects: Task[] = []

  constructor(effects: Task[] = []) {
    this.effects = effects
  }

  push(task: Task) {
    this.effects.push(task)
  }

  async run(cb?: () => void): Promise<void> {
    try {
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
      cb?.()
    } catch (error) {
      console.error('Flow execution error:', error)
      throw error
    }
  }
}

export { Flow }
export default (effects: Task[] = []) => new Flow(effects)
