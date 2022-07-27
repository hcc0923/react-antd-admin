import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import { CloseOutlined } from "@ant-design/icons";

import { deleteTag } from '@/store/actions/tag';


const TagView = (props) => {
    const { location, tag } = props;
    const { pathname } = location;
    console.log(pathname);
    const onCloseTag = (item) => {
        const tagLength = tag.length;
        // 删除最后一个tag跳转到前一个
        if (pathname === item.key && item.key === tag[tagLength - 1].key) {
            
            props.history.push(tag[tagLength - 2].key);
        }
        if (pathname === item.key) {
            const tagIndex = tag.findIndex(tagItem => tagItem.key === item.key);
            console.log(tagIndex);
            console.log(tag[tagIndex].key);
            props.history.push(tag[tagIndex].key);
        }
        props.deleteTag(item);
    }
    const onClickTag = (item) => {
        props.history.push(item.key);
    }
    return (
        <div className="w-full pl-4 py-2" style={{ backgroundColor: '#fafafa'}}>
            {
                tag.map(item => (
                    <Tag
                        key={item.key}
                        closable={item.key !== '/home'}
                        color={item.key === pathname ? 'var(--ant-primary-color)' : ''}
                        closeIcon={<CloseOutlined className="align-baseline" />}
                        onClose={() => onCloseTag(item)} 
                        className="text-sm"
                    >
                        <span 
                            onClick={() => onClickTag(item)}
                            className="cursor-pointer"
                        >
                            {item.label}
                        </span>
                    </Tag>
                ))
            }
        </div>
    )
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    deleteTag: data => {
        dispatch(deleteTag(data));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TagView));