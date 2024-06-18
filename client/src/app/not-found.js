"use client";
import React from "react";
import Lottie from "lottie-react";
import notFoundAnimation from "@/assets/404nf.json";

const NotFoundPage = () => {
  return (
    <div className="grid place-items-center min-h-[120vh] p-20">
      <div className="w-[35%]">
        <Lottie animationData={notFoundAnimation} loop={true} />
        {/* <dotlottie-player
          autoplay
          loop
          playMode="normal"
          src="/404nf.json"
        ></dotlottie-player> */}
        {/* <Lottie animationData={'/404nf.json'} loop={true} /> */}
      </div>
    </div>
  );
};

export default NotFoundPage;
