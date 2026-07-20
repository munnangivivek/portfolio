import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Modern Clean Words Preloader
 * Features "Design. Build. Grow." in 6 languages in requested order:
 * English -> Telugu -> Hindi -> Urdu -> Tamil -> Bengali.
 * Clean Inter typography, period dots with generous spacing, and smooth normal slide-up curtain exit.
 */
const PixelPreloader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // 6 Languages in requested order: English -> Telugu -> Hindi -> Urdu -> Tamil -> Bengali
  const words = [
    "Design.   Build.   Grow.",
    "రూపొందించు.   నిర్మించు.   ఎదుగు.",
    "डिजाइन.   निर्माण.   विकास.",
    "ڈیزائن.   تعمیر.   ترقی.",
    "வடிவமை.   உருவாக்கு.   வளர்.",
    "ডিজাইন.   নির্মাণ.   বৃদ্ধি.",
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Leave extra time for index 0 (English) to be read, then cycle remaining languages at 420ms
    if (index < words.length - 1) {
      const currentDelay = index === 0 ? 920 : 420;
      const timer = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, currentDelay);
      return () => clearTimeout(timer);
    } else {
      // Hold last word briefly, then trigger normal slide up
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 520);
      return () => clearTimeout(exitTimer);
    }
  }, [index, words.length]);

  const handleAnimationComplete = () => {
    if (isExiting && onComplete) {
      document.body.style.overflow = '';
      onComplete();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto select-none bg-comic-yellow text-center"
      initial={{ y: '0%' }}
      animate={isExiting ? { y: '-100%' } : { y: '0%' }}
      transition={{
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      }}
      onAnimationComplete={handleAnimationComplete}
    >
      {/* Centered Typography */}
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div
            key={index}
            className="relative z-10 px-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <span className="text-comic-black font-['Inter',sans-serif] font-bold text-2xl sm:text-3xl md:text-4xl tracking-wide leading-snug whitespace-pre-wrap">
              {words[index]}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PixelPreloader;
