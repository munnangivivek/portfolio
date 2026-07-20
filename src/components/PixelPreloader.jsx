import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Minimal & Cool Chessboard Yellow Preloader
 * Features a small checkerboard grid in yellow theme tones,
 * refined smaller centered typography, and an animated marker under "Build".
 */
const PixelPreloader = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [gridDimensions, setGridDimensions] = useState({ cols: 16, rows: 12 });

  useEffect(() => {
    // Calculate small grid blocks (~45px size)
    const updateGrid = () => {
      const blockSize = 45;
      const cols = Math.max(10, Math.ceil(window.innerWidth / blockSize));
      const rows = Math.max(8, Math.ceil(window.innerHeight / blockSize));
      setGridDimensions({ cols, rows });
    };

    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, []);

  // Calculate concentric wave exit delays from center outward
  const blockData = useMemo(() => {
    const blocks = [];
    const centerCol = gridDimensions.cols / 2;
    const centerRow = gridDimensions.rows / 2;

    for (let r = 0; r < gridDimensions.rows; r++) {
      for (let c = 0; c < gridDimensions.cols; c++) {
        const dist = Math.sqrt(Math.pow(c - centerCol, 2) + Math.pow(r - centerRow, 2));
        const isAlternate = (r + c) % 2 === 0;

        blocks.push({
          id: `${r}-${c}`,
          row: r,
          col: c,
          isAlternate,
          dist,
        });
      }
    }

    const maxDist = Math.max(...blocks.map((b) => b.dist)) || 1;
    return blocks.map((b) => ({
      ...b,
      delay: (b.dist / maxDist) * 0.32,
    }));
  }, [gridDimensions.cols, gridDimensions.rows]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Show text for ~1.6s before initiating exit wave
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 1650);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  const handleExitComplete = () => {
    if (isExiting && onComplete) {
      document.body.style.overflow = '';
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto select-none overflow-hidden bg-[#FFC800]">
      {/* Chessboard Grid Container */}
      <div 
        className="absolute inset-0 grid w-full h-full pointer-events-none z-0"
        style={{
          gridTemplateColumns: `repeat(${gridDimensions.cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridDimensions.rows}, minmax(0, 1fr))`,
        }}
      >
        {blockData.map((block, index) => (
          <motion.div
            key={block.id}
            className={`w-full h-full border-[0.5px] border-black/[0.06] ${
              block.isAlternate ? 'bg-[#FFC800]' : 'bg-[#F3C000]'
            }`}
            initial={{ opacity: 1, scale: 1 }}
            animate={isExiting ? { opacity: 0, scale: 0.92 } : { opacity: 1, scale: 1 }}
            transition={{
              duration: 0.32,
              delay: isExiting ? block.delay : 0,
              ease: [0.76, 0, 0.24, 1],
            }}
            onAnimationComplete={index === blockData.length - 1 ? handleExitComplete : undefined}
          />
        ))}
      </div>

      {/* Centered Minimal Content */}
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18, scale: 0.96, filter: 'blur(4px)' }}
            transition={{ duration: 0.32, ease: [0.76, 0, 0.24, 1] }}
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
                  {/* Marker Underline under "Build" */}
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-4 sm:h-5 overflow-visible pointer-events-none z-0"
                    viewBox="0 0 120 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Comic Red Marker Underline */}
                    <motion.path
                      d="M 3 12 C 25 5, 75 16, 115 8 C 85 18, 45 14, 8 15"
                      stroke="#FF4400"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.95 }}
                      transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                    />
                    {/* White Accent Highlight Line */}
                    <motion.path
                      d="M 6 14 C 35 8, 90 16, 110 10"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.9 }}
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
