import React from 'react';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import { renderRoutes } from "react-router-config";

function Container(props)  {
    console.log(props);
    return (
        <HashRouter>
            {renderRoutes(props.route.routes)}
        </HashRouter>
    )
}

export default Container