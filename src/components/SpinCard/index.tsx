import React from "react";
import { Spin, Card } from "antd";

const SpinCard = (props: any) => {
  const { spinning, title } = props;
  return (
    <Spin spinning={spinning}>
      <Card title={title} style={{ height: "calc(100vh - 100px - 2rem)", overflow: "hidden" }}>
        {props.children}
      </Card>
    </Spin>
  );
};

export default SpinCard;
