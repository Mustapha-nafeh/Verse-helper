// src/api/authApi.js
import apiClient from "./apiClient";
import { useMutation } from "@tanstack/react-query";

// LOGIN
export const loginApi = async (loginData) => {
    const response = await apiClient.post("/login", loginData);
    return response.data;
};

//REGISTER
export const registerApi = async (registerData) => {
    const response = await apiClient.post("/register", registerData);
    return response.data;
};

//
//
//
//
// <============= HOOKS =============>
//
//
//

// lOGIN
export const useLogin = () => {
    const mutation = useMutation({
        mutationFn: loginApi,
    });
    return mutation;
};

// REGISTER
export const useRegister = () => {
    const mutation = useMutation({
        mutationFn: registerApi,
        onSuccess: (data) => {
            console.log("Registration successful", data);
        },
        onError: (error) => {
            console.error("Registration failed", error);
        },
    });
    return mutation;
};
