import React from 'react';
import { motion } from "framer-motion";

const Feature = () => {
    return (
      <motion.section
        className="w-full mx-auto"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-gray-200">
          Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Create & Manage Assignments",
              desc: "Easily create new assignments, update or delete your own, and manage submissions with ease.",
            },
            {
              title: "Secure Submission & Evaluation",
              desc: "Students can submit assignments via Google Docs links and receive marks and feedback securely.",
            },
            {
              title: "Protected Routes & User Profiles",
              desc: "Access personalized routes, pending evaluations, and profile-based access control.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-base-100 dark:bg-gray-900 shadow-lg p-6 rounded-lg border"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-xl font-semibold mb-2 dark:text-gray-300">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    );
};

export default Feature;