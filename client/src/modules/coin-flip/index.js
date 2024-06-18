import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CoinFlip = ({ isFlipping, result, setUserChoiced }) => {
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
    <div className="flex flex-col items-center justify-between h-full">
      {result === "loading" ? (
        <motion.div
          animate={controls}
          className={`${
            result === "Tails" ? "" : "bg-main"
          } border-2 border-black shadow-base rounded-full flex items-center justify-center h-full aspect-square`}
        >
          {"Heads"}
        </motion.div>
      ) : (
        <motion.div
          animate={controls}
          className={`${
            result === "Tails" ? "bg-white" : "bg-main"
          } border-2 border-black shadow-base rounded-full flex items-center justify-center h-full aspect-square`}
        >
          {result}
        </motion.div>
      )}
    </div>
  );
};

export default CoinFlip;
