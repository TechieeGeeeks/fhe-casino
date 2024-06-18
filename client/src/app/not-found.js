"use client";
import React from "react";
import "@dotlottie/player-component";

const NotFoundPage = () => {
  return (
    <div className="grid place-items-center min-h-[120vh] p-20">
      <div className="w-[35%]">
        <dotlottie-player
          autoplay
          loop
          playMode="normal"
          src="/404nf.json"
        ></dotlottie-player>
        {/* <Lottie animationData={'/404nf.json'} loop={true} /> */}
      </div>
    </div>
  );
};

export default NotFoundPage;
