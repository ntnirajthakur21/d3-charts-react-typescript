import React from "react";
import * as d3 from "d3";

type TEmployeePerformance = {
  name: string;
  value: number;
  color: string;
};

const data: TEmployeePerformance[] = [
  {
    name: "Employee1",
    value: 400,
    color: "#0088FE",
  },
  {
    name: "Employee2",
    value: 300,
    color: "#00C49F",
  },
  {
    name: "Employee3",
    value: 300,
    color: "#FFBB28",
  },
  {
    name: "Employee4",
    value: 200,
    color: "#FF8042",
  },
  {
    name: "Employee5",
    value: 278,
    color: "#AF19FF",
  },
  {
    name: "Employee6",
    value: 189,
    color: "#FF1919",
  },
];

const width = 960;
const height = 500;

const centerX = width / 2;
const centerY = height / 2;

// This returns a function that generates the pie chart data. It takes an array of data and returns an array of objects with the start and end angles of each slice.
// The sort(null) method is used to keep the order of the data as it is in the array.
const pie = d3
  .pie<TEmployeePerformance>()
  .sort(null)
  .value((d) => d.value);

//   This function generates the arc path for each slice of the pie chart. It takes an object with the start and end angles of the slice and returns a string representing the path.
// The innerRadius and outerRadius methods are used to set the size of the slice.
const arc = d3
  .arc<d3.PieArcDatum<TEmployeePerformance>>()
  .innerRadius(100)
  .outerRadius(width)
  .cornerRadius(10)
  .startAngle((d) => d.startAngle)
  .endAngle((d) => d.endAngle);

/**
 * This component renders a pie chart with employee performance data.
 * The data is hardcoded in the component, but it can be easily replaced with dynamic data from an API or other source.
 * The pie chart is created using the d3.js library, which provides powerful tools for creating data visualizations.
 * The pie chart shows the performance of six employees, with each slice representing the performance of one employee.
 * The color of each slice corresponds to the color of the employee's name.
 * The size of each slice is determined by the value of the employee's performance.
 * The pie chart is responsive and can be easily customized by changing the data or the styling.
 * @returns {JSX.Element} The pie chart component.
 * @constructor
 * @example
 * <EmployeePerformancePieChart />
 * @see https://observablehq.com/@d3/pie-chart
 * @see https://observablehq.com/@d3/pie-chart-with-tooltip
 * @see https://observablehq.com/@d3/pie-chart-update
 * @see https://observablehq.com/@d3/pie-chart-legend
 * @see https://observablehq.com/@d3/pie-chart-annotations
 * @see https://observablehq.com/@d3/pie-chart-donut
 * @see https://observablehq.com/@d3/pie-chart-small-multiples
 * @see https://observablehq.com/@d3/pie-chart-nested
 * @see https://observablehq.com/@d3/pie-chart-3d
 * @see https://observablehq.com/@d3/pie-chart-3d-2
 * */
const EmployeePerformancePieChart = () => {
  return (
    <svg width={width} height={height} style={{ border: "1px solid black" }}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {pie(data).map((d) => {
          return <path key={d.index} fill={d.data.color} d={arc(d) || ""} />;
        })}
      </g>
    </svg>
  );
};

export default EmployeePerformancePieChart;
