import apiClient from "@/lib/http/axiosClient";
import { useQuery } from "@tanstack/react-query";

const getResourceSalesByTeacher = async (teacherId: string) => {
  return await apiClient.get(`/resource/sales-by-teacher/${teacherId}`);
};

export const useResourcesSalesByTeacher = (teacherId: string) => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["GET_RESOURCES_SALES_BY_TEACHER_QUERY", teacherId],
    queryFn: () => getResourceSalesByTeacher(teacherId),
  });

  return { data: data?.data, isSuccess: isSuccess, isError: isError };
};
