import React, { useState } from "react";
import { ArrowRight, Code2, Sparkles, Users, Zap } from "lucide-react";

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
    console.log("Form submitted:", formData);
    alert("Application submitted! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-700/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-gray-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>

      <div className="relative w-full max-w-2xl z-10">
        {/* Header */}
        <div className="text-center mb-10 transform hover:scale-105 transition-transform duration-500">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-white/10 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
            <div className="relative bg-gray-900 border border-gray-700 p-4 rounded-2xl shadow-2xl">
              <Code2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-white">
            Join Code Hoppers
          </h1>
          <p className="text-gray-400">Elevate your coding journey with us</p>

          {/* Feature badges */}
          <div className="flex justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-gray-900/70 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50">
              <Users className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-300">Community</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-900/70 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50">
              <Zap className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-300">Growth</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="relative group">
          {/* Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-3xl blur-lg opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>

          {/* Main card */}
          <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-gray-700/70 rounded-3xl p-6 md:p-8 shadow-2xl transform transition-all duration-500 hover:shadow-white/5 hover:-translate-y-2">
            <div className="space-y-5">
              {/* Name */}
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-5 py-3 bg-gray-900/80 border border-gray-700/70 rounded-xl text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-300 shadow-md hover:shadow-white/5"
                required
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-5 py-3 bg-gray-900/80 border border-gray-700/70 rounded-xl text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-300 shadow-md hover:shadow-white/5"
                required
              />

              {/* University */}
              <input
                type="text"
                name="university"
                placeholder="University/College"
                value={formData.university}
                onChange={handleInputChange}
                className="w-full px-5 py-3 bg-gray-900/80 border border-gray-700/70 rounded-xl text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-300 shadow-md hover:shadow-white/5"
              />

              {/* Message */}
              <textarea
                name="message"
                placeholder="Tell us about your coding interests..."
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-5 py-3 bg-gray-900/80 border border-gray-700/70 rounded-xl text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-300 resize-none shadow-md hover:shadow-white/5"
              />

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="w-full relative group overflow-hidden bg-white hover:bg-gray-100 text-black font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-white/20 active:translate-y-0"
                style={{
                  boxShadow:
                    "0 8px 20px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Submit Application
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-800/50 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="text-sm">We'll respond within 48 hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute -top-8 -right-8 w-16 h-16 bg-gray-700/20 rounded-full opacity-30 animate-bounce delay-1000"></div>
        <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gray-600/20 rounded-full opacity-40 animate-bounce delay-2000"></div>
        <div className="absolute top-1/2 -right-12 w-8 h-8 bg-gray-500/20 rounded-full opacity-35 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Join;
