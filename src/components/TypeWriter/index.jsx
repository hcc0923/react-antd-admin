import React from "react";
import TypeWriterEffect from "typewriter-effect";

const TypeWriter = (props) => {
  const { content } = props;
  return (
    <TypeWriterEffect
      options={{
        strings: content,
        autoStart: true,
      }}
    />
  );
};

export default TypeWriter;
