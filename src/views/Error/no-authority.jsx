import { Button, Result } from "antd";
import React from "react";

const NoAuthority = (props) => {
  const { history } = props;
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => history.push("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default NoAuthority;
