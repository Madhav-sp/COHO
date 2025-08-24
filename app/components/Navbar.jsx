// "use client";
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X } from "lucide-react";

// // Navbar Component
// function Navbar({ currentPage, onNavigate }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const navItems = [
//     { name: "Home", id: 0 },
//     { name: "About", id: 1 },
//     { name: "Events", id: 2 },
//     { name: "Join Us", id: 3 },
//   ];

//   const handleNavClick = (pageId) => {
//     onNavigate(pageId);
//     setIsOpen(false);
//   };

//   return (
//     <motion.nav
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
//       className="
//         fixed top-4 left-1/2 -translate-x-1/2 
//         flex items-center justify-between
//         px-6 py-3 w-[90%] max-w-4xl
//         bg-black/25 backdrop-blur-xl text-white
//         rounded-full shadow-2xl 
//         border border-white/10
//         z-50
//       "
//     >
//       {/* Logo */}
//       <motion.div
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="cursor-pointer"
//         onClick={() => handleNavClick(0)}
//       >
//         <h1 className="text-xl font-bold tracking-wider bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//           COHO
//         </h1>
//       </motion.div>

//       {/* Desktop Navigation */}
//       <div className="hidden md:flex items-center gap-6">
//         {navItems.map((item) => (
//           <motion.button
//             key={item.id}
//             onClick={() => handleNavClick(item.id)}
//             className={`
//               relative px-3 py-2 text-sm font-medium tracking-wide transition-all duration-300
//               ${
//                 currentPage === item.id
//                   ? "text-white"
//                   : "text-gray-300 hover:text-white"
//               }
//             `}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {item.name}

//             {/* Active indicator */}
//             {currentPage === item.id && (
//               <motion.div
//                 layoutId="activeTab"
//                 className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
//                 initial={false}
//                 transition={{ type: "spring", stiffness: 400, damping: 30 }}
//               />
//             )}

//             {/* Hover underline */}
//             <motion.span
//               className="absolute left-0 -bottom-1 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
//               initial={{ width: 0 }}
//               whileHover={{ width: "100%" }}
//               transition={{ duration: 0.3 }}
//             />
//           </motion.button>
//         ))}
//       </div>

//       {/* Mobile Menu Button */}
//       <motion.button
//         className="md:hidden relative z-10 p-2"
//         onClick={() => setIsOpen(!isOpen)}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//       >
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={isOpen ? "close" : "menu"}
//             initial={{ rotate: -90, opacity: 0 }}
//             animate={{ rotate: 0, opacity: 1 }}
//             exit={{ rotate: 90, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </motion.div>
//         </AnimatePresence>
//       </motion.button>

//       {/* Mobile Dropdown */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: -20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: -20 }}
//             transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
//             className="
//               absolute top-full mt-4 left-4 right-4
//               bg-black/40 backdrop-blur-xl
//               rounded-2xl shadow-2xl p-6
//               border border-white/10
//               md:hidden
//             "
//           >
//             <div className="flex flex-col gap-1">
//               {navItems.map((item, index) => (
//                 <motion.button
//                   key={item.id}
//                   onClick={() => handleNavClick(item.id)}
//                   className={`
//                     text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200
//                     ${
//                       currentPage === item.id
//                         ? "text-white bg-white/10 border border-white/20"
//                         : "text-gray-300 hover:text-white hover:bg-white/5"
//                     }
//                   `}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{
//                     duration: 0.3,
//                     delay: index * 0.1,
//                     ease: [0.25, 0.46, 0.45, 0.94],
//                   }}
//                   whileHover={{ x: 4 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   {item.name}
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// }

// const sections = [
//   { id: 0, title: "Home", bg: "linear-gradient(135deg, #000000, #0a0a0a)" },
//   { id: 1, title: "About", bg: "linear-gradient(135deg, #0f0f1a, #000000)" },
//   { id: 2, title: "Events", bg: "linear-gradient(135deg, #0a0f2a, #000000)" },
//   { id: 3, title: "Join Us", bg: "linear-gradient(135deg, #1a0520, #000000)" },
// ];
// 
// export default function FullPageScroll() {
//   const [page, setPage] = useState(0);
//   const [direction, setDirection] = useState(0);
//   const [animating, setAnimating] = useState(false);

//   const variants = {
//     enter: (direction) => ({
//       y: direction > 0 ? "100%" : "-100%",
//       opacity: 1,
//     }),
//     center: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         ease: [0.25, 0.46, 0.45, 0.94],
//       },
//     },
//     exit: (direction) => ({
//       y: direction < 0 ? "100%" : "-100%",
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         ease: [0.25, 0.46, 0.45, 0.94],
//       },
//     }),
//   };

//   const backgroundVariants = {
//     enter: {
//       scale: 1.1,
//       opacity: 0,
//     },
//     center: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         ease: [0.25, 0.46, 0.45, 0.94],
//       },
//     },
//     exit: {
//       scale: 0.9,
//       opacity: 0,
//       transition: {
//         duration: 0.8,
//         ease: [0.25, 0.46, 0.45, 0.94],
//       },
//     },
//   };

