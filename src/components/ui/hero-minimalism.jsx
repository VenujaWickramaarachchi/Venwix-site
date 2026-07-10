'use client'

import React, { useEffect, useRef } from 'react'

export default function MinimalHero({ setIsCalendlyOpen }) {
  const canvasRef = useRef(null)

  // --- Particle Animation Logic ---
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()

    let particles = []
    let raf = 0

    // Slightly reduced particle count so it doesn't distract from the glow
    const count = () => Math.floor((canvas.width * canvas.height) / 8000)

    const make = () => {
      const fadeDelay = Math.random() * 600 + 100
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() / 5 + 0.1,
        opacity: 0.7,
        fadeDelay,
        fadeStart: Date.now() + fadeDelay,
        fadingOut: false,
      }
    }

    const reset = (p) => {
      p.x = Math.random() * canvas.width
      p.y = Math.random() * canvas.height
      p.speed = Math.random() / 5 + 0.1
      p.opacity = 0.7
      p.fadeDelay = Math.random() * 600 + 100
      p.fadeStart = Date.now() + p.fadeDelay
      p.fadingOut = false
    }

    const init = () => {
      particles = []
      for (let i = 0; i < count(); i++) particles.push(make())
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.y -= p.speed
        if (p.y < 0) reset(p)
        if (!p.fadingOut && Date.now() > p.fadeStart) p.fadingOut = true
        if (p.fadingOut) {
          p.opacity -= 0.008
          if (p.opacity <= 0) reset(p)
        }
        // Tinted the particles slightly warm to match the new vibe
        ctx.fillStyle = `rgba(255, 240, 240, ${p.opacity})`
        ctx.fillRect(p.x, p.y, 0.6, Math.random() * 2 + 1)
      })
      raf = requestAnimationFrame(draw)
    }

    const onResize = () => {
      setSize()
      init()
    }

    window.addEventListener('resize', onResize)
    init()
    raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  // --- Tech Stack Logos ---
  const techStack = [
    {
      name: 'Shopify',
      icon: (
        <path d='M17.4 3.7c-2.3-2-5.7-3-10-3C4 1 2.2 2.3 2 4.4c-.1 1.6 1.1 2.8 2.6 3 1.9.3 4 .3 6 .4-1.9.4-4.5 1-6.1 2C2.8 10.8 1.4 12.8 1.2 15.5c-.3 4.2 2.7 7 6.6 7.4 4.3.4 8.7-1 11-4.2 2.1-3 2.9-6.8 2.2-10-.6-2.5-1.9-3.9-3.6-5z' />
      ),
    },
    {
      name: 'React',
      icon: (
        <>
          <ellipse
            cx='12'
            cy='12'
            rx='10'
            ry='4'
            transform='rotate(30 12 12)'
          />
          <ellipse
            cx='12'
            cy='12'
            rx='10'
            ry='4'
            transform='rotate(90 12 12)'
          />
          <ellipse
            cx='12'
            cy='12'
            rx='10'
            ry='4'
            transform='rotate(150 12 12)'
          />
          <circle cx='12' cy='12' r='2' />
        </>
      ),
    },
    {
      name: 'Next.js',
      icon: (
        <path d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-2.85-13.626l6.892 9.075c-.946.54-2.046.851-3.212.851-3.766 0-6.82-3.053-6.82-6.819 0-3.765 3.054-6.819 6.82-6.819 1.127 0 2.19.273 3.109.756l-6.79 8.956z' />
      ),
    },
    {
      name: 'Stripe',
      icon: (
        <path d='M11.996 9.61c-1.42 0-2.316.58-2.316 1.48 0 .86.83 1.22 2.06 1.54l1.24.31c2.4.6 3.63 1.64 3.63 3.25 0 2.24-1.99 3.52-4.94 3.52-2.31 0-4.45-.73-5.96-1.84l1.32-2.58c1.35.95 2.87 1.47 4.3 1.47 1.53 0 2.45-.58 2.45-1.5 0-.82-.7-1.18-1.9-1.48l-1.25-.3c-2.56-.63-3.75-1.63-3.75-3.3 0-2.07 1.84-3.35 4.7-3.35 1.95 0 3.73.53 5.1 1.4l-1.2 2.48c-1.12-.72-2.5-1.1-3.8-1.1z' />
      ),
    },
    {
      name: 'Tailwind',
      icon: (
        <path d='M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z' />
      ),
    },
  ]

  return (
    <section className='minimal-root'>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .minimal-root, .minimal-root * {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        .minimal-root {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;

          --bg: #000000;
          --fg: #ffffff;
          --muted: #94a3b8;
          --border: #1e293b;
          
          /* Updated accents to a deep crimson tech red */
          --accent: #dc2626; 
          --accent-hover: #ef4444; 

          background: var(--bg);
          color: var(--fg);
          font-family: 'Outfit', sans-serif;
        }

        /* NEW: Ambient Red Glow Orb */
        .glow-orb {
          position: absolute;
          top: 45%;
          left: 50%;
          width: 70vw;
          height: 70vw;
          max-width: 900px;
          max-height: 900px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, rgba(0, 0, 0, 0) 65%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 3;
          animation: breathe 8s ease-in-out infinite alternate;
          filter: blur(40px);
        }

        @keyframes breathe {
          0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        }

        /* Accent Lines */
        .accent-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .hline, .vline {
          position: absolute;
          background: var(--border);
          opacity: .75;
          will-change: transform, opacity;
        }
        .hline {
          height: 1px; left: 0; right: 0;
          transform: scaleX(0);
          transform-origin: 50% 50%;
          animation: drawX 800ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .hline:nth-child(1){ top: 20%; animation-delay: 150ms; }
        .hline:nth-child(2){ top: 50%; animation-delay: 280ms; }
        .hline:nth-child(3){ top: 80%; animation-delay: 410ms; }

        .vline {
          width: 1px; top: 0; bottom: 0;
          transform: scaleY(0);
          transform-origin: 50% 0%;
          animation: drawY 900ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .vline:nth-child(4){ left: 20%; animation-delay: 520ms; }
        .vline:nth-child(5){ left: 50%; animation-delay: 640ms; }
        .vline:nth-child(6){ left: 80%; animation-delay: 760ms; }

        @keyframes drawX {
          0% { transform: scaleX(0); opacity: 0; }
          60% { opacity: .9; }
          100% { transform: scaleX(1); opacity: .75; }
        }
        @keyframes drawY {
          0% { transform: scaleY(0); opacity: 0; }
          60% { opacity: .9; }
          100% { transform: scaleY(1); opacity: .75; }
        }

        /* Particle Canvas */
        .particleCanvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: .5;
          z-index: 2;
        }

        /* Hero Content */
        .hero {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 100vh;
          padding: 120px 24px 60px;
        }

        .badge-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 6px 12px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(220, 38, 38, 0.3); /* Slight red tint to border */
          backdrop-filter: blur(8px);
          margin-bottom: 24px;
          animation: fadeSlideUp 0.8s ease-out;
        }
        .badge-label {
          background: var(--fg);
          color: var(--bg);
          padding: 2px 10px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .badge-text {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
        }

        .title {
          font-weight: 700;
          font-size: clamp(40px, 6vw, 76px);
          line-height: 1.05;
          margin: 0;
          color: var(--fg);
          letter-spacing: -0.02em;
          animation: fadeSlideUp 1s ease-out 0.1s both;
        }
        
        .subtitle {
          margin-top: 24px;
          font-size: clamp(16px, 2vw, 20px);
          color: var(--muted);
          max-width: 600px;
          line-height: 1.6;
          animation: fadeSlideUp 1s ease-out 0.2s both;
        }

        /* Action Buttons */
        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          align-items: center;
          margin-top: 40px;
          flex-wrap: wrap;
          animation: fadeSlideUp 1s ease-out 0.3s both;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: var(--accent);
          color: #fff;
          font-weight: 600;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: none;
          font-size: 16px;
          box-shadow: 0 4px 20px -5px rgba(220, 38, 38, 0.4);
        }
        .btn-primary:hover {
          background: var(--accent-hover);
          transform: translateY(-2px) scale(1.025);
          box-shadow: 0 12px 30px -5px rgba(220, 38, 38, 0.6), 0 0 15px 2px rgba(220, 38, 38, 0.3);
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: rgba(255,255,255,0.03);
          color: var(--fg);
          font-weight: 500;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(255,255,255,0.15);
          font-size: 16px;
          text-decoration: none;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.4);
          transform: translateY(-2px) scale(1.025);
          box-shadow: 0 12px 25px -10px rgba(0, 0, 0, 0.5);
        }

        /* Tech Stack / Partners Area */
        .partners-area {
          margin-top: 80px;
          width: 100%;
          max-width: 900px;
          animation: fadeSlideUp 1s ease-out 0.5s both;
        }
        .partners-title {
          font-size: 13px;
          color: var(--muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 24px;
          font-weight: 500;
        }
        .partners-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 32px;
        }
        .partner-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 18px;
          font-weight: 600;
          color: var(--fg);
          opacity: 0.5;
          filter: grayscale(100%);
          transition: all 0.3s ease;
        }
        .partner-item:hover {
          opacity: 1;
          filter: grayscale(0%);
          color: var(--accent); /* Glows red on hover */
          transform: translateY(-2px);
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <canvas ref={canvasRef} className='particleCanvas' />

      {/* NEW: The Breathing Red Glow */}
      <div className='glow-orb' />

      <div className='accent-lines'>
        <div className='hline' />
        <div className='hline' />
        <div className='hline' />
        <div className='vline' />
        <div className='vline' />
        <div className='vline' />
      </div>

      <main className='hero'>
        {/* Animated Badge */}
        <div className='badge-wrapper'>
          <span className='badge-label'>Scale</span>
          <span className='badge-text'>Taking on new projects for Q3</span>
        </div>

        {/* Hero Copy */}
        <h1 className='title'>
          Your Business Deserves
          <br />
          More Than A Website.
        </h1>
        <p className='subtitle'>
          We build high-performance e-commerce experiences and growth strategies
          that generate real revenue.
        </p>

        {/* Dual Actions */}
        <div className='hero-actions'>
          <button
            className='btn-primary'
            onClick={() => setIsCalendlyOpen(true)}
          >
            Book Strategy Call
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M5 12h14' />
              <path d='m12 5 7 7-7 7' />
            </svg>
          </button>

          <a href='#projects' className='btn-secondary'>
            View Our Work
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z' />
            </svg>
          </a>
        </div>

        {/* Tech Stack Strip */}
        <div className='partners-area'>
          <p className='partners-title'>Built With Cutting-Edge Technology</p>
          <div className='partners-grid'>
            {techStack.map((tech, idx) => (
              <div key={idx} className='partner-item'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  {tech.icon}
                </svg>
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </main>
    </section>
  )
}
