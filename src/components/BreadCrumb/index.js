import React, { useState } from 'react'
import { withRouter } from "react-router-dom";
import { Breadcrumb } from "antd";
import menuList from "@/router/menuList";


const BreadCrumb = (props) => {
    const [breadCrumbData, setBreadCrumbData] = useState([]);
    const { location } = props;
    console.log(location.pathname);
    const handleBreadCrumb = (menuList) => {
        menuList.forEach(item => {
            if (item.key === location.pathname) {
                const data = {
                    title: item.label,
                    path: item.key
                }
                setBreadCrumbData([data]);
            } else {
                if (item.children) {
                    handleBreadCrumb(item.children);
                }
                const data = {
                    title: item.label,
                    path: item.key
                }
                setBreadCrumbData(...breadCrumbData, data);
                
            }
        })
    }
    
    return (
        <Breadcrumb>
            {
                999
            }
        </Breadcrumb>
    )
}

export default withRouter(BreadCrumb);