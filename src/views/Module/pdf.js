import React, { useState } from 'react';
import { Card, Button } from 'antd';
import Loading from '@/components/Loading';
import { SERVER_ADDRESS } from '@/utils/config';

function Pdf() {
    const [loading, setLoading] = useState(false);
    const handleDownload = () => {
        setLoading(true);
        window.open(`${SERVER_ADDRESS}/PDF.pdf`);
        setLoading(false);
    }
    return (  
        <Card title="下载Pdf">
            {
                loading ? 
                <Loading />
                :
                <Button type="primary" onClick={() => handleDownload()}>下载</Button>
            }
        </Card>
    );
}

export default Pdf;