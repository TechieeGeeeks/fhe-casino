import React, { useEffect, useState, useRef } from "react";
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
} from "@/components/ui/alert-dialog";
import confetti from "canvas-confetti";

const CoinFlipAlert = ({ open, setOpen, userChoice, coins }) => {
  const [visibleCoins, setVisibleCoins] = useState([]);
  const controls = useAnimation();
  const [skipAnimation, setSkipAnimation] = useState(false);
  const compareVal = userChoice === "Heads" ? 1 : 0;
  const audioRef = useRef(null);

  useEffect(() => {
    const winning = () => {
      if (skipAnimation) return;

      if (audioRef.current) {
        audioRef.current.play();
      }

      const end = Date.now() + 1 * 1000; // 2 seconds
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

      const frame = () => {
        if (Date.now() > end) return;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };

      frame();
    };

    let timeouts = [];
    if (open && coins) {
      setVisibleCoins([]);
      console.log(coins);
      coins.forEach((coin, index) => {
        timeouts.push(
          setTimeout(() => {
            if (coin === compareVal) winning();
            setVisibleCoins((prev) => [...prev, coin]);
          }, index * 2000)
        );
      });
    }

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [open, coins, compareVal, skipAnimation]);

  const close = () => setOpen(false);
  const handleSkipAnimation = () => {
    setSkipAnimation(true);
  };

  return (
    <AlertDialog open={open}>
      <audio ref={audioRef} src="/audio/you-winn.mp3" />
      <AlertDialogContent className="min-h-[85vh] min-w-[65vw] flex items-center justify-center">
        <AlertDialogHeader className={"w-full h-full"}>
          <AlertDialogTitle className="fixed top-8">Results</AlertDialogTitle>
          <AlertDialogDescription className="h-[55vh] overflow-y-scroll no-scrollbar p-4 border-2 border-black shadow-strong scroll-smooth">
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
                    transition={{ duration: 2 }}
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
        <AlertDialogFooter className={"fixed bottom-8 right-8"}>
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
