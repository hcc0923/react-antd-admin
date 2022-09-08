import React from "react";
import { Spin, Card } from "antd";

const SpinCard: React.FC = (props: any) => {
  const { spinning, title } = props;
  return (
    <Spin spinning={spinning}>
      <Card title={title} style={{ height: "calc(100vh - 100px - 2rem)" }}>
        {props.children}
      </Card>
    </Spin>
  );
};

export default SpinCard;
