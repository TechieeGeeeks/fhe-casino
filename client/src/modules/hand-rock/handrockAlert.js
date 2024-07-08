import React, { useEffect, useState, useRef } from "react";
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

const images = [
  "/rock-hand/rock.svg",
  "/rock-hand/paper.svg",
  "/rock-hand/scissors.svg",
];

const RockPaperScissorsAlert = ({ open, setOpen, userChoice, results }) => {
  const [visibleResults, setVisibleResults] = useState([]);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const compareVal = userChoice;
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

    const didUserWin = (userChoice, result) => {
      // Rock (0) beats Scissors (2)
      // Scissors (2) beat Paper (1)
      // Paper (1) beats Rock (0)
      if (
        (userChoice === 0 && result === 2) ||
        (userChoice === 2 && result === 1) ||
        (userChoice === 1 && result === 0)
      ) {
        return true;
      }
      return false;
    };

    let timeouts = [];
    if (open && results) {
      setVisibleResults([]);
      results.forEach((result, index) => {
        timeouts.push(
          setTimeout(() => {
            if (didUserWin(compareVal, result)) winning();
            setVisibleResults((prev) => [...prev, result]);
          }, index * 2000)
        );
      });
    }

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [open, results, compareVal, skipAnimation]);

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
          <AlertDialogDescription className="h-[55vh] overflow-y-scroll no-scrollbar p-4 border-2 border-black scroll-smooth">
            {skipAnimation ? (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="w-full aspect-square rounded-full flex items-center justify-center"
                  >
                    <img
                      src={images[result]}
                      alt={`Result ${result}`}
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {visibleResults.map((result, index) => (
                  <div
                    key={index}
                    className="w-full aspect-square rounded-full flex items-center justify-center"
                  >
                    <img
                      src={images[result]}
                      alt={`Result ${result}`}
                      className="w-full h-full"
                    />
                  </div>
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

export default RockPaperScissorsAlert;
