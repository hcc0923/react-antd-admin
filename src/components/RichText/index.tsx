import React, { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import { Row, Col, Card } from "antd";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { SERVER_ADDRESS } from "@/utils/config";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichText: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const intl = useIntl();
  const formatMessage = (id: string): string => {
    return intl.formatMessage({ id });
  };
  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };
  const imageUploadCallBack = (file: any) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${SERVER_ADDRESS}/file/uploadAvatar`);

      const formData = new FormData();
      formData.append("avatar", file);
      xhr.send(formData);

      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        const { path, mimetype, size } = response.file;
        const dataResponse = {
          data: {
            link: `${SERVER_ADDRESS}/${path}`,
            type: mimetype,
            size,
          },
          status: 200,
          success: true,
        };
        resolve(dataResponse);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };

  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <Card title={formatMessage("module.richtext.title")} bordered>
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                history: { inDropdown: true },
                inline: { inDropdown: false },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                image: {
                  uploadCallback: (file: any) => imageUploadCallBack(file),
                },
              }}
              wrapperStyle={{ height: "35rem" }}
              placeholder={formatMessage("module.richtext.placeholder")}
              spellCheck
            />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default RichText;
