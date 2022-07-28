import React from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Tag, 
  Progress 
} from "antd";
import { 
    LineChartOutlined
} from "@ant-design/icons";
import ReactECharts from 'echarts-for-react';


const CenterContent = (props) => {
  const { extraTitle, visitData, uploadData, downloadData, progressData } = props;
  const chartOptions = {
    color: ['#1f9fff', '#2F4056', '#009688'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ["访问量","上传量","下载量"]
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#009688',
            width: 2
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            opacity: 0.3
          }
        },
        axisLabel: {
          color: '#333'
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '数量',
        min: 0,
        max: 100000,
        fontSize: 20,
        position: 'left',
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#009688',
            width: 2
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            opacity: 0.3
          }
        },
        axisLabel: {
          color: '#333',
          margin: 10,
          textStyle: {
              fontSize: 14
          }
        }
      }
    ],
    series: [
      {
        name: '访问量',
        type: 'line',
        position: 'left',
        smooth: true,
        axisLabel: {
          formatter: '36 ml'
        },
        data: visitData
      },
      {
        name: '上传量',
        type: 'line',
        position: 'right',
        smooth: true,
        data: uploadData
      },
      {
        name: '下载量',
        type: 'line',
        smooth: true,
        data: downloadData
      },
    ]
  };

  return (  
    <Card 
      title={<LineChartOutlined className="text-xl" />}
      extra={<Tag>{extraTitle}</Tag>}>
      <Row gutter={16}>
        <Col span={16}>
          <ReactECharts
            option={chartOptions}
            style={{ height: 320 }}
          />
        </Col>
        <Col span={8}>
          {
            progressData?.map((item, index) => {
              return (
                <div className="mt-5" key={index}>
                    <p className="text-xl mb-0">{item.chart_title}</p>
                    <p className="text-sm mb-0 ml-1">{item.progress_title}</p>
                    <Progress percent={item.value} strokeWidth={12}></Progress>
                </div>
              );
            })
          }
        </Col>
      </Row>
    </Card>
  );
}

export default CenterContent;