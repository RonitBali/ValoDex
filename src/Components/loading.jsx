import React from "react";
import { motion } from "framer-motion";

const loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
      {/* Spinning Icon */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="w-20 h-20 border-t-4 border-red-500 border-solid rounded-full"
      ></motion.div>

      {/* Loading Text */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1.5, ease:"easeInOut" }}
        className="mt-5 text-xl font-semibold text-white"
      >
        Loading Agents...
      </motion.h1>
    </div>
  );
};

export default loading;
