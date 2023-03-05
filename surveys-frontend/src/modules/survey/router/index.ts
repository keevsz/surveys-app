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
            path: 'my-survey',
            name: 'survey-list',
            component: () => import('../views/List.vue'),
        },
        {
            path: 'my-survey/:id',
            name: 'survey-detail',
            component: () => import('../views/Detail.vue'),
        },
        {
            path: 'survey-answer/:id',
            name: 'survey-answer',
            component: () => import('../views/Answer.vue'),
        },
        {
            path: 'survey-edit/:id',
            name: 'survey-edit',
            component: () => import('../views/Edit.vue'),
        },
    ]
}