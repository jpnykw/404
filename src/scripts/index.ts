import Timeline, { TimelineOption } './timeline'
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
  const textConfig = { size: 34, font: 'Arial', color: '#ffffff44' }

  const timeline = new Timeline({
    cooltime: 30,
    keyframes: [30, 38, 44, 52, 68, 86]
    // frame:   0   1   2   3   4   5
  })

  const center = {
    x: canvas.getAttribute('width') / 2,
    y: canvas.getAttribute('height') / 2,
  }

  timeline
    .add(0, (_this) => {
      _this.level = 1
      _this.label = ' a  '
      blinkText({ label: _this.label, level: _this.level, ...textConfig, ...center })
    })
    .add(1, (_this) => {
      _this.label = 'p  e'
      blinkText({ label: _this.label, level: _this.level, ...textConfig, ...center })
    })
    .add(2, (_this) => {
      _this.label = ' age'
      blinkText({ label: _this.label, level: _this.level, ...textConfig, ...center })
    })
    .add(3, (_this) => {
      _this.label = 'page'
      blinkText({ label: _this.label, level: _this.level, ...textConfig, ...center })
    })
    .add(4, (_this) => {
      _this.level = 2
      blinkText({ label: _this.label, level: _this.level, ...textConfig, ...center })
    })
    .add(5, (_this) => {
      _this.level = 0
      blinkText({ label: _this.label, level: _this.level, ...textConfig, ...center })
    })

  // Animation
  const loop = () => {
    context.fill('#05070a')
    context.noise({ x: 0, y: 0, pattern: noisePattern })
    timeline.run(time)

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

