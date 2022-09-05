import React from "react";
import { SERVER_ADDRESS } from "@/utils/config";

const PdfPreview = () => {
  const iFrameHeight = document.body.scrollHeight;
  return (
    <iframe
      style={{
        width: "100%",
        height: iFrameHeight,
        overflow: "visible",
      }}
      src={`${SERVER_ADDRESS}/file.pdf`}
      width="100%"
      height={iFrameHeight}
      scrolling="no"
      frameBorder="0"
    />
  );
};

export default PdfPreview;
