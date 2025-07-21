"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, Zap } from "lucide-react";

interface SuccessNotificationProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-6 shadow-xl max-w-sm backdrop-blur-sm"
        >
          <div className="flex items-start space-x-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex-shrink-0"
            >
              <div className="relative">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </motion.div>
              </div>
            </motion.div>

            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-bold text-green-800">
                    Welcome, Light Bearer!
                  </h3>
                  <Zap className="h-4 w-4 text-yellow-500" />
                </div>
                <p className="text-sm text-green-700">
                  Thank you! You are now a Light Bearer. Your membership
                  application has been submitted successfully to CONCES UNIMAID.
                </p>
              </motion.div>
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-green-400 hover:text-green-600 flex-shrink-0 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-400"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
