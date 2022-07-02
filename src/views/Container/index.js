import React from 'react';
import { renderRoutes } from "react-router-config";

function Container(props)  {
    return (
        <>
            {renderRoutes(props.route.routes)}
        </>
    )
}

export default Container