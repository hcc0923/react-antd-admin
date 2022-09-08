import React from "react";
import TypeWriterEffect from "typewriter-effect";

const TypeWriter: React.FC = (props: any) => {
  const { content } = props;
  const options: any = {
    strings: content,
    pauseFor: 100,
    autoStart: true,
  };
  return <TypeWriterEffect options={options} />;
};

export default TypeWriter;
