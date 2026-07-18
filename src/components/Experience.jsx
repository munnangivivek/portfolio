import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Users, Crown, ClipboardList } from 'lucide-react';
import ComicCard from './ui/ComicCard';

const Experience = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20
  });

  const experiences = [
    {
      icon: <Crown className="w-6 h-6 text-comic-black" />,
      role: "Club Manager",
      org: "NIAT Influencers Club",
      period: "Present",
      desc: "Leading the pack, organizing events, and keeping the energy high.",
      color: "bg-comic-yellow"
    },
    {
      icon: <Users className="w-6 h-6 text-comic-black" />,
      role: "Community Member",
      org: "Student Tribe & Design Tribe",
      period: "Active",
      desc: "Networking, learning, and contributing to the design ecosystem.",
      color: "bg-comic-blue"
    },
    {
      icon: <ClipboardList className="w-6 h-6 text-comic-black" />,
      role: "Researcher",
      org: "Freelance / Various",
      period: "Project-based",
      desc: "Crafted deep-dive questionnaires & Google Forms for multiple companies to unlock user insights.",
      color: "bg-comic-red"
    }
  ];

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center py-24 bg-comic-green overflow-hidden snap-start border-b-4 border-comic-black relative"
    >
      <div className="container px-4 mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-comic text-comic-black mb-6 drop-shadow-white">
            THE <span className="text-comic-white text-outline">JOURNEY</span>
          </h2>
          <p className="text-xl font-bold font-body text-comic-black/80 max-w-2xl mx-auto">
            Leveling up, one role at a time.
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Static background dotted line */}
          <div className="absolute left-[36px] md:left-1/2 -translate-x-1/2 top-8 bottom-8 w-1 border-l-4 border-dashed border-black/25 z-0" />
          
          {/* Animated solid line on scroll */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-[36px] md:left-1/2 -translate-x-1/2 top-8 bottom-8 w-2 bg-comic-black origin-top rounded-full z-0"
          />

          <div className="flex flex-col gap-12 md:gap-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index} 
                  className="relative flex flex-col md:flex-row items-center justify-between"
                >
                  {/* Left Column (Desktop card or empty) */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'order-2 md:order-1' : 'hidden md:block md:order-1'}`}>
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 80, damping: 15 }}
                      >
                        <ComicCard color={exp.color} tilt={-1}>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-comic text-comic-black uppercase">{exp.role}</h3>
                            <span className="bg-comic-black text-comic-white px-3 py-1 font-bold font-body rounded-full text-xs transform -rotate-2">
                              {exp.period}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold font-body text-comic-black/70 mb-3">{exp.org}</h4>
                          <p className="font-bold font-body text-comic-black text-base leading-relaxed">
                            {exp.desc}
                          </p>
                        </ComicCard>
                      </motion.div>
                    )}
                  </div>

                  {/* Central Dot */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.1 }}
                    className="absolute left-[8px] md:left-1/2 md:-translate-x-1/2 w-14 h-14 bg-comic-white border-4 border-comic-black rounded-full z-20 shadow-[3px_3px_0px_#000] flex items-center justify-center top-1/2 -translate-y-1/2"
                  >
                    {exp.icon}
                  </motion.div>

                  {/* Right Column (Desktop card or empty) */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${!isEven ? 'order-2' : 'hidden md:block md:order-3'}`}>
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 80, damping: 15 }}
                      >
                        <ComicCard color={exp.color} tilt={1}>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-comic text-comic-black uppercase">{exp.role}</h3>
                            <span className="bg-comic-black text-comic-white px-3 py-1 font-bold font-body rounded-full text-xs transform rotate-2">
                              {exp.period}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold font-body text-comic-black/70 mb-3">{exp.org}</h4>
                          <p className="font-bold font-body text-comic-black text-base leading-relaxed">
                            {exp.desc}
                          </p>
                        </ComicCard>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
