import React from "react";
import notFoundImage from "../assets/dataNotFound.json";
import Lottie from "lottie-react";
const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center px-4">
      <Lottie
        animationData={notFoundImage}
        loop={true}
        //   style={{ width: size, height: size }}
      />
      {/* <Link to="/" className="btn btn-primary">
        ⬅ Back to Home
      </Link> */}
    </div>
  );
};

export default NotFound;
