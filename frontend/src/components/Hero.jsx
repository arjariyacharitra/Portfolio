import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const HEADLINE_WORDS = ['Building', 'Products', 'That', 'Matter.']

/**
 * Hero
 * Full 100vh section. Staggered word-by-word headline animation,
 * subtitle follows after headline completes (~300ms delay).
 * Mouse-parallax floating orb in background adds subtle depth.
 * "View My Work" scrolls to #projects.
 */
export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    let rafId = null

    const handleMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const { innerWidth: w, innerHeight: h } = window
        setMousePos({
          x: (e.clientX / w - 0.5) * 30,
          y: (e.clientY / h - 0.5) * 20,
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Stagger container for words
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 40, skewY: 4 },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
        // headline is 4 words × 120ms stagger + 300ms base + 300ms extra
        delay: 0.3 + 4 * 0.12 + 0.3,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.3 + 4 * 0.12 + 0.6,
      },
    },
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
      aria-label="Hero section"
    >
      {/* Parallax background orb */}
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle at center, rgba(0,255,209,0.10) 0%, rgba(0,255,209,0.03) 50%, transparent 70%)',
          top: '50%',
          left: '50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{ type: 'spring', stiffness: 60, damping: 20, mass: 1 }}
      />

      {/* Subtle grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#00FFD1 1px, transparent 1px), linear-gradient(90deg, #00FFD1 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow tag */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-[#00FFD1] mb-8"
        >
          <span className="w-8 h-px bg-[#00FFD1]" />
          Full-Stack Developer
          <span className="w-8 h-px bg-[#00FFD1]" />
        </motion.p>

        {/* Staggered headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight text-[#F0F0F0] mb-6"
        >
          {HEADLINE_WORDS.map((word) => (
            <motion.span
              key={word}
              variants={wordVariants}
              className="inline-block mr-[0.25em] last:mr-0"
            >
              {word === 'Matter.' ? (
                <span className="text-[#00FFD1]">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-lg sm:text-xl text-[#888888] leading-relaxed mb-12"
        >
          I design and engineer fast, accessible, beautifully crafted web experiences —
          from pixel-perfect frontends to rock-solid backend APIs.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={scrollToProjects}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 bg-[#00FFD1] text-[#0A0A0A] font-display font-bold text-sm tracking-wide rounded-full transition-shadow hover:shadow-[0_0_24px_rgba(0,255,209,0.4)]"
            aria-label="Scroll to view my projects"
          >
            View My Work
          </motion.button>

          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 border border-[#1E1E1E] text-[#888888] hover:text-[#F0F0F0] hover:border-[#F0F0F0] font-display font-bold text-sm tracking-wide rounded-full transition-all duration-200"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-[#888888] tracking-[0.15em] uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="block w-px h-8 bg-gradient-to-b from-[#00FFD1] to-transparent"
        />
      </motion.div>
    </section>
  )
}
