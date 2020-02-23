import Login from '@/pages/auth/Login.vue';
import Register from '@/pages/auth/Register.vue';
import Layout from '@/layouts/Index.vue';
import DashboardApp from '@/pages/dashboard/Index.vue';

export default [
    {
        path: '/',
        component: Layout,
        children: [
            {
                name: 'Dashboard',
                path: 'dashboard',
                component: DashboardApp,
            },
            {
                path: '*',
                redirect: {
                    name: 'Dashboard',
                },
            },
            {
                path: '/',
                redirect: {
                    name: 'Dashboard',
                },
            }
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    }
];