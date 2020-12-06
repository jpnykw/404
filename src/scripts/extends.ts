export {}

declare global {
  interface CanvasRenderingContext2D {
    refresh(): void
    fill(color: string): void
    text(label: string, color: string): void
    noise(option: NoiseOption): void
  }
}

type NoisePattern = [number, number, number, number][]

interface PatternOption {
  width: number
  height: number
  gray: boolean
  level: number
  bright?: number
}

interface Position {
  x: number
  y: number
}

interface NoiseOption extends Position {
  pattern: NoisePattern
}

interface TextOption extends Position {
  label: string
  font: string
  size: number
  padding: number
  color?: string
}

interface ShapeOption extends Position {
  type: string
  width: number
  height: number
  color?: string
  fill?: boolean
  origin?: string
}

// Methods
export const generateNoisePattern = (option: PatternOption): NoisePattern => {
  const bright = option.bright === undefined ? 1 : option.bright
  const maxPixel = option.width * option.height
  const pattern: NoisePattern = []

  for (let i = 0; i < option.level; i++) {
    const color = new Array(3).fill(null).map(_ => (Math.random() * 255) >> 0)
    if (option.gray) {
      color[1] = color[0]
      color[2] = color[0]
    }

    color = color.map(color => color * bright)

    const pixel = ((Math.random() * maxPixel) >> 0) * 4
    pattern.push([...color, pixel])
  }

  return pattern
}

// Extends
CanvasRenderingContext2D.prototype.refresh = function() {
  this.clearRect(0, 0, this.canvas.width, this.canvas.height)
}

CanvasRenderingContext2D.prototype.fill = function(color = '#fff') {
  this.fillStyle = color
  this.fillRect(0, 0, this.canvas.width, this.canvas.height)
}

CanvasRenderingContext2D.prototype.text = function(option: TextOption) {
  const padding = option.padding
  const size = option.size

  this.font = `${size}px ${option.font}`
  this.fillStyle = option.color || '#fff'

  const length = option.label.length
  const originX = option.x - length / 2 * (size + padding)

  for (let i = 0; i < length; i++) {
    const drawX = originX + i * (size + padding)
    this.fillText(option.label[i], drawX, option.y)
  }
}

CanvasRenderingContext2D.prototype.shape = function(option: ShapeOption) {
  const fill = option.fill || false
  const color = option.color || '#fff'
  this[fill ? 'fillStyle' : 'strokeStyle'] = color

  const { width, height, origin } = option
  const x = origin === 'center' ? option.x - width / 2 : x
  const y = origin === 'center' ? option.y - height / 2 : y

  switch (option.type) {
    case 'square':
      this.rect(x, y, width, height)
      this[fill ? 'fill' : 'stroke']()
      break
  }
}

CanvasRenderingContext2D.prototype.noise = function(option: NoiseOption) {
  const image = this.getImageData(option.x, option.y, this.canvas.width, this.canvas.height)

  option.pattern.forEach((data) => {
    const pixel = data[3]
    image.data[pixel + 0] = data[0]
    image.data[pixel + 1] = data[1]
    image.data[pixel + 2] = data[2]
  })

  this.putImageData(image, option.x, option.y)
}

