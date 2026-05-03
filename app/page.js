'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// --- Animations ---
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

// --- Data ---
const skills = [
  "React", "Next.js", "Python", "JavaScript",
  "TypeScript", "Golang", "Node.js", "PyTorch", "Scikit-learn", "Git&Github"
]

const projects = [
  {
    id: "centralized-vehicle",
    title: "Centralized Vehicle Management System",
    desc: "ระบบจัดการยานพาหนะส่วนกลาง ช่วยให้องค์กรสามารถติดตามและจัดการยานพาหนะได้อย่างมีประสิทธิภาพ",
    fullDesc: [
      "โปรเจกต์นี้พัฒนาขึ้นเพื่อแก้ปัญหาการจัดการรถยนต์ขององค์กรที่ซับซ้อน โดยเปลี่ยนจากการจดบันทึกลงกระดาษมาเป็นระบบดิจิทัลแบบ 100%",
      "ผู้ใช้งานสามารถตรวจสอบสถานะรถว่าง และทำการจองผ่านระบบได้อย่างรวดเร็ว ในขณะที่ผู้ดูแลระบบสามารถดูภาพรวมและจัดการคิวรถได้ผ่าน Dashboard"
    ],
    features: [
      "ระบบสแกน QR Code ประจำรถเพื่อดึงข้อมูลและทำรายการทันที",
      "ระบบอนุมัติการใช้งาน (Approval Flow) สำหรับหัวหน้างาน",
      "อัปเดตข้อมูลแบบ Real-time ลงฐานข้อมูล",
      "สรุปสถิติการใช้งานรถแต่ละคัน"
    ],
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "Google App Script"],
    emoji: "🚀",
    images: ["/project1/car-1.jpg", "/project1/car-2.jpg", "/project1/car-3.jpg"]
  },
  {
    id: "easy-eats",
    title: "EasyEats — AI Food Recommendation",
    desc: "แพลตฟอร์มแนะนำอาหารอัจฉริยะ โดยใช้ AI แนะนำเมนูอาหารจากวัตถุดิบที่คุณมี",
    fullDesc: [
      "แพลตฟอร์มแนะนำอาหารอัจฉริยะ นำเสนอประสบการณ์การค้นหาเมนูอาหารที่เหนือกว่า โดยใช้ AI วิเคราะห์วัตถุดิบที่คุณมีในตู้เย็น",
      "ระบบจะประมวลผลออกมาเป็นเมนูอาหารที่เหมาะสม พร้อมแสดงวิธีทำและสัดส่วนวัตถุดิบอย่างละเอียด ช่วยแก้ปัญหา 'วันนี้กินอะไรดี' ได้อย่างตรงจุด"
    ],
    features: [
      "แนะนำเมนูอาหารจากวัตถุดิบที่มีอยู่จริง",
      "UI/UX ออกแบบมาให้ใช้งานง่ายบนมือถือ",
      "ประมวลผลด้วย AI Model ที่มีความแม่นยำสูง"
    ],
    tags: ["Flutter", "Python (Flask)", "TensorFlow Lite"],
    emoji: "⚡",
    isMobileApp: true,
    images: ["/project2/food_1.jpg", "/project2/food_2.jpg", "/project2/food_3.jpg", "/project2/food_4.jpg", "/project2/food_5.jpg", "/project2/food_6.jpg", "/project2/food_7.jpg"]
  },
  {
    id: "snowball-ai",
    title: "SnowballAI — Algorithmic Trading Bot",
    desc: "บอทเทรด Forex อัตโนมัติด้วย AI Ensemble Models ที่รันบน VPS",
    fullDesc: [
      "SnowballAI เป็นโปรเจกต์บอทเทรด Forex อัตโนมัติที่ใช้โมเดล AI ขั้นสูงหลายตัวทำงานร่วมกัน (Ensemble Models) ในการวิเคราะห์แนวโน้มตลาด",
      "ตัวบอทสามารถส่งคำสั่งซื้อขายผ่าน MetaTrader 5 API ได้แบบอัตโนมัติ โดยปัจจุบันรันและมอนิเตอร์ประสิทธิภาพการทำงานอยู่บน DigiCloud VPS ตลอด 24 ชั่วโมง"
    ],
    features: [
      "ใช้โมเดล AI หลากหลาย (Neural Networks, Reinforcement Learning, Random Forest)",
      "เชื่อมต่อและส่งคำสั่งผ่าน MetaTrader 5 API ทันทีเมื่อเกิดสัญญาณ",
      "รันบน VPS ตลอด 24 ชั่วโมงเพื่อไม่ให้พลาดโอกาสในตลาด",
      "มีระบบจัดการความเสี่ยง (Risk Management) ภายในตัว"
    ],
    tags: ["Python", "PyTorch", "Scikit-learn", "Flask", "MT5 API"],
    emoji: "✨",
    images: []
  },
]

