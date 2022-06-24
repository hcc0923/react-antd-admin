import React from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


function Uploading(props) {
    return (
        <div>
            {props.uploading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
};


export default Uploading;