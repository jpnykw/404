import Timeline from './timeline'
import { generateNoisePattern } from './extends'
import './extends'

const DEBUG: boolean = false

window.addEventListener('load', () => {
  // Setup
  const canvas = document.querySelector('canvas')
  const context = canvas.getContext('2d')
  canvas.setAttribute('width', window.innerWidth)
  canvas.setAttribute('height', window.innerHeight)

  const width = canvas.getAttribute('width')
  const height = canvas.getAttribute('height')

  const noisePattern = generateNoisePattern({ width, height, level: 60000, gray: false, bright: 0.1 })
  const textConfig = { size: 34, padding: -8, font: 'itc-avant-garde-gothic-pro, sans-serif', color: '#ffffff10' }

  const center = {
    x: canvas.getAttribute('width') / 2,
    y: canvas.getAttribute('height') / 2,
  }

  // Create animation
  const textTimeline = new Timeline({ cooltime: 30, custom: { alpha: 0x20 } })
    .add(30, (_this) => {
      _this.level = 1
      _this.label = ' ag '
      blinkText({ label: _this.label, level: _this.level, ...textConfig, ...center })
    })
    .add(33, (_this) => {
      _this.label = 'p   e'
      blinkText({ label: _this.label, level: _this.level, ...textConfig, ...center })
    })
    .add(35, (_this) => {
      _this.label = 'p g '
      blinkText({ label: _this.label, level: _this.level, ...textConfig, ...center })
    })
    .add(38, (_this) => {
      _this.label = '  ge'
      blinkText({ label: _this.label, level: _this.level, ...textConfig, ...center })
    })
    .add(43, (_this) => {
      _this.label = 'p ae'
      blinkText({ label: _this.label, level: _this.level, ...textConfig, ...center })
    })
    .add(47, (_this) => {
      _this.label = ' a e'
      blinkText({ label: _this.label, level: _this.level, ...textConfig, ...center })
    })
    .add(53, (_this) => {
      _this.level = 2
      _this.label = 'pag '
      blinkText({ label: _this.label, level: _this.level, ...textConfig, ...center })
    })
    .add(58, (_this) => {
      DEBUG && console.log(_this.alpha.toString(16))
      _this.alpha = _this.alpha + Math.abs(0x66 - _this.alpha) / 6
      _this.level = _this.level + Math.abs(0 - this.level) / 15
      _this.label = 'page'

      textConfig.color = `#ffffff${Math.floor(_this.alpha).toString(16)}`
      blinkText({ label: _this.label, level: _this.level, ...textConfig, ...center })
    })

  const shapeTimeline = new Timeline({ cooltime: 30, custom: { dx: 50 } })
    .add(34, (_this) => {
      _this.dx = _this.dx + (120 - _this.dx) / 12
      context.line({ origin: { x: center.x + 250, y: center.y - 10 }, dx: _this.dx, dy: 0 })
      context.line({ origin: { x: center.x - 250, y: center.y - 10 }, dx: -_this.dx, dy: 0 })
    })

  // Draw & Update
  const loop = () => {
    context.fill('#05070a')
    context.noise({ x: 0, y: 0, pattern: noisePattern })

    textTimeline.run(time)
    shapeTimeline.run(time)

    time = time + 1
    requestAnimationFrame(loop)
  }

  // Methods
  const blinkText = (option: { level: number } extends TextOption) => {
    const label: string = option.label
    const length: number = label.length
    const level: number = option.level > length ? length : option.level
    const stack: number[] = []

    for (let i = 0; i < level; i++) {
      let pointer = Math.floor(Math.random() * length)
      while (stack.includes(pointer)) {
        pointer = Math.floor(Math.random() * length)
      }
      stack.push(pointer)
    }

    const shadowLabel = label.split('').map((char, index) => stack.includes(index) ? ' ' : char).join('')
    option.label = shadowLabel
    context.text(option)
  }

  // Start
  let time = 0
  loop()
})

