import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import ContactModal from './ContactModal';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Experience', href: '#experience' },
        { name: 'Work', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6`}
            >
                <div
                    className={`container flex items-center justify-between px-6 mx-auto transition-all duration-300 ${scrolled ? 'max-w-4xl' : 'max-w-6xl'}`}
                >
                    <div className={`w-full flex items-center justify-between bg-comic-white border-2 border-comic-black rounded-full px-6 py-3 comic-shadow ${mobileMenuOpen ? 'rounded-b-none' : ''}`}>

                        <a href="#" className="text-2xl font-comic text-comic-black hover:scale-105 transition-transform tracking-wider">
                            VIVEK.
                        </a>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    // Changed hover from color-blue to simple thick underline to fit 'art interest'
                                    className="text-lg font-bold font-body text-comic-black hover:underline decoration-4 underline-offset-4 transition-all relative group"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <motion.button
                                initial="initial"
                                whileHover="hover"
                                onClick={() => setIsContactOpen(true)}
                                className="relative px-6 py-2 text-base font-comic tracking-wider text-comic-black bg-comic-green border-2 border-comic-black rounded-full comic-shadow hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_#000] transition-all overflow-visible group"
                            >
                                <span className="relative z-10">LET'S TALK</span>

                                {/* Sparkles */}
                                <motion.span
                                    variants={{
                                        initial: { opacity: 0, scale: 0 },
                                        hover: {
                                            opacity: [0, 1, 0],
                                            x: -20,
                                            y: -20,
                                            scale: [0, 1.2, 0],
                                            rotate: -45,
                                            transition: { duration: 0.6, repeat: Infinity, repeatDelay: 0.1 }
                                        }
                                    }}
                                    className="absolute top-0 left-0 text-xl pointer-events-none"
                                >
                                    ✨
                                </motion.span>
                                <motion.span
                                    variants={{
                                        initial: { opacity: 0, scale: 0 },
                                        hover: {
                                            opacity: [0, 1, 0],
                                            x: 20,
                                            y: -20,
                                            scale: [0, 1.2, 0],
                                            rotate: 45,
                                            transition: { duration: 0.6, delay: 0.2, repeat: Infinity, repeatDelay: 0.1 }
                                        }
                                    }}
                                    className="absolute top-0 right-0 text-xl pointer-events-none"
                                >
                                    ✨
                                </motion.span>
                                <motion.span
                                    variants={{
                                        initial: { opacity: 0, scale: 0 },
                                        hover: {
                                            opacity: [0, 1, 0],
                                            x: 0,
                                            y: -25,
                                            scale: [0, 1.2, 0],
                                            transition: { duration: 0.6, delay: 0.1, repeat: Infinity, repeatDelay: 0.1 }
                                        }
                                    }}
                                    className="absolute -top-4 left-1/2 -translate-x-1/2 text-lg pointer-events-none"
                                >
                                    ✨
                                </motion.span>
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-comic-black">
                                {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="container mx-auto px-6 md:hidden max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-comic-white border-x-2 border-b-2 border-comic-black rounded-b-3xl p-6 comic-shadow mx-auto"
                            style={{ marginTop: '-4px', width: '100%' }}
                        >
                            <div className="flex flex-col space-y-4 text-center">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-xl font-body font-bold text-comic-black hover:text-comic-blue"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </motion.nav>
        </>
    );
};

export default Navbar;
