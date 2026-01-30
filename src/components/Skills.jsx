import { motion } from 'framer-motion';

const Skills = () => {
    const categories = [
        {
            title: "Frontend",
            color: "bg-comic-blue",
            skills: ["React", "TypeScript", "TailwindCSS", "Next.js", "Framer Motion"]
        },
        {
            title: "Backend",
            color: "bg-comic-green",
            skills: ["Node.js", "Express", "PostgreSQL", "Supabase", "Python"]
        },
        {
            title: "Design",
            color: "bg-comic-red",
            skills: ["Figma", "UI/UX", "Prototyping", "Adobe Suite", "Blender"]
        }
    ];

    return (
        <section id="skills" className="min-h-screen flex flex-col justify-center py-24 bg-comic-yellow overflow-hidden snap-start">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-comic text-comic-black mb-6 drop-shadow-white">
                        THE <span className="text-comic-white text-outline">ARSENAL</span>
                    </h2>
                    <p className="text-xl font-bold font-body text-comic-black/70">
                        The tools I use to build independent worlds.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className={`${cat.color} p-8 border-4 border-comic-black comic-shadow-lg rounded-[2rem] relative`}
                        >
                            <h3 className="text-3xl font-comic text-comic-black mb-8 text-center bg-comic-white border-2 border-comic-black rounded-xl py-2 comic-shadow transform -rotate-2 inline-block w-full">{cat.title}</h3>

                            <div className="flex flex-wrap justify-center gap-3">
                                {cat.skills.map((skill, i) => (
                                    <span key={i} className="bg-comic-white px-4 py-2 border-2 border-comic-black rounded-full font-bold font-body text-comic-black text-base hover:scale-110 transiton-transform cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
