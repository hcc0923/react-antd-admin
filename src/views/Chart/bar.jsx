import React from "react";
import ReactECharts from "echarts-for-react";

const chartOptions = {
  backgroundColor: "#08263a",
  // 标题
  title: {
    top: 30,
    text: "柱状图",
    textStyle: {
      fontWeight: "normal",
      fontSize: 16,
      color: "#1DA57A",
    },
    left: "center",
  },
  // 小工具
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
    },
    padding: [5, 10],
  },
  // tab
  legend: {
    data: ["蒸发量", "降水量"],
    right: "2%",
    top: 20,
    textStyle: {
      fontWeight: "normal",
      fontSize: 16,
      color: "#fff",
    },
  },
  // 图表
  grid: {
    top: 80,
    left: "3%",
    right: "3%",
    bottom: "10%",
    containLabel: true,
  },
  // x轴
  xAxis: [
    {
      type: "category", //分类
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#009688",
          width: 2,
        },
      },
      axisLabel: {
        color: "#fff",
      },
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
    },
  ],
  // y 轴
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#009688",
          width: 2,
        },
      },
      axisLabel: {
        color: "#fff",
        margin: 10,
        formatter: "{value} mm",
        textStyle: {
          fontSize: 14,
        },
      },
    },
  ],
  series: [
    {
      name: "蒸发量",
      type: "bar",
      data: [
        8.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
      ],
      markPoint: {
        data: [
          { type: "max", name: "最大值" },
          { type: "min", name: "最小值" },
        ],
      },
      markLine: {
        data: [{ type: "average", name: "平均值" }],
      },
      itemStyle: {
        normal: {
          // 设置柱状图颜色
          color: "#1890FF",
          // 以下为是否显示，显示位置和显示格式的设置了
          label: {
            show: true,
            position: "top",
            formatter: "{c}",
            // formatter: '{b}\n{c}'
          },
        },
      },
      // 设置柱的宽度，要是数据太少，柱子太宽不美观~
      // barWidth:100
    },
    {
      name: "降水量",
      type: "bar",
      data: [
        10.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
      ],
      markPoint: {
        data: [
          { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
          { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 },
        ],
      },
      markLine: {
        data: [{ type: "average", name: "平均值" }],
      },
      itemStyle: {
        normal: {
          // 设置柱状图颜色
          color: "#001529",
        },
      },
    },
  ],
};

const Bar = () => {
  return <ReactECharts option={chartOptions} style={{ height: 500 }} />;
};

export default Bar;
