// src/api/userApi.js
import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";

export const getUser = (userId) => apiClient.get(`/users/${userId}`);
export const updateUser = (userId, data) =>
    apiClient.put(`/users/${userId}`, data);

export const useGetUser = () => {
    const query = useQuery({
        queryFn: getUser,
    });
    return query;
};
