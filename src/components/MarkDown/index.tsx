import React from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const MarkDown: React.FC = () => {
  return (
    <Editor
      initialValue="hello react editor world!"
      previewStyle="vertical"
      height="35rem"
      initialEditType="markdown"
      useCommandShortcut={true}
    />
  );
};

export default MarkDown;
