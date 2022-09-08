import React from "react";
import ReactPlayer from "react-player";

const Player: React.FC = () => {
  return <ReactPlayer width="100%" height="100%" controls url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />;
};

export default Player;
