import React, { Fragment } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const Uploading: React.FC = (props: any) => {
  const { uploading } = props;

  return (
    <Fragment>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>Upload</div>
    </Fragment>
  );
};

export default Uploading;
