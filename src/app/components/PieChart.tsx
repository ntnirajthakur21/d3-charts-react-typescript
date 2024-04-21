"use client";
import React, { useEffect } from "react";
import * as d3 from "d3";

const namedColorsURL =
  "https://gist.githubusercontent.com/ntnirajthakur21/e84bca8e914a37debbcd1f3567b65802/raw/cssNamedColors.csv";

const width = 960;
const height = 500;

const centerX = width / 2;
const centerY = height / 2;

const arcGenerator = d3
  .arc<void, d3.PieArcDatum<any>>()
  .innerRadius(0)
  .outerRadius(width)
  .startAngle((d) => d.startAngle)
  .endAngle((d) => d.endAngle);

const PieChart = () => {
  const [data, setData] = React.useState<d3.DSVRowArray<string> | null>(null);

  useEffect(() => {
    d3.csv(namedColorsURL).then((data) => {
      setData(data);
    });
  }, []);

  const pieData = d3.pie<any>().value(1);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <svg width={width} height={height} style={{ border: "1px solid black" }}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {pieData(data)?.map((d) => {
          return (
            <path
              key={d.index}
              fill={d.data["RGB hex value"]}
              d={arcGenerator(d) || ""}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default PieChart;
