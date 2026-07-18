import { motion } from 'framer-motion';
import ComicCard from './ui/ComicCard';
import ComicBadge from './ui/ComicBadge';

const Skills = () => {
  const categories = [
    {
      title: "Frontend",
      color: "bg-comic-blue",
      skills: ["HTML", "CSS", "JavaScript", "Vibe Coding", "Other Platforms"]
    },
    {
      title: "Backend",
      color: "bg-comic-green",
      skills: ["Node.js", "Express.js", "Python", "MongoDB", "PostgreSQL"]
    },
    {
      title: "Design",
      color: "bg-comic-red",
      skills: ["Figma", "Webflow", "Stitch", "Dribbble", "Mobbin"]
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.08
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.6, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10
      }
    }
  };

  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center py-24 bg-comic-yellow overflow-hidden snap-start">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-comic text-comic-black mb-6 drop-shadow-white">
            THE <span className="text-comic-white text-outline">ARSENAL</span>
          </h2>
          <p className="text-xl font-bold font-body text-comic-black/70">
            The tools I use to build independent worlds.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {categories.map((cat, index) => (
            <motion.div key={index} variants={cardVariants} className="h-full">
              <ComicCard
                color={cat.color}
                tilt={index % 2 === 0 ? 1 : -1}
                className="h-full flex flex-col items-center justify-start"
              >
                {/* Category Header with Outline */}
                <h3 className="text-3xl font-comic text-comic-black mb-8 text-center bg-comic-white border-2 border-comic-black rounded-xl py-2 shadow-[4px_4px_0px_0px_#000] transform -rotate-1 inline-block w-full">
                  {cat.title}
                </h3>

                <div className="flex flex-wrap justify-center gap-3">
                  {cat.skills.map((skill, i) => (
                    <motion.div key={i} variants={badgeVariants}>
                      <ComicBadge
                        color="bg-comic-white"
                        className="hover:bg-yellow-100 transition-colors"
                      >
                        {skill}
                      </ComicBadge>
                    </motion.div>
                  ))}
                </div>
              </ComicCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
