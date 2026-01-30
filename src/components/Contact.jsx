import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Instagram, Dribbble, Globe } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch("https://formsubmit.co/ajax/munnangivivek369@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: `New Portfolio Message from ${formData.name}`,
                    _template: "table" // Makes the email look nice
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(null), 5000); // Reset after 5s
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Error sending email:", error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="min-h-screen flex flex-col justify-center py-24 bg-comic-yellow border-t-4 border-comic-black text-center snap-start">
            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-5xl md:text-7xl font-comic text-comic-black mb-8 drop-shadow-white">
                        JOIN THE <span className="text-comic-white text-outline">FAMILY</span>
                    </h2>
                    <p className="text-2xl font-bold font-body text-comic-black/80 mb-12">
                        Follow my journey, see the vibes, and check out more designs.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <a href="#" className="flex items-center justify-center gap-3 bg-[#ea4c89] text-white text-xl font-comic py-5 rounded-2xl hover:scale-105 transition-transform comic-shadow-lg border-4 border-comic-black">
                            <Dribbble size={28} /> DRIBBBLE
                        </a>
                        <a href="#" className="flex items-center justify-center gap-3 bg-[#1769ff] text-white text-xl font-comic py-5 rounded-2xl hover:scale-105 transition-transform comic-shadow-lg border-4 border-comic-black">
                            <Globe size={28} /> BEHANCE
                        </a>
                        <a href="#" className="flex items-center justify-center gap-3 bg-[#E1306C] text-white text-xl font-comic py-5 rounded-2xl hover:scale-105 transition-transform comic-shadow-lg border-4 border-comic-black">
                            <Instagram size={28} /> INSTAGRAM
                        </a>
                    </div>

                    <div className="bg-comic-white p-8 md:p-12 border-4 border-comic-black rounded-[2rem] comic-shadow-lg transform rotate-1">
                        <h3 className="text-3xl font-comic text-comic-black mb-6">SAY HELLO</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="YOUR NAME"
                                    required
                                    className="w-full bg-comic-yellow border-4 border-comic-black rounded-xl p-4 text-comic-black font-bold font-body placeholder-comic-black/50 focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-transform"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="YOUR EMAIL"
                                    required
                                    className="w-full bg-comic-yellow border-4 border-comic-black rounded-xl p-4 text-comic-black font-bold font-body placeholder-comic-black/50 focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-transform"
                                />
                            </div>
                            <textarea
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="DROP A LINK OR SAY HI..."
                                required
                                className="w-full bg-comic-yellow border-4 border-comic-black rounded-xl p-4 text-comic-black font-bold font-body placeholder-comic-black/50 focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-transform"
                            ></textarea>

                            <button
                                type="submit"
                                disabled={status === 'sending' || status === 'success'}
                                className={`w-full py-5 font-comic text-2xl border-4 border-comic-black rounded-xl comic-shadow transition-all flex items-center justify-center gap-2 ${status === 'success' ? 'bg-comic-green text-comic-black pointer-events-none' :
                                        status === 'sending' ? 'bg-gray-300 text-gray-600 pointer-events-none' :
                                            'bg-comic-green text-comic-black hover:shadow-[0px_0px_0px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px]'
                                    }`}
                            >
                                {status === 'sending' ? 'SENDING...' :
                                    status === 'success' ? 'MESSAGE SENT! ✅' :
                                        status === 'error' ? 'TRY AGAIN ❌' :
                                            <>SEND IT <Send size={24} /></>}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
