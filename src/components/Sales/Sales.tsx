import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useResourcesSalesByTeacher } from "@/hooks/useSalesApi";
import CustomizedAxisTick from "../Shared/CustomAxisTick";
import ResourcesSales from "./ResourcesSales";

const courseSalesData = [
  { name: "Course A", sales: 3000 },
  { name: "Course B", sales: 2500 },
  { name: "Course C", sales: 2000 },
  { name: "Course D", sales: 3500 },
  { name: "Course E", sales: 2800 },
];

const COLORS = {
  RESOURCES: "#8884D8",
  COURSES: "#82CA9D",
};

const legendStyle = {
  top: "50%",
  left: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

interface ResourceSales {
  amount: number;
  resourceId: number;
  teacherId: number;
  title: string;
}

const Sales = () => {
  const { data } = useResourcesSalesByTeacher("2");
  const [totalSalesFromResources, setTotalSalesFromResources] = useState(0);
  const [salesDataToGraph, setSalesDataToGraph] = useState([]);

  useEffect(() => {
    if (data) {
      const salesFromResources = data
        .map((value: ResourceSales) => value.amount)
        .reduce((accumulator: number, currentValue: number) => {
          return accumulator + currentValue;
        }, 0);

      const salesData = data.slice(0, 5);

      setTotalSalesFromResources(salesFromResources);
      setSalesDataToGraph(salesData);
    }
  }, [data]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Sales Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ResourcesSales
          salesDataToGraph={salesDataToGraph}
          totalSalesFromResources={totalSalesFromResources}
        />
        <Card>
          <CardHeader>
            <CardTitle>Total Sales from courses: </CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <div
              className="w-fit mx-auto"
              style={{ fontSize: "3rem", color: `${COLORS.COURSES}` }}
            >
              $0
            </div>
          </CardContent>
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
