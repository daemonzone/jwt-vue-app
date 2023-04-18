import axios from "axios";
import {useAuthStore} from "@/stores";

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export const httpInterceptor = {
    addTokenInterceptor() {
        httpClient.interceptors.request.use(request => {
            if (useAuthStore().user?.token)
                request.headers.Authorization = `Bearer ${useAuthStore().user?.token}`;
            return Promise.resolve(request);
        });
    },
    refreshTokenInterceptor() {
        httpClient.interceptors.response.use(
            response => response,
            async error => {
                if (error.response.status === 401) {
                    await useAuthStore().logout();
                }
                return Promise.reject(error);
            }
        );
    },
};
