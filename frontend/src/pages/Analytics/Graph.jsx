import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";

const Graph = ({ seriesData, xAxisName, yAxisName, title }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!seriesData || seriesData.length === 0) return;

    Highcharts.chart(chartRef.current, {
      chart: { zoomType: "x" },
      title: { text: title || "" },
      xAxis: { type: "datetime", title: { text: xAxisName } },
      yAxis: { title: { text: yAxisName } },
      legend: { enabled: true },
      plotOptions: {
        area: { marker: { radius: 2 }, lineWidth: 1, states: { hover: { lineWidth: 1 } }, threshold: null },
      },
      series: seriesData.map(s => ({
        type: "area",
        name: s.name,
        data: s.data,
      })),
    });
  }, [seriesData, xAxisName, yAxisName, title]);

  return <div ref={chartRef} style={{ height: "500px", width: "100%" }} />;
};

export default Graph;
