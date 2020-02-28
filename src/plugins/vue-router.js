import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/routes';

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        return next({ name: 'Login' });
    }

    return next();
});

export default router;