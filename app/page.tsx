"use client";

import React from "react";
import { easeOut, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Zap,
  Settings,
  Users,
  Heart,
  BookOpen,
  Target,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import { FELLOWSHIP_INFO } from "@/utils/constants";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const router = useRouter();

  // Demo images for carousel
  const onNavigate = (path: string) => {
    router.push(`/${path}`);
  };

  const carouselImages = [
    {
      url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Fellowship Gathering",
    },
    {
      url: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Prayer Session",
    },
    {
      url: "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Engineering Workshop",
    },
    {
      url: "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Community Service",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 to-slate-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 border border-blue-900 rounded-full"></div>
        <div className="absolute top-40 right-32 w-32 h-32 border border-yellow-400 rotate-45"></div>
        <div className="absolute bottom-32 left-1/3 w-48 h-48 border border-blue-900 rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-yellow-400 rounded-full"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="mr-4"
                >
                  <Settings className="h-12 w-12 text-yellow-400" />
                </motion.div>
                <Zap className="h-16 w-16 text-blue-900" />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="ml-4"
                >
                  <Settings className="h-12 w-12 text-yellow-400" />
                </motion.div>
              </div>

              <motion.h1
                variants={textVariants}
                className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                The Light Bearers
              </motion.h1>

              <motion.p
                variants={textVariants}
                className="text-2xl md:text-3xl text-yellow-500 font-semibold mb-2"
              >
                Manifesting God in Every Step
              </motion.p>

              <motion.p
                variants={textVariants}
                className="text-lg text-slate-300 max-w-2xl mx-auto"
              >
                Coalition of Christian Engineering Students | University of
                Maiduguri
              </motion.p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.button
                onClick={() => onNavigate("register")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-blue-800 to-blue-700 text-white px-8 py-4 text-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Join Us</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.button>

              <motion.button
                onClick={() => onNavigate("members")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 text-lg font-semibold hover:bg-yellow-400 hover:text-slate-600 transition-all duration-300"
              >
                View Members
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* About CONCES Section */}
        <section className="py-20 px-4 bg-slate-700/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                About CONCES
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-slate-600 border-2 border-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Our Purpose
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  To unite Christian engineering students in fellowship,
                  worship, and academic excellence while manifesting God's light
                  in our professional journey.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-slate-600 border-2 border-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Our Vision
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  To raise godly engineers who will impact society through
                  innovative solutions while maintaining unwavering faith and
                  Christian values.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-slate-600 border-2 border-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Our Values
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Excellence in academics, integrity in character, service to
                  humanity, and unwavering commitment to spreading God's light
                  through engineering.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Fellowship Info Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-800 to-blue-700">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Fellowship Information
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-slate-700/50 backdrop-blur-sm p-8 border border-yellow-400/30 hover:bg-slate-600/50 transition-all duration-300"
              >
                <Calendar className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Day</h3>
                <p className="text-slate-300 text-lg">{FELLOWSHIP_INFO.day}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-slate-700/50 backdrop-blur-sm p-8 border border-yellow-400/30 hover:bg-slate-600/50 transition-all duration-300"
              >
                <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Time</h3>
                <p className="text-slate-300 text-lg">{FELLOWSHIP_INFO.time}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-slate-700/50 backdrop-blur-sm p-8 border border-yellow-400/30 hover:bg-slate-600/50 transition-all duration-300"
              >
                <MapPin className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Venue</h3>
                <p className="text-slate-300 text-lg">
                  {FELLOWSHIP_INFO.venue}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Photo Carousel Section */}
        <section className="py-20 px-4 bg-slate-600/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Fellowship Moments
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-96 overflow-hidden">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={carouselImages[currentSlide].url}
                    alt={carouselImages[currentSlide].caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {carouselImages[currentSlide].caption}
                    </h3>
                    <p className="text-slate-200">CONCES UNIMAID Fellowship</p>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 transition-all duration-200"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 transition-all duration-200"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-6">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentSlide ? "bg-yellow-400" : "bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 px-4 bg-slate-700">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-4xl md:text-5xl font-bold text-white mb-8"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Become a Light Bearer Today
              </h2>
              <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                Join a community of passionate Christian engineers committed to
                excellence, faith, and service. Together, we'll manifest God's
                light in every step of our engineering journey.
              </p>

              <motion.button
                onClick={() => onNavigate("register")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-blue-800 to-blue-700 text-white px-12 py-6 text-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-3 mx-auto"
              >
                <Users className="h-6 w-6" />
                <span>Join the Fellowship</span>
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="h-6 w-6" />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Admin Access Section */}
        <section className="py-12 px-4 bg-slate-800 border-t border-slate-600">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-slate-400 mb-4">Administrative Access</p>
              <motion.button
                onClick={() => onNavigate("admin")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white px-6 py-3 transition-all duration-300 mx-auto"
              >
                <Shield className="h-4 w-4" />
                <span>Admin Login</span>
              </motion.button>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default LandingPage;
