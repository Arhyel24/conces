"use client";

import React, { useState } from "react";
import { easeOut, motion } from "framer-motion";
import { Lock, User, Shield, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { apiClient } from "@/utils/api";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    apiClient
      .login(credentials.password)
      .then(() => {
        router.push("/admin/dashboard");
      })
      .catch(() => {
        setError("Invalid credentials. Please try again.");
        setTimeout(() => setError(""), 3000);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const shakeVariants = {
    shake: {
      x: [-10, 10, -10, 10, 0],
      transition: { duration: 0.5 },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    blur: {
      scale: 1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 to-slate-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 border border-blue-900 rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 border border-yellow-400 rotate-45"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-8"
      >
        <button
          onClick={() => router.replace("/")}
          className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full bg-slate-900/90 backdrop-blur-sm border border-slate-600 overflow-hidden relative z-10"
      >
        <div className="bg-gradient-to-r from-blue-800 to-blue-700 p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          >
            <Shield className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl font-bold text-white mb-2"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Admin Access
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-slate-300"
          >
            CONCES UNIMAID Portal
          </motion.p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
          animate={error ? "shake" : ""}
          variants={shakeVariants}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <label className="flex items-center text-sm font-medium text-slate-300 mb-3">
              <User className="h-4 w-4 mr-2 text-blue-400" />
              Username (Optional)
            </label>
            <motion.input
              variants={inputVariants}
              animate={focusedField === "username" ? "focus" : "blur"}
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              onFocus={() => setFocusedField("username")}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-4 border-b-2 bg-transparent focus:outline-none transition-all duration-300 ${
                focusedField === "username"
                  ? "border-yellow-400"
                  : "border-slate-500"
              } text-white placeholder-slate-300`}
              placeholder="Enter username"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <label className="flex items-center text-sm font-medium text-slate-300 mb-3">
              <Lock className="h-4 w-4 mr-2 text-blue-400" />
              Password
            </label>
            <div className="relative">
              <motion.input
                variants={inputVariants}
                animate={focusedField === "password" ? "focus" : "blur"}
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-4 pr-12 border-b-2 bg-transparent focus:outline-none transition-all duration-300 ${
                  focusedField === "password"
                    ? "border-yellow-400"
                    : "border-slate-500"
                } text-white placeholder-slate-300`}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-900/20 border border-red-500/50 p-3"
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-800 to-blue-700 text-white py-4 px-6 font-semibold hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Shield className="h-5 w-5" />
            <span>Login</span>
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
