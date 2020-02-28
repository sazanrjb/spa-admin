import Login from '@/pages/auth/Login.vue';
import Layout from '@/layouts/Index.vue';
import DashboardApp from '@/pages/dashboard/Index.vue';

export default [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/',
        component: Layout,
        children: [
            {
                name: 'Dashboard',
                path: 'dashboard',
                component: DashboardApp,
                meta: {
                    requiresAuth: false,
                },
            },
            {
                path: '*',
                redirect: {
                    name: 'Dashboard',
                },
                meta: {
                    requiresAuth: false,
                },
            },
            {
                path: '/',
                redirect: {
                    name: 'Dashboard',
                },
                meta: {
                    requiresAuth: false,
                },
            }
        ],
    },
];