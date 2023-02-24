import api from "../api"
import { useAuthStore } from '../store/auth'
import { useUserStore } from '../store/user'

export const useLogout = () => {
    const storeAuth = useAuthStore()
    const storeUser = useUserStore()

    const logout = () => {
        return new Promise( async (resolve, reject) => {
            try {
                await api.get('/auth/logout', { withCredentials: true })
                document.cookie = 'SESSION_NESTS =;'
                storeAuth.setCookie('')
                storeUser.initSatate()
                resolve(true)
            } catch (error) {
                reject(false)
            }
        })
    }

    return { logout }
}