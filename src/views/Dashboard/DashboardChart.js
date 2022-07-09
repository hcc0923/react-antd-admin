import React from 'react';
import Chart from '@/components/Chart';


function DashboardChart(props) {
  const { visitData, uploadData, downloadData } = props;
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
    <Chart chartId={"dashboard"} chartHeight="320px" chartOptions={chartOptions} />
  );
}

export default DashboardChart;