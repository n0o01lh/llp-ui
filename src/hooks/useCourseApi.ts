import { Course } from "@/components/Courses/Courses";
import apiClient from "@/lib/http/axiosClient";
import { removeProperty } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

const createCourse = async (course: Course) => {
  const sanitizedObject = removeProperty(course, "id");
  const response = await apiClient.post("/course/create", sanitizedObject);
  return response.data;
};

const editCourse = async (course: Course) => {
  const response = await apiClient.patch(`/course/update/${course.id}`, course);
  return response.data;
};

const getCourse = async (id: string) => {
  return await apiClient.get("/course/find", {
    params: { id: id },
  });
};

const addResourcesToCourse = async (payload: unknown) => {
  const response = await apiClient.post("/course/add-resources", payload);
  return response.data;
};

const getCourseListByTeacherId = async (teacherId: string) => {
  return await apiClient.get("/course/list-by-teacher", {
    params: { id: teacherId },
  });
};

const removeResourceFromCourse = async (payload: {
  courseId: string;
  resourceId: string;
}) => {
  console.log({ payload });
  const response = await apiClient.delete("/course/remove-resource", {
    data: {
      resource_id: parseInt(payload.resourceId),
      course_id: parseInt(payload.courseId),
    },
  });

  return response.data;
};

const deleteCourse = async (courseId: number) => {
  return await apiClient.delete(`/course/delete/${courseId}`);
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

export const useEditCourse = () => {
  return useMutation({
    mutationFn: editCourse,
    onSuccess: (data) => {
      console.log("Data edited successfully:", data);
    },
    onError: (error) => {
      console.error("Error editing data:", error);
    },
  });
};

export const useGetcourse = (courseId: string) => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["GET_COURSE_QUERY", courseId],
    queryFn: () => getCourse(courseId),
  });

  return { data: data?.data, isSuccess: isSuccess, isError: isError };
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

export const useDeleteResourceFromCourse = () => {
  return useMutation({
    mutationFn: removeResourceFromCourse,
    onSuccess: (data) => {
      console.debug("Deleting success:", data);
    },
    onError: (error) => {
      console.error("Error deleting resource", error);
    },
  });
};

export const useDeleteCourse = () => {
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: (data) => {
      console.debug("Deleting success:", data);
    },
    onError: (error) => {
      console.error("Error deleting resource", error);
    },
  });
};
