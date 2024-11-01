import React from "react";

interface TooltipPayload {
  value: number;
}
interface CustomChartTooltipProps {
  color: string;
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomChartTooltip: React.FC<CustomChartTooltipProps> = (props) => {
  const { color, active, payload, label } = props;
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
        <p className="label">{`${label}`}</p>
        <p
          style={{ color: `${color}`, fontWeight: "bold" }}
          className="label"
        >{`sales $${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomChartTooltip;
