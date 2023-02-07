import api from "../../../api"
import { useUserStore } from '../../../store/user'

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

export const useUser = () => {

    const user = useUserStore()
    
    const userCurrent = () => {
        return new Promise( async (resolve, reject) => {
            try {
                const {data} = await api.get('/auth/status', {
                    withCredentials: true
                })
                console.log(data)
                user.setUser(data)
                resolve(true)
                
            } catch (error) {
                console.log(error)                
                reject(false)
            }
        })
    }

    const update = (username: string) => {
        return new Promise( async(resolve, reject) => {
            try {
                console.log(`/users/${user.id}`);
                
                const res = await api.put(`/users/${user.id}`, {
                    username
                }, { withCredentials: true })
                console.log(res);
                
            } catch (error) {
                console.log(error)
                reject(false)
            }
        })
    }
    
    return {
        userCurrent,
        update
    }
}