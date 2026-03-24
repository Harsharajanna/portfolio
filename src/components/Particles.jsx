import { useEffect, useRef } from 'react'

export default function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COLORS = ['rgba(245,158,11,', 'rgba(139,92,246,', 'rgba(255,255,255,']

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + Math.random() * 100
        this.r = Math.random() * 1.8 + 0.3
        this.speed = Math.random() * 0.6 + 0.2
        this.opacity = 0
        this.maxOpacity = Math.random() * 0.5 + 0.1
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
        this.drift = (Math.random() - 0.5) * 0.4
      }
      update() {
        this.y -= this.speed
        this.x += this.drift
        if (this.y < canvas.height * 0.8) this.opacity = Math.min(this.opacity + 0.006, this.maxOpacity)
        if (this.y < canvas.height * 0.15) this.opacity -= 0.01
        if (this.opacity <= 0 && this.y < 0) this.reset()
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = this.color + this.opacity + ')'
        ctx.fill()
      }
    }

    for (let i = 0; i < 80; i++) {
      const p = new Particle()
      p.y = Math.random() * canvas.height
      particles.push(p)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <canvas ref={canvasRef} className="particles-canvas" />
}
