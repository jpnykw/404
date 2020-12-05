import { generateNoisePattern } from './extends'
import './extends'

interface Timeline {
  cooltime: number
  keyframes: number[]
}

const TIMELINE: Timeline = {
  cooltime: 30,
  keyframes: [30, 120]
}

const DEBUG: boolean = false

window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas')
  const context = canvas.getContext('2d')

  canvas.setAttribute('width', window.innerWidth)
  canvas.setAttribute('height', window.innerHeight)

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
            context.text({ label: 'page', font: '40px Arial', x: center.x, y: center.y })
            break
        }
      }
    })

    time = time + 1
    requestAnimationFrame(loop)
  }

  const width = canvas.getAttribute('width')
  const height = canvas.getAttribute('height')
  const noisePattern = generateNoisePattern({ width, height, level: 18000, gray: true, bright: 0.2 })

  let time = 0
  loop()
})

