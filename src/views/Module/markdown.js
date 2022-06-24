import React, { Component } from 'react';
import Editor from 'for-editor'
import './markdown.less';


class MarkDown extends Component {
    state = { 
        value: ''
    };
    handleChange = (value) => {
        this.setState({
            value
        });
    };
    render() { 
        const { value } = this.state;
        return (  
            <div className="markdown">
                <Editor 
                    value={value} 
                    placeholder="开始编辑"
                    height="500px"
                    onChange={this.handleChange} 
                />
            </div>
        );
    };
};
export default MarkDown;