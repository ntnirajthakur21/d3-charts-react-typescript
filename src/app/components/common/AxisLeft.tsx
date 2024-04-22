import type { ScaleBand } from "d3";

const AxisLeft = ({ yScale }: { yScale: ScaleBand<string> }) => {
  return yScale.domain().map((tickValue: string) => (
    <text
      key={tickValue}
      x={-10}
      y={(yScale(tickValue) || 0) + yScale.bandwidth() / 2}
      dy="0.32em"
      style={{ textAnchor: "end" }}
    >
      {tickValue}
    </text>
  ));
};

export default AxisLeft;
