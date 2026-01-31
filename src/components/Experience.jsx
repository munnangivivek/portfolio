import { motion } from 'framer-motion';
import { Users, Crown, ClipboardList } from 'lucide-react';

const Experience = () => {
    const experiences = [
        {
            icon: <Crown className="w-8 h-8 text-comic-black" />,
            role: "Club Manager",
            org: "NIAT Influencers Club",
            period: "Present",
            desc: "Leading the pack, organizing events, and keeping the energy high.",
            color: "bg-comic-yellow"
        },
        {
            icon: <Users className="w-8 h-8 text-comic-black" />,
            role: "Community Member",
            org: "Student Tribe & Design Tribe",
            period: "Active",
            desc: "Networking, learning, and contributing to the design ecosystem.",
            color: "bg-comic-blue"
        },
        {
            icon: <ClipboardList className="w-8 h-8 text-comic-black" />,
            role: "Researcher",
            org: "Freelance / Various",
            period: "Project-based",
            desc: "Crafted deep-dive questionnaires & Google Forms for multiple companies to unlock user insights.",
            color: "bg-comic-red"
        }
    ];

    return (
        <section id="experience" className="min-h-screen flex flex-col justify-center py-24 bg-comic-green overflow-hidden snap-start border-b-4 border-comic-black">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-comic text-comic-black mb-6 drop-shadow-white">
                        THE <span className="text-comic-white text-outline">JOURNEY</span>
                    </h2>
                    <p className="text-xl font-bold font-body text-comic-black/80 max-w-2xl mx-auto">
                        Leveling up, one role at a time.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto flex flex-col gap-8">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className={`${exp.color} p-6 md:p-8 border-4 border-comic-black comic-shadow-lg rounded-[2rem] relative flex flex-col md:flex-row items-center md:items-start gap-6`}
                        >
                            <div className="bg-comic-white p-4 border-2 border-comic-black rounded-full comic-shadow shrink-0">
                                {exp.icon}
                            </div>

                            <div className="text-center md:text-left flex-1">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                                    <h3 className="text-2xl font-comic text-comic-black uppercase">{exp.role}</h3>
                                    <span className="bg-comic-black text-comic-white px-3 py-1 font-bold font-body rounded-full text-sm inline-block mx-auto md:mx-0 mt-2 md:mt-0 transform -rotate-2">
                                        {exp.period}
                                    </span>
                                </div>
                                <h4 className="text-xl font-bold font-body text-comic-black/80 mb-3">{exp.org}</h4>
                                <p className="font-bold font-body text-comic-black text-lg leading-relaxed">
                                    {exp.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
