import React from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import ReactECharts from "echarts-for-react";

const xAxisData = [];
const data = [];
const data2 = [];
for (let i = 0; i < 50; i++) {
  xAxisData.push(i);
  data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
  data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3);
}

const KeyBoard = (props) => {
  const { settings } = props;
  const settingsIntl = settings.intl;
  const intl = useIntl();
  const formatMessage = (id) => {
    return intl.formatMessage({ id });
  };
  const chartOptionsData = {
    legend_data: settingsIntl === "zh" ? ["蒸发量", "降水量"] : ["Evaporation", "Precipitation"]
  }
  const chartOptions = {
    backgroundColor: "#08263a",
    // 标题
    title: {
      top: 30,
      text: formatMessage("chart.keyboard_title"),
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
      data: chartOptionsData.legend_data,
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
        show: false,
        data: xAxisData,
      },
      {
        show: false,
        data: xAxisData,
      },
    ],
    visualMap: {
      show: false,
      min: 0,
      max: 50,
      dimension: 0,
      inRange: {
        color: ["#4a657a", "#308e92", "#b1cfa5", "#f5d69f", "#f5898b", "#ef5055"],
      },
    },
    // y 轴
    yAxis: [
      {
        axisLine: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: "#4a657a",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#08263f",
          },
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: formatMessage("chart.series_name_down"),
        type: "bar",
        data: data2,
        z: 1,
        itemStyle: {
          normal: {
            opacity: 0.4,
            barBorderRadius: 5,
            shadowBlur: 3,
            shadowColor: "#111",
          },
        },
      },
      {
        name: formatMessage("chart.keyboard_name_shadow"),
        type: "line",
        data,
        z: 2,
        showSymbol: false,
        animationDelay: 0,
        animationEasing: "linear",
        animationDuration: 0,
        lineStyle: {
          normal: {
            color: "transparent",
          },
        },
        areaStyle: {
          normal: {
            color: "#08263a",
            shadowBlur: 50,
            shadowColor: "#000",
          },
        },
      },
      {
        name: formatMessage("chart.keyboard_name_up"),
        type: "bar",
        data,
        xAxisIndex: 1,
        z: 3,
        itemStyle: {
          normal: {
            barBorderRadius: 5,
          },
        },
      },
    ],
    animationEasing: "elasticOut",
    animationEasingUpdate: "elasticOut",
    animationDelay(idx) {
      return idx * 20;
    },
    animationDelayUpdate(idx) {
      return idx * 20;
    },
  };
  return (
    <ReactECharts
      option={chartOptions}
      style={{ width: "100%", height: "calc(100vh - 100px - 2rem)" }}
    />
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(KeyBoard);
