import { useEffect, useRef, useState } from "react";
import { BallManager } from "./BallManager";
import { WIDTH } from "./constants";
import { pad } from "./padding";

export function Simulation() {
  const canvasRef = useRef(null);
  const [outputs, setOutputs] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
  });

  async function simulate(ballManager) {
    let i = 0;
    while (true) {
      i++;
      ballManager.addBall(pad(WIDTH / 2 + 20 * (Math.random() - 0.5)));
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        canvasRef.current,
        (index, startX) => {
          setOutputs((outputs) => {
            return {
              ...outputs,
              [index]: [...outputs[index], startX],
            };
          });
        }
      );
      simulate(ballManager);

      return () => {
        ballManager.stop();
      };
    }
  }, [canvasRef]);
  console.log(outputs)

  return (
    <div className="flex flex-col mt-40 lg:flex-row items-center justify-between text-black overflow-auto">
      <div className="flex mx-16 flex-col justify-center pt-10 max-h-32">
        {JSON.stringify(outputs, null, 2)}
      </div>
      <div className="flex flex-col items-center justify-center">
        <canvas ref={canvasRef} width="800" height="800"></canvas>
      </div>
    </div>
  );
}
