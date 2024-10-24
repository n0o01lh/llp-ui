import React from "react";

const CustomChartTooltip = ({ color, active, payload, label }) => {
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
