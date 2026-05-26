import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const BIO_LINES = [
  "I'm Alex — a full-stack developer who obsesses over the intersection",
  'of clean engineering and thoughtful design.',
  '',
  'With 4 years building across React, Node.js, and cloud infrastructure,',
  "I've shipped products used by hundreds of thousands of people worldwide.",
  '',
  'I believe code is craft — every function, every pixel should earn its place.',
]

const STATS = [
  { value: '4+', label: 'Years Exp.' },
  { value: '20+', label: 'Projects' },
  { value: '5', label: 'Countries' },
  { value: '3', label: 'Open Source' },
]

/**
 * About
 * Two-column layout: image/avatar left, bio text right.
 * Bio lines reveal one-by-one with staggered slide-up.
 * Stats strip animates in as a group below.
 */
export default function About() {
  const { ref: colRef, controls: colControls } = useScrollAnimation({ threshold: 0.15 })
  const { ref: statsRef, controls: statsControls } = useScrollAnimation({ threshold: 0.3 })

  const lineVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.07 },
    }),
  }

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut', delay: i * 0.1 },
    }),
  }

  return (
    <section
      id="about"
      className="py-28 px-6 bg-[#0A0A0A]"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium tracking-[0.2em] uppercase text-[#00FFD1] mb-4"
        >
          01 — About
        </motion.p>

        <div
          ref={colRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
        >
          {/* Left: Avatar placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div
              className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#111111] border border-[#1E1E1E] flex items-center justify-center relative"
              aria-label="Profile photo placeholder"
            >
              {/* Accent corner decoration */}
              <span
                aria-hidden="true"
                className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#00FFD1] rounded-tl-md"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#00FFD1] rounded-br-md"
              />

              {/* Avatar SVG placeholder */}
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="w-32 h-32 opacity-20"
              >
                <circle cx="50" cy="38" r="18" fill="#00FFD1" />
                <ellipse cx="50" cy="80" rx="28" ry="18" fill="#00FFD1" />
              </svg>

              {/* Replace with real image:
              <img
                src="/assets/avatar.jpg"
                alt="Alex, Full-Stack Developer"
                loading="lazy"
                className="w-full h-full object-cover"
              /> */}
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-4 -right-4 bg-[#111111] border border-[#1E1E1E] rounded-xl px-4 py-3 text-center shadow-xl"
            >
              <p className="font-display text-2xl font-bold text-[#00FFD1]">4+</p>
              <p className="text-xs text-[#888888]">Years Building</p>
            </motion.div>
          </motion.div>

          {/* Right: Bio text */}
          <div className="flex flex-col justify-center">
            <h2
              id="about-heading"
              className="font-display text-4xl sm:text-5xl font-bold text-[#F0F0F0] mb-8 leading-tight"
            >
              Crafting digital experiences with{' '}
              <span className="text-[#00FFD1]">purpose.</span>
            </h2>

            <div className="space-y-1 mb-10" aria-label="Bio">
              {BIO_LINES.map((line, i) =>
                line === '' ? (
                  <div key={`spacer-${i}`} className="h-3" />
                ) : (
                  <motion.p
                    key={i}
                    custom={i}
                    variants={lineVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="text-[#888888] text-base leading-relaxed"
                  >
                    {line}
                  </motion.p>
                )
              )}
            </div>

            {/* Download CV button */}
            <motion.a
              href="/assets/cv.pdf"
              download
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="self-start px-6 py-3 border border-[#1E1E1E] text-[#888888] hover:text-[#00FFD1] hover:border-[#00FFD1] font-display text-sm tracking-wide rounded-full transition-all duration-200"
              aria-label="Download my CV (PDF)"
            >
              Download CV →
            </motion.a>
          </div>
        </div>

        {/* Stats strip */}
        <div
          ref={statsRef}
          className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#1E1E1E] border border-[#1E1E1E] rounded-2xl overflow-hidden"
          role="list"
          aria-label="Key statistics"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              role="listitem"
              custom={i}
              variants={statVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="bg-[#0A0A0A] px-8 py-8 text-center"
            >
              <p className="font-display text-4xl font-extrabold text-[#00FFD1] mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-[#888888] tracking-widest uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
