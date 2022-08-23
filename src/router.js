import {createRouter, createWebHashHistory} from 'vue-router';
import {getUser} from './main'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        exact: true,
        component: () => import('./components/Production/Dashboard.vue'),
        meta: {
            breadcrumb: [{ label: 'Dashboard' }],
            requiresAuth: false
        }
    },
    {
        path: '/manageStaff',
        name: 'manageStaff',
        exact: true,
        component: () => import('./components/Workforce/ManageStaff.vue'),
        meta: {
            breadcrumb: [{ label: 'ManageStaff' }],
            requiresAuth: false
        }
    },
    {
        path: '/manageWorksheets',
        name: 'manageWorksheets',
        exact: true,
        component: () => import('./components/ManageWorksheets/ManageWorksheets.vue'),
        meta: {
            breadcrumb: [{ label: 'manageWorksheets' }],
            requiresAuth: false
        }
    },
    {
        path: '/manageMachines',
        name: 'manageMachines',
        exact: true,
        component: () => import('./components/Machines/ManageMachines.vue'),
        meta: {
            breadcrumb: [{ label: 'Manage Machines' }],
            requiresAuth: false
        }
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior () {
        return { left: 0, top: 0 };
    }
});

router.beforeEach(function(to, from, next) {
    window.scrollTo(0, 0);
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (getUser() == null || getUser().token == null ) {
            next('/login')
            return
        }
    }
    next()
});

export default router;