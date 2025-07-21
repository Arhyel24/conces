"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  MapPin,
  Heart,
  Gamepad2,
  Quote,
  CheckCircle,
  ArrowLeft,
  Zap,
  Settings,
  Hash,
} from "lucide-react";
import { ENGINEERING_DEPARTMENTS, NIGERIAN_STATES } from "@/utils/constants";
import { apiClient } from "@/utils/api";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";
import { SuccessNotification } from "@/components/SuccessNotification";

interface RegistrationPageProps {
  onNavigate: (page: "landing") => void;
  onSuccess: () => void;
}

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    idNumber: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    department: "",
    dateOfBirth: "",
    stateOfOrigin: "",
    interests: "",
    hobbies: "",
    bestEngineeringQuote: "",
  });
  const router = useRouter();
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.idNumber.trim()) newErrors.idNumber = "ID number is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.stateOfOrigin)
      newErrors.stateOfOrigin = "State of origin is required";
    if (!formData.interests.trim())
      newErrors.interests = "Interests are required";
    if (!formData.hobbies.trim()) newErrors.hobbies = "Hobbies are required";
    if (!formData.bestEngineeringQuote.trim())
      newErrors.bestEngineeringQuote = "Engineering quote is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (
      formData.phoneNumber &&
      !phoneRegex.test(formData.phoneNumber.replace(/\D/g, ""))
    ) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await apiClient.createMember(formData);

      setFormData({
        idNumber: "",
        fullName: "",
        phoneNumber: "",
        email: "",
        department: "",
        dateOfBirth: "",
        stateOfOrigin: "",
        interests: "",
        hobbies: "",
        bestEngineeringQuote: "",
      });

      showToast({
        type: "success",
        title: "Registration Successful",
        description: "Member has been registered successfully.",
      });
      setShowSuccessNotification(true);
    } catch (error) {
      console.error("Error submitting form:", error);

      if (
        error instanceof Error &&
        error.message.includes("ID number already exists")
      ) {
        setErrors({ idNumber: "This ID number is already registered" });

        showToast({
          type: "warning",
          title: "Duplicate Entry",
          description: "This ID number is already registered.",
        });
      } else {
        setErrors({
          general: "Failed to submit registration. Please try again.",
        });

        showToast({
          type: "error",
          title: "Submission Failed",
          description: "Please check your input and try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 to-slate-500 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mb-8"
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
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="mr-4"
            >
              <Settings className="h-8 w-8 text-yellow-400" />
            </motion.div>
            <Zap className="h-12 w-12 text-blue-900" />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="ml-4"
            >
              <Settings className="h-8 w-8 text-yellow-400" />
            </motion.div>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Join the Light Bearers
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Complete your registration to become part of the CONCES UNIMAID
            fellowship
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
        </motion.div>

        {/* Form */}
        <motion.div
          variants={itemVariants}
          className="bg-slate-700/80 backdrop-blur-sm border border-slate-500 p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* ID Number */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center text-sm font-medium text-slate-200 mb-3">
                  <Hash className="h-4 w-4 mr-2 text-blue-400" />
                  ID Number
                </label>
                <motion.input
                  variants={inputVariants}
                  animate={focusedField === "idNumber" ? "focus" : "blur"}
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("idNumber")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-4 border-b-2 bg-transparent focus:outline-none transition-all duration-300 ${
                    errors.idNumber
                      ? "border-red-500"
                      : focusedField === "idNumber"
                      ? "border-yellow-400"
                      : "border-slate-400"
                  } text-white placeholder-slate-300`}
                  placeholder="Enter ID number (e.g., 22/05/04/0011)"
                />
                {errors.idNumber && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {errors.idNumber}
                  </motion.p>
                )}
              </motion.div>

              {/* Full Name */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center text-sm font-medium text-slate-200 mb-3">
                  <User className="h-4 w-4 mr-2 text-blue-400" />
                  Full Name
                </label>
                <motion.input
                  variants={inputVariants}
                  animate={focusedField === "fullName" ? "focus" : "blur"}
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("fullName")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-4 border-b-2 bg-transparent focus:outline-none transition-all duration-300 ${
                    errors.fullName
                      ? "border-red-500"
                      : focusedField === "fullName"
                      ? "border-yellow-400"
                      : "border-slate-400"
                  } text-white placeholder-slate-300`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {errors.fullName}
                  </motion.p>
                )}
              </motion.div>

              {/* Phone Number */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center text-sm font-medium text-slate-200 mb-3">
                  <Phone className="h-4 w-4 mr-2 text-blue-400" />
                  Phone Number
                </label>
                <motion.input
                  variants={inputVariants}
                  animate={focusedField === "phoneNumber" ? "focus" : "blur"}
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("phoneNumber")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-4 border-b-2 bg-transparent focus:outline-none transition-all duration-300 ${
                    errors.phoneNumber
                      ? "border-red-500"
                      : focusedField === "phoneNumber"
                      ? "border-yellow-400"
                      : "border-slate-400"
                  } text-white placeholder-slate-300`}
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {errors.phoneNumber}
                  </motion.p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center text-sm font-medium text-slate-200 mb-3">
                  <Mail className="h-4 w-4 mr-2 text-blue-400" />
                  Email Address
                </label>
                <motion.input
                  variants={inputVariants}
                  animate={focusedField === "email" ? "focus" : "blur"}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-4 border-b-2 bg-transparent focus:outline-none transition-all duration-300 ${
                    errors.email
                      ? "border-red-500"
                      : focusedField === "email"
                      ? "border-yellow-400"
                      : "border-slate-400"
                  } text-white placeholder-slate-300`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>

              {/* Department */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center text-sm font-medium text-slate-200 mb-3">
                  <GraduationCap className="h-4 w-4 mr-2 text-blue-400" />
                  Department
                </label>
                <motion.select
                  variants={inputVariants}
                  animate={focusedField === "department" ? "focus" : "blur"}
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("department")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-4 border-b-2 bg-transparent focus:outline-none transition-all duration-300 ${
                    errors.department
                      ? "border-red-500"
                      : focusedField === "department"
                      ? "border-yellow-400"
                      : "border-slate-400"
                  } text-white`}
                >
                  <option value="">Select your department</option>
                  {ENGINEERING_DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </motion.select>
                {errors.department && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {errors.department}
                  </motion.p>
                )}
              </motion.div>

              {/* Date of Birth */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center text-sm font-medium text-slate-200 mb-3">
                  <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                  Date of Birth
                </label>
                <motion.input
                  variants={inputVariants}
                  animate={focusedField === "dateOfBirth" ? "focus" : "blur"}
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("dateOfBirth")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-4 border-b-2 bg-transparent focus:outline-none transition-all duration-300 ${
                    errors.dateOfBirth
                      ? "border-red-500"
                      : focusedField === "dateOfBirth"
                      ? "border-yellow-400"
                      : "border-slate-400"
                  } text-white`}
                />
                {errors.dateOfBirth && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {errors.dateOfBirth}
                  </motion.p>
                )}
              </motion.div>

              {/* State of Origin */}
              <motion.div variants={itemVariants}>
                <label className="flex items-center text-sm font-medium text-slate-200 mb-3">
                  <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                  State of Origin
                </label>
                <motion.select
                  variants={inputVariants}
                  animate={focusedField === "stateOfOrigin" ? "focus" : "blur"}
                  name="stateOfOrigin"
                  value={formData.stateOfOrigin}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("stateOfOrigin")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-4 border-b-2 bg-transparent focus:outline-none transition-all duration-300 ${
                    errors.stateOfOrigin
                      ? "border-red-500"
                      : focusedField === "stateOfOrigin"
                      ? "border-yellow-400"
                      : "border-slate-400"
                  } text-white`}
                >
                  <option value="">Select your state</option>
                  {NIGERIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </motion.select>
                {errors.stateOfOrigin && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {errors.stateOfOrigin}
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Interests */}
            <motion.div variants={itemVariants}>
              <label className="flex items-center text-sm font-medium text-slate-200 mb-3">
                <Heart className="h-4 w-4 mr-2 text-blue-400" />
                Interests
              </label>
              <motion.textarea
                variants={inputVariants}
                animate={focusedField === "interests" ? "focus" : "blur"}
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                onFocus={() => setFocusedField("interests")}
                onBlur={() => setFocusedField(null)}
                rows={4}
                className={`w-full px-4 py-4 border-b-2 bg-transparent focus:outline-none transition-all duration-300 resize-none ${
                  errors.interests
                    ? "border-red-500"
                    : focusedField === "interests"
                    ? "border-yellow-400"
                    : "border-slate-400"
                } text-white placeholder-slate-300`}
                placeholder="Tell us about your interests..."
              />
              {errors.interests && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {errors.interests}
                </motion.p>
              )}
            </motion.div>

            {/* Hobbies */}
            <motion.div variants={itemVariants}>
              <label className="flex items-center text-sm font-medium text-slate-200 mb-3">
                <Gamepad2 className="h-4 w-4 mr-2 text-blue-400" />
                Hobbies
              </label>
              <motion.textarea
                variants={inputVariants}
                animate={focusedField === "hobbies" ? "focus" : "blur"}
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
                onFocus={() => setFocusedField("hobbies")}
                onBlur={() => setFocusedField(null)}
                rows={4}
                className={`w-full px-4 py-4 border-b-2 bg-transparent focus:outline-none transition-all duration-300 resize-none ${
                  errors.hobbies
                    ? "border-red-500"
                    : focusedField === "hobbies"
                    ? "border-yellow-400"
                    : "border-slate-400"
                } text-white placeholder-slate-300`}
                placeholder="Share your hobbies..."
              />
              {errors.hobbies && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {errors.hobbies}
                </motion.p>
              )}
            </motion.div>

            {/* Best Engineering Quote */}
            <motion.div variants={itemVariants}>
              <label className="flex items-center text-sm font-medium text-slate-200 mb-3">
                <Quote className="h-4 w-4 mr-2 text-blue-400" />
                Best Engineering Quote
              </label>
              <motion.input
                variants={inputVariants}
                animate={
                  focusedField === "bestEngineeringQuote" ? "focus" : "blur"
                }
                type="text"
                name="bestEngineeringQuote"
                value={formData.bestEngineeringQuote}
                onChange={handleChange}
                onFocus={() => setFocusedField("bestEngineeringQuote")}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-4 border-b-2 bg-transparent focus:outline-none transition-all duration-300 ${
                  errors.bestEngineeringQuote
                    ? "border-red-500"
                    : focusedField === "bestEngineeringQuote"
                    ? "border-yellow-400"
                    : "border-slate-400"
                } text-white placeholder-slate-300`}
                placeholder="Share your favorite engineering quote..."
              />
              {errors.bestEngineeringQuote && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {errors.bestEngineeringQuote}
                </motion.p>
              )}
            </motion.div>

            {errors.general && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-900/20 border border-red-500/50 p-4 text-center"
              >
                <p className="text-red-400">{errors.general}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="text-center pt-8">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className="bg-gradient-to-r from-blue-800 to-blue-700 text-white px-12 py-4 text-lg font-semibold hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-3 mx-auto"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Settings className="h-5 w-5" />
                    </motion.div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Submit Application</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
      <SuccessNotification
        isVisible={showSuccessNotification}
        onClose={() => setShowSuccessNotification(false)}
      />
    </div>
  );
};

export default RegistrationPage;
