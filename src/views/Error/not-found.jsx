import { Button, Result } from "antd";
import React from "react";

const NotFound = (props) => {
  const { history } = props;
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => history.push("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
