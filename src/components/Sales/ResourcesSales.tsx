import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Bar,
  CartesianGrid,
  Legend,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomizedAxisTick from "../Shared/CustomAxisTick";
import CustomChartTooltip from "../Shared/CustomChartTooltip";
import BarChartLegend from "../Shared/BarChartLegend";
import { COLORS, LEGEND_STYLE } from "./constants";
import { Resource } from "../Resources/Resources";

interface ResourcesSalesProps {
  totalSalesFromResources: number;
  salesDataToGraph: Resource[];
}

const ResourcesSales: React.FC<ResourcesSalesProps> = (props) => {
  const { totalSalesFromResources, salesDataToGraph } = props;
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Total sales from resources: </CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <div
            className="w-fit mx-auto"
            style={{ fontSize: "3rem", color: `${COLORS.RESOURCES}` }}
          >
            ${totalSalesFromResources}
          </div>
        </CardContent>

        <CardHeader>
          <CardTitle>Best selling resources </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 500 }}>
            <ResponsiveContainer>
              <RechartsBarChart
                data={salesDataToGraph}
                margin={{
                  top: 20,
                  right: 30,
                  left: 50,
                  bottom: 100,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="title"
                  interval={0}
                  tick={<CustomizedAxisTick />}
                />
                <YAxis />
                <Tooltip
                  content={<CustomChartTooltip color={COLORS.RESOURCES} />}
                />
                <Legend
                  content={
                    <BarChartLegend title="sales" color={COLORS.RESOURCES} />
                  }
                  layout="vertical"
                  verticalAlign="middle"
                  wrapperStyle={LEGEND_STYLE}
                />
                <Bar dataKey="amount" fill={COLORS.RESOURCES} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesSales;
