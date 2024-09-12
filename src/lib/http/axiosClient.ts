// src/apiClient.js
import axios from "axios";

// Crea una instancia de Axios con la configuración base
const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Cambia esto a la URL de tu API
  headers: {
    "Content-Type": "application/json",
    // Puedes agregar otros headers como Authorization si es necesario
  },
});

// Puedes agregar interceptores si necesitas manejar solicitudes o respuestas globalmente
apiClient.interceptors.request.use(
  (config) => {
    // Aquí puedes añadir lógica antes de enviar la solicitud
    // Ejemplo: agregar un token de autenticación
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
