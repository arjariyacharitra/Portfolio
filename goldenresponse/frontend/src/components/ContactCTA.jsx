import { motion } from 'framer-motion'

/**
 * ContactCTA
 * Full-width section with a large headline and a single "Get in Touch" button.
 * Button uses whileHover + whileTap. Clicking calls onOpenModal prop.
 */
export default function ContactCTA({ onOpenModal }) {
  return (
    <section
      id="contact"
      className="py-32 px-6 bg-[#111111] relative overflow-hidden"
      aria-labelledby="contact-cta-heading"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, #00FFD1 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium tracking-[0.2em] uppercase text-[#00FFD1] mb-8"
        >
          04 — Contact
        </motion.p>

        <motion.h2
          id="contact-cta-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#F0F0F0] leading-tight mb-8"
        >
          Let's build something{' '}
          <span className="text-[#00FFD1]">great</span>{' '}
          together.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="text-[#888888] text-lg mb-12 max-w-xl mx-auto"
        >
          Have a project in mind, a role to fill, or just want to say hi?
          My inbox is always open.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        >
          <motion.button
            onClick={onOpenModal}
            whileHover={{
              scale: 1.06,
              y: -3,
              boxShadow: '0 0 40px rgba(0,255,209,0.35)',
            }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#00FFD1] text-[#0A0A0A] font-display font-bold text-base tracking-wide rounded-full transition-all duration-200"
            aria-label="Open contact form"
          >
            Get in Touch
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-6"
        >
          {[
            { label: 'GitHub', href: 'https://github.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com' },
            { label: 'Twitter', href: 'https://twitter.com' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#888888] hover:text-[#00FFD1] transition-colors duration-200"
              aria-label={`Visit my ${label} profile`}
            >
              {label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
