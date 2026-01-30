import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: "Fintech App",
            description: "A secure banking dashboard with real-time data visualization.",
            tags: ["React", "D3.js"],
            color: "bg-comic-yellow"
        },
        {
            title: "Crypto Swap",
            description: "DeFi aggregator for swapping tokens at the best rates.",
            tags: ["Solana", "Web3"],
            color: "bg-comic-green"
        },
        {
            title: "Social Hub",
            description: "A decentralized social network for creative professionals.",
            tags: ["Next.js", "Prisma"],
            color: "bg-comic-red"
        }
    ];

    return (
        <section id="projects" className="min-h-screen flex flex-col justify-center py-24 bg-comic-blue border-t-4 border-comic-black snap-start">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-comic text-comic-black mb-6 drop-shadow-white">
                        SELECTED <span className="text-comic-white text-outline">MISSIONS</span>
                    </h2>
                </motion.div>

                <div className="space-y-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-comic-white border-4 border-comic-black comic-shadow-lg rounded-[2rem] overflow-hidden hover:translate-y-[-4px] transition-transform"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className={`${project.color} min-h-[300px] border-b-4 md:border-b-0 md:border-r-4 border-comic-black flex items-center justify-center p-8 relative overflow-hidden group`}>
                                    {/* Placeholder for project image */}
                                    <div className="text-6xl font-comic text-comic-black opacity-20 transform group-hover:scale-110 transition-transform">{project.title.split(' ')[0]}</div>
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="p-8 flex flex-col justify-center">
                                    <h3 className="text-4xl font-comic text-comic-black mb-4 uppercase">{project.title}</h3>
                                    <p className="text-xl font-bold font-body text-comic-black/70 mb-6">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-comic-black text-comic-white font-bold rounded-lg text-sm">{tag}</span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <button className="flex-1 bg-comic-white text-comic-black font-bold font-body py-3 px-6 rounded-xl border-4 border-comic-black comic-shadow hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                            <Github size={20} /> Code
                                        </button>
                                        <button className="flex-1 bg-comic-black text-comic-white font-bold font-body py-3 px-6 rounded-xl border-4 border-comic-black comic-shadow hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                            Live Demo <ExternalLink size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
