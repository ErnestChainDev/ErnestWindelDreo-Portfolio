import { motion } from "framer-motion";
import sunImage from "../assets/sun.png";

const Sun = ({ onClick }) => {
  return (
    <motion.div
      className="
        absolute
        top-20
        right-20
        lg:right-24
        z-[100]
      "
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Outer Glow */}
      <div
        className="
          absolute
          inset-0
          rounded-full
          bg-orange-400/30
          blur-[80px]
          scale-[1.8]
          pointer-events-none
        "
      />

      {/* Middle Glow */}
      <div
        className="
          absolute
          inset-0
          rounded-full
          bg-amber-300/30
          blur-[50px]
          scale-[1.4]
          pointer-events-none
        "
      />

      {/* Sun */}
      <motion.img
        src={sunImage}
        alt="Sun"
        onClick={onClick}
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        className="
          sun-glow
          relative
          cursor-pointer
          pointer-events-auto
          select-none

          w-40
          md:w-52
          lg:w-60

          transition-all
          duration-300

          drop-shadow-[0_0_30px_rgba(251,191,36,0.9)]
          drop-shadow-[0_0_80px_rgba(251,191,36,0.6)]
        "
      />
    </motion.div>
  );
};

export default Sun;