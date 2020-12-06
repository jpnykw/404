export default class Timeline {
  constructor(option: { cooltime: number, custom: object }) {
    Object.assign(this, option.custom)
    this.cooltime = option.cooltime
    this.hooks = Object.create(null)
    this.keyframes = []
    return this
  }

  add(frame, method) {
    this.keyframes.push(frame)
    this.hooks[`f${Object.keys(this.hooks).length}`] = () => method(this)
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

