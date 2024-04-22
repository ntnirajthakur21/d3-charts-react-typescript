import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import useUNPopulationData from "../hooks/useUNPopulationData";
import useCursorPosition from "../hooks/useCursorPosition";
import AxisBottom from "./common/AxisBottom";
import AxisLeft from "./common/AxisLeft";

const width = 1600;
const height = 5000;

const margin = { top: 20, right: 20, bottom: 20, left: 300 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const UNPopulatinBarChart = () => {
  const { data } = useUNPopulationData();

  const { cursorPosition, tooltipStyle, handler } = useCursorPosition<{
    country: string;
    population: number;
  }>();

  const yScale = scaleBand()
    .domain(data?.map((d) => d.Country) || [])
    .range([0, innerHeight]) // The range is the pixel range of the output. syntax: range([start, end]) where start is the minimum value and end is the maximum value.
    .paddingInner(0.1); // paddingInner is the space between the bars.

  const xScale = scaleLinear()
    .domain([0, max(data || [], (d) => d.Population) || 0])
    .range([0, innerWidth]); // The range is the pixel range of the output. syntax: range([start, end]) where start is the minimum value and end is the maximum value.

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <svg width={width} height={height}>
        <g
          transform={`translate(${margin.left}, ${margin.top})`}
          style={{ border: "1px solid black" }}
        >
          <AxisBottom xScale={xScale} innerHeight={innerHeight} />

          <AxisLeft yScale={yScale} />

          {data?.map((d, i) => {
            return (
              <rect
                key={i}
                x={0}
                y={yScale(d.Country) || 0}
                width={xScale(d.Population) || 0}
                height={yScale.bandwidth() || 0}
                fill="steelblue"
                {...handler({
                  country: d.Country,
                  population: d.Population,
                })}
              />
            );
          })}
        </g>
      </svg>

      <div style={tooltipStyle}>
        {cursorPosition?.data?.country}: {cursorPosition?.data?.population}
      </div>
    </>
  );
};

export default UNPopulatinBarChart;

/**
 *
 * ScaleLinear: The scaleLinear function is used to create a linear scale. It is used to map a continuous input domain to a continuous output range. The domain is the input range of the data. The range is the pixel range of the output.
 * ScaleBand: The scaleBand function is used to create a band scale. It is used to map a discrete input domain to a continuous output range. The domain is the input range of the data. The range is the pixel range of the output.
 *
 * The domain is the input range of the data. The range is the pixel range of the output.
 *
 */
