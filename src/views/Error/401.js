import React from 'react';
import { Card, Button } from "antd";
import './style.less';


function NotFound() {
    return (
        <div className="error_page">
            <div className="error">
                <Card hoverable={true} style={{fontSize: "100px", fontWeight: "bolder"}}>401</Card>
                <p className="text">您没有权限访问该页面</p>
                <Button className="page_btn" href="#/dashboard" shape="round">返回首页</Button>
            </div>
        </div>
    );
};
export default NotFound;