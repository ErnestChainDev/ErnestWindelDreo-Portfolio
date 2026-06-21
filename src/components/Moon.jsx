import { motion } from "framer-motion";
import moonImage from "../assets/moon.png";

const Moon = ({ onClick, isPlaying }) => {
  return (
    <motion.div
      className="
        absolute
        top-20
        right-20
        lg:right-24
        z-100
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
          bg-violet-500/30
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
          bg-violet-400/30
          blur-[50px]
          scale-[1.4]
          pointer-events-none
        "
      />

      {/* Moon */}
      <motion.img
        src={moonImage}
        alt="Moon"
        onClick={onClick}
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        className={`
          relative
          cursor-pointer
          pointer-events-auto
          select-none

          w-40
          md:w-52
          lg:w-60

          transition-all
          duration-300

          ${
            isPlaying
              ? "drop-shadow-[0_0_30px_rgba(168,85,247,0.9)] drop-shadow-[0_0_80px_rgba(168,85,247,0.6)]"
              : "opacity-90"
          }
        `}
      />
    </motion.div>
  );
};

export default Moon;