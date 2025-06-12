import React from 'react';
import { motion } from "framer-motion";
const FAQ = () => {
    return (
      <motion.section
        className="w-full mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-gray-200">
          FAQs
        </h2>
        <div className="space-y-4  w-full">
          {[
            {
              question: "How do I create an assignment?",
              answer:
                "After logging in, go to 'Create Assignment' from the dropdown menu. Fill out the form and click submit.",
            },
            {
              question: "Can I update or delete assignments?",
              answer:
                "Yes, but only the assignments you've created. Others are restricted.",
            },
            {
              question: "How are assignments evaluated?",
              answer:
                "Submitted assignments are reviewed by peers (except self-submissions). Evaluators provide marks and feedback.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="collapse collapse-arrow w-full bg-base-200 dark:bg-gray-900"
            >
              <summary className="collapse-title text-lg font-medium  w-full dark:text-gray-300">
                {faq.question}
              </summary>
              <div className="collapse-content  w-full dark:text-gray-400">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </motion.section>
    );
};

export default FAQ;