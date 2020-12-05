import { generateNoisePattern } from './extends'
import './extends'

window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas')
  const context = canvas.getContext('2d')

  canvas.setAttribute('width', window.innerWidth)
  canvas.setAttribute('height', window.innerHeight)

  const loop = () => {
    context.fill('#05070a')
    context.noise({ x: 0, y: 0, pattern: noisePattern })
    requestAnimationFrame(loop)
  }

  const width = canvas.getAttribute('width')
  const height = canvas.getAttribute('height')
  const noisePattern = generateNoisePattern({ width, height, level: 18000, gray: true, bright: 0.2 })
  loop()
})

