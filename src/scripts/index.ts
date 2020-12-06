import { generateNoisePattern } from './extends'
import './extends'

const DEBUG: boolean = false

interface Timeline {
  cooltime: number
  keyframes: number[]
}

const TIMELINE: Timeline = {
  cooltime: 30,
  keyframes: [30, 38, 44, 52, 68, 86]
  // frame:   0   1   2   3   4   5
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
  const textConfig = { size: 34, font: 'Arial', color: '#ffffff44' }

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

        let label: string = 'page'
        let level: number = 1

        switch(index) {
          case 0:
            label = ' a  '
            break

          case 1:
            label = 'p  e'
            break

          case 2:
            label = ' age'
            break

          case 4:
            level = 2
            break

          case 5:
            level = 0
            break
        }

        blinkText({ label, level, ...textConfig, ...center })
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

