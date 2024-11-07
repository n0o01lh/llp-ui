import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Cambia esto a la URL de tu API
  headers: {
    "Content-Type": "application/json",
    // Puedes agregar otros headers como Authorization si es necesario
  },
});

// interceptores para manejar solicitudes o respuestas globalmente
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo global de errores
    return Promise.reject(error);
  }
);

export default apiClient;
