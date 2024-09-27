import { Course } from "@/components/Courses/Courses";
import apiClient from "@/lib/http/axiosClient";
import { removeProperty } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

const createCourse = async (course: Course) => {
  const sanitizedObject = removeProperty(course, "id");
  const response = await apiClient.post("/course/create", sanitizedObject); // Cambia la ruta al endpoint correcto
  return response.data;
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
