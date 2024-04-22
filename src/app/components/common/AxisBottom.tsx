import type { ScaleLinear } from "d3";

const AxisBottom = ({
  xScale,
}: {
  xScale: ScaleLinear<number, number, never>;
}) => {
  return xScale.ticks().map((tickValue: number) => (
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
  ));
};

export default AxisBottom;
