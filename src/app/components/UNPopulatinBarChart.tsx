import React, { useEffect, useState } from "react";
import { csv, max, scaleBand, scaleLinear } from "d3";
import type { DSVParsedArray } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/vivek2606/58b964b3fcd82a741c6d8be06ff3fc64/raw/UN_population.csv";

const width = 1600;
const height = 5000;

const margin = { top: 20, right: 20, bottom: 20, left: 100 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const row = (d: any) => {
  d.Population = +d["2020"];
  return d;
};

const UNPopulatinBarChart = () => {
  const [data, setData] = useState<DSVParsedArray<any> | null>(null);

  const [cursorPosition, setCursorPosition] = React.useState<{
    x: number;
    y: number;
    data?: {
      country: string;
      population: number;
    };
  } | null>(null);

  useEffect(() => {
    csv(csvUrl, row).then((data) => {
      setData(data as DSVParsedArray<any>);
    });
  }, []);

  const yScale = scaleBand()
    .domain(data?.map((d) => d.Country) || [])
    .range([0, innerHeight]); // The range is the pixel range of the output. syntax: range([start, end]) where start is the minimum value and end is the maximum value.

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
          {xScale.ticks().map((tickValue) => (
            <g
              className="tick"
              transform={`translate(${xScale(tickValue)}, 0)`}
              key={tickValue}
            >
              <line stroke="black" y2={innerHeight} />
              <text
                style={{ textAnchor: "middle" }}
                dy=".71em"
                x={xScale(tickValue) || 0}
                y={innerHeight + 3}
              >
                {tickValue}
              </text>
            </g>
          ))}

          {yScale.domain().map((tickValue, i) => {
            return (
              <text
                key={i}
                x={-10}
                y={(yScale(tickValue) || 0) + yScale.bandwidth() / 2}
                dy="0.32em"
                style={{ textAnchor: "end" }}
              >
                {tickValue}
              </text>
            );
          })}
          {data?.map((d, i) => {
            return (
              <rect
                key={i}
                x={0}
                y={yScale(d.Country) || 0}
                width={xScale(d.Population) || 0}
                height={yScale.bandwidth() || 0}
                fill="steelblue"
                onMouseEnter={(e) => {
                  setCursorPosition({
                    x: e.pageX,
                    y: e.pageY,
                    data: {
                      country: d.Country,
                      population: d.Population,
                    },
                  });
                }}
                onMouseMove={(e) => {
                  setCursorPosition({
                    x: e.pageX + 10,
                    y: e.pageY + 10,
                    data: {
                      country: d.Country,
                      population: d.Population,
                    },
                  });
                }}
                onMouseLeave={(e) => {
                  setCursorPosition(null);
                }}
              />
            );
          })}
        </g>
      </svg>

      <div
        style={{
          position: "absolute",
          left: cursorPosition?.x,
          top: cursorPosition?.y,
          backgroundColor: "white",
          padding: "5px",
          border: "1px solid black",
          borderRadius: "5px",
          display: cursorPosition ? "block" : "none",
        }}
      >
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
