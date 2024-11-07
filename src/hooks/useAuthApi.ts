import { AuthRequest } from "@/components/User/Auth.interfaces";
import apiClient from "@/lib/http/axiosClient";
import { useMutation } from "@tanstack/react-query";

const register = async (registerRequest: AuthRequest) => {
  const response = await apiClient.post(`/user/register`, registerRequest);
  return response.data;
};

const login = async (loginRequest: AuthRequest) => {
  const response = await apiClient.post(`/user/login`, loginRequest);
  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log("Data created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating data:", error);
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Data created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating data:", error);
    },
  });
};
