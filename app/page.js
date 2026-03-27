'use client'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay }
})

const projects = [
  {
    title: "ชื่อโปรเจกต์ 1",
    desc: "อธิบายโปรเจกต์นี้ว่าทำอะไร ใช้เทคโนโลยีอะไร",
    tags: ["React", "Tailwind"],
    link: "#"
  },
  {
    title: "ชื่อโปรเจกต์ 2",
    desc: "อธิบายโปรเจกต์นี้ว่าทำอะไร ใช้เทคโนโลยีอะไร",
    tags: ["Next.js", "Node.js"],
    link: "#"
  },
  {
    title: "ชื่อโปรเจกต์ 3",
    desc: "อธิบายโปรเจกต์นี้ว่าทำอะไร ใช้เทคโนโลยีอะไร",
    tags: ["TypeScript", "Framer Motion"],
    link: "#"
  },
]

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 bg-black/80 backdrop-blur border-b border-white/5">
        <span className="font-mono text-purple-400 text-sm tracking-widest">JAIAN</span>
        <div className="flex gap-8">
          <a href="#about" className="text-sm text-gray-400 hover:text-white transition font-mono">About</a>
          <a href="#projects" className="text-sm text-gray-400 hover:text-white transition font-mono">Work</a>
          <a href="#contact" className="text-sm text-gray-400 hover:text-white transition font-mono">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-10 pt-24 max-w-5xl mx-auto">
        <motion.p {...fadeUp(0)} className="text-purple-400 font-mono text-sm tracking-widest mb-5">
          — Frontend Developer
        </motion.p>
        <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          Hi, I'm{' '}
          <span className="text-purple-400">Jaian</span>
        </motion.h1>
        <motion.p {...fadeUp(0.2)} className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          I build fast, beautiful web experiences with React and Next.js. Focused on clean code and great UI.
        </motion.p>
        <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="bg-purple-600 hover:bg-purple-700 px-7 py-3 rounded-lg font-semibold transition"
          >
            View my work ↓
          </a>
          <a
            href="#contact"
            className="border border-gray-700 hover:border-purple-400 hover:text-purple-400 px-7 py-3 rounded-lg transition"
          >
            Contact me
          </a>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 font-mono text-sm tracking-widest mb-4">— About me</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">A bit about myself</h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed mb-12">
            เขียนเล่าเรื่องตัวเองตรงนี้ เช่น ชอบเขียนโค้ด เรียนอยู่ที่ไหน สนใจอะไร ต้องการทำงานแบบไหน
          </p>

          {/* Skills */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["React", "Next.js", "Tailwind CSS", "JavaScript", "Framer Motion", "Git & GitHub"].map((skill) => (
              <div
                key={skill}
                className="border border-gray-800 hover:border-purple-500 rounded-lg px-4 py-3 text-sm font-mono text-gray-300 transition"
              >
                {skill}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 font-mono text-sm tracking-widest mb-4">— Selected work</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <motion.a
              key={i}
              href={p.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group block border border-gray-800 hover:border-purple-500 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold group-hover:text-purple-400 transition">
                  {p.title}
                </h3>
                <span className="text-gray-600 group-hover:text-purple-400 transition text-xl">↗</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{p.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono bg-purple-950/60 text-purple-300 border border-purple-900/50 px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-gray-800 rounded-2xl p-12 text-center"
        >
          <p className="text-purple-400 font-mono text-sm tracking-widest mb-4">— Get in touch</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's work together</h2>
          <p className="text-gray-400 mb-10 text-lg">Open for freelance & full-time opportunities</p>
          <a
            href="mailto:your@email.com"
            className="inline-block text-xl md:text-2xl font-mono text-purple-400 hover:text-purple-300 border-b border-purple-400/30 hover:border-purple-300 pb-1 transition"
          >
            your@email.com
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-10 py-6 text-center text-gray-600 text-sm font-mono">
        Built with Next.js & Tailwind — Jaian © 2025
      </footer>

    </div>
  )
}