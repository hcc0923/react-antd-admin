import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './richtext.less';
import { SERVER_ADDRESS } from '@/utils/config';


class RichText extends Component {
    state = { 
        editorContent: undefined,
        editorState: EditorState.createEmpty() 
    };
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    onContentStateChange = (editorContent) => {
        this.setState({
            editorContent
        });
    };
    imageUploadCallBack = (file) => {
        console.log(file);
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `${SERVER_ADDRESS}/file/uploadAvatar`);
            
            const formData = new FormData();
            formData.append('image', file);
            xhr.send(formData);

            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        });
    };
    render() { 
        const { editorState } = this.state;
        return (  
            <div className="editor h-screen">
                <Row>
                    <Col span={24}>
                        <Card title="富文本编辑器">
                            <Editor
                                editorState={editorState}
                                toolbarClassName="home_toolbar"
                                wrapperClassName="wrapperClassName"
                                editorClassName="home_editor"
                                onEditorStateChange={this.onEditorStateChange}
                                toolbar={{
                                    history: { inDropdown: true },
                                    inline: { inDropdown: false },
                                    list: { inDropdown: true },
                                    textAlign: { inDropdown: true },
                                    image: { uploadCallback: this.imageUploadCallBack }
                                }}
                                onContentStateChange={this.onContentStateChange}
                                placeholder="请输入正文"
                                spellCheck
                                style={{minHeight: '350px'}}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    };
};
export default RichText;