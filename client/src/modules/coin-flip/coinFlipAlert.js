import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const CoinFlipAlert = ({ open, setOpen, coins }) => {
  const [visibleCoins, setVisibleCoins] = useState([]);
  const controls = useAnimation();
  const [skipAnimation, setSkipAnimation] = useState(false);
  useEffect(() => {
    let timeouts = [];
    if (open && coins) {
      setVisibleCoins([]);
      console.log(coins);
      coins.forEach((coin, index) => {
        timeouts.push(
          setTimeout(() => {
            setVisibleCoins((prev) => [...prev, coin]);
          }, index * 3000)
        );
      });
    }

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [open, coins]);

  const close = () => setOpen(false);
  const handleSkipAnimation = (e) => {
    setSkipAnimation(true);
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Results</AlertDialogTitle>
          <AlertDialogDescription>
            {skipAnimation ? (
              <div className="grid grid-cols-5 gap-4">
                {coins.map((coin, index) => (
                  <div
                    key={index}
                    className={`w-full aspect-square rounded-full flex items-center justify-center shadow-base border-2 border-black ${
                      coin === 1 ? "bg-main" : "bg-white"
                    } font-semibold`}
                  >
                    {coin === 1 ? "Heads" : "Tails"}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-4">
                {visibleCoins.map((coin, index) => (
                  <motion.div
                    key={index}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 1440 }}
                    transition={{ duration: 3 }}
                    className={`w-full aspect-square rounded-full flex items-center justify-center shadow-base border-2 border-black ${
                      coin === 1 ? "bg-main" : "bg-white"
                    } font-semibold`}
                  >
                    {coin === 1 ? "Heads" : "Tails"}
                  </motion.div>
                ))}
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleSkipAnimation}>
            Skip Animation
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setSkipAnimation(false);
              close();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CoinFlipAlert;
