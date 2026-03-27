'use client'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay }
})

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-20 max-w-4xl mx-auto">

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center">
        <motion.p {...fadeUp(0)} className="text-purple-400 font-mono text-sm tracking-widest mb-4">
          Frontend Developer
        </motion.p>
        <motion.h1 {...fadeUp(0.1)} className="text-6xl font-bold mb-6 leading-tight">
          Hi, I'm <span className="text-purple-400">ใส่ชื่อจริง</span>
        </motion.h1>
        <motion.p {...fadeUp(0.2)} className="text-gray-400 text-xl max-w-lg mb-10">
          ใส่คำอธิบายตัวเองสั้นๆ เช่น I love building clean, fast web experiences.
        </motion.p>
        <motion.div {...fadeUp(0.3)} className="flex gap-4">
          <a href="#projects" className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition">
            View my work ↓
          </a>
          <a href="mailto:your@email.com" className="border border-gray-700 hover:border-purple-400 px-6 py-3 rounded-lg transition">
            Contact me
          </a>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20">
        <motion.h2
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-3xl font-bold mb-12"
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "ชื่อโปรเจกต์ 1",
              desc: "อธิบายสั้นๆ ว่าทำอะไร",
              tags: ["React", "Tailwind"],
              link: "#"
            },
            {
              title: "ชื่อโปรเจกต์ 2",
              desc: "อธิบายสั้นๆ ว่าทำอะไร",
              tags: ["Next.js", "Node.js"],
              link: "#"
            },
          ].map((p, i) => (
            <motion.a
              key={i} href={p.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="block border border-gray-800 hover:border-purple-500 rounded-xl p-6 transition group"
            >
              <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition">{p.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{p.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {p.tags.map(t => (
                  <span key={t} className="text-xs font-mono bg-purple-900/40 text-purple-300 px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 text-center border-t border-gray-800">
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Let's work together</h2>
          <p className="text-gray-400 mb-8">Open for opportunities</p>
          <a href="mailto:your@email.com"
            className="text-2xl font-mono text-purple-400 hover:text-purple-300 transition">
            your@email.com
          </a>
        </motion.div>
      </section>

    </main>
  )
}