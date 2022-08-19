import React from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import ReactECharts from "echarts-for-react";

const Bar = (props) => {
  const { settings } = props;
  const settingsIntl = settings.intl;
  const intl = useIntl();
  const formatMessage = (id) => {
    return intl.formatMessage({ id });
  };
  const chartOptionsData = {
    legend_data:
      settingsIntl === "zh"
        ? ["蒸发量", "降水量"]
        : ["Evaporation", "Precipitation"],
    xAxis_data:
      settingsIntl === "zh"
        ? [
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
          ]
        : [
            "Jan.",
            "Feb.",
            "Mar.",
            "Apr.",
            "May",
            "Jun.",
            "Jul.",
            "Aug.",
            "Sept.",
            "Oct.",
            "Nov.",
            "Dec.",
          ],
  };
  const chartOptions = {
    backgroundColor: "#08263a",
    // 标题
    title: {
      top: 30,
      text: formatMessage("chart.bar_title"),
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
        data: chartOptionsData.xAxis_data,
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
        name: formatMessage("chart.bar_series_name1"),
        type: "bar",
        data: [
          8.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
        ],
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Average" }],
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
        name: formatMessage("chart.bar_series_name2"),
        type: "bar",
        data: [
          10.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
        ],
        markPoint: {
          data: [
            { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
            { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Average" }],
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
  return (
    <ReactECharts
      option={chartOptions}
      style={{ width: "100%", height: "calc(100vh - 100px - 2rem)" }}
    />
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Bar);
