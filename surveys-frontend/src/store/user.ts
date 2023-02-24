import { defineStore } from 'pinia'
import { IUser } from '../modules/user/interfaces'

export const useUserStore = defineStore('user', {
    state: () : IUser => ({
        id: '',
        username: '',
        password: '',
        name: '',
        lastname: '',
        email: '',
        pic: '',
        age: 0
    }),

    actions: {
        setUser(user : IUser) {
            this.id = user.id
            this.username = user.username
            this.name = user.name
            this.lastname = user.lastname
            this.email = user.email
            this.pic = user.pic
            this.age = user.age
        },

        initSatate() {
            this.id = ''
            this.username = ''
            this.name = ''
            this.lastname = ''
            this.email = ''
            this.pic = ''
            this.age = 0
        }
    }
})