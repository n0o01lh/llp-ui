import React, { useEffect, useState } from "react";
import {
  useCoursesSalesByTeacher,
  useResourcesSalesByTeacher,
} from "@/hooks/useSalesApi";
import ResourcesSales from "./ResourcesSales";
import CoursesSales from "./CoursesSales";
import { CourseSales, ResourceSales } from "./Sales.interfaces";

const Sales = () => {
  const { data: resourcesSalesData } = useResourcesSalesByTeacher("2");
  const { data: coursesSalesData } = useCoursesSalesByTeacher("2");
  const [totalSalesFromResources, setTotalSalesFromResources] = useState(0);
  const [totalSalesFromCourses, setTotalSalesFromCourses] = useState(0);
  const [salesDataToGraph, setSalesDataToGraph] = useState([]);
  const [coursesSalesDataToGraph, setCoursesSalesDataToGraph] = useState([]);

  useEffect(() => {
    if (resourcesSalesData) {
      const salesFromResources = resourcesSalesData
        .map((value: ResourceSales) => value.amount)
        .reduce((accumulator: number, currentValue: number) => {
          return accumulator + currentValue;
        }, 0);

      const salesData = resourcesSalesData.slice(0, 5);

      setTotalSalesFromResources(salesFromResources);
      setSalesDataToGraph(salesData);
    }
  }, [resourcesSalesData]);

  useEffect(() => {
    if (coursesSalesData) {
      const salesFromCourses = coursesSalesData
        .map((value: CourseSales) => value.amount)
        .reduce((accumulator: number, currentValue: number) => {
          return accumulator + currentValue;
        }, 0);

      const salesData = coursesSalesData.slice(0, 5);

      setTotalSalesFromCourses(salesFromCourses);
      setCoursesSalesDataToGraph(salesData);
    }
  }, [coursesSalesData]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Sales Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ResourcesSales
          salesDataToGraph={salesDataToGraph}
          totalSalesFromResources={totalSalesFromResources}
        />
        <CoursesSales
          salesDataToGraph={coursesSalesDataToGraph}
          totalSalesFromCourses={totalSalesFromCourses}
        />
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
