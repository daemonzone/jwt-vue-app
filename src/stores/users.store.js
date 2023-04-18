import {defineStore} from 'pinia'
import {httpClient} from "@/helpers/http-client";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {}
    }),
    actions: {
        async getAll() {
            this.users = { loading: true }
            httpClient.get(baseUrl)
                .then(users => this.users = users)
                .catch(error => this.users = { error })
        },        
        async getCurrentUserData() {
            this.users = { loading: true }
            httpClient.get(baseUrl)
                .then(users => this.users = users)
                .catch(error => this.users = { error })
        }        
    }
})
