export default {
    name: 'auth',
    component: () => import('../layouts/Index.vue'),
    children: [
        {
            path: '',
            name: 'login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/Register.vue')
        }
    ]
}