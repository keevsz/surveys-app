import api from '../../../api'

interface IResponse {
    message: string,
    code: number
}

interface IUser {
    username: string,
    password: string
}

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
                    let aux : IResponse = error?.response.data
    
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
            } catch (error) {
                reject(error)                
            }
        })
    }

    return {
        login,
        register
    }
}