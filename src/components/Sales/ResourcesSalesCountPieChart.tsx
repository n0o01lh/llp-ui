import React from "react";
import { ResourceSalesCount } from "./Sales.interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CustomChartTooltip from "../Shared/CustomChartTooltip";
import PieChartLegend from "../Shared/PieChartLegend";

interface ResourcesSalesCountPieChartProps {
  dataToGraph: ResourceSalesCount[];
}

const ResourcesSalesCountPieChart: React.FC<
  ResourcesSalesCountPieChartProps
> = (props) => {
  const { dataToGraph } = props;
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div>
      <h2 className="text-2xl font-bold my-8 dark:text-white">Popularity</h2>
      <Card>
        <CardHeader>
          <CardTitle>Most Popular Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <PieChart height={400}>
                <Pie
                  data={dataToGraph}
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="sales_count"
                >
                  {dataToGraph.map((entry, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={
                    <CustomChartTooltip
                      valueLabel="Nō of sales: "
                      color={COLORS[0]}
                    />
                  }
                />
                <Legend
                  content={
                    <PieChartLegend
                      titles={dataToGraph.map(
                        (resource: ResourceSalesCount) => resource.title
                      )}
                      colors={COLORS}
                    />
                  }
                  //layout="horizontal"
                  // verticalAlign="middle"
                  // wrapperStyle={PIE_CHART_LEGEND_STYLE}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesSalesCountPieChart;
