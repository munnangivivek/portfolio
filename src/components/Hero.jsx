import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import PacmanBackground from './PacmanBackground';

const Hero = () => {
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: custom * 0.1
            }
        })
    };

    const linkVariants = {
        initial: { scale: 1, x: 0, y: 0, boxShadow: '4px 4px 0px 0px #000000' },
        hover: { scale: 1.02, x: -2, y: -2, boxShadow: '6px 6px 0px 0px #000000' },
        tap: { scale: 0.98, x: 2, y: 2, boxShadow: '2px 2px 0px 0px #000000' }
    };

    return (
        <section className="relative h-screen min-h-screen flex items-center justify-center overflow-hidden snap-start bg-comic-yellow pt-20">

            {/* Retro Game Pac-Man Background */}
            <PacmanBackground />

            {/* Abstract Lion Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Huge Mane Burst opacity-10 (Static) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-comic-red opacity-10 rounded-full border-[20px] border-black/5 border-dashed" />

                {/* Claw Marks (Static) - Corners */}
                <div className="absolute top-40 left-10 opacity-20 transform -rotate-12">
                    <div className="w-4 h-32 bg-black rounded-full mb-2"></div>
                    <div className="w-4 h-40 bg-black rounded-full mb-2 ml-6 -mt-32"></div>
                    <div className="w-4 h-32 bg-black rounded-full ml-12 -mt-40"></div>
                </div>
            </div>

            <div className="container relative z-20 px-4 flex justify-center">
                {/* Name & Identity Centered */}
                <div className="text-center max-w-4xl relative z-30 flex flex-col items-center">

                     <motion.h1 
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        className="text-5xl sm:text-7xl lg:text-8xl font-comic text-comic-black leading-[0.95] mb-6 drop-shadow-white relative uppercase tracking-wider"
                    >
                        HI, I'M <br />
                        <span className="text-comic-white text-outline relative inline-block mt-2">
                            VIVEK MUNNANGI
                        </span>
                    </motion.h1>

                    <motion.p 
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        className="text-2xl sm:text-3xl font-bold font-body text-comic-black/90 max-w-3xl mb-8 leading-relaxed"
                    >
                        I 
                        <span className="relative inline-block mx-2 text-comic-red select-none">
                            play with
                            <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-[110%] -ml-[5%] h-4 pointer-events-none" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <motion.path 
                                    d="M 0,5 Q 25,2 50,5 Q 75,8 100,5" 
                                    stroke="currentColor" 
                                    strokeWidth="4" 
                                    strokeLinecap="round"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: 1.4, duration: 0.4, ease: "easeOut" }}
                                />
                            </svg>
                        </span>
                        create stuff in the digital world that is impossible to ignore.
                    </motion.p>

                    <motion.div 
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        custom={3}
                        className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
                    >
                        <motion.a 
                            href="#projects" 
                            variants={linkVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            className="flex items-center gap-2 bg-comic-black text-comic-white text-lg sm:text-xl font-comic py-4 px-10 rounded-xl border-4 border-comic-black justify-center select-none"
                        >
                            SEE MY WORK <ArrowRight size={24} />
                        </motion.a>
                        <motion.a 
                            href="/resume.pdf" 
                            download 
                            variants={linkVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            className="flex items-center gap-2 bg-comic-blue text-comic-black text-lg sm:text-xl font-comic py-4 px-10 rounded-xl border-4 border-comic-black justify-center select-none"
                        >
                            DOWNLOAD RESUME <Download size={24} />
                        </motion.a>
                    </motion.div>
                </div>
            </div>

        </section>
    );
};

export default Hero;

