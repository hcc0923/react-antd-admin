import React, { useState } from 'react';
import { Card, Button, Spin } from 'antd';
import { SERVER_ADDRESS } from '@/utils/config';


function Pdf() {
    const [spinning, setSpinning] = useState(false);
    
    const handleDownload = () => {
        setSpinning(true);
        window.open(`${SERVER_ADDRESS}/PDF.pdf`);
        setSpinning(false);
    }
    return (  
        <Card title="下载Pdf">
            {
                spinning ? 
                <Spin spinning={spinning} />
                :
                <Button type="primary" onClick={() => handleDownload()}>下载</Button>
            }
        </Card>
    );
}

export default Pdf;