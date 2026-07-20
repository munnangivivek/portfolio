import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Clean & Minimal Pixel Preloader (Skiper 11 inspired)
 * Styled with subtle grid background, comic color theme,
 * and animated hand-drawn marker highlight under "Meaningful Products".
 */
const PixelPreloader = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  // Pixel grid block calculation for transition
  const columns = 12;
  const rows = 8;
  const totalBlocks = columns * rows;

  // Generate randomized index array for pixel scatter exit
  const shuffledIndices = useMemo(() => {
    const indices = Array.from({ length: totalBlocks }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, [totalBlocks]);

  const getBlockDelay = (index) => {
    const orderIndex = shuffledIndices.indexOf(index);
    return (orderIndex / totalBlocks) * 0.35; // Stagger exit
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Show text & preloader for ~1.9s, then trigger pixel exit
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 1900);

    return () => {
      clearTimeout(timer);
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
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto select-none overflow-hidden bg-[#FAF8F5]">
      {/* Subtle Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.18] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Pixel Grid Overlay for Exit Transition */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 w-full h-full pointer-events-none z-0">
        {Array.from({ length: totalBlocks }).map((_, index) => (
          <motion.div
            key={index}
            className="w-full h-full bg-[#FAF8F5] border-[0.5px] border-black/5"
            initial={{ opacity: 1 }}
            animate={isExiting ? { opacity: 0, scale: 0.85 } : { opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: isExiting ? getBlockDelay(index) : 0,
              ease: "easeInOut"
            }}
            onAnimationComplete={index === shuffledIndices[totalBlocks - 1] ? handleAnimationComplete : undefined}
          />
        ))}
      </div>

      {/* Centered Typography Content */}
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex flex-col items-center justify-center text-comic-black text-4xl sm:text-6xl md:text-7xl font-heading tracking-wide leading-[1.15]">
              {/* Line 1 */}
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
              >
                Learning to Build
              </motion.span>

              {/* Line 2 with Hand-drawn Marker Underline */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25 }}
                className="relative inline-block mt-2 sm:mt-4 pb-3"
              >
                <span className="relative z-10 text-comic-black">
                  Meaningful Products
                </span>

                {/* Hand-Drawn Marker Underline SVG */}
                <svg
                  className="absolute -bottom-1 left-0 w-full h-5 sm:h-7 overflow-visible pointer-events-none z-0"
                  viewBox="0 0 350 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Thick Yellow Highlighter Underline */}
                  <motion.path
                    d="M 6 16 C 70 8, 190 22, 344 12 C 260 24, 120 18, 24 20"
                    stroke="#FFC800"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.95 }}
                    transition={{ duration: 0.65, delay: 0.45, ease: "easeOut" }}
                  />
                  {/* Red Accent Marker Line */}
                  <motion.path
                    d="M 16 18 C 90 12, 220 22, 330 14"
                    stroke="#FF4400"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.85 }}
                    transition={{ duration: 0.55, delay: 0.65, ease: "easeOut" }}
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PixelPreloader;
