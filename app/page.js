'use client'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-20">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-purple-400 font-mono text-sm tracking-widest mb-4">
          Frontend Developer
        </p>
        <h1 className="text-6xl font-bold mb-6">
          Hi, I'm <span className="text-purple-400">Your Name</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-lg mb-8">
          I build fast, beautiful web apps with React and Next.js.
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition">
          View my work
        </button>
      </motion.div>

    </main>
  )
}