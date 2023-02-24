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
            path: 'create',
            name: 'survey-create',
            component: () => import('../views/Create.vue'),
        },
        {
            path: 'list',
            name: 'survey-list',
            component: () => import('../views/List.vue'),
        },
    ]
}