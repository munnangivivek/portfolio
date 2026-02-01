import { motion } from 'framer-motion';
import { ArrowDown, Download, ArrowRight } from 'lucide-react';
import InteractiveFace from './InteractiveFace';

const Hero = () => {
    return (
        <section className="relative h-screen min-h-screen flex flex-col justify-start pt-32 pb-12 overflow-hidden snap-start bg-comic-yellow">

            {/* Abstract Lion Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Huge Mane Burst opacity-10 */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-comic-red opacity-10 rounded-full border-[20px] border-black/5 border-dashed"
                ></motion.div>

                {/* Claw Marks (Static) - Corners */}
                <div className="absolute top-40 left-10 opacity-20 transform -rotate-12">
                    <div className="w-4 h-32 bg-black rounded-full mb-2"></div>
                    <div className="w-4 h-40 bg-black rounded-full mb-2 ml-6 -mt-32"></div>
                    <div className="w-4 h-32 bg-black rounded-full ml-12 -mt-40"></div>
                </div>
            </div>

            <div className="container relative z-20 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

                    {/* LEFT COLUMN: Name & Identity (Priority #1) */}
                    <div className="text-center md:text-left order-2 md:order-1 relative z-30">

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-comic text-comic-black leading-[0.9] mb-4 drop-shadow-white relative">
                            HI, I'M <br />
                            <span className="text-comic-white text-outline relative inline-block">
                                VIVEK
                            </span>
                            <br />
                            <span className="text-comic-white text-outline relative inline-block">
                                MUNNANGI
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl font-bold font-body text-comic-black/80 max-w-lg mx-auto md:mx-0 mb-6">
                            I create digital experiences that are impactful, fun and impossible to ignore.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                            <a href="#projects" className="flex items-center gap-2 bg-comic-black text-comic-white text-lg md:text-xl font-comic py-3 px-8 rounded-xl border-4 border-transparent hover:bg-comic-white hover:text-comic-black hover:border-comic-black transition-all comic-shadow justify-center">
                                SEE MY WORK <ArrowRight size={24} />
                            </a>
                            <a href="/resume.pdf" download className="flex items-center gap-2 bg-comic-blue text-comic-black text-lg md:text-xl font-comic py-3 px-8 rounded-xl border-4 border-comic-black hover:shadow-[0px_0px_0px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] box-shadow-comic transition-all justify-center">
                                DOWNLOAD RESUME <Download size={24} />
                            </a>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Character (Compact) */}
                    <div className="relative flex justify-center order-1 md:order-2">
                        {/* Character with Speech Bubble */}
                        <div className="relative inline-block">
                            <InteractiveFace />
                            {/* Static Speech Bubble - No Animation */}
                            <div className="absolute -top-6 -right-6 md:-right-12 bg-white border-4 border-black p-4 rounded-[2rem] rounded-bl-none z-20 comic-shadow transform rotate-6">
                                <p className="font-comic text-xl text-comic-black leading-none">
                                    WELCOME TO MY PORTFOLIO!
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
            >
                <ArrowDown size={32} className="text-comic-black" />
            </motion.div>
        </section>
    );
};

export default Hero;
