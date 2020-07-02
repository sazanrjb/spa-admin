export default [
    {
        path: '/tickets',
        component: () => import('./Index.vue'),
        children: [
            {
                path: '/',
                name: 'TicketList',
                component: () => import('./pages/List.vue')
            },
            {
                path: 'create',
                name: 'CreateTicket',
                component: () => import('./pages/Form.vue')
            },
            {
                path: ':ticketId',
                name: 'TicketDetail',
                component: () => import('./pages/Detail.vue')
            },
            {
                path: ':ticketId/edit',
                name: 'EditTicket',
                component: () => import('./pages/Form.vue')
            },
            {
                path: "/",
                redirect: {
                    name: "TicketList"
                }
            },
            {
                path: "*",
                redirect: {
                    name: "NotFound"
                }
            }
        ],
    }
];