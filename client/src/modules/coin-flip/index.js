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
      <motion.div
        animate={controls}
        className="bg-main border-2 border-black shadow-base w-52 aspect-square rounded-full flex items-center justify-center">
        {result}
      </motion.div>

      <div>
        <RadioGroup
          // defaultValue="comfortable"
          className="flex"
          onValueChange={(e) => setUserChoiced(e)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="heads" id="r1" />
            <Label htmlFor="r1">Heads</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tails" id="r2" />
            <Label htmlFor="r2">Tails</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default CoinFlip;
