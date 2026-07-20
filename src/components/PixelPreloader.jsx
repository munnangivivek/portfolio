import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Skiper 11 - Pixel Preloader Component
 * Featuring retro pixel block transition & text reveal
 * Text: "Learning to Build / Meaningful Products" with "Meaningful Products" highlighted
 */
const PixelPreloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Grid configuration for pixel transition
  const columns = 10;
  const rows = 8;
  const totalBlocks = columns * rows;

  // Generate shuffled indices for random block exit animation
  const shuffledIndices = useMemo(() => {
    const indices = Array.from({ length: totalBlocks }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, [totalBlocks]);

  // Block delay mapping based on shuffled order
  const getBlockDelay = (index) => {
    const orderIndex = shuffledIndices.indexOf(index);
    return (orderIndex / totalBlocks) * 0.45; // 0s to 0.45s stagger
  };

  useEffect(() => {
    // Lock scroll during loading screen
    document.body.style.overflow = 'hidden';

    // Simulate progress counter
    const startTime = Date.now();
    const duration = 2200; // 2.2 seconds counter

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Start pixel exit animation
        setTimeout(() => {
          setIsExiting(true);
        }, 300);
      }
    }, 30);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  const handleAnimationComplete = () => {
    if (isExiting && onComplete) {
      document.body.style.overflow = '';
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto select-none overflow-hidden">
      {/* Pixel Grid Blocks Overlay */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-8 w-full h-full">
        {Array.from({ length: totalBlocks }).map((_, index) => (
          <motion.div
            key={index}
            className="w-full h-full bg-comic-black border-[0.5px] border-white/5"
            initial={{ opacity: 1, scale: 1 }}
            animate={isExiting ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
            transition={{
              duration: 0.35,
              delay: isExiting ? getBlockDelay(index) : 0,
              ease: [0.36, 0, 0.66, -0.56],
            }}
            onAnimationComplete={index === shuffledIndices[totalBlocks - 1] ? handleAnimationComplete : undefined}
          />
        ))}
      </div>

      {/* Content Container (Layered above grid blocks) */}
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Retro Pixel Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 mb-8 bg-comic-black text-comic-yellow border-2 border-comic-yellow rounded-full text-xs font-mono font-bold tracking-widest uppercase shadow-comic"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <span className="w-2 h-2 rounded-full bg-comic-red animate-ping" />
              PORTFOLIO // 2026
            </motion.div>

            {/* Typography Sentence */}
            <div className="flex flex-col gap-3 items-center justify-center font-heading text-comic-white tracking-wide leading-tight text-3xl sm:text-5xl md:text-6xl">
              {/* Line 1 */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]"
              >
                Learning to Build
              </motion.span>

              {/* Line 2 with "Meaningful Products" Highlight */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-1"
              >
                <span className="relative inline-block bg-comic-yellow text-comic-black font-heading px-5 py-2 rounded-2xl border-4 border-comic-black shadow-[6px_6px_0px_0px_#FF4400] transform -rotate-1 hover:rotate-0 transition-transform duration-200">
                  Meaningful Products
                </span>
              </motion.div>
            </div>

            {/* Progress Bar & Counter */}
            <motion.div
              className="mt-12 w-64 sm:w-80 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-full h-4 bg-white/10 rounded-full border-2 border-comic-white/30 overflow-hidden p-0.5">
                <motion.div
                  className="h-full bg-comic-red rounded-full border border-comic-black"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              <div className="flex justify-between w-full text-xs font-mono font-bold text-comic-white/70">
                <span>INITIALIZING</span>
                <span className="text-comic-yellow font-heading text-sm">{progress}%</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PixelPreloader;
