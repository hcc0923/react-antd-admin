import React from "react";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import ReactECharts from "echarts-for-react";

const Pie = (props) => {
  const { settings } = props;
  const settingsIntl = settings.intl;
  const intl = useIntl();
  const formatMessage = (id) => {
    return intl.formatMessage({ id });
  };
  const chartOptionsData = {
    legend_data:
      settingsIntl === "zh"
        ? ["电费", "水费", "物业费", "管理费", "停车费"]
        : [
            "Electricity bill",
            "Water bill",
            "Property costs",
            "Management fee",
            "Parking fee",
          ],
    series_data:
      settingsIntl === "zh"
        ? [
            { value: 100, name: "电费" },
            { value: 50, name: "水费" },
            { value: 224, name: "物业费" },
            { value: 60, name: "管理费" },
            { value: 800, name: "停车费" },
          ]
        : [
            { value: 100, name: "Electricity bill" },
            { value: 50, name: "Water bill" },
            { value: 224, name: "Property costs" },
            { value: 60, name: "Management fee" },
            { value: 800, name: "Parking fee" },
          ],
  };
  const chartOptions = {
    backgroundColor: "#08263a",
    title: {
      top: 30,
      text: formatMessage("chart.pie_title"),
      textStyle: {
        fontWeight: "normal",
        fontSize: 16,
        color: "#1DA57A",
      },
      left: "center",
    },
    color: ["#001529", "#1890FF", "#1b9436", "#751313"],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      x: 20,
      data: chartOptionsData.legend_data,
      top: 20,
      textStyle: {
        fontWeight: "normal",
        fontSize: 16,
        color: "#fff",
      },
    },
    series: [
      {
        name: formatMessage("chart.pie_series_name"),
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: chartOptionsData.series_data,
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

export default connect(mapStateToProps)(Pie);
