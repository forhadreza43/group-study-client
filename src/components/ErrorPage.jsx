import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import errorImage from "../assets/404.json";
import Lottie from "lottie-react";
const ErrorPage = ({ size = 500 }) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* <h1 className="text-7xl font-bold text-error mb-4">404</h1>
      <p className="text-xl text-gray-500 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p> */}

      <Lottie
        animationData={errorImage}
        loop={true}
        style={{ width: size, height: size }}
      />
      <Link to="/" className="btn btn-primary">
        ⬅ Back to Home
      </Link>
    </motion.div>
  );
};

export default ErrorPage;
