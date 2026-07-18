import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PacmanBackground = () => {
  const containerRef = useRef(null);
  const pacmanRef = useRef(null);
  const ghostRef = useRef(null);
  const dotsRef = useRef([]);

  // Store coordinates in refs to update outside React render cycles (60fps performance)
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pacmanPos = useRef({ x: 100, y: 150, rotate: 0 });
  const ghostPos = useRef({ x: 50, y: 50 });
  
  // Track 6 food dots coordinates & their status
  const dotsData = useRef([
    { x: 200, y: 200, active: true },
    { x: 400, y: 350, active: true },
    { x: 600, y: 150, active: true },
    { x: 800, y: 400, active: true },
    { x: 300, y: 500, active: true },
    { x: 700, y: 450, active: true }
  ]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let rId;
    
    // Reposition dot to a random coordinate within container boundaries
    const respawnDot = (index, width, height) => {
      const margin = 80;
      const rx = margin + Math.random() * (width - margin * 2);
      const ry = margin + Math.random() * (height - margin * 2);
      dotsData.current[index] = { x: rx, y: ry, active: true };
      
      const dotEl = dotsRef.current[index];
      if (dotEl) {
        dotEl.style.transform = `translate3d(${rx - 8}px, ${ry - 8}px, 0) scale(0)`;
        // Animate pop-in
        setTimeout(() => {
          dotEl.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          dotEl.style.transform = `translate3d(${rx - 8}px, ${ry - 8}px, 0) scale(1)`;
          // Clear transition style so RAF updates don't lag
          setTimeout(() => {
            if (dotEl) dotEl.style.transition = '';
          }, 300);
        }, 100);
      }
    };

    const loop = () => {
      if (!containerRef.current) {
        rId = requestAnimationFrame(loop);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // 1. UPDATE PACMAN (Chases cursor)
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;
      const px = pacmanPos.current.x;
      const py = pacmanPos.current.y;

      const dx = targetX - px;
      const dy = targetY - py;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let nextPX = px;
      let nextPY = py;
      let angle = pacmanPos.current.rotate;

      if (dist > 15) {
        // Organic easing speed - lags slightly behind cursor
        const ease = 0.055; 
        nextPX = px + dx * ease;
        nextPY = py + dy * ease;
        
        // Clamp to screen boundaries
        nextPX = Math.max(40, Math.min(width - 40, nextPX));
        nextPY = Math.max(40, Math.min(height - 40, nextPY));

        // Calculate rotation angle in degrees
        angle = Math.atan2(nextPY - py, nextPX - px) * 180 / Math.PI;
        pacmanPos.current = { x: nextPX, y: nextPY, rotate: angle };
      }

      if (pacmanRef.current) {
        pacmanRef.current.style.transform = `translate3d(${nextPX - 32}px, ${nextPY - 32}px, 0) rotate(${angle}deg)`;
      }

      // 2. UPDATE GHOST (Chases Pacman)
      const gx = ghostPos.current.x;
      const gy = ghostPos.current.y;
      const gDx = nextPX - gx;
      const gDy = nextPY - gy;
      const gDist = Math.sqrt(gDx * gDx + gDy * gDy);

      let nextGX = gx;
      let nextGY = gy;

      if (gDist > 45) {
        // Slower ease so Pacman leads the chase
        const gEase = 0.035;
        nextGX = gx + gDx * gEase;
        nextGY = gy + gDy * gEase;
        
        nextGX = Math.max(30, Math.min(width - 30, nextGX));
        nextGY = Math.max(30, Math.min(height - 30, nextGY));
        
        ghostPos.current = { x: nextGX, y: nextGY };
      }

      if (ghostRef.current) {
        ghostRef.current.style.transform = `translate3d(${nextGX - 24}px, ${nextGY - 24}px, 0)`;
        
        // Flip ghost eyes based on relative direction to Pacman
        const eyesEl = ghostRef.current.querySelector('.ghost-pupils');
        if (eyesEl) {
          const lookX = gDx > 0 ? '1.5px' : '-1.5px';
          eyesEl.style.transform = `translate3d(${lookX}, 0, 0)`;
        }
      }

      // 3. COLLISION DETECTION (Pacman eating dots)
      dotsData.current.forEach((dot, idx) => {
        if (!dot.active) return;
        
        const dotDx = nextPX - dot.x;
        const dotDy = nextPY - dot.y;
        const dotDist = Math.sqrt(dotDx * dotDx + dotDy * dotDy);
        
        // Inside Pacman's mouth radius (approx 32px)
        if (dotDist < 34) {
          dot.active = false;
          const dotEl = dotsRef.current[idx];
          if (dotEl) {
            // Scale down to 0
            dotEl.style.transition = 'transform 0.15s ease-out';
            dotEl.style.transform = `translate3d(${dot.x - 8}px, ${dot.y - 8}px, 0) scale(0)`;
            
            // Respawn after 2 seconds
            setTimeout(() => {
              respawnDot(idx, width, height);
            }, 2000);
          }
        }
      });

      rId = requestAnimationFrame(loop);
    };

    rId = requestAnimationFrame(loop);

    // Initial positioning of dots
    setTimeout(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        dotsData.current.forEach((_, idx) => {
          respawnDot(idx, rect.width, rect.height);
        });
      }
    }, 100);

    return () => cancelAnimationFrame(rId);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none"
    >
      {/* Food Dots */}
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          ref={el => dotsRef.current[idx] = el}
          className="absolute w-4 h-4 bg-comic-red border-2 border-comic-black rounded-full shadow-[2px_2px_0px_#000] z-10"
          style={{ 
            left: 0, 
            top: 0,
            transform: 'translate3d(-100px, -100px, 0) scale(0)'
          }}
        />
      ))}

      {/* Pac-Man Character */}
      <div
        ref={pacmanRef}
        className="absolute w-16 h-16 z-20"
        style={{ 
          left: 0, 
          top: 0,
          transform: 'translate3d(100px, 150px, 0)'
        }}
      >
        {/* Pac-Man Jaws with Chomp Animations */}
        <div className="relative w-full h-full select-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
          {/* Top Jaw */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-comic-yellow border-t-4 border-x-4 border-comic-black rounded-t-full"
            style={{ transformOrigin: 'bottom center' }}
            animate={{ rotate: [-38, 0, -38] }}
            transition={{ repeat: Infinity, duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Eye */}
            <div className="absolute bottom-2 right-4.5 w-2.5 h-2.5 bg-comic-black rounded-full" />
          </motion.div>
          
          {/* Bottom Jaw */}
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-1/2 bg-comic-yellow border-b-4 border-x-4 border-comic-black rounded-b-full"
            style={{ transformOrigin: 'top center' }}
            animate={{ rotate: [38, 0, 38] }}
            transition={{ repeat: Infinity, duration: 0.3, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Chasing Ghost */}
      <div
        ref={ghostRef}
        className="absolute w-12 h-12 z-15"
        style={{ 
          left: 0, 
          top: 0,
          transform: 'translate3d(50px, 50px, 0)'
        }}
      >
        <svg className="w-full h-full drop-shadow-[3px_3px_0px_#000]" viewBox="0 0 24 24" fill="none">
          <path 
            d="M 2,12 C 2,5 5,2 12,2 C 19,2 22,5 22,12 L 22,22 L 19,19 L 16,22 L 12,19 L 8,22 L 5,19 L 2,22 Z" 
            fill="#FF4400" // Neon Blinky Red
            stroke="black" 
            strokeWidth="2.5" 
            strokeLinejoin="round"
          />
          {/* Eyes */}
          <circle cx="8" cy="10" r="3" fill="white" stroke="black" strokeWidth="1" />
          <circle cx="16" cy="10" r="3" fill="white" stroke="black" strokeWidth="1" />
          {/* Pupils */}
          <g className="ghost-pupils transition-transform duration-75">
            <circle cx="8" cy="10" r="1.5" fill="blue" />
            <circle cx="16" cy="10" r="1.5" fill="blue" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default PacmanBackground;
