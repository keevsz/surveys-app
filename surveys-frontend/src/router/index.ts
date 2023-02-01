import { useAuthStore } from '../store/auth'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../modules/auth/composables/useAuth'

import authRouter from '../modules/auth/router'
import surveyRouter from '../modules/survey/router'



const routes = [
    {
        path: '/:pathMatch(.*)',
        component: () => import('../components/NotFound.vue')
    },

    // auth
    {
        path: '/',
        ...authRouter
    },

    {
        path: '/home',
        ...surveyRouter,
        beforeEnter: async (to : any, from : any, next : any) => {
            const auth = useAuthStore()
            
            const { initAuth } = useAuth()
            try {
                await initAuth()
                if (auth.cookie) {
                    next()
                }
                else {
                    next({ name: 'login' })
                }
            } catch (error) {
                next({ name: 'login' })
            }    
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router