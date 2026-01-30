import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const InteractiveFace = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            // Calculate percentage across screen (-1 to 1 range)
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = (event.clientY / window.innerHeight) * 2 - 1;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Eye movement range (in pixels)
    const range = 15;
    const pupilX = mousePos.x * range;
    const pupilY = mousePos.y * range;

    return (
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
            {/* Simple Circle Head */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                className="w-full h-full relative"
            >
                {/* Main Circle Body (Yellow) */}
                <div className="absolute inset-0 bg-comic-yellow border-4 border-black rounded-full overflow-hidden comic-shadow z-10 flex flex-col items-center justify-center">

                    {/* Eyes Container */}
                    <div className="flex gap-4 mb-4">
                        {/* Left Eye */}
                        <div className="w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center relative overflow-hidden">
                            <motion.div
                                className="w-6 h-6 bg-black rounded-full"
                                animate={{ x: pupilX, y: pupilY }}
                                transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                            />
                        </div>
                        {/* Right Eye */}
                        <div className="w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center relative overflow-hidden">
                            <motion.div
                                className="w-6 h-6 bg-black rounded-full"
                                animate={{ x: pupilX, y: pupilY }}
                                transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                            />
                        </div>
                    </div>

                    {/* Simple Smile */}
                    <div className="w-12 h-6 border-b-4 border-black rounded-b-full"></div>

                </div>
            </motion.div>

            {/* Decoration: Sparkles */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 text-4xl"
            >
                ✨
            </motion.div>
        </div>
    );
};

export default InteractiveFace;
