import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import ContactModal from './ContactModal';
import ComicButton from './ui/ComicButton';

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
                                    className="text-lg font-bold font-body text-comic-black hover:underline decoration-4 underline-offset-4 transition-all relative group"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <ComicButton
                                variant="green"
                                sparkles={true}
                                onClick={() => setIsContactOpen(true)}
                                className="!py-2 !px-6 text-base !rounded-full !border-2 overflow-visible"
                            >
                                LET'S TALK
                            </ComicButton>
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
