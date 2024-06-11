import Marquee from "@/components/ui/marquee";
import React from "react";

const SlotMachine = ({ isRunning, numbers }) => (
  <div className="w-[58.2%] h-[25.4%] bg-white rounded-lg border-2 border-black grid grid-cols-3 overflow-hidden">
    {isRunning ? (
      <>
        <Marquee vertical className="[--duration:0.6s]">
          {Array(3)
            .fill("xd")
            .map((_, id) => (
              <p key={id}>{id + 1}</p>
            ))}
        </Marquee>
        <Marquee
          vertical
          reverse={true}
          className="[--duration:0.6s] border border-black border-x-2 border-y-0">
          {Array(3)
            .fill("xd")
            .map((_, id) => (
              <p key={id}>{id + 1}</p>
            ))}
        </Marquee>
        <Marquee vertical className="[--duration:0.6s]">
          {Array(3)
            .fill("xd")
            .map((_, id) => (
              <p key={id}>{id + 1}</p>
            ))}
        </Marquee>
      </>
    ) : (
      <>
        <p>{numbers[0]}</p>
        <p className="border border-black border-x-2 border-y-0">
          {numbers[1]}
        </p>
        <p>{numbers[2]}</p>
      </>
    )}
  </div>
);

export default SlotMachine;