// --- Project Card Component ---
const ProjectCard = ({ p, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // FIX #6: คำนวณ keyframes ครั้งเดียว ไม่สร้าง array ใหม่ทุก render
  const carouselKeyframes = p.images && p.images.length > 0
    ? p.images.map((_, i) => `-${(i * 100) / p.images.length}%`)
    : ["0%"];

  return (
    <motion.div
      onClick={() => onClick(p)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group glow-card rounded-2xl overflow-hidden cursor-pointer bg-zinc-900/50 border border-white/5 flex flex-col h-full"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(p);
        }
      }}
      aria-label={`View details for ${p.title}`}
    >
      <div className="relative h-48 md:h-56 overflow-hidden bg-zinc-800 shrink-0">
        {p.images && p.images.length > 0 ? (
          <motion.div
            className="flex h-full"
            style={{ width: `${p.images.length * 100}%` }}
            animate={isHovered ? { x: carouselKeyframes } : { x: "0%" }}
            transition={{
              duration: p.images.length * 2.5,
              repeat: isHovered ? Infinity : 0, // FIX #6: ไม่ loop ตอนไม่ hover
              ease: "linear"
            }}
          >
            {p.images.map((img, idx) => (
              <div key={idx} className="h-full w-full relative overflow-hidden">
                {/* Blurred backdrop ใต้รูป — เติมพื้นที่ว่างให้สวยเสมอ */}
                <div
                  className="absolute inset-0 bg-cover bg-center scale-110 blur-xl opacity-40"
                  style={{ backgroundImage: `url(${img})` }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-zinc-900/40" aria-hidden="true" />
                {/* Emoji fallback ตอนรูปยังไม่โหลด */}
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  {p.emoji}
                </div>
                <img
                  src={img}
                  alt={`${p.title} screenshot ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full relative z-10 object-contain p-3 opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-zinc-800" aria-hidden="true">
            {p.emoji}
          </div>
        )}
      </div>

      <div className="p-7 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-zinc-100 group-hover:text-violet-400 transition-colors duration-300">
            {p.title}
          </h3>
          <span className="text-zinc-600 group-hover:text-violet-400 transition-all duration-300 text-lg group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
            ↗
          </span>
        </div>
        <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2">{p.desc}</p>
        <div className="flex gap-2 flex-wrap mt-auto">
          {p.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-xs font-mono text-violet-400 bg-violet-500/10 border border-violet-500/15 px-3 py-1.5 rounded-lg">
              {t}
            </span>
          ))}
          {p.tags.length > 3 && (
            <span className="text-xs font-mono text-zinc-500 px-2 py-1.5">+{p.tags.length - 3}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- Snake Game States ---
  const GRID_SIZE = 15;
  const FOOD_SYMBOLS = ['{}', '<>', '()', '[]', ';', '=>', '&&', '||', '++', '/*'];
  const INITIAL_SNAKE = [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }];
  const INITIAL_DIRECTION = { x: 1, y: 0 };

  const [showGame, setShowGame] = useState(false);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 10, y: 7, symbol: '{}' });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Refs
  const directionRef = useRef(INITIAL_DIRECTION);
  const nextDirectionRef = useRef(INITIAL_DIRECTION); // queue ทิศถัดไป กันเลี้ยวกลับทันทีด้วย key เร็วๆ
  const gameLoopRef = useRef(null);
  const snakeRef = useRef(INITIAL_SNAKE);
  const foodRef = useRef({ x: 10, y: 7, symbol: '{}' });
  const isGameOverRef = useRef(false);
  const isPausedRef = useRef(false);
  const touchStartRef = useRef(null);

  // sync state -> ref (gameloop ใช้ ref เพราะ setInterval ไม่เห็น state ล่าสุด)
  useEffect(() => { snakeRef.current = snake; }, [snake]);
  useEffect(() => { foodRef.current = food; }, [food]);
  useEffect(() => { isGameOverRef.current = isGameOver; }, [isGameOver]);
  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);

  // คำนวณความเร็ว — เร็วขึ้นทุก 5 แต้ม
  // score 0  -> 180ms, score 5 -> 150ms, score 15 -> 110ms, score 30+ -> ~80ms
  const calculateSpeed = (score) => {
    return Math.max(80, 180 - Math.floor(score / 5) * 15);
  };

  // สุ่มอาหารใหม่ ในตำแหน่งที่ไม่ทับงู
  const spawnFood = useCallback((currentSnake) => {
    let newFood;
    let attempts = 0;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
        symbol: FOOD_SYMBOLS[Math.floor(Math.random() * FOOD_SYMBOLS.length)]
      };
      attempts++;
    } while (
      currentSnake.some(s => s.x === newFood.x && s.y === newFood.y) &&
      attempts < 100
    );
    return newFood;
  }, []);

  // Game tick — เคลื่อนงู
  const tick = useCallback(() => {
    if (isGameOverRef.current || isPausedRef.current) return;

    // commit direction ที่ queue ไว้
    directionRef.current = nextDirectionRef.current;
    const dir = directionRef.current;
    const currentSnake = snakeRef.current;
    const currentFood = foodRef.current;

    const head = currentSnake[0];
    const newHead = { x: head.x + dir.x, y: head.y + dir.y };

    // ชนกำแพง
    if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
      setIsGameOver(true);
      return;
    }

    // ชนตัวเอง (ยกเว้นหาง เพราะหางจะขยับออก)
    const willEat = newHead.x === currentFood.x && newHead.y === currentFood.y;
    const bodyToCheck = willEat ? currentSnake : currentSnake.slice(0, -1);
    if (bodyToCheck.some(s => s.x === newHead.x && s.y === newHead.y)) {
      setIsGameOver(true);
      return;
    }

    // อัปเดตงู
    const newSnake = willEat
      ? [newHead, ...currentSnake]
      : [newHead, ...currentSnake.slice(0, -1)];

    setSnake(newSnake);

    if (willEat) {
      setScore(prev => {
        const next = prev + 1;
        setHighScore(h => Math.max(h, next));
        return next;
      });
      setFood(spawnFood(newSnake));
    }
  }, [spawnFood]);

  // Game loop — ปรับ interval ตาม score
  useEffect(() => {
    if (!showGame || isGameOver || !hasStarted) return;
    const speed = calculateSpeed(score);
    gameLoopRef.current = setInterval(tick, speed);
    return () => clearInterval(gameLoopRef.current);
  }, [showGame, isGameOver, hasStarted, score, tick]);

  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(spawnFood(INITIAL_SNAKE));
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setHasStarted(true);
    directionRef.current = INITIAL_DIRECTION;
    nextDirectionRef.current = INITIAL_DIRECTION;
  }, [spawnFood]);

  // เปลี่ยนทิศ — กันเลี้ยวกลับทาง 180°
  const changeDirection = useCallback((newDir) => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    const current = directionRef.current;
    // ห้ามกลับทาง 180°
    if (current.x + newDir.x === 0 && current.y + newDir.y === 0) return;
    nextDirectionRef.current = newDir;
  }, [hasStarted]);

  // Keyboard controls
  useEffect(() => {
    if (!showGame) return;

    const handleKey = (e) => {
      const key = e.key.toLowerCase();

      // Pause
      if (key === ' ' || key === 'p') {
        e.preventDefault();
        if (!isGameOverRef.current && hasStarted) {
          setIsPaused(p => !p);
        }
        return;
      }

      // Restart
      if (key === 'r' && isGameOverRef.current) {
        startGame();
        return;
      }

      // Direction
      if (key === 'arrowup' || key === 'w') {
        e.preventDefault();
        changeDirection({ x: 0, y: -1 });
      } else if (key === 'arrowdown' || key === 's') {
        e.preventDefault();
        changeDirection({ x: 0, y: 1 });
      } else if (key === 'arrowleft' || key === 'a') {
        e.preventDefault();
        changeDirection({ x: -1, y: 0 });
      } else if (key === 'arrowright' || key === 'd') {
        e.preventDefault();
        changeDirection({ x: 1, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showGame, hasStarted, startGame, changeDirection]);

  // Touch / swipe controls (มือถือ)
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    // threshold 30px กัน tap ปกติ
    if (Math.max(absX, absY) < 30) return;

    if (absX > absY) {
      changeDirection({ x: dx > 0 ? 1 : -1, y: 0 });
    } else {
      changeDirection({ x: 0, y: dy > 0 ? 1 : -1 });
    }
    touchStartRef.current = null;
  };

  // Reset เมื่อเปิด/ปิด เกม
  useEffect(() => {
    if (showGame) {
      setSnake(INITIAL_SNAKE);
      setFood(spawnFood(INITIAL_SNAKE));
      setScore(0);
      setIsGameOver(false);
      setIsPaused(false);
      setHasStarted(false);
      directionRef.current = INITIAL_DIRECTION;
      nextDirectionRef.current = INITIAL_DIRECTION;
    }
    return () => clearInterval(gameLoopRef.current);
  }, [showGame, spawnFood]);

  // ดักจับ Konami Code — FIX #3: รีเซ็ตให้ฉลาดขึ้น
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const matchKey = (key, target) => key === target || key.toLowerCase() === target;

    const handleKeyDown = (e) => {
      if (matchKey(e.key, konamiCode[konamiIndex])) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setShowGame(true);
          konamiIndex = 0;
        }
      } else {
        // FIX #3: ถ้ากดผิด แต่ตรงกับตัวแรกของรหัส ให้เริ่มที่ 1 (ไม่ใช่ 0)
        konamiIndex = matchKey(e.key, konamiCode[0]) ? 1 : 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    return () => clearInterval(gameLoopRef.current);
  }, []);

  // FIX #9: ปิด modal/เกมด้วย Esc key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        if (selectedProject) setSelectedProject(null);
        else if (showGame) setShowGame(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedProject, showGame]);

  // FIX #11: lock body scroll ตอนเปิด modal หรือเกม
  useEffect(() => {
    if (selectedProject || showGame) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [selectedProject, showGame]);

  const nextImage = useCallback((e) => {
    e.stopPropagation();
    if (selectedProject?.images?.length) {
      setCurrentImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1));
    }
  }, [selectedProject]);

  const prevImage = useCallback((e) => {
    e.stopPropagation();
    if (selectedProject?.images?.length) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1));
    }
  }, [selectedProject]);

  // FIX #9: keyboard navigation ใน modal (ลูกศรซ้าย/ขวาเปลี่ยนรูป)
  useEffect(() => {
    if (!selectedProject?.images?.length || selectedProject.images.length <= 1) return;
    const handleArrows = (e) => {
      if (e.key === 'ArrowRight') nextImage({ stopPropagation: () => { } });
      if (e.key === 'ArrowLeft') prevImage({ stopPropagation: () => { } });
    };
    window.addEventListener('keydown', handleArrows);
    return () => window.removeEventListener('keydown', handleArrows);
  }, [selectedProject, nextImage, prevImage]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-50 relative">
      <div className="noise-overlay" />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          background: 'rgba(9, 9, 11, 0.75)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.06)',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
          <a href="#" className="font-mono text-sm tracking-[0.3em] font-bold gradient-text">
            Jaiant
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

      {/* HERO */}
      <section className="hero-gradient min-h-screen flex flex-col justify-center relative pt-20">
        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-10">
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-8">
            <div className="section-divider" />
            <span className="text-violet-400 font-mono text-xs tracking-[0.25em] uppercase">
              IT Programmer
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.12)}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 tracking-tight"
          >
            Hi, I&apos;m{' '}
            <span className="gradient-text">Pheeraphat Sekhukhumpat</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.22)}
            className="text-zinc-400 text-lg md:text-xl max-w-lg mb-12 leading-relaxed"
          >
            เด็กจบใหม่จากวิศวกรรมคอมพิวเตอร์ ที่ชอบทำของ ชอบเรียนรู้ และเชื่อในของเล็กๆ ที่ทำมาอย่างตั้งใจ.
          </motion.p>

          <motion.div {...fadeUp(0.32)} className="flex flex-wrap gap-4 mb-16">
            <a
              href="#projects"
              className="btn-primary px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide inline-flex items-center gap-2 bg-violet-600 text-white hover:bg-violet-500 transition"
            >
              <span className="relative z-10">View my work</span>
              <span className="relative z-10" aria-hidden="true">↓</span>
            </a>
            <a
              href="#contact"
              className="btn-outline px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide border border-zinc-700 hover:border-zinc-500 transition"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.42)} className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-zinc-500 text-sm font-mono">Available for work</span>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
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
                  นักศึกษาวิศวกรรมคอมพิวเตอร์จบใหม่ สนใจในการพัฒนา Frontend, Backend Development และการเรียนรู้การใช้ AI ช่วยในกระบวนการเขียนโค้ด ได้รับโอกาสฝึกงานที่ PEA ทำให้ได้สัมผัสการทำงานในระบบจริง ตั้งใจเรียนรู้ พัฒนาทักษะอย่างต่อเนื่อง และพร้อมเปิดรับคำแนะนำจากทีมงานที่มีประสบการณ์
                </p>
                <p className="text-zinc-500 text-base leading-relaxed">
                  Always exploring new technologies and building things that make a difference.
                </p>
              </div>

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
                    className="skill-tag rounded-xl px-5 py-4 text-sm font-mono text-zinc-300 cursor-default text-center bg-zinc-900 border border-white/5"
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="section-divider" />
              <p className="text-violet-400 font-mono text-xs tracking-[0.25em] uppercase">Selected work</p>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Featured{' '}
                <span className="gradient-text">Projects</span>
              </h2>

              <button
                onClick={() => setShowGame(true)}
                className="text-[10px] text-zinc-700 hover:text-violet-400 font-mono transition-colors duration-500 flex items-center gap-2 group self-start md:mb-2"
                aria-label="Open hidden mini-game"
              >
                <span>🎮 System stable. Or is it?</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ( Try: ↑ ↑ ↓ ↓ ← → ← → B A )
                </span>
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ProjectCard
                  p={p}
                  onClick={(project) => {
                    setSelectedProject(project);
                    setCurrentImageIndex(0);
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
              aria-hidden="true"
            />

            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-zinc-900 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl pointer-events-auto border border-white/10 flex flex-col max-h-[90vh]"
              >
                <div className="relative h-64 md:h-96 bg-zinc-800 shrink-0 group overflow-hidden">
                  {selectedProject.images && selectedProject.images.length > 0 ? (
                    <>
                      {/* Blurred backdrop — เติมพื้นที่ว่างด้วยรูปเดียวกันแบบเบลอ ทำให้ทุกรูปดูพอดีกรอบ */}
                      <div
                        className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-50"
                        style={{ backgroundImage: `url(${selectedProject.images[currentImageIndex]})` }}
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

                      {/* รูปจริง — object-contain แสดงเต็มไม่ crop */}
                      <img
                        src={selectedProject.images[currentImageIndex]}
                        alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                        className="relative w-full h-full object-contain py-4 z-[1]"
                      />

                      {selectedProject.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-violet-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition opacity-0 group-hover:opacity-100 backdrop-blur-md z-[2]"
                            aria-label="Previous image"
                          >
                            ←
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-violet-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition opacity-0 group-hover:opacity-100 backdrop-blur-md z-[2]"
                            aria-label="Next image"
                          >
                            →
                          </button>

                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-[2]">
                            {selectedProject.images.map((_, idx) => (
                              <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'w-6 bg-violet-500' : 'w-2 bg-white/50'}`}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-7xl bg-zinc-800" aria-hidden="true">
                      {selectedProject.emoji}
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 transition backdrop-blur-md z-10"
                    aria-label="Close project details"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-8 md:p-10 overflow-y-auto">
                  <h3 id="modal-title" className="text-2xl md:text-3xl font-bold mb-6">{selectedProject.title}</h3>

                  <div className="space-y-4 mb-8">
                    {Array.isArray(selectedProject.fullDesc)
                      ? selectedProject.fullDesc.map((paragraph, index) => (
                        <p key={index} className="text-zinc-300 leading-relaxed">
                          {paragraph}
                        </p>
                      ))
                      : <p className="text-zinc-300 leading-relaxed">{selectedProject.fullDesc}</p>
                    }
                  </div>

                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-violet-400 uppercase tracking-wider mb-4">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-zinc-300">
                            <span className="text-violet-500 mr-3 mt-1" aria-hidden="true">✦</span>
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3">Technologies Used</h4>
                    <div className="flex gap-2 flex-wrap">
                      {selectedProject.tags.map((t) => (
                        <span key={t} className="text-sm font-mono text-violet-400 bg-violet-500/10 border border-violet-500/15 px-4 py-2 rounded-lg">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* CONTACT */}
      <section id="contact" className="py-28 md:py-36">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="gradient-border rounded-3xl p-10 md:p-20 text-center bg-zinc-900/30"
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
              href="mailto:psekukumpat@gmail.com"
              className="inline-block text-xl md:text-2xl font-mono gradient-text hover:opacity-80 border-b-2 border-violet-500/30 hover:border-violet-400/60 pb-2 transition-all duration-300"
            >
              psekukumpat@gmail.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-8 text-center"
        style={{ borderTop: '1px solid rgba(139, 92, 246, 0.06)' }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="text-zinc-600 text-sm font-mono">
            Built with Next.js &amp; Tailwind — Jaiant © 2026
          </p>
        </div>
      </footer>

      {/* ==================== CODE SNAKE MINI-GAME ==================== */}
      <AnimatePresence>
        {showGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center font-mono p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Code Snake mini-game"
          >
            {/* Header */}
            <div className="mb-6 text-center px-4">
              <h2 className="text-violet-400 text-2xl md:text-3xl font-bold mb-3 uppercase tracking-tighter">
                {'< Code Snake />'}
              </h2>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <div
                  className="text-white text-xl md:text-2xl font-bold bg-violet-600/20 py-1.5 px-5 rounded-full border border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                  aria-live="polite"
                >
                  SCORE: {score}
                </div>
                <div className="text-zinc-400 text-sm md:text-base font-mono bg-zinc-800/50 py-1.5 px-4 rounded-full border border-white/5">
                  BEST: {highScore}
                </div>
              </div>
            </div>

            {/* Game Board */}
            <div
              className="relative bg-zinc-900/60 rounded-2xl border border-white/5 shadow-2xl p-2 md:p-3"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{
                touchAction: 'none', // กัน browser scroll ตอน swipe
              }}
            >
              <div
                className="grid gap-0 bg-zinc-950/80 rounded-xl overflow-hidden"
                style={{
                  gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                  width: 'min(90vw, 480px)',
                  height: 'min(90vw, 480px)',
                }}
              >
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
                  const x = idx % GRID_SIZE;
                  const y = Math.floor(idx / GRID_SIZE);
                  const snakeIdx = snake.findIndex(s => s.x === x && s.y === y);
                  const isHead = snakeIdx === 0;
                  const isBody = snakeIdx > 0;
                  const isFood = food.x === x && food.y === y;

                  return (
                    <div
                      key={idx}
                      className={`relative aspect-square flex items-center justify-center transition-colors ${isHead
                        ? 'bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]'
                        : isBody
                          ? 'bg-violet-600/80'
                          : ''
                        }`}
                    >
                      {isFood && (
                        <motion.span
                          key={`${food.x}-${food.y}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-violet-300 font-bold text-[8px] sm:text-[10px] md:text-xs select-none"
                          style={{ textShadow: '0 0 6px rgba(167,139,250,0.8)' }}
                        >
                          {food.symbol}
                        </motion.span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Start Overlay */}
              {!hasStarted && !isGameOver && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-2xl backdrop-blur-sm pointer-events-none"
                >
                  <div className="text-violet-400 text-lg md:text-xl font-bold mb-2 animate-pulse">
                    PRESS ANY ARROW TO START
                  </div>
                  <div className="text-zinc-500 text-xs md:text-sm">
                    or swipe on mobile
                  </div>
                </motion.div>
              )}

              {/* Pause Overlay */}
              {isPaused && hasStarted && !isGameOver && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-2xl backdrop-blur-sm"
                >
                  <div className="text-violet-400 text-2xl md:text-3xl font-bold mb-2">⏸ PAUSED</div>
                  <div className="text-zinc-500 text-xs md:text-sm">Press SPACE to resume</div>
                </motion.div>
              )}

              {/* Game Over Overlay */}
              {isGameOver && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 rounded-2xl backdrop-blur-sm"
                >
                  <div className="text-red-500 text-2xl md:text-4xl font-black mb-2 tracking-tight">
                    STACK OVERFLOW
                  </div>
                  <div className="text-zinc-400 text-sm md:text-base mb-1">
                    Final Score: <span className="text-violet-400 font-bold">{score}</span>
                  </div>
                  {score === highScore && score > 0 && (
                    <div className="text-yellow-400 text-xs md:text-sm mb-4 animate-pulse">
                      ✨ NEW HIGH SCORE!
                    </div>
                  )}
                  <button
                    onClick={startGame}
                    className="mt-3 bg-violet-600 hover:bg-violet-500 text-white font-bold py-2.5 px-6 md:py-3 md:px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-95 text-sm md:text-base"
                  >
                    PLAY AGAIN
                  </button>
                  <div className="text-zinc-600 text-[10px] mt-3 tracking-wider">
                    or press R
                  </div>
                </motion.div>
              )}
            </div>

            {/* Controls Hint */}
            <div className="mt-6 text-center text-zinc-600 text-[10px] md:text-xs font-mono tracking-widest space-y-1">
              <div>
                <span className="hidden md:inline">↑ ↓ ← → / WASD to move • SPACE to pause</span>
                <span className="md:hidden">SWIPE to move • TAP HOLD to pause</span>
              </div>
              <div className="text-zinc-700">eat {'{ }'} {'< />'} ( ) to grow</div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowGame(false)}
              className="mt-6 text-zinc-600 hover:text-zinc-400 transition-colors uppercase text-[10px] tracking-[0.3em] font-bold"
              aria-label="Close mini-game"
            >
              [ Exit Process ]
            </button>

            {/* Background noise */}
            <div
              className="absolute inset-0 -z-10 overflow-hidden opacity-[0.03] pointer-events-none font-mono text-[10px] flex flex-wrap gap-x-8 gap-y-4 p-4 text-white"
              aria-hidden="true"
            >
              {Array(150).fill(0).map((_, i) => (
                <span key={i}>0x{i.toString(16).toUpperCase().padStart(4, '0')}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}