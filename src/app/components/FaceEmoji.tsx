import { arc } from "d3";
import React from "react";

const width = 960;
const height = 500;

const x = width / 2;
const y = height / 2;

const radius = 200;

const strokeWidth = 20;

const eyeRadius = 40;

const eyeOffsetX = 80;
const eyeOffsetY = 80;

const mouthWidth = 20;
const mouthRadius = 140;

const FaceEmoji = () => {
  const mouthArc = arc<void, void>()
    .innerRadius(mouthRadius)
    .outerRadius(mouthRadius + mouthWidth)
    .startAngle(Math.PI / 2)
    .endAngle((Math.PI * 3) / 2)
    .cornerRadius(20);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <g
        transform={`translate(${x}, ${y})`}
        fill="none"
        stroke="black"
        strokeWidth={strokeWidth}
      >
        <circle
          r={radius}
          fill="yellow"
          stroke="black"
          strokeWidth={strokeWidth}
        ></circle>

        <circle
          cx={-eyeOffsetX}
          cy={-eyeOffsetY}
          r={eyeRadius}
          fill="black"
        ></circle>

        <circle
          cx={eyeOffsetX}
          cy={-eyeOffsetY}
          r={eyeRadius}
          fill="black"
        ></circle>

        <path d={mouthArc() || ""}></path>
      </g>
    </svg>
  );
};

export default FaceEmoji;
