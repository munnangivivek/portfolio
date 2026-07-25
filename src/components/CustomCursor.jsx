import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const id = Date.now() + Math.random();
      const newClick = {
        id,
        x: e.clientX,
        y: e.clientY,
      };

      setClicks((prev) => [...prev.slice(-4), newClick]);

      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== id));
      }, 500);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            initial={{ scale: 0.2, opacity: 1, rotate: Math.random() * 30 - 15 }}
            animate={{ scale: 1.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: click.x,
              top: click.y,
              transform: 'translate(-50%, -50%)',
            }}
            className="flex items-center justify-center pointer-events-none"
          >
            {/* Comic Starburst Burst Effect */}
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                d="M 24 0 L 28 14 L 43 7 L 34 20 L 48 24 L 34 28 L 43 41 L 28 34 L 24 48 L 20 34 L 5 41 L 14 28 L 0 24 L 14 20 L 5 7 L 20 14 Z"
                fill="#FFE600"
                stroke="#000000"
                strokeWidth="2.5"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
