import { useEffect, useRef, useState } from "react";
import { BallManager } from "./BallManager";

export function PlinkoGame({ canvasRef }) {
  // const [ballManager, setBallManager] = useState();
  // const canvasRef = useRef();

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     const ballManager = new BallManager(canvasRef.current);
  //     setBallManager(ballManager);
  //   }
  // }, [canvasRef]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <canvas ref={canvasRef} width="800" height="800"></canvas>
    </div>
  );
}
