import { motion } from 'framer-motion';

const ComicCard = ({
  children,
  className = '',
  color = 'bg-comic-white',
  hoverLift = true,
  onClick,
  tilt = false,
  ...props
}) => {
  // Random slight rotation for comic book feel if tilt is enabled
  const rotationAngle = tilt ? (typeof tilt === 'number' ? tilt : -1) : 0;

  const cardVariants = {
    initial: {
      y: 0,
      rotate: rotationAngle,
      boxShadow: '8px 8px 0px 0px #000000',
    },
    hover: hoverLift ? {
      y: -6,
      rotate: rotationAngle + (tilt ? 2 : 0.5),
      boxShadow: '12px 12px 0px 0px #000000',
    } : {},
    tap: onClick ? {
      y: 2,
      boxShadow: '4px 4px 0px 0px #000000',
    } : {}
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover={hoverLift ? "hover" : undefined}
      whileTap={onClick ? "tap" : undefined}
      onClick={onClick}
      className={`border-4 border-comic-black rounded-[2rem] p-6 md:p-8 transition-colors select-none ${color} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ComicCard;
