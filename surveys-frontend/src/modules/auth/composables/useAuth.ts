import { useAuthStore } from '../../../store/auth'
import api from '../../../api'
import { IUser } from '../../user/interfaces'

export const useAuth = () => {

    const auth = useAuthStore()

    const login = ( username : string, password : string ) => {
            return new Promise(async (resolve, reject) => {
                try {
                    await api.post('/auth/login', {
                        username,
                        password
                    }, { withCredentials: true })
                  
                    auth.setCookie(document.cookie)

                    resolve(true)
    
                } catch (error : any) {
                    let aux = error?.response.data
    
                    reject(aux)
                }
            })
            
    }

    const register = ( user: IUser ) => {
        return new Promise( async (resolve, reject ) => {
            try {
                await api.post('/users', {
                    name: user.name,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    pic: 'https://cdn-icons-png.flaticon.com/512/6073/6073873.png'
                })
                resolve(true)
            } catch (error : any) {                
                let send = error?.response.data
                reject(send)                
            }
        })
    }

    const initAuth = () => {
        return new Promise( async (resolve, reject) => {
            try {
                await api.get('/auth/status', {
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