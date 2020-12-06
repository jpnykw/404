import { generateNoisePattern } from './extends'
import './extends'

const DEBUG: boolean = false

interface Timeline {
  cooltime: number
  keyframes: number[]
}

const TIMELINE: Timeline = {
  cooltime: 30,
  keyframes: [30, 120]
}

window.addEventListener('load', () => {
  // Setup
  const canvas = document.querySelector('canvas')
  const context = canvas.getContext('2d')
  canvas.setAttribute('width', window.innerWidth)
  canvas.setAttribute('height', window.innerHeight)

  const width = canvas.getAttribute('width')
  const height = canvas.getAttribute('height')

  const noisePattern = generateNoisePattern({ width, height, level: 60000, gray: false, bright: 0.1 })
  const textConfig = { size: 40, font: 'Arial', color: '#ffffff44' }

  // Animation
  const loop = () => {
    context.fill('#05070a')
    context.noise({ x: 0, y: 0, pattern: noisePattern })

    const center = {
      x: canvas.getAttribute('width') / 2,
      y: canvas.getAttribute('height') / 2,
    }

    TIMELINE.keyframes.map((current, index, keyframes) => {
      const cooltime = TIMELINE.cooltime
      const next = keyframes[index + 1] || Infinity
      if (time > cooltime && time >= current && time < next) {
        DEBUG && console.log('now running', index, 'motion')
        switch(index) {
          case 0:
            /*
            const shadowTextConfig = { ...textConfig }
            context.text({ label: 'page', ...shadowTextConfig, ...center })
            shadowTextConfig.color = '#eee'
            context.text({ label: '  ge', ...shadowTextConfig, ...center })
            */
            blinkText({ label: 'blink!', level: 3, ...textConfig, ...center })
            break
        }
      }
    })

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

