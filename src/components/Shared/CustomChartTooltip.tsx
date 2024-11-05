import React from "react";

interface TooltipPayload {
  value: number;
  title: string;
  fill: string;
  payload: {
    title: string;
    fill: string;
  };
}
interface CustomChartTooltipProps {
  color: string;
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  valueLabel: string;
}

const CustomChartTooltip: React.FC<CustomChartTooltipProps> = (props) => {
  const { active, payload, valueLabel } = props;

  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "white",
          padding: "15px",
          border: "1px solid gray",
        }}
        className="custom-tooltip"
      >
        <p className="label">{`${payload[0].payload.title}`}</p>
        <p
          style={{ color: `${payload[0].payload.fill}`, fontWeight: "bold" }}
          className="label"
        >{`${valueLabel}${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomChartTooltip;
