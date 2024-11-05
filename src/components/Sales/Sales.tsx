import { useEffect, useState } from "react";
import {
  useCoursesSalesByTeacher,
  useResourceSalesCountByTeacher,
  useResourcesSalesByTeacher,
} from "@/hooks/useSalesApi";
import ResourcesSales from "./ResourcesSales";
import CoursesSales from "./CoursesSales";
import { CourseSales, ResourceSales } from "./Sales.interfaces";
import ResourcesSalesCountPieChart from "./ResourcesSalesCountPieChart";

const Sales = () => {
  const { data: resourcesSalesData } = useResourcesSalesByTeacher("2");
  const { data: coursesSalesData } = useCoursesSalesByTeacher("2");
  const { data: resourcesSalesCountData } = useResourceSalesCountByTeacher("2");
  const [totalSalesFromResources, setTotalSalesFromResources] = useState(0);
  const [totalSalesFromCourses, setTotalSalesFromCourses] = useState(0);
  const [salesDataToGraph, setSalesDataToGraph] = useState([]);
  const [resourceSalesCountToGraph, setResourceSalesCountToGraph] = useState(
    []
  );
  const [coursesSalesDataToGraph, setCoursesSalesDataToGraph] = useState([]);

  useEffect(() => {
    if (resourcesSalesCountData) {
      setResourceSalesCountToGraph(resourcesSalesCountData);
    }
  }, [resourcesSalesCountData]);

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
      <ResourcesSalesCountPieChart dataToGraph={resourceSalesCountToGraph} />
    </div>
  );
};

export default Sales;
