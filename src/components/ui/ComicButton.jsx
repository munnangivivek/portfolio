import { motion } from 'framer-motion';

const ComicButton = ({
  children,
  onClick,
  className = '',
  variant = 'green',
  sparkles = false,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'relative px-6 py-3 text-lg font-comic tracking-wider border-4 border-comic-black rounded-xl transition-colors select-none flex items-center justify-center gap-2';
  
  const variants = {
    yellow: 'bg-comic-yellow text-comic-black hover:bg-yellow-300',
    blue: 'bg-comic-blue text-comic-black hover:bg-sky-300',
    green: 'bg-comic-green text-comic-black hover:bg-emerald-400',
    red: 'bg-comic-red text-comic-white hover:bg-red-500',
    black: 'bg-comic-black text-comic-white hover:bg-neutral-800',
    white: 'bg-comic-white text-comic-black hover:bg-gray-100',
  };

  const buttonVariants = {
    initial: { scale: 1, x: 0, y: 0, boxShadow: '4px 4px 0px 0px #000000' },
    hover: { scale: 1.02, x: -2, y: -2, boxShadow: '6px 6px 0px 0px #000000' },
    tap: { scale: 0.98, x: 2, y: 2, boxShadow: '2px 2px 0px 0px #000000' }
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      variants={buttonVariants}
      initial="initial"
      whileHover={disabled ? {} : "hover"}
      whileTap={disabled ? {} : "tap"}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {sparkles && !disabled && (
        <>
          <motion.span
            variants={{
              initial: { opacity: 0, scale: 0 },
              hover: {
                opacity: [0, 1, 0],
                x: -30,
                y: -25,
                scale: [0, 1.2, 0],
                rotate: -45,
                transition: { duration: 0.6, repeat: Infinity, repeatDelay: 0.2 }
              }
            }}
            className="absolute top-0 left-0 text-xl pointer-events-none"
          >
            ✨
          </motion.span>
          <motion.span
            variants={{
              initial: { opacity: 0, scale: 0 },
              hover: {
                opacity: [0, 1, 0],
                x: 30,
                y: -25,
                scale: [0, 1.2, 0],
                rotate: 45,
                transition: { duration: 0.6, delay: 0.2, repeat: Infinity, repeatDelay: 0.2 }
              }
            }}
            className="absolute top-0 right-0 text-xl pointer-events-none"
          >
            ✨
          </motion.span>
          <motion.span
            variants={{
              initial: { opacity: 0, scale: 0 },
              hover: {
                opacity: [0, 1, 0],
                x: 0,
                y: -35,
                scale: [0, 1.2, 0],
                transition: { duration: 0.6, delay: 0.1, repeat: Infinity, repeatDelay: 0.2 }
              }
            }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-lg pointer-events-none"
          >
            ✨
          </motion.span>
        </>
      )}
    </motion.button>
  );
};

export default ComicButton;
