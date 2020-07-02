export default [
    {
        path: 'users',
        component: () => import('./Index.vue'),
        children: [
            {
                path: '/',
                name: 'UserList',
                component: () => import('./pages/List.vue'),
            },
            {
                path: 'form',
                name: 'UserForm',
                component: () => import('./pages/Form.vue'),
            },
            {
                path: ':id',
                name: 'UserDetail',
                component: () => import('./pages/Detail.vue'),
            },
            {
                path: '/',
                redirect: {
                    name: 'UserList',
                }
            },
            {
                path: '*',
                redirect: {
                    name: 'UserList',
                }
            }
        ]
    }
];