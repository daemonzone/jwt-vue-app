import {defineStore} from 'pinia';

import {httpClient, httpInterceptor} from "@/helpers/http-client";
import {router} from "@/helpers/router";

const loginUrl = `${import.meta.env.VITE_API_URL}/login/authenticate`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(username, password) {
            const user = await httpClient.post(loginUrl, { username, password });

            // update pinia state
            this.user = user.data;
            console.log(user.data);

            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(this.user));

            // active JWT token interceptors
            httpInterceptor.addTokenInterceptor();
            httpInterceptor.refreshTokenInterceptor();

            // redirect to previous url or default to home page
            await router.push(this.returnUrl || '/');
        },
        async logout() {
            this.user = null;
            localStorage.removeItem('user');
            await router.push('/login');
        }
    }
});
