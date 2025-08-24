"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Join = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here - could integrate with your backend or Google Forms
    console.log("Form submitted:", formData);

    // For now, redirect to Google Form
    window.open("https://forms.gle/your-google-form-link", "_blank");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[15rem] font-black text-white/5 select-none tracking-wider">
          JOIN
        </h1>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-xl p-8 sm:p-10 rounded-2xl shadow-2xl backdrop-blur-sm bg-slate-800/30 border border-slate-700/50"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl font-bold mb-4 text-center text-white"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Join Code Hoppers
        </motion.h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-center mb-8 text-sm sm:text-base leading-relaxed">
          Be part of an innovative community where coding meets creativity.
          Connect, learn, and build together with passionate developers.
        </p>

        {/* Join Form */}
        <div className="flex flex-col gap-5">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-gray-400 focus:border-slate-500 focus:outline-none transition-colors duration-300"
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-gray-400 focus:border-slate-500 focus:outline-none transition-colors duration-300"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="university"
              placeholder="Your University/College"
              value={formData.university}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-gray-400 focus:border-slate-500 focus:outline-none transition-colors duration-300"
            />
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Why do you want to join Code Hoppers? Tell us about your coding interests..."
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-gray-400 focus:border-slate-500 focus:outline-none transition-colors duration-300 resize-none"
              required
            />
          </div>

          {/* Button */}
          <motion.button
            onClick={handleSubmit}
            className="mt-4 flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Application
            <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-slate-700/50">
          <p className="text-xs sm:text-sm text-gray-500 text-center">
            We'll review your application and get back to you within 48 hours.
          </p>
        </div>
      </motion.div>
    </main>
  );
};

export default Join;
