import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/http/axiosClient";
import { Resource } from "@/components/Resources/Resources";
import { removeProperty } from "@/lib/utils";

// Función para obtener datos de la API
const createResource = async (resource: Resource) => {
  const sanitizedObject = removeProperty(resource, "id");
  const response = await apiClient.post("/resource/create", sanitizedObject); // Cambia la ruta al endpoint correcto
  return response.data;
};

const getResourceListByTeacherId = async (teacherId: string) => {
  return await apiClient.get("/resource/list-by-teacher", {
    params: { id: teacherId },
  });
};

// Hook personalizado para usar en componentes
export const useCreateResource = () => {
  return useMutation({
    mutationFn: createResource,
    onSuccess: (data) => {
      // Aquí puedes manejar la lógica después de que la creación sea exitosa
      // e.g., notificar al usuario o actualizar el estado global
      console.log("Data created successfully:", data);
    },
    onError: (error) => {
      // Aquí puedes manejar errores
      console.error("Error creating data:", error);
    },
  });
};

export const useListResourceByTeacher = (teacherId: string) => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["RESOURCES_LIST_BY_TEACHER_QUERY", teacherId],
    queryFn: () => getResourceListByTeacherId(teacherId),
  });

  return { data: data?.data, isSuccess: isSuccess, isError: isError };
};
