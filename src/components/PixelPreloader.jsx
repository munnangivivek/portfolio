import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Ultra-Smooth Wave Curtain Preloader
 * Clean, fluid, and elegant entrance & exit transition.
 * Theme: Comic Yellow background, sharp black text, animated marker under "Build".
 */
const PixelPreloader = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Show preloader text for ~1.7s before fluid curtain exit
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 1700);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  // Morphing SVG paths for butter-smooth curtain exit
  const initialPath = `M0 0 L${dimensions.width} 0 L${dimensions.width} ${dimensions.height} L0 ${dimensions.height} Z`;
  const curvePath = `M0 0 L${dimensions.width} 0 L${dimensions.width} ${dimensions.height * 0.8} Q${dimensions.width / 2} -100 0 ${dimensions.height * 0.8} Z`;
  const targetPath = `M0 0 L${dimensions.width} 0 L${dimensions.width} 0 Q${dimensions.width / 2} 0 0 0 Z`;

  const curveVariants = {
    initial: {
      d: initialPath,
    },
    exit: {
      d: [initialPath, curvePath, targetPath],
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const handleExitComplete = () => {
    if (onComplete) {
      document.body.style.overflow = '';
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto select-none overflow-hidden">
      {/* Smooth Morphing SVG Curtain Background */}
      {dimensions.width > 0 ? (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 fill-comic-yellow">
          <motion.path
            variants={curveVariants}
            initial="initial"
            animate={isExiting ? "exit" : "initial"}
            onAnimationComplete={isExiting ? handleExitComplete : undefined}
          />
        </svg>
      ) : (
        <div className="absolute inset-0 bg-comic-yellow z-0" />
      )}

      {/* Subtle Comic Grid Overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.15] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(#000000 1.5px, transparent 1.5px), linear-gradient(90deg, #000000 1.5px, transparent 1.5px)`,
          backgroundSize: '40px 40px',
        }}
        animate={isExiting ? { opacity: 0 } : { opacity: 0.15 }}
        transition={{ duration: 0.3 }}
      />

      {/* Centered Typography Content */}
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -35, scale: 0.96, filter: 'blur(6px)' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-col items-center justify-center text-comic-black text-4xl sm:text-6xl md:text-7xl font-heading tracking-wide leading-[1.2]">
              {/* Line 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
                className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center"
              >
                <span>Learning to</span>
                <span className="relative inline-block text-comic-black px-1">
                  Build
                  {/* Comic Red & White Marker Underline */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-5 sm:h-7 overflow-visible pointer-events-none z-0"
                    viewBox="0 0 160 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
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
