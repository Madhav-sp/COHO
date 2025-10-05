"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// --- Reusable Card Component ---
const EventCard = ({ card }) => (
  <div className="w-full h-full bg-gray-900 border border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col hover:border-gray-700 transition-all duration-300">
    {/* Event Image */}
    <div className="relative h-48 w-full">
      <img
        src={card.imageUrl}
        alt={card.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/600x400/1f2937/9ca3af?text=Event";
        }}
      />
      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1">
        <span className="text-sm font-medium text-white">
          {card.price || "Free"}
        </span>
      </div>
    </div>

    {/* Details */}
    <div className="p-5 flex flex-col flex-grow justify-between">
      <div>
        <h2 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {card.title}
        </h2>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {card.description || "Exciting event coming soon."}
        </p>
        <div className="flex items-center space-x-4 text-gray-500 text-sm">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1.5" />
            <span>{card.date || "Coming Soon"}</span>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <a
        href={card.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 group w-full bg-white hover:bg-gray-200 px-4 py-2.5 rounded-lg text-black text-sm font-medium transition-all duration-300 flex items-center justify-center"
      >
        Apply Now
        <ArrowRight className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </div>
  </div>
);

// --- Main Events Component ---
const Events = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerView = 3; // Number of cards visible at once

  // Fetch events dynamically from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setCards(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching events:", error);
        setCards([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // --- Screen size detection ---
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = (e) => setIsLargeScreen(e.matches);
    handleResize(mediaQuery); // Initial check
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  // --- Reset cards when the last one is swiped (for small screens) ---
  useEffect(() => {
    if (!isLargeScreen && cards.length === 0 && !loading) {
      const timer = setTimeout(() => {
        // re-fetch events when all swiped away
        fetch("/api/events")
          .then((res) => res.json())
          .then((data) => setCards(Array.isArray(data) ? data : []));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [cards, isLargeScreen, loading]);

  // --- Function to handle card removal on swipe ---
  const handleSwipe = (id) => {
    setCards((prev) => prev.filter((card) => card._id !== id));
  };

  // --- Slider navigation functions ---
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev >= cards.length - cardsPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev <= 0 ? cards.length - cardsPerView : prev - 1
    );
  };

  // --- Animation variants for the stacked layout ---
  const stackedCardVariants = {
    initial: (index) => ({
      y: 0,
      scale: 1 - index * 0.05,
      opacity: 1,
    }),
    animate: (index) => ({
      y: index * -20,
      scale: 1 - index * 0.05,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    }),
    exit: {
      x: 300,
      opacity: 0,
      scale: 0.85,
      transition: { duration: 0.3 },
    },
  };

  if (loading) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-black text-white">
        <p>Loading events...</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-center items-center text-white overflow-hidden p-4 sm:p-6 lg:p-8">
      {/* 🌌 Stars Background */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7736104/pexels-photo-7736104.jpeg')] bg-cover bg-center bg-no-repeat opacity-30"></div>

      {/* Content Layer */}
      <div className="relative z-10 w-full flex flex-col justify-center items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
            Upcoming Events
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            {isLargeScreen
              ? "Explore our latest events and opportunities."
              : "Swipe through our upcoming events. Drag left or right to explore."}
          </p>
        </div>

        {/* Conditional Layout: Stacked for small screens, Slider for large screens */}
        {isLargeScreen ? (
          // --- Slider Layout for Large Screens ---
          <div className="relative w-full max-w-6xl">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentSlide * (100 / cardsPerView)
                  }%)`,
                }}
              >
                {cards.map((card, index) => (
                  <div
                    key={card._id}
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / cardsPerView}%` }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-[420px]"
                    >
                      <EventCard card={card} />
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 shadow-lg rounded-full p-2 transition-all duration-300 z-10"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 shadow-lg rounded-full p-2 transition-all duration-300 z-10"
              disabled={currentSlide >= cards.length - cardsPerView}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({
                length: cards.length - cardsPerView + 1,
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentSlide ? "bg-white" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          // --- Stacked Layout for Small Screens ---
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-[390px]">
            <AnimatePresence>
              {cards.map((card, index) => (
                <motion.div
                  key={card._id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  onDragEnd={(event, info) => {
                    if (Math.abs(info.offset.x) > 100) {
                      handleSwipe(card._id);
                    }
                  }}
                  className="absolute w-full h-full cursor-grab active:cursor-grabbing"
                  style={{ zIndex: cards.length - index }}
                  custom={index}
                  variants={stackedCardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
                  }}
                >
                  <EventCard card={card} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
};

export default Events;
