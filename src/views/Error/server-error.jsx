import { Button, Result } from "antd";
import React from "react";

const ServerError = (props) => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => props.history.push("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default ServerError;
