import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Enhanced Cursor-Following Pac-Man Background
 * Smooth rotation turn towards cursor, fluid movement physics, expressive eyes,
 * pop eating crumb particles, and responsive ghost AI.
 */
const PacmanBackground = () => {
  const containerRef = useRef(null);
  const pacmanRef = useRef(null);
  const ghostRef = useRef(null);
  const dotsRef = useRef([]);

  // Store coordinates in refs to update outside React render cycles (60fps performance)
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pacmanPos = useRef({ x: 120, y: 180, rotate: 0 });
  const ghostPos = useRef({ x: 50, y: 80 });
  const [crumbs, setCrumbs] = useState([]);

  // Track 6 food dots coordinates & their status
  const dotsData = useRef([
    { x: 200, y: 180, active: true },
    { x: 450, y: 320, active: true },
    { x: 650, y: 140, active: true },
    { x: 850, y: 380, active: true },
    { x: 320, y: 480, active: true },
    { x: 720, y: 420, active: true }
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
    
    // Reposition dot to a random coordinate outside the central text box
    const respawnDot = (index, width, height) => {
      const margin = 60;
      let rx, ry;
      let attempts = 0;

      do {
        rx = margin + Math.random() * (width - margin * 2);
        ry = margin + Math.random() * (height - margin * 2);
        attempts++;

        const inTextX = rx > width * 0.18 && rx < width * 0.82;
        const inTextY = ry > height * 0.20 && ry < height * 0.80;

        if (!inTextX || !inTextY) {
          break; // Found coordinate outside central text zone!
        }
      } while (attempts < 30);

      dotsData.current[index] = { x: rx, y: ry, active: true };
      
      const dotEl = dotsRef.current[index];
      if (dotEl) {
        dotEl.style.transform = `translate3d(${rx - 8}px, ${ry - 8}px, 0) scale(0)`;
        setTimeout(() => {
          if (dotEl) {
            dotEl.style.transition = 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            dotEl.style.transform = `translate3d(${rx - 8}px, ${ry - 8}px, 0) scale(1)`;
            setTimeout(() => {
              if (dotEl) dotEl.style.transition = '';
            }, 350);
          }
        }, 120);
      }
    };

    const triggerCrumbEffect = (x, y) => {
      const newCrumbs = Array.from({ length: 4 }).map((_, i) => ({
        id: `${Date.now()}-${i}-${Math.random()}`,
        x,
        y,
        dx: (Math.random() - 0.5) * 32,
        dy: (Math.random() - 0.5) * 32,
        color: i % 2 === 0 ? '#FF4400' : '#FFC800',
      }));

      setCrumbs(prev => [...prev.slice(-12), ...newCrumbs]);
      setTimeout(() => {
        setCrumbs(prev => prev.filter(c => !newCrumbs.includes(c)));
      }, 600);
    };

    const loop = () => {
      if (!containerRef.current) {
        rId = requestAnimationFrame(loop);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // 1. UPDATE PACMAN (Chases cursor with smooth rotation & fluid inertia)
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;
      const px = pacmanPos.current.x;
      const py = pacmanPos.current.y;

      const dx = targetX - px;
      const dy = targetY - py;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let nextPX = px;
      let nextPY = py;
      let currentAngle = pacmanPos.current.rotate;

      if (dist > 10) {
        // Fluid easing speed
        const ease = 0.075; 
        nextPX = px + dx * ease;
        nextPY = py + dy * ease;
        
        // Clamp inside boundaries
        nextPX = Math.max(35, Math.min(width - 35, nextPX));
        nextPY = Math.max(35, Math.min(height - 35, nextPY));

        // Smooth angle rotation turn toward cursor
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        let angleDiff = targetAngle - currentAngle;
        while (angleDiff < -180) angleDiff += 360;
        while (angleDiff > 180) angleDiff -= 360;
        
        currentAngle += angleDiff * 0.15;
        pacmanPos.current = { x: nextPX, y: nextPY, rotate: currentAngle };
      }

      if (pacmanRef.current) {
        pacmanRef.current.style.transform = `translate3d(${nextPX - 32}px, ${nextPY - 32}px, 0) rotate(${currentAngle}deg)`;
      }

      // 2. UPDATE GHOST (Chases Pacman playfully)
      const gx = ghostPos.current.x;
      const gy = ghostPos.current.y;
      const gDx = nextPX - gx;
      const gDy = nextPY - gy;
      const gDist = Math.sqrt(gDx * gDx + gDy * gDy);

      let nextGX = gx;
      let nextGY = gy;

      if (gDist > 40) {
        const gEase = 0.045;
        nextGX = gx + gDx * gEase;
        nextGY = gy + gDy * gEase;
        
        nextGX = Math.max(25, Math.min(width - 25, nextGX));
        nextGY = Math.max(25, Math.min(height - 25, nextGY));
        
        ghostPos.current = { x: nextGX, y: nextGY };
      }

      if (ghostRef.current) {
        ghostRef.current.style.transform = `translate3d(${nextGX - 24}px, ${nextGY - 24}px, 0)`;
        
        const eyesEl = ghostRef.current.querySelector('.ghost-pupils');
        if (eyesEl) {
          const lookX = gDx > 0 ? '2px' : '-2px';
          const lookY = gDy > 0 ? '2px' : '-2px';
          eyesEl.style.transform = `translate3d(${lookX}, ${lookY}, 0)`;
        }
      }

      // 3. COLLISION DETECTION (Pacman eating food dots)
      dotsData.current.forEach((dot, idx) => {
        if (!dot.active) return;
        
        const dotDx = nextPX - dot.x;
        const dotDy = nextPY - dot.y;
        const dotDist = Math.sqrt(dotDx * dotDx + dotDy * dotDy);
        
        if (dotDist < 36) {
          dot.active = false;
          triggerCrumbEffect(dot.x, dot.y);

          const dotEl = dotsRef.current[idx];
          if (dotEl) {
            dotEl.style.transition = 'transform 0.15s ease-out';
            dotEl.style.transform = `translate3d(${dot.x - 8}px, ${dot.y - 8}px, 0) scale(0)`;
            
            setTimeout(() => {
              respawnDot(idx, width, height);
            }, 1800);
          }
        }
      });

      rId = requestAnimationFrame(loop);
    };

    rId = requestAnimationFrame(loop);

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
        >
          {/* Shiny Dot Highlight */}
          <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-80" />
        </div>
      ))}

      {/* Eating Crumb Pop Particles */}
      <AnimatePresence>
        {crumbs.map((crumb) => (
          <motion.div
            key={crumb.id}
            initial={{ opacity: 1, scale: 1, x: crumb.x, y: crumb.y }}
            animate={{ 
              opacity: 0, 
              scale: 0,
              x: crumb.x + crumb.dx, 
              y: crumb.y + crumb.dy 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute w-2 h-2 rounded-full border border-black z-20 pointer-events-none"
            style={{ backgroundColor: crumb.color }}
          />
        ))}
      </AnimatePresence>

      {/* High-Quality SVG Pac-Man Character */}
      <div
        ref={pacmanRef}
        className="absolute w-16 h-16 z-20"
        style={{ 
          left: 0, 
          top: 0,
          transform: 'translate3d(100px, 150px, 0)'
        }}
      >
        <div className="relative w-full h-full select-none drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          {/* Top Jaw */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-comic-yellow border-t-4 border-x-4 border-comic-black rounded-t-full overflow-hidden"
            style={{ transformOrigin: 'bottom center' }}
            animate={{ rotate: [-40, 0, -40] }}
            transition={{ repeat: Infinity, duration: 0.48, ease: 'easeInOut' }}
          >
            {/* Expressive Eye with Pupil & Shine */}
            <div className="absolute bottom-1.5 right-4 w-3.5 h-3.5 bg-white border-2 border-comic-black rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-comic-black rounded-full relative">
                <div className="absolute top-0 left-0 w-0.5 h-0.5 bg-white rounded-full" />
              </div>
            </div>
          </motion.div>
          
          {/* Bottom Jaw */}
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-1/2 bg-comic-yellow border-b-4 border-x-4 border-comic-black rounded-b-full"
            style={{ transformOrigin: 'top center' }}
            animate={{ rotate: [40, 0, 40] }}
            transition={{ repeat: Infinity, duration: 0.48, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Chasing Ghost Character (Blinky) */}
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
            fill="#FF4400"
            stroke="black" 
            strokeWidth="2.5" 
            strokeLinejoin="round"
          />
          {/* Eyes */}
          <circle cx="8" cy="9" r="3" fill="white" stroke="black" strokeWidth="1" />
          <circle cx="16" cy="9" r="3" fill="white" stroke="black" strokeWidth="1" />
          {/* Pupils */}
          <g className="ghost-pupils transition-transform duration-75">
            <circle cx="8" cy="9" r="1.5" fill="#0000FF" />
            <circle cx="16" cy="9" r="1.5" fill="#0000FF" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default PacmanBackground;
