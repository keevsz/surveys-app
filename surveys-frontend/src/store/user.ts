import { defineStore } from 'pinia'

interface IUser {
    // user: {
        id: string,
        // firstName: string,
        // lastName: string,
        // email: string,
        username: string,
        password: string,
        photo: string,
        // address: string,
        // city: string,
        // country: string,
        // postal: string
    // }
}

export const useUserStore = defineStore('user', {
    state: () : IUser => ({
        id: '',
        username: '',
        password: '',
        photo: ''
    }),

    actions: {
        setUser(user : IUser) {
            this.id = user.id
            this.username = user.username
            this.photo = user.photo
            // this.password = usera.password
        },

        // async update(user : IUser) {

        // }
    }
})