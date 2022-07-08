import React, { useState } from 'react';
import { Card } from 'antd';
import { SERVER_ADDRESS } from '@/utils/config';


function RichText() {
    const [content, setContent] = useState(null);

    return (  
        <Card title="富文本编辑器">
           
        </Card>
    );
}

export default RichText;