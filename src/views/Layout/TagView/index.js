import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import { CloseOutlined } from "@ant-design/icons";

import { deleteTag } from '@/store/actions/tag';


const TagView = (props) => {
    const { location, tag } = props;
    const { pathname } = location;
    const onCloseTag = (e, item) => {
        e.preventDefault();
        props.deleteTag(item);
    }
    console.log(tag);
    return (
        <div className="w-full pl-4 py-2" style={{ backgroundColor: '#fafafa'}}>
            {
                tag.map(item => (
                    <Tag
                        key={item.key}
                        closable={item.key === '/home' ? false : true}
                        color={item.key === pathname ? 'var(--ant-primary-color)' : ''}
                        closeIcon={<CloseOutlined className="align-baseline" />}
                        onClose={(e) => onCloseTag(e, item)} 
                        className="text-sm"
                    >
                        {item.label}
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