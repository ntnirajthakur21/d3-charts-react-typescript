import { csv, extent, scaleLinear } from "d3";
import type { DSVParsedArray } from "d3";
import React, { useEffect, useState } from "react";
import AxisBottom from "../components/common/AxisBottom";
import useCursorPosition from "../hooks/useCursorPosition";

const url =
  "https://gist.githubusercontent.com/ntnirajthakur21/231f5fa19531d79c17ce1f6b5f891b7f/raw/iris_flower.csv";

type Datum = {
  sepal_length: number;
  sepal_width: number;
  petal_length: number;
  petal_width: number;
};

const width = 900;
const height = 500;

const margin = { top: 20, right: 20, bottom: 20, left: 100 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const row = (d: any) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  return d;
};

const xValue = (d: any) => d.sepal_length;
const yValue = (d: Datum) => d.sepal_width;

const IrisFlowerScatterChart = () => {
  const [data, setData] = useState<DSVParsedArray<Datum> | null>(null);

  const { cursorPosition, tooltipStyle, handler } = useCursorPosition<{
    sepal_length: number;
    sepal_width: number;
  }>();

  useEffect(() => {
    csv(url, row).then((data) => {
      setData(data);
    });
  }, []);

  const xScale = scaleLinear()
    .domain(extent(data || [], xValue) as [number, number])
    .range([0, innerWidth])
    .nice(); // the nice() function extends the domain to the nearest round value.

  const yScale = scaleLinear()
    .domain(extent(data || [], yValue) as [number, number])
    .range([0, innerHeight]);

  return (
    <>
      <svg width={width} height={height} style={{ border: "1px solid black" }}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {data?.map((d, i) => (
            <circle
              key={i}
              cx={xScale(xValue(d))}
              cy={yScale(yValue(d))}
              r={5}
              fill="steelblue"
              {...handler({
                sepal_length: d.sepal_length,
                sepal_width: d.sepal_width,
              })}
            />
          ))}

          {yScale.ticks().map((tickValue: number) => (
            <g
              transform={`translate(0, ${yScale(tickValue) || 0})`}
              key={tickValue}
            >
              <line x2={innerWidth} stroke="black" />
              <text
                key={tickValue}
                x={-10}
                dy="0.32em"
                style={{ textAnchor: "end" }}
              >
                {tickValue}
              </text>
            </g>
          ))}

          <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        </g>
      </svg>

      <div style={tooltipStyle}>
        {cursorPosition?.data?.sepal_length}:{" "}
        {cursorPosition?.data?.sepal_width}
      </div>
    </>
  );
};

export default IrisFlowerScatterChart;

/**
 *
 * extent(): this function returns the minimum and maximum value in the given array using natural order.
 * syntax: extent(array, accessor)
 * where array is the input array and accessor is the function that returns the value to be considered for the extent.
 * If the accessor is not provided, it returns the minimum and maximum value of the array.
 * If the array is empty, it returns [undefined, undefined].
 */
