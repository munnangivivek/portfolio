import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Clean & Vivid Comic-Yellow Pixel Preloader
 * Features yellow theme background, sharp black typography,
 * and an animated comic red & white marker stroke highlighting "Build".
 */
const PixelPreloader = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  // Pixel grid calculation for exit transition
  const columns = 12;
  const rows = 8;
  const totalBlocks = columns * rows;

  // Generate randomized index array for staggered pixel exit
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
    return (orderIndex / totalBlocks) * 0.35;
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Show preloader for ~1.9s before exit animation
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
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto select-none overflow-hidden bg-comic-yellow">
      {/* Subtle Comic Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#000000 1.5px, transparent 1.5px), linear-gradient(90deg, #000000 1.5px, transparent 1.5px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Pixel Grid Overlay for Reveal Exit Transition */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 w-full h-full pointer-events-none z-0">
        {Array.from({ length: totalBlocks }).map((_, index) => (
          <motion.div
            key={index}
            className="w-full h-full bg-comic-yellow border-[0.5px] border-black/10"
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
            <div className="flex flex-col items-center justify-center text-comic-black text-4xl sm:text-6xl md:text-7xl font-heading tracking-wide leading-[1.2]">
              {/* Line 1 with Highlighted "Build" */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center"
              >
                <span>Learning to</span>
                <span className="relative inline-block text-comic-black px-1">
                  Build
                  {/* Comic Red & White Hand-Drawn Marker Underline SVG */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-5 sm:h-7 overflow-visible pointer-events-none z-0"
                    viewBox="0 0 160 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Thick Comic Red Marker Underline */}
                    <motion.path
                      d="M 4 14 C 35 6, 95 20, 155 10 C 115 22, 60 16, 12 18"
                      stroke="#FF4400"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.95 }}
                      transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
                    />
                    {/* White Accent Highlight Line */}
                    <motion.path
                      d="M 8 16 C 45 10, 110 20, 150 12"
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.9 }}
                      transition={{ duration: 0.45, delay: 0.55, ease: "easeOut" }}
                    />
                  </svg>
                </span>
              </motion.div>

              {/* Line 2 */}
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25 }}
                className="mt-2 sm:mt-3"
              >
                Meaningful Products
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PixelPreloader;
