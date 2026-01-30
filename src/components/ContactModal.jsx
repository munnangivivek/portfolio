import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';

const ContactModal = ({ isOpen, onClose }) => {
    const [copied, setCopied] = useState(false);
    const email = "munnangivivek369@gmail.com";
    const linkedinUrl = "https://www.linkedin.com/in/vivek-munnangi";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">

                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.8, opacity: 0, rotate: 2 }}
                        className="relative w-full max-w-lg bg-comic-white border-4 border-black rounded-3xl p-8 comic-shadow z-10"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute -top-4 -right-4 bg-comic-red text-white border-2 border-black rounded-full p-2 hover:scale-110 transition-transform shadow-[2px_2px_0px_0px_#000]"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center">
                            <h2 className="text-4xl font-comic text-comic-black mb-2">LET'S CHAT!</h2>
                            <p className="text-lg font-body font-bold text-comic-black/70 mb-8">
                                Tell me something, I wont bite you.
                            </p>

                            {/* Email Section */}
                            <div className="mb-6">
                                <label className="block text-left font-comic text-sm mb-2 ml-1">EMAIL ME AT:</label>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-gray-100 border-2 border-black rounded-xl p-3 font-mono text-sm md:text-base truncate">
                                        {email}
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className={`p-3 rounded-xl border-2 border-black transition-all ${copied
                                            ? 'bg-comic-green text-black shadow-[2px_2px_0px_0px_#000] translate-x-[1px] translate-y-[1px]'
                                            : 'bg-comic-yellow hover:bg-yellow-300 hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1'
                                            }`}
                                        title="Copy Email"
                                    >
                                        {copied ? <Check size={20} /> : <Copy size={20} />}
                                    </button>
                                </div>
                                {copied && (
                                    <p className="text-comic-green font-bold text-sm mt-2 text-right">
                                        Copied to clipboard! ✅
                                    </p>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="relative flex items-center py-4">
                                <div className="flex-grow border-t-2 border-black/10"></div>
                                <span className="flex-shrink-0 mx-4 font-comic text-gray-400">OR</span>
                                <div className="flex-grow border-t-2 border-black/10"></div>
                            </div>

                            {/* LinkedIn Section */}
                            <a
                                href={linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full bg-[#0077b5] text-white font-comic text-xl py-4 rounded-xl border-4 border-black hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all group"
                            >
                                <Linkedin className="group-hover:scale-110 transition-transform" />
                                CONNECT ON LINKEDIN
                            </a>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
