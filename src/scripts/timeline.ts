interface TimelineOption {
  keyframes: number[]
  cooltime: number
}

export default class Timeline {
  constructor(option: TimelineOption) {
    Object.assign(this, option)
    this.hooks = Object.create(null)
  }

  add(frame, method) {
    this.hooks[`f${frame}`] = () => method(this)
    return this
  }

  run(time) {
    this.keyframes.map((current, frame, keyframes) => {
      const cooltime = this.cooltime
      const next = keyframes[frame + 1] || Infinity
      const method = this.hooks[`f${frame}`]
      time > cooltime && time >= current && time < next && method && method()
    })
  }
}

