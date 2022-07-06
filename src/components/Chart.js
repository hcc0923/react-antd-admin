import React, { useState, useEffect, useRef } from 'react';
import * as Echarts from 'echarts';
import { debounce } from '@/utils/optimize';

const defaultProps = {
    chartId: 'chartId',
    chartHeight: '100vh',
    chartOptions: {}
};


function Chart(props = defaultProps) {
    const [chart, setChart] = useState(null);
    
    const { chartId, chartHeight, chartOptions } = props;
    const handleInitChart = () => {
        setChart(() => Echarts.init(document.getElementById(chartId)))
    }
    const handleResizeWindow = () => {
        if (chart) debounce(chart.resize.bind(this), 500)();
    }
    const handleDisposeWatch = () => {
        if (!chart) return null;
		window.removeEventListener('resize', handleResizeWindow);
        setChart(null);
    }
    useEffect(() => {
        handleInitChart();
        window.addEventListener('resize', handleResizeWindow); 
        return handleDisposeWatch;
    });
    useEffect(() => {
        if (chart) {
            chart.setOption(chartOptions);
        }
    }, [chart])
    return (  
        <div id={chartId} style={{ height: chartHeight}} />
    );
}

export default Chart;