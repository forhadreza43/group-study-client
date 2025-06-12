import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json"; 

export default function Loading({ size = 50 }) {
  return (
    <div className="flex justify-center items-center p-4 min-h-[calc(100vh-68px)]">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
