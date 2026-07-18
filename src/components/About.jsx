import { motion } from 'framer-motion';
import { Palette, Code, Rocket } from 'lucide-react';
import ComicCard from './ui/ComicCard';

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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-24 bg-comic-blue border-y-4 border-comic-black snap-start">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-comic text-comic-black mb-6 drop-shadow-white">
            WHO IS <span className="text-comic-white text-outline">VIVEK?</span>
          </h2>
          <p className="max-w-2xl mx-auto text-2xl font-bold font-body text-comic-black/80">
            I'm not just a designer. I'm a builder who bridges the gap between design and logic.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ComicCard
                color="bg-comic-yellow"
                tilt={index % 2 === 0 ? -1 : 1}
                className="h-full flex flex-col items-start"
              >
                <div className="mb-6 p-4 rounded-full bg-comic-white border-2 border-comic-black w-fit shadow-[3px_3px_0px_0px_#000]">
                  {card.icon}
                </div>
                <h3 className="text-3xl font-comic text-comic-black mb-4 uppercase">{card.title}</h3>
                <p className="text-comic-black font-bold font-body text-lg leading-relaxed">
                  {card.desc}
                </p>
              </ComicCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
