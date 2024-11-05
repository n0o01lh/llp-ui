import React from "react";

interface PieChartLegendProps {
  titles: string[];
  colors: string[];
}

const PieChartLegend: React.FC<PieChartLegendProps> = (props) => {
  const { titles, colors } = props;

  return (
    <div className="flex gap-4 justify-center">
      {titles.map((title, index) => {
        return (
          <div className="flex gap-2 items-center">
            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
              <rect width={15} height={15} fill={colors[index]} />
            </svg>
            <span style={{ color: `${colors[index]}` }}>{title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default PieChartLegend;
