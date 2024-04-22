import type { ScaleLinear } from "d3";
import { format } from "d3";

const AxisBottom = ({
  xScale,
  innerHeight,
}: {
  xScale: ScaleLinear<number, number, never>;
  innerHeight: number;
}) => {
  return xScale.ticks().map((tickValue: number) => (
    <g
      className="tick"
      transform={`translate(${xScale(tickValue)}, 0)`}
      key={tickValue}
    >
      <line y2={innerHeight} stroke="#e5e2e0" />
      <text style={{ textAnchor: "middle" }} dy=".71em" y={innerHeight + 3}>
        {format(".2s")(tickValue).replace("G", "B")}
      </text>
    </g>
  ));
};

export default AxisBottom;
