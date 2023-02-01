import { useAuthStore } from '../../../store/auth'
import api from '../../../api'
import { useRouter } from 'vue-router'

interface IResponse {
    message: string,
    code: number
}

interface IUser {
    username: string,
    password: string
}

export const useAuth = () => {

    const auth = useAuthStore()

    // const router = useRouter()

    const login = ( username : string, password : string ) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const res : IResponse = await api.post('/auth/login', {
                        username,
                        password
                    }, { withCredentials: true })
                  
                    auth.setCookie(document.cookie)

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
                console.log(error);
                
                let send = error?.response.data
                reject(send)                
            }
        })
    }

    const initAuth = () => {
        // var a store cookie
        return new Promise( async (resolve, reject) => {
            try {
                const res = await api.get('/auth/status', {
                    withCredentials:true
                })

                auth.setCookie(document.cookie)
                resolve(true)
            } catch (error) {
                auth.setCookie('')
                reject(false)
            }
        })
    }

    return {
        login,
        register,
        initAuth
    }
}