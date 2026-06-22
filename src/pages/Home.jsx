import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SparkleCursor } from "../components/lightswind/SparkleCursor"
import Moon from "../components/Moon";
import Sun from "../components/Sun";
import TypingText from "../components/TypingText";
import AIAgent from "../components/AIAgent/AIAgent";

import { useTheme } from "../hooks/useTheme";

import heroBgNight from "../assets/bg-city-night.png";
import heroBgDay from "../assets/bg-city-day.png";

import chillMusic from "../music/Chill-Night-Music.mp3";

const Home = () => {
  const { darkMode } = useTheme();

  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const audio = new Audio(chillMusic);

    audio.loop = true;
    audio.volume = 0.9;

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (!hasStarted) {
        await audioRef.current.play();
        setHasStarted(true);
        setIsPlaying(true);
        return;
      }

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Music Error:", error);
    }
  };

  const heroBg = darkMode ? heroBgNight : heroBgDay;

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-right bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      />

      {/* Main Overlay */}
      <div
        className={`absolute inset-0 z-1 pointer-events-none ${
          darkMode
            ? "bg-linear-to-b from-[#050112]/10 via-[#050112]/20 to-[#050112]/40"
            : "bg-linear-to-b from-white/10 via-sky-100/10 to-white/20"
        }`}
      />

      {/* Accent Overlay */}
      <div
        className={`absolute inset-0 z-2 pointer-events-none ${
          darkMode
            ? "bg-linear-to-r from-violet-900/5 via-transparent to-violet-500/5"
            : "bg-linear-to-r from-sky-300/20 via-transparent to-blue-300/20"
        }`}
      />

      {/* Moon / Sun */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        {darkMode ? (
          <Moon
            onClick={toggleMusic}
            isPlaying={isPlaying}
          />
        ) : (
          <Sun
            onClick={toggleMusic}
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 lg:pl-10">
        <SparkleCursor distance={40} glow={true} />
        <div className="min-h-screen flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="max-w-4xl"
          >
            {/* Intro */}
            <p
              className={`
                font-pixel
                text-xs
                md:text-sm
                tracking-[0.35em]
                mb-6
                ${
                  darkMode
                    ? "text-violet-400"
                    : "text-slate-700"
                }
              `}
            >
              👋 HEY, I'M | MrD
            </p>

            {/* Name */}
            <div className="mb-6">
              <h1
                className={`
                  font-pixel
                  leading-none
                  tracking-wider
                  text-5xl
                  sm:text-6xl
                  md:text-7xl
                  lg:text-8xl
                  xl:text-[8rem]
                  ${
                    darkMode
                      ? "text-white"
                      : "text-slate-900"
                  }
                `}
              >
                ERNEST
              </h1>

              <p
                className={`
                  font-pixel
                  mt-4
                  text-xs
                  md:text-base
                  uppercase
                  tracking-[0.4em]
                  ${
                    darkMode
                      ? "text-violet-300"
                      : "text-slate-600"
                  }
                `}
              >
                WINDEL DREO
              </p>
            </div>

            {/* Roles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
              }}
              className="mb-8"
            >
              <h2
                className={`
                  font-pixel
                  min-h-15
                  text-lg
                  sm:text-xl
                  md:text-2xl
                  lg:text-3xl
                  ${
                    darkMode
                      ? "text-violet-300"
                      : "text-slate-700"
                  }
                `}
              >
                <TypingText
                  texts={[
                    "FULL STACK DEVELOPER",
                    "SOFTWARE ENGINEER",
                    "Junior QA Engineer",
                    "Aspiring AI Engineer",
                  ]}
                  speed={100}
                  pause={2000}
                />
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.8,
                duration: 0.8,
              }}
              className={`
                max-w-2xl
                mb-10
                text-sm
                md:text-lg
                leading-8
                ${
                  darkMode
                    ? "text-gray-200"
                    : "text-slate-700"
                }
              `}
            >
              I build modern web applications, AI-powered systems,
              and scalable software solutions. Passionate about
              creating high-performance digital experiences while
              maintaining clean architecture, quality assurance,
              and exceptional user experience.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.2,
                duration: 0.8,
              }}
              className="flex flex-wrap gap-4"
            >
              {/* View My Room */}
              <a
                href="https://my-room-pixel-porfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  font-pixel
                  px-6
                  py-4
                  rounded-2xl
                  text-sm
                  md:text-base
                  transition-all
                  duration-300
                  hover:scale-105
                  inline-flex
                  items-center
                  justify-center
                  ${
                    darkMode
                      ? "neon-btn"
                      : "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-[0_10px_30px_rgba(59,130,246,0.35)]"
                  }
                `}
              >
                VIEW MY ROOM
              </a>

              {/* Download CV */}
              <a
                href="/resume/Ernest-Windel-Dreo_Resume.pdf"
                download
                className={`
                  font-pixel
                  px-6
                  py-4
                  rounded-2xl
                  text-sm
                  md:text-base
                  flex
                  items-center
                  gap-2
                  transition-all
                  duration-300
                  hover:scale-105
                  ${
                    darkMode
                      ? "border border-violet-500/40 bg-white/5 text-white hover:bg-violet-500/10"
                      : "border border-blue-200 bg-white/70 backdrop-blur-xl text-slate-800 shadow-[0_10px_25px_rgba(59,130,246,0.08)] hover:bg-white"
                  }
                `}
              >
                <Download size={18} />
                DOWNLOAD CV
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-32 z-10 ${
          darkMode
            ? "bg-linear-to-t from-[#050112] to-transparent"
            : "bg-linear-to-t from-white/70 to-transparent"
        }`}
      />
      <AIAgent />
    </section>
  );
};

export default Home;
