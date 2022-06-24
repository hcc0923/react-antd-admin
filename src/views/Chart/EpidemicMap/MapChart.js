import React from 'react';
import { Card, Tag } from 'antd';
import { 
    AreaChartOutlined
} from "@ant-design/icons";
import Chart from '@/components/Chart';


function MapChart(props) {
    const chartOptions = {
        title: {
            text: "全国疫情地图",
            x: "center",
            textStyle: {
            color: "#9c0505"
            }
        },
        tooltip: {
            trigger: "item",
            formatter: "省份: {b} <br/> 现存确诊：{c}"
        },
        series: [
            {
                type: 'map',
                map: "china",
                data: props.mapData,
                label: {
                    show: true,
                    color: "black",
                    fontStyle: 10,
                    align: "center"
                },
                zoom: 1, 
                roam: true, 
                itemStyle: {
                    borderColor: "blue", 
                },
                emphasis: { 
                    label: {
                    color: "black",
                    fontSize: 10
                    },
                    itemStyle: {
                    areaColor: "lightyellow" 
                    }
                }
            },
        ],
        visualMap: {
            type: "piecewise",
            show: true,
            pieces: [
                { min: 10000 },
                { min: 1000, max: 9999 },
                { min: 500, max: 999 },
                { min: 100, max: 499 },
                { min: 10, max: 99 },
                { min: 1, max: 9 },
                { value: 0 }
            ],
            inRange: {
                color: ["#FFFFFF", "#FDEBCA", "#E25552", "#CA2B2D", "#831A26", "#500312"]
            }
        }
    };
    return (
        <Card
            title={<AreaChartOutlined style={{color: '#1DA57A', fontSize: '20px'}}/>}
            extra={<Tag color="#009688">疫情地图</Tag>}>
                <Chart chartId={"mapchart"} chartHeight="500px" chartOptions={chartOptions}></Chart>
        </Card>
    )
};


export default MapChart;