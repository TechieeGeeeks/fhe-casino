import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const CoinFlip = ({ isFlipping, result }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isFlipping) {
      controls.start({
        rotateY: 360,
        scale: [1, 1.2, 1],
        transition: {
          rotateY: {
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          },
          scale: {
            duration: 0.5,
          },
        },
      });
    } else {
      controls.start({
        rotateY: 0,
        scale: [1, 1.2, 1],
        transition: {
          rotateY: {
            duration: 0.5,
          },
          scale: {
            duration: 0.5,
          },
        },
      });
    }
  }, [isFlipping, controls]);

  return (
    <div className="flex flex-col items-center justify-center absolute mt-20">
      <motion.div
        animate={controls}
        className="bg-main border-2 border-black shadow-base w-52 aspect-square rounded-full flex items-center justify-center">
        {result}
      </motion.div>
    </div>
  );
};

export default CoinFlip;
