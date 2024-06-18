import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "./ui/button";

const PlayButton = ({ handler, tokens }) => {
  const { login, authenticated } = usePrivy();

  return (
    <div className="w-full">
      {authenticated ? (
        <div className="w-full">
          {tokens && tokens === "0" ? (
            <Button onClick={handler} className="bg-main w-full">
              Buy Token
            </Button>
          ) : (
            <Button onClick={handler} className="bg-main w-full">
              Play
            </Button>
          )}
        </div>
      ) : (
        <Button onClick={login} className="bg-main w-full">
          Login
        </Button>
      )}
    </div>
  );
};

export default PlayButton;
