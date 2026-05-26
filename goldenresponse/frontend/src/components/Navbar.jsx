import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]

/**
 * Navbar
 * Fixed at the top. Fades in on first load via Framer Motion.
 * Active section is highlighted using Intersection Observer.
 * Mobile: hamburger menu at < 640 px.
 */
export default function Navbar() {
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track scroll to add background blur when scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer to track which section is in view
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => sections.forEach((s) => observer.unobserve(s))
  }, [])

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Close menu on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <motion.header
      role="banner"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#1E1E1E]' : ''
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
        aria-label="Primary navigation"
      >
        {/* Logo / Name */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="font-display text-xl font-bold tracking-tight text-[#F0F0F0] hover:text-[#00FFD1] transition-colors duration-200"
          aria-label="Go to top"
        >
          Alex<span className="text-[#00FFD1]">.</span>Dev
        </a>

        {/* Desktop links */}
        <ul className="hidden sm:flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-200 pb-1 ${
                    isActive ? 'text-[#00FFD1]' : 'text-[#888888] hover:text-[#F0F0F0]'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-px bg-[#00FFD1]"
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger button */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2 rounded"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block h-0.5 w-6 bg-[#F0F0F0] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-[#F0F0F0] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-[#F0F0F0] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden overflow-hidden bg-[#111111] border-t border-[#1E1E1E]"
          >
            <ul className="flex flex-col py-4 px-6 gap-4" role="list">
              {NAV_LINKS.map(({ label, href }) => {
                const sectionId = href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`block text-base font-medium py-1 ${
                        isActive ? 'text-[#00FFD1]' : 'text-[#888888]'
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
