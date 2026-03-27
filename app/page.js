'use client'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }
})

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06 } }
}

const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } }
}

const skills = [
  "React", "Next.js", "Tailwind CSS", "JavaScript",
  "TypeScript", "Framer Motion", "Node.js", "Git & GitHub"
]

const projects = [
  {
    title: "ชื่อโปรเจกต์ 1",
    desc: "อธิบายโปรเจกต์นี้ว่าทำอะไร ใช้เทคโนโลยีอะไร ผลลัพธ์เป็นอย่างไร",
    tags: ["React", "Tailwind"],
    link: "#",
    emoji: "🚀"
  },
  {
    title: "ชื่อโปรเจกต์ 2",
    desc: "อธิบายโปรเจกต์นี้ว่าทำอะไร ใช้เทคโนโลยีอะไร ผลลัพธ์เป็นอย่างไร",
    tags: ["Next.js", "Node.js"],
    link: "#",
    emoji: "⚡"
  },
  {
    title: "ชื่อโปรเจกต์ 3",
    desc: "อธิบายโปรเจกต์นี้ว่าทำอะไร ใช้เทคโนโลยีอะไร ผลลัพธ์เป็นอย่างไร",
    tags: ["TypeScript", "Framer Motion"],
    link: "#",
    emoji: "✨"
  },
]

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(9, 9, 11, 0.75)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.06)',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
          <a href="#" className="font-mono text-sm tracking-[0.3em] font-bold gradient-text">
            JAIAN
          </a>
          <div className="flex items-center gap-1">
            {[
              { label: 'About', href: '#about' },
              { label: 'Work', href: '#projects' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-violet-400 transition-colors duration-300 font-mono px-4 py-2 rounded-lg hover:bg-violet-500/5"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* ==================== HERO ==================== */}
      <section className="hero-gradient min-h-screen flex flex-col justify-center relative">
        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-10">
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-8">
            <div className="section-divider" />
            <span className="text-violet-400 font-mono text-xs tracking-[0.25em] uppercase">
              Frontend Developer
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.12)}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 tracking-tight"
          >
            Hi, I&apos;m{' '}
            <span className="gradient-text">Jaian</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.22)}
            className="text-zinc-400 text-lg md:text-xl max-w-lg mb-12 leading-relaxed"
          >
            I craft fast, beautiful digital experiences with modern web technologies.
            Focused on <span className="text-zinc-200">clean code</span> and{' '}
            <span className="text-zinc-200">delightful interfaces</span>.
          </motion.p>

          <motion.div {...fadeUp(0.32)} className="flex flex-wrap gap-4 mb-16">
            <a
              href="#projects"
              className="btn-primary px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide inline-flex items-center gap-2"
            >
              <span className="relative z-10">View my work</span>
              <span className="relative z-10">↓</span>
            </a>
            <a
              href="#contact"
              className="btn-outline px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide"
            >
              Get in touch
            </a>
          </motion.div>

          {/* Status indicator */}
          <motion.div {...fadeUp(0.42)} className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-zinc-500 text-sm font-mono">Available for work</span>
          </motion.div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="section-divider" />
              <p className="text-violet-400 font-mono text-xs tracking-[0.25em] uppercase">About me</p>
            </div>

            <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
                  A bit about{' '}
                  <span className="gradient-text">myself</span>
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed mb-5">
                  เขียนเล่าเรื่องตัวเองตรงนี้ เช่น ชอบเขียนโค้ด เรียนอยู่ที่ไหน สนใจอะไร ต้องการทำงานแบบไหน
                </p>
                <p className="text-zinc-500 text-base leading-relaxed">
                  Always exploring new technologies and building things that make a difference.
                </p>
              </div>

              {/* Skills Grid */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: '-50px' }}
                className="grid grid-cols-2 gap-3"
              >
                {skills.map((skill) => (
                  <motion.div
                    key={skill}
                    variants={staggerItem}
                    className="skill-tag rounded-xl px-5 py-4 text-sm font-mono text-zinc-300 cursor-default text-center"
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== PROJECTS ==================== */}
      <section id="projects" className="py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="section-divider" />
              <p className="text-violet-400 font-mono text-xs tracking-[0.25em] uppercase">Selected work</p>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Featured{' '}
              <span className="gradient-text">Projects</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.a
                key={i}
                href={p.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group glow-card rounded-2xl p-7 block"
              >
                <div className="text-3xl mb-5">{p.emoji}</div>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-violet-400 transition-colors duration-300">
                    {p.title}
                  </h3>
                  <span className="text-zinc-600 group-hover:text-violet-400 transition-all duration-300 text-lg group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">{p.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono text-violet-400 bg-violet-500/10 border border-violet-500/15 px-3 py-1.5 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="py-28 md:py-36">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="gradient-border rounded-3xl p-10 md:p-20 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="section-divider" style={{ transform: 'scaleX(-1)' }} />
              <p className="text-violet-400 font-mono text-xs tracking-[0.25em] uppercase">
                Get in touch
              </p>
              <div className="section-divider" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight">
              Let&apos;s work{' '}
              <span className="gradient-text">together</span>
            </h2>
            <p className="text-zinc-400 mb-12 text-lg max-w-md mx-auto leading-relaxed">
              Open for freelance &amp; full-time opportunities.
              Let&apos;s build something amazing.
            </p>
            <a
              href="mailto:your@email.com"
              className="inline-block text-xl md:text-2xl font-mono gradient-text hover:opacity-80 border-b-2 border-violet-500/30 hover:border-violet-400/60 pb-2 transition-all duration-300"
            >
              your@email.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer
        className="py-8 text-center"
        style={{ borderTop: '1px solid rgba(139, 92, 246, 0.06)' }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="text-zinc-600 text-sm font-mono">
            Built with Next.js &amp; Tailwind — Jaian © 2025
          </p>
        </div>
      </footer>
    </div>
  )
}