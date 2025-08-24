"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Ticket,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// --- Data for the event cards ---
const initialCardsData = [
  {
    id: 1,
    name: "Innovate & Create Hackathon 2025",
    title: "A 24-hour sprint to build the future.",
    price: "Free",
    image: "https://source.unsplash.com/600x400/?hackathon,programming",
    link: "https://forms.gle/your-hackathon-form",
  },
  {
    id: 2,
    name: "AI & Machine Learning Workshop",
    title: "Hands-on experience with cutting-edge AI tools.",
    price: "₹299",
    image: "https://source.unsplash.com/600x400/?ai,robot",
    link: "https://forms.gle/your-aiworkshop-form",
  },
  {
    id: 3,
    name: "Competitive Coding Marathon",
    title: "Solve complex problems and win exciting prizes.",
    price: "₹199",
    image: "https://source.unsplash.com/600x400/?coding,keyboard",
    link: "https://forms.gle/your-coding-form",
  },
  {
    id: 4,
    name: "The Future of Tech Summit",
    title: "Insights from industry leaders on innovation.",
    price: "Free",
    image: "https://source.unsplash.com/600x400/?technology,conference",
    link: "https://forms.gle/your-techtalk-form",
  },
  {
    id: 5,
    name: "Web Development Bootcamp",
    title: "Learn modern web technologies from scratch.",
    price: "₹599",
    image: "https://source.unsplash.com/600x400/?web,development",
    link: "https://forms.gle/your-webdev-form",
  },
  {
    id: 6,
    name: "Data Science Conference",
    title: "Explore the latest trends in data analytics.",
    price: "₹399",
    image: "https://source.unsplash.com/600x400/?data,analytics",
    link: "https://forms.gle/your-datascience-form",
  },
];

// --- Reusable Card Component ---
const EventCard = ({ card }) => (
  <div className="w-full h-full bg-gray-900 border border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col hover:border-gray-700 transition-all duration-300">
    {/* Event Image */}
    <div className="relative h-48 w-full">
      <img
        src={card.image}
        alt={card.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/600x400/1f2937/9ca3af?text=Event";
        }}
      />
      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1">
        <span className="text-sm font-medium text-white">{card.price}</span>
      </div>
    </div>

    {/* Details */}
    <div className="p-5 flex flex-col flex-grow justify-between">
      <div>
        <h2 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {card.name}
        </h2>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{card.title}</p>
        <div className="flex items-center space-x-4 text-gray-500 text-sm">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1.5" />
            <span>Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <a
        href={card.link}
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
  const [cards, setCards] = useState(initialCardsData);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerView = 3; // Number of cards visible at once

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
    if (!isLargeScreen && cards.length === 0) {
      const timer = setTimeout(() => {
        setCards(initialCardsData);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [cards, isLargeScreen]);

  // --- Function to handle card removal on swipe ---
  const handleSwipe = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  // --- Slider navigation functions ---
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev >= initialCardsData.length - cardsPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev <= 0 ? initialCardsData.length - cardsPerView : prev - 1
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

  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center bg-black text-white overflow-hidden p-4 sm:p-6 lg:p-8">
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
              {initialCardsData.map((card, index) => (
                <div
                  key={card.id}
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
            disabled={currentSlide >= initialCardsData.length - cardsPerView}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({
              length: initialCardsData.length - cardsPerView + 1,
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
                key={card.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                onDragEnd={(event, info) => {
                  if (Math.abs(info.offset.x) > 100) {
                    handleSwipe(card.id);
                  }
                }}
                className="absolute w-full h-full cursor-grab active:cursor-grabbing"
                style={{ zIndex: initialCardsData.length - index }}
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
    </main>
  );
};

export default Events;
