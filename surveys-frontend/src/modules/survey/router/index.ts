export default {
    name: 'survey',
    component: () => import('../layouts/Index.vue'),
    children: [
        {
            path: '',
            name: 'home-survey',
            component: () => import('../views/Home.vue')
        },
        {
            path: 'uno',
            name: 'survey-uno',
            component: () => import('../views/Uno.vue'),
        },
        {
            path: 'dos',
            name: 'survey-dos',
            component: () => import('../views/Dos.vue'),
        },
    ]
}