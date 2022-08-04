import { Button, Result } from "antd";
import React from "react";

const NotFound = (props) => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => props.history.push("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
