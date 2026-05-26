import { motion } from 'framer-motion'

const PROJECTS = [
  {
    id: 1,
    name: 'E-Commerce Dashboard',
    description:
      'A real-time admin dashboard for a multi-vendor marketplace — live sales metrics, inventory management, and order tracking at scale.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    github: 'https://github.com',
    demo: 'https://example.com',
    accentLine: 'bg-[#00FFD1]',
  },
  {
    id: 2,
    name: 'AI Chatbot UI',
    description:
      'A streaming chat interface for a custom LLM assistant. Markdown rendering, conversation history, and blazing-fast token streaming.',
    tags: ['Next.js', 'OpenAI API', 'Tailwind', 'Framer Motion'],
    github: 'https://github.com',
    demo: 'https://example.com',
    accentLine: 'bg-[#00FFD1]',
  },
  {
    id: 3,
    name: 'Dev Portfolio v1',
    description:
      'The previous iteration of this very site — built with vanilla HTML/CSS/JS. A reminder of how far tools (and taste) evolve.',
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    github: 'https://github.com',
    demo: 'https://example.com',
    accentLine: 'bg-[#00FFD1]',
  },
  {
    id: 4,
    name: 'Open Source CLI Tool',
    description:
      'A Node.js command-line utility for scaffolding full-stack projects with opinionated defaults. 400+ GitHub stars.',
    tags: ['Node.js', 'Commander.js', 'Inquirer', 'npm'],
    github: 'https://github.com',
    demo: null,
    accentLine: 'bg-[#00FFD1]',
  },
]

/**
 * ProjectCard
 * Individual project card with hover lift effect.
 * whileHover: scale 1.03, y -8 (GPU-friendly).
 */
function ProjectCard({ project, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      whileHover={{ scale: 1.03, y: -8 }}
      whileTap={{ scale: 0.99 }}
      className="group relative bg-[#111111] border border-[#1E1E1E] rounded-2xl overflow-hidden flex flex-col cursor-pointer
                 hover:border-[#00FFD1]/30 transition-colors duration-300"
      aria-label={`Project: ${project.name}`}
    >
      {/* Top accent line */}
      <span className={`absolute top-0 left-0 right-0 h-px ${project.accentLine} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} aria-hidden="true" />

      <div className="p-8 flex flex-col h-full">
        {/* Project number */}
        <span className="font-mono text-xs text-[#1E1E1E] font-bold mb-4 group-hover:text-[#00FFD1]/40 transition-colors duration-300">
          {String(project.id).padStart(2, '0')}
        </span>

        {/* Name */}
        <h3 className="font-display text-xl font-bold text-[#F0F0F0] mb-3 group-hover:text-[#00FFD1] transition-colors duration-200">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#888888] leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <ul className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="text-xs px-2.5 py-1 bg-[#0A0A0A] border border-[#1E1E1E] text-[#888888] rounded-full"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[#888888] hover:text-[#00FFD1] transition-colors duration-200 flex items-center gap-1.5"
            aria-label={`View ${project.name} source code on GitHub`}
          >
            <GitHubIcon />
            GitHub
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[#888888] hover:text-[#00FFD1] transition-colors duration-200 flex items-center gap-1.5"
              aria-label={`View live demo of ${project.name}`}
            >
              <ExternalIcon />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

/**
 * Projects
 * Responsive grid (1 col → 2 col → 3 col).
 * Each card staggers in via Intersection Observer + Framer Motion.
 */
export default function Projects() {
  return (
    <section
      id="projects"
      className="py-28 px-6 bg-[#0A0A0A]"
      aria-labelledby="projects-heading"
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
          03 — Projects
        </motion.p>

        <motion.h2
          id="projects-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl font-bold text-[#F0F0F0] mb-16 leading-tight"
        >
          Things I've{' '}
          <span className="text-[#00FFD1]">shipped.</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
