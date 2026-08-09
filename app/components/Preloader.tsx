"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock body scroll during preloader display
    document.body.style.overflow = "hidden";

    // Show preloader animation on every page refresh/load
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 1800);

    const completeTimer = setTimeout(() => {
      window.dispatchEvent(new Event("preloaderComplete"));
    }, 2400);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-[#00266A] select-none overflow-hidden pointer-events-auto shadow-2xl"
        >
          {/* Subtle radial background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(0,38,106,0.06),transparent_80%)] pointer-events-none" />

          {/* Animated Center Content: Logo & Brand */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            {/* Logo Motion container */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{
                scale: [0.7, 1.05, 1],
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                },
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
                transition: { duration: 0.3 },
              }}
              className="relative w-[110px] sm:w-[140px] h-[110px] sm:h-[140px] mb-6 flex items-center justify-center"
            >
              {/* Outer Pulsing Navy Aura Ring */}
              <motion.div
                animate={{
                  scale: [1, 1.28, 1],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-[#00266A]/10 blur-xl"
              />

              <Image
                src="/logo.png"
                alt="SP Solutions Logo"
                width={140}
                height={140}
                priority
                className="w-auto h-full object-contain relative z-10 drop-shadow-[0_12px_24px_rgba(0,38,106,0.18)]"
              />
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-widest text-[#00266A] uppercase font-sans mb-1">
                SP SOLUTIONS
              </h1>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#00266A]/70 uppercase">
                Packaging Systems &amp; Services
              </span>
            </motion.div>

            {/* Animated Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="w-[180px] sm:w-[220px] h-[3.5px] bg-[#00266A]/10 rounded-full mt-8 overflow-hidden relative"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: 1.2,
                  ease: [0.65, 0, 0.35, 1],
                  delay: 0.3,
                }}
                className="w-full h-full bg-gradient-to-r from-[#00266A]/40 via-[#00266A] to-[#D5BD66] rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
