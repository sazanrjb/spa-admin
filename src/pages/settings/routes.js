export default [
  {
    path: "/settings",
    component: () => import("./App.vue"),
    children: [
      {
        name: "ChangePassword",
        path: "change-password",
        component: () => import("./pages/changePassword/Index.vue"),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "/",
        redirect: {
          name: "ChangePassword"
        }
      }
    ]
  },
  {
    path: "*",
    redirect: {
      name: "NotFound"
    }
  }
];
