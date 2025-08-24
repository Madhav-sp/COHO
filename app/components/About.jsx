import React, { useState } from "react";

const cards = [
  {
    id: 1,
    title: "Innovation",
    description: "Pushing boundaries with creative solutions",
    gradient: "from-gray-800 to-gray-700",
  },
  {
    id: 2,
    title: "Community",
    description: "Learning together, growing together",
    gradient: "from-gray-700 to-gray-600",
  },
  {
    id: 3,
    title: "Excellence",
    description: "Striving for quality in everything we do",
    gradient: "from-gray-800 to-gray-700",
  },
  {
    id: 4,
    title: "Growth",
    description: "Continuous learning and improvement",
    gradient: "from-gray-700 to-gray-600",
  },
];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(null);

  const handleTouchStart = (e) => setDragStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => handleSwipe(e.changedTouches[0].clientX);

  const handleMouseDown = (e) => setDragStart(e.clientX);
  const handleMouseUp = (e) => handleSwipe(e.clientX);

  const handleSwipe = (endX) => {
    if (!dragStart) return;
    const diff = dragStart - endX;

    if (Math.abs(diff) > 50) {
      setCurrentIndex((prev) =>
        diff > 0
          ? (prev + 1) % cards.length
          : (prev - 1 + cards.length) % cards.length
      );
    }
    setDragStart(null);
  };

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[12rem] xl:text-[15rem] font-black text-white/5 select-none tracking-wider">
          ABOUT
        </h1>
      </div>

      {/* Main Layout */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-12 pt-20 pb-8 lg:py-0">
        {/* Left Content */}
        <div className="w-full lg:flex-1 flex items-center justify-center mb-8 lg:mb-0">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-6xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
              About Code Hoppers
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed mb-6 lg:mb-8">
              Code Hoppers (COHO) is a creative and collaborative community
              where students, developers, and innovators come together to learn,
              build, and share knowledge. Our vision is simple —{" "}
              <span className="text-gray-300 font-semibold">
                "Learning in Community Creatively with Innovation."
              </span>{" "}
              Whether you're just starting your coding journey or already a pro,
              COHO gives you the platform to explore, experiment, and excel.
            </p>

            {/* Indicators */}
            <div className="flex justify-center lg:justify-start space-x-2">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gray-200 scale-125"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Cards */}
        <div className="w-full lg:flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-sm h-80 sm:h-96">
            <div
              className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              {cards.map((card, index) => {
                const position =
                  (index - currentIndex + cards.length) % cards.length;
                const isActive = position === 0;
                const isNext = position === 1;
                const isPrev = position === cards.length - 1;

                let transform = "translateX(100%)";
                let zIndex = 0;
                let opacity = 0;
                let scale = 0.8;

                if (isActive) {
                  transform = "translateX(0%) rotateY(0deg)";
                  zIndex = 30;
                  opacity = 1;
                  scale = 1;
                } else if (isNext) {
                  transform = "translateX(15%) rotateY(-10deg)";
                  zIndex = 20;
                  opacity = 0.7;
                  scale = 0.9;
                } else if (isPrev) {
                  transform = "translateX(-15%) rotateY(10deg)";
                  zIndex = 10;
                  opacity = 0.5;
                  scale = 0.85;
                } else if (position === 2) {
                  transform = "translateX(30%) rotateY(-20deg)";
                  zIndex = 5;
                  opacity = 0.3;
                  scale = 0.75;
                }

                return (
                  <div
                    key={card.id}
                    className="absolute inset-0 transition-all duration-500 ease-out"
                    style={{
                      transform: `${transform} scale(${scale})`,
                      zIndex,
                      opacity,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className={`w-full h-full bg-gradient-to-br ${card.gradient} rounded-xl lg:rounded-2xl shadow-2xl overflow-hidden border border-white/10`}
                    >
                      <div className="h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative">
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                                {card.id}
                              </span>
                            </div>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 lg:mb-2">
                              {card.title}
                            </h3>
                            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed px-2 sm:px-0">
                              {card.description}
                            </p>
                          </div>
                        </div>

                        {/* Decorative circles */}
                        <div className="absolute top-3 right-3 lg:top-4 lg:right-4 w-8 h-8 lg:w-12 lg:h-12 bg-white/5 rounded-full backdrop-blur-sm"></div>
                        <div className="absolute bottom-3 left-3 lg:bottom-4 lg:left-4 w-6 h-6 lg:w-8 lg:h-8 bg-white/5 rounded-full backdrop-blur-sm"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Swipe Hint */}
            <div className="absolute -bottom-8 sm:-bottom-12 left-1/2 transform -translate-x-1/2">
              <p className="text-gray-500 text-xs sm:text-sm text-center">
                ← Swipe or drag to explore →
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
