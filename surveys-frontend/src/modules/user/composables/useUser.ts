import api from "../../../api"
import { useUserStore } from '../../../store/user'
import { IUser } from "../interfaces"
import { loadAbort } from "../utils/loadAbort"
import axios from 'axios'

export const useUser = () => {

    const userStore = useUserStore()
    
    const userCurrent = () => {
        return new Promise( async (resolve, reject) => {
            try {
                const {data} = await api.get('/auth/status', {
                    withCredentials: true
                })
                userStore.setUser(data)
                resolve(true)
                
            } catch (error) {
                console.log(error)                
                reject(false)
            }
        })
    }

    const update = (user : IUser) => {
        return new Promise( async(resolve, reject) => {
            
            try {
                await api.put(`/users/${userStore.id}`, {
                    name: user.name,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    age: user.age
                }, { withCredentials: true })

                userCurrent()

                resolve(true)
                
            } catch (error) {
                console.log(error)
                reject(false)
            }
        })
    }

    const loadImage = (newImage : string) => {
        return new Promise( async (resolve, reject) => {
            try {
                await api.put(`/users/${userStore.id}`, {
                    pic: newImage
                }, { withCredentials: true })

                userCurrent()

                resolve(true)
            } catch (error) {
                reject(false)
            }
        })
    }

    const updateImage = ( file : any ) => {
        return new Promise( async (resolve, reject) => {
            try {
                const controller = loadAbort()
                const data = new FormData()
                data.append('file', file)
                data.append('upload_preset', 'chat-app')
                data.append('cloud_name', 'dalp4xrqs')
                const res = await axios.post(
                    'https://api.cloudinary.com/v1_1/dalp4xrqs/image/upload',
                    data,
                    {
                        signal: controller.signal,
                    }
                )
                resolve(res)
            } catch (error) {
                reject(false)
            }
        })  
    }
    
    return {
        userCurrent,
        update,
        updateImage,
        loadImage
    }
}