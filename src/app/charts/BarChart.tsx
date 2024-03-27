import React, { useRef } from "react";
import * as d3 from "d3";
import expenses from "../data/expenses.data";
import { shortMonth } from "@/utils/date";

const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

const BarChart = () => {
  const svgEl = useRef<SVGSVGElement>(null);

  const axisBottomEl = useRef<SVGGElement>(null);

  const axisLeftEl = useRef<SVGGElement>(null);

  const x = d3
    .scaleBand()
    .domain(expenses.map((d) => d.month))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const y = d3

    .scaleLinear()

    .domain([
      0,
      Number(
        // @ts-ignore - Type 'number' is not assignable to type 'string'
        d3.max<Expense>(expenses, (d) => d.value)
      ),
    ])

    .range([height - marginBottom, marginTop]);

  return (
    <svg width="800" height="400" ref={svgEl}>
      {expenses.map((d, i) => (
        <rect
          key={i}
          x={x(d.month)}
          y={y(d.value)}
          width={x.bandwidth()}
          height={height - marginBottom - y(d.value)}
          fill="currentColor"
        />
      ))}

      <g ref={axisLeftEl} transform={`translate(${marginLeft},0)`} />

      <g
        ref={axisBottomEl}
        transform={`translate(0,${height - marginBottom})`}
      />

      <text
        x={width / 2}
        y={height - marginBottom / 2 + 10}
        fontSize=".5em"
        textAnchor="middle"
        fill="currentColor"
      >
        Expenses by Month
      </text>

      <text
        transform={`translate(${marginLeft / 2 - 10}, ${
          height / 2
        }) rotate(-90)`}
        textAnchor="middle"
        fill="currentColor"
        fontSize=".5em"
      >
        Amount
      </text>

      {/* Custom axis */}
      <g transform="translate(0, 0)" fill="currentColor" color="red">
        <path
          d={`M${marginLeft},${height - marginBottom} L${width - marginRight},${
            height - marginBottom
          }`}
          strokeWidth="1.5"
          stroke="currentColor"
        />

        {expenses.map((d, i) => (
          <g key={i}>
            <line
              x1={Number(x(d.month)) + x.bandwidth() / 2}
              y1={height - marginBottom}
              x2={Number(x(d.month)) + x.bandwidth() / 2}
              y2={height - marginBottom + 5}
              strokeWidth="1.5"
              stroke="currentColor"
            />
            <text
              x={Number(x(d.month)) + x.bandwidth() / 2}
              y={height - marginBottom + 10}
              fontSize=".5em"
              textAnchor="middle"
              fill="currentColor"
              dy=".71em"
            >
              {shortMonth(d.month)}
            </text>
          </g>
        ))}
      </g>

      {/* Custom axis vertical */}
      <g transform="translate(0, 0)" fill="currentColor" color="red">
        <path
          d={`M${marginLeft},${marginTop} L${marginLeft},${
            height - marginBottom
          }`}
          strokeWidth="1.5"
          stroke="currentColor"
        />
        <line
          x1={marginLeft}
          y1={height - marginBottom}
          x2={marginLeft - 5}
          y2={height - marginBottom}
          strokeWidth="1.5"
          stroke="currentColor"
        />
        <text
          x={marginLeft - 10}
          y={height - marginBottom}
          fontSize=".5em"
          textAnchor="end"
          fill="currentColor"
          dy=".32em"
        >
          0
        </text>

        {y.ticks().map((d, i) => (
          <g key={i}>
            <line
              x1={marginLeft}
              y1={y(d)}
              x2={marginLeft - 5}
              y2={y(d)}
              strokeWidth="1.5"
              stroke="currentColor"
            />
            <text
              x={marginLeft - 10}
              y={y(d)}
              fontSize=".5em"
              textAnchor="end"
              fill="currentColor"
              dy=".32em"
            >
              {d}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default BarChart;
