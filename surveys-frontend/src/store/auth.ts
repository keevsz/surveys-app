import { defineStore } from 'pinia'

interface IAuth {
    cookie: string
}

export const useAuthStore = defineStore('auth', {
    state: (): IAuth => ({
        cookie: ''
    }),

    actions: {
        setCookie( cookie : string ) {
            this.cookie = cookie
        }
    }
    
})