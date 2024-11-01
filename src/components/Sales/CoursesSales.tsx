import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { COLORS, LEGEND_STYLE } from "./constants";
import {
  Bar,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart as RechartsBarChart,
} from "recharts";
import CustomizedAxisTick from "../Shared/CustomAxisTick";
import { CourseSales } from "./Sales.interfaces";

interface CoursesSalesProps {
  totalSalesFromCourses: number;
  salesDataToGraph: CourseSales[];
}

const CoursesSales: React.FC<CoursesSalesProps> = (props) => {
  const { totalSalesFromCourses, salesDataToGraph } = props;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Total Sales from courses: </CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <div
            className="w-fit mx-auto"
            style={{ fontSize: "3rem", color: `${COLORS.COURSES}` }}
          >
            ${totalSalesFromCourses}
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>Best selling courses</CardTitle>
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
                data={salesDataToGraph}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="title"
                  interval={0}
                  tick={<CustomizedAxisTick />}
                />
                <YAxis />
                <Tooltip />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  wrapperStyle={LEGEND_STYLE}
                />
                <Bar dataKey="amount" fill="#82ca9d" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesSales;
