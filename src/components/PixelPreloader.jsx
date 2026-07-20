import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Double Stairs Preloader Transition
 * Features 5 vertical stair columns with double-layer staggered slide-up exit,
 * centered typography, and a fine brush stroke underline under "Build".
 */
const PixelPreloader = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  const nbOfColumns = 5;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Show preloader text for ~1.6s before double stairs transition starts
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 1600);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  // Calculate staggered delay for stairs sequence
  const getStairsDelay = (index, layer = 1) => {
    const baseStagger = 0.07;
    const layerOffset = layer === 1 ? 0 : 0.08;
    return index * baseStagger + layerOffset;
  };

  const handleAnimationComplete = () => {
    if (isExiting && onComplete) {
      document.body.style.overflow = '';
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto select-none overflow-hidden">
      {/* First Layer Stairs (Comic Red Accent) */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none z-0">
        {Array.from({ length: nbOfColumns }).map((_, i) => (
          <motion.div
            key={`stair-layer1-${i}`}
            className="h-full bg-comic-red relative border-r border-black/10"
            style={{ width: `${100 / nbOfColumns}%` }}
            initial={{ y: '0%' }}
            animate={isExiting ? { y: '-100%' } : { y: '0%' }}
            transition={{
              duration: 0.5,
              delay: isExiting ? getStairsDelay(i, 1) : 0,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        ))}
      </div>

      {/* Second Layer Stairs (Main Comic Yellow Theme) */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none z-10">
        {Array.from({ length: nbOfColumns }).map((_, i) => (
          <motion.div
            key={`stair-layer2-${i}`}
            className="h-full bg-comic-yellow relative border-r border-black/10 flex flex-col justify-between"
            style={{ width: `${100 / nbOfColumns}%` }}
            initial={{ y: '0%' }}
            animate={isExiting ? { y: '-100%' } : { y: '0%' }}
            transition={{
              duration: 0.55,
              delay: isExiting ? getStairsDelay(i, 2) : 0,
              ease: [0.76, 0, 0.24, 1],
            }}
            onAnimationComplete={i === nbOfColumns - 1 ? handleAnimationComplete : undefined}
          >
            {/* Subtle Graph Grid Line inside each stair column */}
            <div 
              className="absolute inset-0 opacity-[0.12] pointer-events-none" 
              style={{
                backgroundImage: `linear-gradient(#000000 1.5px, transparent 1.5px), linear-gradient(90deg, #000000 1.5px, transparent 1.5px)`,
                backgroundSize: '40px 40px'
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Centered Minimal Content */}
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            className="relative z-20 flex flex-col items-center text-center px-6 max-w-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-col items-center justify-center text-comic-black text-2xl sm:text-4xl md:text-5xl font-heading tracking-wide leading-[1.3]">
              {/* Line 1 */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center"
              >
                <span>Learning to</span>
                <span className="relative inline-block text-comic-black px-1 font-extrabold">
                  Build
                  {/* Fine Brush Underline under "Build" */}
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-3 sm:h-4 overflow-visible pointer-events-none z-0"
                    viewBox="0 0 100 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Primary Thin Brush Stroke */}
                    <motion.path
                      d="M 2 8 C 25 3, 65 11, 98 5"
                      stroke="#FF4400"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.95 }}
                      transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                    />
                    {/* Subtle Organic Accent Line */}
                    <motion.path
                      d="M 8 10 C 35 6, 75 9, 94 7"
                      stroke="#FF4400"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
                    />
                  </svg>
                </span>
              </motion.div>

              {/* Line 2 */}
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.22, ease: 'easeOut' }}
                className="mt-1 sm:mt-2 text-comic-black/90 font-medium"
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
