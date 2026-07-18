import { motion } from 'framer-motion';

const ComicBadge = ({
  children,
  className = '',
  color = 'bg-comic-white',
  animateHover = true,
  ...props
}) => {
  const badgeVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: animateHover ? {
      scale: 1.1,
      rotate: [0, -2, 2, 0],
      transition: { duration: 0.3 }
    } : {}
  };

  return (
    <motion.span
      variants={badgeVariants}
      initial="initial"
      whileHover="hover"
      className={`inline-block px-4 py-2 border-2 border-comic-black rounded-full font-bold font-body text-comic-black text-base cursor-default select-none shadow-[2px_2px_0px_0px_#000] ${color} ${className}`}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export default ComicBadge;
