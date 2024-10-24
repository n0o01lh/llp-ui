import React from "react";

interface BarCharLegendProps {
  color: string;
  title: string;
}

const BarChartLegend: React.FC<BarCharLegendProps> = (props) => {
  const { color, title } = props;
  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        alignItems: "center",
      }}
    >
      <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
        <rect width={15} height={15} fill={color} />
      </svg>
      <span style={{ color: `${color}` }}>{title}</span>
    </div>
  );
};

export default BarChartLegend;
