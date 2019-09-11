import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const TAU = Math.PI * 2

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Objects
function Object(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color

    let angle = Math.random() * TAU
    let speed = Math.random() * 2
    this.vy = Math.sin(angle) * speed
    this.vx = Math.cos(angle) * speed
}

Object.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.strokeStyle = this.color
    let angle = Math.tan(this.y / this.x)
    c.moveTo(
        this.x + Math.cos(angle) * this.radius,
        this.y + Math.sin(angle) * this.radius
    )
    c.lineTo(this.x, this.y)
    c.stroke()
    c.closePath()
}

Object.prototype.update = function() {
    this.x += this.vx
    this.y += this.vy
    this.draw()
}

// Implementation
let objects
function init() {
    objects = []

    for (let i = 0; i < 400; i++) {
        objects.push(
            new Object(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                10,
                'red'
            )
        )
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    objects.forEach(object => {
        object.update()
    })
}

init()
animate()
