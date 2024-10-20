import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/http/axiosClient";
import { Resource } from "@/components/Resources/Resources";
import { removeProperty } from "@/lib/utils";

// Función para obtener datos de la API
const createResource = async (resource: Resource) => {
  const sanitizedObject = removeProperty(resource, "id");
  const response = await apiClient.post("/resource/create", sanitizedObject);
  return response.data;
};

const editResource = async (resource: Resource) => {
  const response = await apiClient.patch(
    `/resource/update/${resource.id}`,
    resource
  );
  return response.data;
};

const getResource = async (resourceId: string) => {
  return await apiClient.get("/resource/find", {
    params: { id: resourceId },
  });
};

const getResourceListByTeacherId = async (teacherId: string) => {
  return await apiClient.get("/resource/list-by-teacher", {
    params: { id: teacherId },
  });
};

const deleteResource = async (resourceId: number) => {
  return await apiClient.delete(`/resource/delete/${resourceId}`);
};

export const useCreateResource = () => {
  return useMutation({
    mutationFn: createResource,
    onSuccess: (data) => {
      console.log("Data created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating data:", error);
    },
  });
};

export const useEditResource = () => {
  return useMutation({
    mutationFn: editResource,
    onSuccess: (data) => {
      console.log("Data edited successfully:", data);
    },
    onError: (error) => {
      console.error("Error editing data:", error);
    },
  });
};

export const useGetResource = (resourceId: string) => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["RESOURCES_GET_RESOURCE_QUERY", resourceId],
    queryFn: () => getResource(resourceId),
  });

  return { data: data?.data, isSuccess: isSuccess, isError: isError };
};

export const useListResourceByTeacher = (teacherId: string) => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["RESOURCES_LIST_BY_TEACHER_QUERY", teacherId],
    queryFn: () => getResourceListByTeacherId(teacherId),
  });

  return { data: data?.data, isSuccess: isSuccess, isError: isError };
};

export const useDeleteResource = () => {
  return useMutation({
    mutationFn: deleteResource,
    onSuccess: (data) => {
      console.debug("Deleting success:", data);
    },
    onError: (error) => {
      console.error("Error deleting resource", error);
    },
  });
};
