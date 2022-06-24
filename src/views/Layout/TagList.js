import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tag } from 'antd';


class TagList extends Component {
    state = {};
    onClickTag = (e, tag) => {
        e.preventDefault();
        this.props.history.push(`/${tag.path}`);
    };
    onCloseTag = (e, tag) => {
        e.preventDefault();
        this.props.removeTag(tag);
    };
    render() { 
        const { tagList } = this.props;
        return ( 
            <div className="tag_list">
                {
                    tagList.map((item, index) => (
                        item.name === "首页" ?
                        <Tag 
                            key={index} 
                            style={{cursor: "pointer", backgroundColor: "#1DA57A"}}
                            onClick={e => this.onClickTag(e, item)}>{item.name}
                        </Tag>
                        :
                        <Tag 
                            key={index} 
                            closable 
                            style={{cursor: "pointer"}} 
                            onClick={e => this.onClickTag(e, item)}
                            onClose={e => this.onCloseTag(e, item)}>{item.name}
                        </Tag>
                    ))
                }
            </div> 
        );
    };
};
export default withRouter(TagList);