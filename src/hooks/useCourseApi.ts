import { Course } from "@/components/Courses/Courses";
import apiClient from "@/lib/http/axiosClient";
import { removeProperty } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

const createCourse = async (course: Course) => {
  const sanitizedObject = removeProperty(course, "id");
  const response = await apiClient.post("/course/create", sanitizedObject); // Cambia la ruta al endpoint correcto
  return response.data;
};

const addResourcesToCourse = async (payload: unknown) => {
  const response = await apiClient.post("/course/add-resources", payload); // Cambia la ruta al endpoint correcto
  return response.data;
};

const getCourseListByTeacherId = async (teacherId: string) => {
  return await apiClient.get("/course/list-by-teacher", {
    params: { id: teacherId },
  });
};

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: createCourse,
    onSuccess: (data) => {
      console.log("Data created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating data:", error);
    },
  });
};

export const useCourseListByTeacher = (teacherId: string) => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["COURSE_LIST_BY_TEACHER_QUERY", teacherId],
    queryFn: () => getCourseListByTeacherId(teacherId),
  });

  return { data: data?.data, isSuccess: isSuccess, isError: isError };
};

export const useAddResourcesToCourse = () => {
  return useMutation({
    mutationFn: addResourcesToCourse,
    onSuccess: (data) => {
      console.log("Data created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating data:", error);
    },
  });
};
