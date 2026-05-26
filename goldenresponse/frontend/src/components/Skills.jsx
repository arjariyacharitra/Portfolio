import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect } from 'react'

const SKILLS = {
  Frontend: [
    { name: 'React / Next.js', level: 92 },
    { name: 'TypeScript',       level: 85 },
    { name: 'Tailwind CSS',     level: 90 },
    { name: 'Framer Motion',    level: 80 },
  ],
  Backend: [
    { name: 'Node.js / Express', level: 88 },
    { name: 'PostgreSQL',        level: 78 },
    { name: 'MongoDB',           level: 75 },
    { name: 'REST / GraphQL',    level: 82 },
  ],
  Tools: [
    { name: 'Git / GitHub',  level: 95 },
    { name: 'Docker',        level: 72 },
    { name: 'AWS / Vercel',  level: 70 },
    { name: 'Figma',         level: 68 },
  ],
}

/**
 * SkillBar
 * Individual animated progress bar.
 * Uses Framer Motion to animate width from 0 → level% when triggered.
 */
function SkillBar({ name, level, delay = 0, animate }) {
  return (
    <div role="listitem">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-[#F0F0F0] font-medium">{name}</span>
        <span className="text-xs text-[#00FFD1] font-mono font-bold">{level}%</span>
      </div>
      {/* Track */}
      <div
        className="h-1.5 bg-[#1E1E1E] rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name}: ${level}%`}
      >
        {/* Fill */}
        <motion.div
          className="h-full rounded-full bg-[#00FFD1] origin-left"
          initial={{ scaleX: 0 }}
          animate={animate ? { scaleX: level / 100 } : { scaleX: 0 }}
          transition={{
            duration: 1.1,
            delay,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </div>
  )
}

/**
 * SkillCategory
 * One category group. Triggers all its bars when section is in view.
 */
function SkillCategory({ title, skills, groupDelay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: groupDelay }}
      className="bg-[#111111] border border-[#1E1E1E] rounded-2xl p-8"
    >
      {/* Category header */}
      <h3 className="font-display text-xs font-bold tracking-[0.2em] uppercase text-[#00FFD1] mb-6">
        {title}
      </h3>

      <ul className="space-y-6" role="list" aria-label={`${title} skills`}>
        {skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            delay={groupDelay + i * 0.08}
            animate={isInView}
          />
        ))}
      </ul>
    </motion.div>
  )
}

/**
 * Skills
 * Grouped skills displayed as animated progress bars.
 * Each group triggers independently via Intersection Observer.
 */
export default function Skills() {
  return (
    <section
      id="skills"
      className="py-28 px-6 bg-[#111111]"
      aria-labelledby="skills-heading"
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
          02 — Skills
        </motion.p>

        <motion.h2
          id="skills-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl font-bold text-[#F0F0F0] mb-16 leading-tight"
        >
          What I bring to{' '}
          <span className="text-[#00FFD1]">the table.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(SKILLS).map(([category, skills], groupIdx) => (
            <SkillCategory
              key={category}
              title={category}
              skills={skills}
              groupDelay={groupIdx * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