//   const paginate = (dir) => {
//     if (animating) return;
//     setAnimating(true);
//     setDirection(dir);

//     setPage((prev) => {
//       const next = prev + dir;
//       if (next < 0 || next >= sections.length) {
//         setAnimating(false);
//         return prev;
//       }
//       return next;
//     });

//     setTimeout(() => setAnimating(false), 800); // Slightly longer to match animation
//   };

//   const navigateToPage = (pageId) => {
//     if (animating || pageId === page) return;
//     setAnimating(true);
//     setDirection(pageId > page ? 1 : -1);
//     setPage(pageId);
//     setTimeout(() => setAnimating(false), 800);
//   };

//   // Wheel (trackpad / mouse) - Improved sensitivity
//   useEffect(() => {
//     let lastWheelTime = 0;

//     const handleWheel = (e) => {
//       const now = Date.now();
//       if (animating || now - lastWheelTime < 100) return; // Debounce

//       if (Math.abs(e.deltaY) > 30) {
//         // Lower threshold for better responsiveness
//         lastWheelTime = now;
//         if (e.deltaY > 0) paginate(1);
//         if (e.deltaY < 0) paginate(-1);
//       }
//     };

//     window.addEventListener("wheel", handleWheel, { passive: true });
//     return () => window.removeEventListener("wheel", handleWheel);
//   }, [animating]);

//   // Touch (mobile) - Improved for smoother swipes
//   useEffect(() => {
//     let touchStartY = 0;
//     let touchStartX = 0;
//     let isSwiping = false;

//     const handleTouchStart = (e) => {
//       touchStartY = e.touches[0].clientY;
//       touchStartX = e.touches[0].clientX;
//       isSwiping = false;
//     };

//     const handleTouchMove = (e) => {
//       if (!isSwiping) {
//         const touchCurrentY = e.touches[0].clientY;
//         const touchCurrentX = e.touches[0].clientX;
//         const deltaY = Math.abs(touchCurrentY - touchStartY);
//         const deltaX = Math.abs(touchCurrentX - touchStartX);

//         // Only trigger vertical swipe if Y movement is greater than X movement
//         if (deltaY > deltaX && deltaY > 10) {
//           isSwiping = true;
//           e.preventDefault(); // Prevent scrolling
//         }
//       }
//     };

//     const handleTouchEnd = (e) => {
//       if (!isSwiping) return;

//       const touchEndY = e.changedTouches[0].clientY;
//       const deltaY = touchStartY - touchEndY;

//       // Require minimum swipe distance and prevent if animating
//       if (Math.abs(deltaY) > 30 && !animating) {
//         if (deltaY > 0) {
//           paginate(1); // Swipe up - next page
//         } else {
//           paginate(-1); // Swipe down - previous page
//         }
//       }
//       isSwiping = false;
//     };

//     document.addEventListener("touchstart", handleTouchStart, {
//       passive: true,
//     });
//     document.addEventListener("touchmove", handleTouchMove, { passive: false });
//     document.addEventListener("touchend", handleTouchEnd, { passive: true });

//     return () => {
//       document.removeEventListener("touchstart", handleTouchStart);
//       document.removeEventListener("touchmove", handleTouchMove);
//       document.removeEventListener("touchend", handleTouchEnd);
//     };
//   }, [animating]);

//   return (
//     <div className="h-screen w-screen overflow-hidden relative bg-black">
//       {/* Navbar */}
//       <Navbar currentPage={page} onNavigate={navigateToPage} />

//       {/* Background layers with smooth transitions */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={`bg-${page}`}
//           variants={backgroundVariants}
//           initial="enter"
//           animate="center"
//           exit="exit"
//           style={{
//             background: sections[page].bg,
//           }}
//           className="absolute top-0 left-0 w-full h-full"
//         />
//       </AnimatePresence>

//       {/* Page content with improved transitions */}
//       <AnimatePresence mode="wait" custom={direction}>
//         <motion.div
//           key={`content-${page}`}
//           custom={direction}
//           variants={variants}
//           initial="enter"
//           animate="center"
//           exit="exit"
//           className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-4xl md:text-5xl font-bold z-10 pt-20"
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{
//               duration: 0.5,
//               delay: 0.2,
//               ease: [0.25, 0.46, 0.45, 0.94],
//             }}
//           >
//             {sections[page].title}
//           </motion.div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Navigation dots */}
//       <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-20 space-y-3">
//         {sections.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => {
//               if (!animating && index !== page) {
//                 setDirection(index > page ? 1 : -1);
//                 setPage(index);
//                 setAnimating(true);
//                 setTimeout(() => setAnimating(false), 800);
//               }
//             }}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               index === page
//                 ? "bg-white scale-125"
//                 : "bg-white/30 hover:bg-white/60"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
