import React, { Component } from 'react';
import { Button, Card } from 'antd';
import Loading from '@/components/Loading';
import { SERVER_ADDRESS } from '@/utils/config';


class Pdf extends Component {
    state = {
        loading: false,
    };
    handleDownload = () => {
        this.setState({loading: true});
        window.open(`${SERVER_ADDRESS}/PDF.pdf`);
        this.setState({loading: false});
    };
    render() { 
        const { loading } = this.state;
        return (  
            <Card title="下载Pdf">
                {
                    loading ? 
                    <Loading />
                    :
                    <Button type="primary" onClick={this.handleDownload}>下载</Button>
                }
            </Card>
        );
    };
};
export default Pdf;