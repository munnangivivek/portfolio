import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const InteractiveFace = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const eyeControls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Calculate normalized position (-1 to 1)
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Periodic blinking logic
  useEffect(() => {
    const blinkInterval = setInterval(async () => {
      await eyeControls.start({
        scaleY: 0.1,
        transition: { duration: 0.1 }
      });
      await eyeControls.start({
        scaleY: 1,
        transition: { duration: 0.1 }
      });
    }, 4000);

    return () => clearInterval(blinkInterval);
  }, [eyeControls]);

  // Movement ranges (in pixels/degrees)
  const headRange = 15;
  const eyeRange = 8;

  const headX = mousePos.x * headRange;
  const headY = mousePos.y * headRange;
  const headRotate = mousePos.x * 8;

  const pupilX = mousePos.x * eyeRange;
  const pupilY = mousePos.y * eyeRange;

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto select-none">
      {/* 3D-like Head Tilt Wrapper */}
      <motion.div
        animate={{
          x: headX,
          y: headY,
          rotate: headRotate,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="w-full h-full relative"
      >
        {/* LION MANE - Outer spike layer (Comic contrast red/orange) */}
        <div className="absolute inset-0 bg-comic-red border-4 border-comic-black rounded-[30%] rotate-45 comic-shadow z-0" />
        <div className="absolute inset-0 bg-comic-red border-4 border-comic-black rounded-[30%] -rotate-12 comic-shadow z-0" />
        
        {/* Head Main Body - High contrast white/cream */}
        <div className="absolute inset-4 bg-comic-white border-4 border-comic-black rounded-full overflow-hidden comic-shadow z-10 flex flex-col items-center justify-center">
          
          {/* Cute Lion Ears */}
          <div className="absolute -top-2 left-6 w-12 h-12 bg-comic-red border-4 border-comic-black rounded-full z-20">
            <div className="w-6 h-6 bg-comic-yellow border-2 border-comic-black rounded-full m-1" />
          </div>
          <div className="absolute -top-2 right-6 w-12 h-12 bg-comic-red border-4 border-comic-black rounded-full z-20">
            <div className="w-6 h-6 bg-comic-yellow border-2 border-comic-black rounded-full m-1" />
          </div>

          {/* Cheek Blush (Left & Right) */}
          <div className="absolute left-6 bottom-20 w-8 h-4 bg-red-300 opacity-60 rounded-full blur-[1px]" />
          <div className="absolute right-6 bottom-20 w-8 h-4 bg-red-300 opacity-60 rounded-full blur-[1px]" />

          {/* Eyes Container */}
          <div className="flex gap-6 mb-2 relative z-30">
            {/* Left Eye */}
            <div className="w-16 h-20 bg-white border-4 border-comic-black rounded-full flex items-center justify-center relative overflow-hidden">
              <motion.div
                animate={eyeControls}
                className="w-full h-full flex items-center justify-center"
              >
                <motion.div
                  className="w-8 h-8 bg-comic-black rounded-full relative flex items-center justify-center"
                  animate={{ x: pupilX, y: pupilY }}
                  transition={{ type: 'tween', ease: 'linear', duration: 0.05 }}
                >
                  {/* Eye reflection spark */}
                  <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-white rounded-full" />
                </motion.div>
              </motion.div>
            </div>

            {/* Right Eye */}
            <div className="w-16 h-20 bg-white border-4 border-comic-black rounded-full flex items-center justify-center relative overflow-hidden">
              <motion.div
                animate={eyeControls}
                className="w-full h-full flex items-center justify-center"
              >
                <motion.div
                  className="w-8 h-8 bg-comic-black rounded-full relative flex items-center justify-center"
                  animate={{ x: pupilX, y: pupilY }}
                  transition={{ type: 'tween', ease: 'linear', duration: 0.05 }}
                >
                  {/* Eye reflection spark */}
                  <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-white rounded-full" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Lion Nose & Snout */}
          <div className="flex flex-col items-center relative z-30 mt-1">
            {/* Nose (Upside-down triangle) */}
            <div className="w-6 h-4 bg-comic-black border-2 border-comic-black rounded-b-md" />
            
            {/* Mouth whiskers line */}
            <div className="w-0.5 h-2 bg-comic-black" />
            
            {/* Cute Smile */}
            <div className="w-12 h-6 border-b-4 border-comic-black rounded-b-full bg-transparent" />
          </div>

          {/* Whiskers (Left & Right) */}
          <div className="absolute left-8 bottom-16 flex flex-col gap-1.5 opacity-80 z-20">
            <div className="w-6 h-0.5 bg-comic-black transform rotate-6" />
            <div className="w-8 h-0.5 bg-comic-black" />
            <div className="w-6 h-0.5 bg-comic-black transform -rotate-6" />
          </div>
          <div className="absolute right-8 bottom-16 flex flex-col gap-1.5 opacity-80 z-20">
            <div className="w-6 h-0.5 bg-comic-black transform -rotate-6" />
            <div className="w-8 h-0.5 bg-comic-black" />
            <div className="w-6 h-0.5 bg-comic-black transform rotate-6" />
          </div>

        </div>
      </motion.div>

      {/* Decorative Floating Sparkle */}
      <motion.div
        animate={{ 
          rotate: 360,
          y: [0, -5, 0]
        }}
        transition={{ 
          rotate: { duration: 12, repeat: Infinity, ease: "linear" },
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute -top-6 -right-6 text-4xl pointer-events-none drop-shadow-[2px_2px_0px_#000]"
      >
        ✨
      </motion.div>
    </div>
  );
};

export default InteractiveFace;
