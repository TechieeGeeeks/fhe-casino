import React, { useState } from "react";
import { motion } from "framer-motion";

const HandRock = ({
  userImage,
  images,
  currentImageIndex,
  isPlaying,
  result,
}) => {
  return (
    <div>
      <div className="flex justify-between">
        <motion.img
          src={images[userImage]}
          width={"35%"}
          style={{ rotate: "45deg" }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        />
        {isPlaying ? (
          <motion.img
            src={images[currentImageIndex]}
            width={"35%"}
            style={{ rotate: "-45deg" }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          />
        ) : (
          <motion.img
            src={images[result]}
            width={"35%"}
            style={{ rotate: "-45deg" }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          />
        )}
      </div>
    </div>
  );
};

export default HandRock;
