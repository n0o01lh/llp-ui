import apiClient from "@/lib/http/axiosClient";
import { useQuery } from "@tanstack/react-query";

const getResourceSalesByTeacher = async () => {
  return await apiClient.get(`/resource/sales-by-teacher`);
};

const getResourceSalesCountByTeacher = async () => {
  return await apiClient.get(`/resource/sales-count-by-teacher`);
};

const getCourseSalesByTeacher = async () => {
  return await apiClient.get(`/course/sales`);
};

export const useResourcesSalesByTeacher = () => {
  const { data, isSuccess, isError, refetch } = useQuery({
    queryKey: ["GET_RESOURCES_SALES_BY_TEACHER_QUERY"],
    queryFn: () => getResourceSalesByTeacher(),
  });

  return { data: data?.data, isSuccess: isSuccess, isError: isError, refetch };
};

export const useResourceSalesCountByTeacher = () => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["GET_RESOURCES_SALES_COUNT_BY_TEACHER_QUERY"],
    queryFn: () => getResourceSalesCountByTeacher(),
  });

  return { data: data?.data, isSuccess: isSuccess, isError: isError };
};

export const useCoursesSalesByTeacher = () => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["GET_COURSES_SALES_BY_TEACHER_QUERY"],
    queryFn: () => getCourseSalesByTeacher(),
  });

  return { data: data?.data, isSuccess: isSuccess, isError: isError };
};
