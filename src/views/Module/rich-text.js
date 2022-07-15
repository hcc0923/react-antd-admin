import React, { Fragment, useState } from 'react';
import { 
    Spin,
    Row, 
    Col, 
    Card
} from 'antd';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';
import { SERVER_ADDRESS } from '@/utils/config';


function RichText() {
    const [spinning, setSpinning] = useState(false);
    const [editorContent, setEditorContent] = useState(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }
    const onContentStateChange = (editorContent) => {
        setEditorContent(editorContent);
    }
    const imageUploadCallBack = (file) => {
        return new Promise((resolve, reject) => {
            setSpinning(true);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `${SERVER_ADDRESS}/file/uploadAvatar`);
            
            const formData = new FormData();
            formData.append('avatar', file);
            xhr.send(formData);
            setSpinning(false);

            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                const { path, mimetype, size } = response.file;
                const dataResponse = {
                    data: {
                        link: `${SERVER_ADDRESS}/${path}`,
                        type: mimetype,
                        size
                    },
                    status: 200,
                    success: true
                };
                resolve(dataResponse);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        });
    }

    return (  
        <Spin spinning={spinning}>
            <Row>
                <Col span={24}>
                    <Card title="富文本编辑器" bordered>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={(value) => onEditorStateChange(value)}
                            toolbar={{
                                history: { inDropdown: true },
                                inline: { inDropdown: false },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                image: { uploadCallback: (file) => imageUploadCallBack(file) }
                            }}
                            onContentStateChange={(value) => onContentStateChange(value)}
                            placeholder="请输入正文"
                            spellCheck
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={12} className="mt-4">
                <Col span={12}>
                    <Card title="同步转换HTML" hoverable="true" bordered={false}>
                        <pre>{draftToHtml(editorContent)}</pre>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="同步转换Markdown" hoverable="true" bordered={false}>
                        <pre style={{ whiteSpace: 'pre-wrap' }}>{draftToMarkdown(editorContent)}</pre>
                    </Card>
                </Col>
            </Row>
        </Spin>
    );
}

export default RichText;