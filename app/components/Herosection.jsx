"use client";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export default function Herosection() {
  const controls = useAnimation();
  const [showAbout, setShowAbout] = useState(false);

  const handleSwipe = async (_, info) => {
    if (info.offset.y < -100) {
      // Swipe up detected
      setShowAbout(true);
      await controls.start({
        y: "-100vh",
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Main Video Section */}
      <motion.section
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={handleSwipe}
        animate={controls}
        className="relative min-h-screen w-full"
      >
        {/* Video */}
        <video
          src="/homevideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* COHO Text - Responsive */}
        <motion.h1
          className="absolute inset-0 flex items-center justify-center text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[15rem] font-extrabold text-white/23 select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ zIndex: 10 }}
        >
          COHO
        </motion.h1>

        {/* Swipe Hint */}
        <div className="absolute bottom-10 w-full flex justify-center z-20">
          <motion.p
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white/70 text-lg"
          >
            Swipe up to know more
          </motion.p>
        </div>
      </motion.section>
    </main>
  );
}
