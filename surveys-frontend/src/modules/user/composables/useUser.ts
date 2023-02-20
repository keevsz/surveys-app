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
                user.setUser(data)
                resolve(true)
                
            } catch (error) {
                console.log(error)                
                reject(false)
            }
        })
    }

    const update = (username: string, password: string) => {
        return new Promise( async(resolve, reject) => {
            try {

                await api.put(`/users/${user.id}`, {
                    username,
                    password
                }, { withCredentials: true })

                userCurrent()

                resolve(true)
                
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