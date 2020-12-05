import { generateNoisePattern } from './extends'
import './extends'

interface Timeline {
  cooltime: number
  keyframes: number[]
}

const TIMELINE: Timeline = {
  cooltime: 70,
  keyframes: [70, 150]
}

window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas')
  const context = canvas.getContext('2d')

  canvas.setAttribute('width', window.innerWidth)
  canvas.setAttribute('height', window.innerHeight)

  const loop = () => {
    context.fill('#05070a')
    context.noise({ x: 0, y: 0, pattern: noisePattern })

    TIMELINE.keyframes.map((current, index, keyframes) => {
      const cooltime = TIMELINE.cooltime
      const next = keyframes[index + 1] || Infinity
      if (time > cooltime && time >= current && time < next) {
        console.log('now running', index, 'motion')
        switch(index) {
          case 0:
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

