"use client";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

// Make sure to import a heavy font like Poppins in your globals.css
// @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap');

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

        {/* COHO Text - FINAL REVISION for exact gradient from image */}
        <motion.h1
          className="absolute inset-0 flex items-center justify-center 
             text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[15rem] 
             font-extrabold select-none
             bg-gradient-to-r from-[#e03c3c] to-[#009cd9]
             bg-clip-text "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            zIndex: 10,
            fontFamily: "'Anton', sans-serif",
            WebkitTextFillColor: "transparent",
            // textShadow: "0 0 10px rgba(0,0,0,0.25)", // subtle depth, optional
          }}
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
