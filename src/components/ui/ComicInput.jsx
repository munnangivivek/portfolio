import { motion } from 'framer-motion';

const ComicInput = ({
  name,
  value,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  className = '',
  ...props
}) => {
  return (
    <motion.input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      whileFocus={{
        x: 2,
        y: 2,
        boxShadow: '2px 2px 0px 0px #000000',
        transition: { type: 'spring', stiffness: 300, damping: 15 }
      }}
      className={`w-full bg-comic-yellow border-4 border-comic-black rounded-xl p-4 text-comic-black font-bold font-body placeholder-comic-black/50 shadow-[4px_4px_0px_0px_#000] focus:outline-none focus:ring-0 ${className}`}
      {...props}
    />
  );
};

export default ComicInput;
