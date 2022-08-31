import React from "react";
import TypeWriterEffect from "typewriter-effect";

const TypeWriter = (props) => {
  const { content } = props;
  return (
    <TypeWriterEffect
      options={{
        strings: content,
        pauseFor: 100,
        autoStart: true,
      }}
    />
  );
};

export default TypeWriter;
