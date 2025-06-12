import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  const redirect = "/assignments";
  return (
    <motion.div
      className="text-center bg-gradient-to-r from-primary rounded-xl to-secondary text-white py-16 px-4"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl lg:text-6xl font-bold mb-4">
        Welcome to StudyTogether
      </h1>
      <p className="text-lg max-w-2xl mx-auto">
        Collaborate, create, and conquer assignments together. Empower your
        learning journey with a smart group-study platform.
      </p>
      <Link to={redirect} className="btn btn-accent mt-6">
        Explore Assignments
      </Link>
    </motion.div>
  );
};

export default Banner;
