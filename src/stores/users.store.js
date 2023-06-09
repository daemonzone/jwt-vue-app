import {defineStore} from 'pinia'
import {httpClient} from "@/helpers/http-client";

const baseUrl = `${import.meta.env.VITE_API_URL}/api-interns`

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {}
    }),
    actions: {
        async getCurrentUserData() {
            this.users = { loading: true }
            httpClient.get(baseUrl)
                .then(users => this.users = users.data)
                .catch(error => this.users = { error })
        },
        async refresh() {
            await this.getCurrentUserData();
        }        
    }
})
