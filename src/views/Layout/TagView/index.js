import React from 'react';
import { Tag } from 'antd';


const TagView = () => {
    const preventDefault = (e) => {
        e.preventDefault();
        console.log('Clicked! But prevent default.');
    };
    return (
        <div className="w-full pl-4 py-2" style={{ backgroundColor: '#fafafa'}}>
            <Tag closable onClose={preventDefault} className="text-sm">
                Prevent Default
            </Tag>
        </div>
    )
}


export default TagView;