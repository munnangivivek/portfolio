import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, MessageSquare, Paintbrush, Award, Smartphone, Laptop, Globe, FlaskConical, X, Palette } from 'lucide-react';
import ComicCard from './ui/ComicCard';
import ComicButton from './ui/ComicButton';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonMessage, setComingSoonMessage] = useState('');
  const [activeEmbedUrl, setActiveEmbedUrl] = useState(null);

  const openComingSoon = (message) => {
    setComingSoonMessage(message);
    setShowComingSoon(true);
  };

  const getFigmaEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes('embed?')) return url;
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
  };

  const categories = ['All', 'UI/UX', 'WEBDEV', 'APPS', 'OtherrandomStuff'];

  const projects = [
    {
      title: "SILVRA APP",
      description: "A premium mobile app design delivered to a real-world client as a professional freelancing gig, prioritizing luxury silver branding.",
      tags: ["Freelance", "App Design", "UI/UX"],
      category: "UI/UX",
      color: "bg-comic-blue",
      icon: <Smartphone className="w-16 h-16 text-comic-black" />,
      figmaUrl: "https://www.figma.com/file/MJGm1m8eJ9h5w5w5w5w5w7",
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <rect x="30" y="15" width="40" height="70" rx="8" fill="white" stroke="black" strokeWidth="3" />
          <rect x="35" y="25" width="30" height="50" rx="3" fill="#FF4400" stroke="black" strokeWidth="2" />
          <circle cx="50" cy="50" r="12" fill="silver" stroke="black" strokeWidth="2" />
          <circle cx="50" cy="50" r="8" fill="#e2e8f0" stroke="black" strokeWidth="1" />
          <text x="47" y="53" className="font-comic text-xs fill-black font-extrabold">S</text>
          <line x1="38" y1="32" x2="62" y2="32" stroke="white" strokeWidth="2" />
          <rect x="42" y="65" width="16" height="6" rx="1.5" fill="#FFC800" stroke="black" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      title: "Vanaga Portfolio",
      description: "A sleek, highly customized portfolio website built for a freelance client, focusing on clean grid layouts.",
      tags: ["React", "CSS Grid", "Freelance"],
      category: "WEBDEV",
      color: "bg-comic-yellow",
      icon: <Laptop className="w-16 h-16 text-comic-black" />,
      demoUrl: "https://vanaja-portifolio.netlify.app/",
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <rect x="20" y="20" width="60" height="60" rx="6" fill="white" stroke="black" strokeWidth="3" />
          <circle cx="50" cy="40" r="12" fill="#60CFFF" stroke="black" strokeWidth="2.5" />
          <path d="M 32,68 C 32,56 40,56 50,56 C 60,56 68,56 68,68 Z" fill="#60CFFF" stroke="black" strokeWidth="2.5" />
          <text x="25" y="32" className="font-comic text-xs fill-black">V</text>
        </svg>
      )
    },
    {
      title: "Campus Circle",
      description: "A collaborative student community platform built to connect peers, scaling from 20 beta users and engineered to handle 1000+ active connections.",
      tags: ["React Native", "Node.js", "WebSockets"],
      category: "APPS",
      color: "bg-comic-red",
      icon: <MessageSquare className="w-16 h-16 text-comic-black" />,
      demoUrl: "https://campus-circle-niat.vercel.app/",
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <path d="M 50,15 L 80,30 L 80,65 C 80,75 50,85 50,85 C 50,85 20,75 20,65 L 20,30 Z" fill="white" stroke="black" strokeWidth="3" />
          <circle cx="50" cy="50" r="14" fill="#60CFFF" stroke="black" strokeWidth="2.5" />
          <rect x="52" y="58" width="36" height="18" rx="4" fill="#FFC800" stroke="black" strokeWidth="2" />
          <text x="56" y="71" className="font-comic text-[10px] fill-black font-extrabold">1000+</text>
          <path d="M 42,42 L 50,34 L 58,42 Z" fill="black" />
          <rect x="45" y="42" width="10" height="10" fill="black" />
        </svg>
      )
    },
    {
      title: "This Portfolio",
      description: "The interactive comic-styled portfolio website you are currently browsing, built with game-like animations.",
      tags: ["React", "Framer Motion", "Vite"],
      category: "WEBDEV",
      color: "bg-comic-green",
      icon: <Globe className="w-16 h-16 text-comic-black" />,
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="35" fill="#FFC800" stroke="black" strokeWidth="3" />
          <path d="M 50,50 L 85,50 M 50,50 L 78,75" stroke="black" strokeWidth="3" />
          <circle cx="58" cy="28" r="3" fill="black" />
          <text x="20" y="30" className="font-comic text-lg fill-black font-extrabold tracking-wider">YOU'RE HERE</text>
        </svg>
      ),
      isSelf: true
    },
    {
      title: "Designathon Submissions",
      description: "Competitive UI/UX prototypes and interactive dashboard concepts crafted under tight event timelines.",
      tags: ["Designathon", "Figma", "Prototypes"],
      category: "UI/UX",
      color: "bg-comic-green",
      icon: <Award className="w-16 h-16 text-comic-black" />,
      figmaUrl: "https://www.figma.com/design/8ICMWiKIEXncXw0SXyOoPN/testing?node-id=2058-2680&t=gClaOX4zKNrf1DLI-4",
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <path d="M 50,15 L 60,35 L 82,35 L 65,48 L 72,70 L 50,57 L 28,70 L 35,48 L 18,35 L 40,35 Z" fill="#FFC800" stroke="black" strokeWidth="3" strokeLinejoin="round" />
          <line x1="50" y1="5" x2="50" y2="10" stroke="black" strokeWidth="2" strokeLinecap="round" />
          <line x1="88" y1="42" x2="82" y2="42" stroke="black" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="42" x2="18" y2="42" stroke="black" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="38" r="4" fill="white" stroke="black" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      title: "Multiple Landing Pages",
      description: "A collection of high-converting, responsive comic-style landing pages designed for various brand campaigns.",
      tags: ["Landing Pages", "Figma", "UI/UX"],
      category: "UI/UX",
      color: "bg-comic-yellow",
      icon: <Paintbrush className="w-16 h-16 text-comic-black" />,
      figmaUrl: "https://www.figma.com/design/8ICMWiKIEXncXw0SXyOoPN/testing?node-id=2058-2079&t=gClaOX4zKNrf1DLI-4",
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <rect x="20" y="25" width="40" height="50" rx="4" fill="white" stroke="black" strokeWidth="2.5" />
          <rect x="35" y="35" width="45" height="50" rx="4" fill="#60CFFF" stroke="black" strokeWidth="2.5" />
          <line x1="42" y1="45" x2="68" y2="45" stroke="black" strokeWidth="2" />
          <line x1="42" y1="52" x2="60" y2="52" stroke="black" strokeWidth="2" />
          <rect x="42" y="60" width="18" height="8" rx="2" fill="#FFC800" stroke="black" strokeWidth="1.5" />
          <text x="25" y="42" className="font-comic text-xs fill-black">L1</text>
          <text x="70" y="52" className="font-comic text-xs fill-black">L2</text>
        </svg>
      )
    },
    {
      title: "Other Experimental Stuff",
      description: "A playground of prototype features, custom canvas drawings, and physics engine tests.",
      tags: ["Canvas", "Web Audio", "WebGL"],
      category: "WEBDEV",
      color: "bg-comic-blue",
      icon: <FlaskConical className="w-16 h-16 text-comic-black" />,
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <path d="M 40,20 L 60,20 M 45,20 L 45,35 L 25,75 A 10,10 0 0,0 35,85 L 65,85 A 10,10 0 0,0 75,75 L 55,35 L 55,20" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="50" cy="65" r="8" fill="#FFB8FF" stroke="black" strokeWidth="2" />
          <circle cx="42" cy="52" r="5" fill="#60CFFF" stroke="black" strokeWidth="2" />
          <circle cx="58" cy="50" r="4" fill="#FF4400" stroke="black" strokeWidth="2" />
        </svg>
      ),
      noVisit: true
    },
    {
      title: "Posters, Banners, & Logos",
      description: "A collection of vector brand logos, digital marketing banners, poster layouts, and creative design assets.",
      tags: ["Posters", "Banners", "Logo Design", "UI/UX"],
      category: "UI/UX",
      color: "bg-comic-yellow",
      icon: <Palette className="w-16 h-16 text-comic-black" />,
      figmaUrl: "https://www.figma.com/design/8ICMWiKIEXncXw0SXyOoPN/testing?node-id=2058-2729&t=gClaOX4zKNrf1DLI-4",
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <rect x="15" y="30" width="35" height="50" rx="3" fill="#FFC800" stroke="black" strokeWidth="2.5" transform="rotate(-5 32.5 55)" />
          <rect x="45" y="25" width="40" height="55" rx="3" fill="#60CFFF" stroke="black" strokeWidth="2.5" transform="rotate(5 65 52.5)" />
          <circle cx="65" cy="45" r="10" fill="#FF4400" stroke="black" strokeWidth="2" />
          <path d="M 20,60 Q 30,50 40,65" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
          <text x="58" y="70" className="font-comic text-[10px] fill-black font-extrabold" transform="rotate(5 65 52.5)">ART</text>
        </svg>
      )
    },
    {
      title: "My Tech Blogs",
      description: "The blogs I share about design, vibe coding, and building digital worlds.",
      tags: ["Writing", "Blogs"],
      category: "OtherrandomStuff",
      color: "bg-comic-red",
      icon: <MessageSquare className="w-16 h-16 text-comic-black" />,
      illustration: (
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <path d="M 25,25 L 75,25 L 75,85 L 25,85 Z" fill="white" stroke="black" strokeWidth="3" />
          <line x1="20" y1="80" x2="80" y2="20" stroke="black" strokeWidth="4" strokeLinecap="round" />
          <path d="M 80,20 L 70,20 M 80,20 L 80,30" stroke="black" strokeWidth="4" strokeLinecap="round" />
          <line x1="32" y1="38" x2="68" y2="38" stroke="black" strokeWidth="2.5" />
          <line x1="32" y1="48" x2="68" y2="48" stroke="black" strokeWidth="2.5" />
          <line x1="32" y1="58" x2="55" y2="58" stroke="black" strokeWidth="2.5" />
        </svg>
      ),
      isComingSoon: true
    }
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center py-24 bg-comic-blue border-t-4 border-comic-black snap-start relative">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-comic text-comic-black mb-6 drop-shadow-white">
            SELECTED <span className="text-comic-white text-outline">MISSIONS</span>
          </h2>
        </motion.div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 2 }}
              className={`px-6 py-2 text-lg font-comic tracking-wider border-4 border-comic-black rounded-full shadow-[3px_3px_0px_0px_#000] transition-colors ${
                activeFilter === cat
                  ? 'bg-comic-red text-white'
                  : 'bg-comic-white text-comic-black hover:bg-yellow-100'
              }`}
            >
              {cat === 'OtherrandomStuff' ? 'OTHER RANDOM STUFF' : cat.toUpperCase()}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid with layout transitions */}
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ComicCard 
                  color="bg-comic-white" 
                  hoverLift={true}
                  className="flex flex-col h-full overflow-hidden p-0 md:p-0"
                >
                  {/* Top Comic Visual Block */}
                  <div className={`${project.color} h-60 border-b-4 border-comic-black flex items-center justify-center p-6 relative overflow-hidden group select-none`}>
                    <div className="w-40 h-40 transform group-hover:scale-110 transition-transform duration-300">
                      {project.illustration}
                    </div>
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Floating Tech Category Badge */}
                    <span className="absolute bottom-4 right-4 bg-comic-black text-comic-white px-3 py-1 font-comic text-sm rounded-lg border-2 border-comic-black shadow-[2px_2px_0px_0px_#fff] transform rotate-1 select-none">
                      {project.category === 'OtherrandomStuff' ? 'RANDOM STUFF' : project.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="p-8 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="bg-comic-white border-2 border-comic-black rounded-full p-2 shadow-[2px_2px_0px_#000]">
                          {project.icon}
                        </div>
                        <h3 className="text-3xl font-comic text-comic-black uppercase leading-none">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-lg font-bold font-body text-comic-black/75 mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="px-3 py-1 bg-comic-black text-comic-white font-bold rounded-lg text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        {project.isComingSoon ? (
                          <ComicButton 
                            variant="black" 
                            className="w-full py-2.5"
                            onClick={() => openComingSoon("The blogs page is currently under construction. Exciting designs and writeups are coming soon!")}
                          >
                            EXPLORE BLOGS <ExternalLink size={18} />
                          </ComicButton>
                        ) : project.category === "UI/UX" ? (
                          <ComicButton 
                            variant="black" 
                            className="w-full py-2.5"
                            onClick={() => {
                              if (!project.figmaUrl || project.figmaUrl.includes('MJGm1m8eJ9h5w')) {
                                openComingSoon("This project's Figma prototype link is under construction. Coming soon!");
                              } else {
                                setActiveEmbedUrl(getFigmaEmbedUrl(project.figmaUrl));
                              }
                            }}
                          >
                            SEE DESIGN <ExternalLink size={18} />
                          </ComicButton>
                        ) : (
                          <>
                            {project.noVisit ? (
                              <ComicButton 
                                variant="white" 
                                className="w-full py-2.5"
                                onClick={() => {
                                  if (project.githubUrl) {
                                    window.open(project.githubUrl, "_blank");
                                  } else {
                                    openComingSoon("This project's source code repository is under construction. Coming soon!");
                                  }
                                }}
                              >
                                <Github size={18} /> CODE
                              </ComicButton>
                            ) : (
                              <ComicButton 
                                variant="black" 
                                className="w-full py-2.5"
                                onClick={() => {
                                  if (project.isSelf) {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  } else if (project.demoUrl) {
                                    window.open(project.demoUrl, "_blank");
                                  } else {
                                    openComingSoon("This project's live preview website is under construction. Coming soon!");
                                  }
                                }}
                              >
                                VISIT <ExternalLink size={18} />
                              </ComicButton>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </ComicCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Full-Screen Coming Soon Overlay */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-comic-yellow flex items-center justify-center p-6 border-[8px] border-comic-black select-none"
          >
            {/* Halftone pattern background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:16px_16px]" />
            
            <motion.div 
              initial={{ scale: 0.85, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.85, rotate: 2 }}
              className="text-center max-w-xl bg-comic-white border-4 border-comic-black p-10 rounded-[2rem] shadow-[8px_8px_0px_#000] relative"
            >
              <div className="text-6xl mb-4">✍️</div>
              <h2 className="text-4xl md:text-6xl font-comic text-comic-black mb-4 text-outline text-comic-white">COMING SOON!</h2>
              <p className="text-xl md:text-2xl font-bold font-body text-comic-black/80 mb-8 leading-relaxed">
                {comingSoonMessage || "The page you are looking for is currently under construction. Exciting updates are coming soon!"}
              </p>
              <ComicButton 
                variant="red"
                onClick={() => setShowComingSoon(false)}
                className="mx-auto px-8 py-3 shadow-[4px_4px_0px_#000]"
              >
                GO BACK
              </ComicButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Figma Embed Modal */}
      <AnimatePresence>
        {activeEmbedUrl && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveEmbedUrl(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotate: -1 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotate: 1 }}
              className="relative w-full max-w-5xl h-[80vh] bg-comic-white border-4 border-comic-black rounded-[2rem] p-6 shadow-[8px_8px_0px_#000] z-10 flex flex-col justify-between"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveEmbedUrl(null)}
                className="absolute -top-4 -right-4 bg-comic-red text-white border-2 border-black rounded-full p-2 hover:scale-110 transition-transform shadow-[2px_2px_0px_0px_#000] cursor-pointer"
              >
                <X size={24} />
              </button>
              
              {/* Figma Iframe Frame */}
              <div className="w-full h-full bg-gray-100 rounded-xl overflow-hidden border-2 border-comic-black">
                <iframe
                  style={{ border: 'none' }}
                  width="100%"
                  height="100%"
                  src={activeEmbedUrl}
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
