import Login from "@/pages/auth/Login.vue";
import Layout from "@/layouts/Index.vue";
import DashboardApp from "@/pages/dashboard/Index.vue";
import ticketRoutes from '@/pages/tickets/routes';
import userRoutes from '@/pages/users/routes';
import settingRoutes from '@/pages/settings/routes';

export default [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        name: "Dashboard",
        path: "dashboard",
        component: DashboardApp,
        meta: {
          requiresAuth: false,
        }
      },
      {
        path: "/404",
        name: "NotFound",
        component: () => import("@/components/NotFound.vue"),
        meta: {
          requiresAuth: true
        }
      },
      ...ticketRoutes,
      ...userRoutes,
      ...settingRoutes,
      {
        path: "*",
        redirect: {
          name: "Dashboard"
        }
      },
      {
        path: "/",
        redirect: {
          name: "Dashboard"
        }
      }
    ]
  }
];
