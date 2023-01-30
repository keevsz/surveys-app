import api from '../../../api'
import { useAuthStore } from '../../../store/auth'

interface IResponse {
    message: string,
    code: number
}

interface IUser {
    username: string,
    password: string
}


const auth = useAuthStore()

export const useAuth = () => {

    const login = ( username : string, password : string ) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const res : IResponse = await api.post('/auth/login', {
                        username,
                        password
                    }, { withCredentials: true })

                    resolve(res)
    
                } catch (error : any) {
                    let aux = error?.response.data
    
                    reject(aux)
                }
            })
            
    }

    const register = ( user: IUser ) => {
        return new Promise( async (resolve, reject ) => {
            try {
                const res = await api.post('/users', {
                    username: user.username,
                    password: user.password
                })

                resolve(res)
            } catch (error : any) {
                let send = error?.response.data
                reject(send)                
            }
        })
    }

    return {
        login,
        register
    }
}