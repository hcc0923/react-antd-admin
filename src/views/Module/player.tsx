import React from "react";
import ReactPlayer from "@/components/ReactPlayer";

const Player = () => {
  return (
    <div style={{ width: "100%", height: "calc(100vh - 100px - 2rem)" }}>
      <ReactPlayer />
    </div>
  );
};

export default Player;
