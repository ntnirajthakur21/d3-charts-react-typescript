"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Expense } from "../data/type";
import expenses from "../data/expenses.data";

const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

const ExpenseLineChart = () => {
  const scvEl = useRef<SVGSVGElement>(null);

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

  const line = d3
    .line<Expense>()
    .x((d) => Number(x(d.month)) + x.bandwidth() / 2)
    .y((d) => y(d.value));

  useEffect(() => {
    d3.select(axisBottomEl.current).call(d3.axisBottom(x) as any);

    d3.select(axisLeftEl.current).call(d3.axisLeft(y) as any);
  }, [axisLeftEl, axisBottomEl, x, y]);

  return (
    <svg width={width} height={height} ref={scvEl}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(expenses) as string}
      />

      <g fill="currentColor" stroke="currentColor" strokeWidth="1.5">
        {expenses.map((d, i) => (
          <circle
            key={i}
            cx={Number(x(d.month)) + x.bandwidth() / 2}
            cy={y(d.value)}
            r="2.5"
            fill="red"
          />
        ))}
      </g>

      <g ref={axisLeftEl} transform={`translate(${marginLeft},0)`} />

      <g
        ref={axisBottomEl}
        transform={`translate(0,${height - marginBottom})`}
      />
    </svg>
  );
};

export default ExpenseLineChart;
