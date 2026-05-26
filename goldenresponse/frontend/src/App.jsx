import { useState, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import ContactCTA from './components/ContactCTA'

// Lazy-load ContactModal for performance (code splitting)
const ContactModal = lazy(() => import('./components/ContactModal'))

/**
 * App
 * Root component. Assembles all sections in narrative order:
 * Hero → About → Skills → Projects → Contact CTA
 * Manages modal open/close state.
 * ContactModal is lazy-loaded via React.lazy + Suspense.
 */
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#00FFD1] focus:text-[#0A0A0A] focus:rounded-lg focus:font-bold"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ContactCTA onOpenModal={() => setIsModalOpen(true)} />
      </main>

      <footer className="bg-[#0A0A0A] border-t border-[#1E1E1E] py-8 px-6 text-center">
        <p className="text-xs text-[#444] font-body">
          © {new Date().getFullYear()} Alex.Dev — Designed &amp; built with care.
        </p>
      </footer>

      {/* Lazy-loaded modal — only mounted once isModalOpen is true */}
      <Suspense fallback={null}>
        <ContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Suspense>
    </>
  )
}
