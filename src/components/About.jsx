import { motion } from 'framer-motion';
import { Palette, Code, Rocket } from 'lucide-react';

const About = () => {
    const cards = [
        {
            icon: <Palette className="w-10 h-10 text-comic-black" />,
            title: "Designer",
            desc: "Crafting beautiful, trendy interfaces that stick in people's minds."
        },
        {
            icon: <Code className="w-10 h-10 text-comic-black" />,
            title: "Coder",
            desc: "Turning wild ideas into clean, efficient, and scalable reality and also a Vibe coder."
        },
        {
            icon: <Rocket className="w-10 h-10 text-comic-black" />,
            title: "Entrepreneur",
            desc: "Building value and solving problems not only mine but also others."
        }
    ];

    return (
        <section id="about" className="min-h-screen flex flex-col justify-center py-24 bg-comic-blue border-y-4 border-comic-black snap-start">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-comic text-comic-black mb-6 drop-shadow-white">
                        WHO IS <span className="text-comic-white text-outline">VIVEK?</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-2xl font-bold font-body text-comic-black/80">
                        I'm not just a designer. I'm a builder who bridges the gap between design and logic.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-comic-yellow p-8 border-4 border-comic-black comic-shadow-lg rounded-[2rem] hover:transform hover:-translate-y-2 transition-transform"
                        >
                            <div className="mb-6 p-4 rounded-full bg-comic-white border-2 border-comic-black w-fit comic-shadow">
                                {card.icon}
                            </div>
                            <h3 className="text-3xl font-comic text-comic-black mb-4 uppercase">{card.title}</h3>
                            <p className="text-comic-black font-bold font-body text-lg leading-relaxed">
                                {card.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
