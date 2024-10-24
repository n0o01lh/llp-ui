import React, { PureComponent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useResourcesSalesByTeacher } from "@/hooks/useSalesApi";
import BarCharLegend from "../Shared/BarChartLegend";
import CustomChartTooltip from "../Shared/CustomChartTooltip";
import CustomizedAxisTick from "../Shared/CustomAxisTick";

const courseSalesData = [
  { name: "Course A", sales: 3000 },
  { name: "Course B", sales: 2500 },
  { name: "Course C", sales: 2000 },
  { name: "Course D", sales: 3500 },
  { name: "Course E", sales: 2800 },
];

const popularityData = [
  { name: "Video 2", value: 30 },
  { name: "Course D", value: 25 },
  { name: "Audio 2", value: 20 },
  { name: "Course A", value: 15 },
  { name: "Document 1", value: 10 },
];

const COLORS = {
  RESOURCES: "#8884D8",
};
//const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", ];

const legendStyle = {
  top: "50%",
  left: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

const Sales = () => {
  const { data } = useResourcesSalesByTeacher("2");

  console.log({ data });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Sales Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Resource Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: "100%", height: 500 }}>
              <ResponsiveContainer>
                <RechartsBarChart
                  data={data}
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
                      <BarCharLegend title="sales" color={COLORS.RESOURCES} />
                    }
                    layout="vertical"
                    verticalAlign="middle"
                    wrapperStyle={legendStyle}
                  />
                  <Bar dataKey="amount" fill={COLORS.RESOURCES} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Course Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: "100%", height: 500 }}>
              <ResponsiveContainer>
                <RechartsBarChart
                  margin={{
                    top: 20,
                    right: 30,
                    left: 50,
                    bottom: 100,
                  }}
                  data={courseSalesData}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    interval={0}
                    tick={<CustomizedAxisTick />}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    wrapperStyle={legendStyle}
                  />
                  <Bar dataKey="sales" fill="#82ca9d" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      {/*       <h2 className="text-2xl font-bold my-8 dark:text-white">Popularity</h2>
      <Card>
        <CardHeader>
          <CardTitle>Most Popular Resources and Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart width={500} height={300}>
            <Pie
              data={popularityData}
              cx={250}
              cy={150}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {popularityData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default Sales;
