import { defineStore } from 'pinia'
import { User } from '../modules/auth/models/auth.model'

interface IAuth {
    cookie: string,
    user: User
}

export const useAuthStore = defineStore('auth', {
    state: (): IAuth => ({
        cookie: '',
        user: {
            name: ''
        }
    })

    
})