import React from "react";
import { Card } from "antd";
import TypeWriter from "@/components/TypeWriter";

const TypeEffect = () => {
  const content = `
    Hello everyone this project is <strong style="color: #1890ff;">react-antd-admin</strong>
    <br>
    The package for typing effects used here is <strong style="color: #1890ff;">typewriter-effect</strong>
    <br>
    This package is very powerful and the compressed size is only <strong style="color: #1890ff;">9.5KB</strong>
  `;
  return (
    <Card title="打字效果">
      <TypeWriter content={content} />
    </Card>
  );
};

export default TypeEffect;
