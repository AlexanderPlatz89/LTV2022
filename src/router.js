import {createRouter, createWebHashHistory} from 'vue-router';
import {getUser} from './main'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/qrsearch',
        name: 'qrsearch',
        exact: true,
        component: () => import('./components/QRSearch.vue'),
        meta: {
            breadcrumb: [{ label: 'QR Search' }],
            requiresAuth: false
        }
    },
    {
        path: '/produzione',
        name: 'produzione',
        exact: true,
        component: () => import('./components/Produzione/Produzione.vue'),
        meta: {
            breadcrumb: [{ label: 'Produzione' }],
            requiresAuth: false
        }
    },
    {
        path: '/commesse',
        name: 'commesse',
        exact: true,
        component: () => import('./components/Commesse/Commesse.vue'),
        meta: {
            breadcrumb: [{ label: 'Commesse' }],
            requiresAuth: false
        }
    },
    {
        path: '/prodotti',
        name: 'prodotti',
        exact: true,
        component: () => import('./components/Prodotti/Prodotti.vue'),
        meta: {
            breadcrumb: [{ label: 'Prodotti' }],
            requiresAuth: false
        }
    },
    {
        path: '/macchine',
        name: 'macchine',
        exact: true,
        component: () => import('./components/Macchine/Macchine.vue'),
        meta: {
            breadcrumb: [{ label: 'Macchine' }],
            requiresAuth: false
        }
    },
    {
        path: '/macchina',
        name: 'macchina',
        exact: true,
        component: () => import('./components/Macchine/Macchina.vue'),
        meta: {
            breadcrumb: [{ label: 'Macchina' }],
            requiresAuth: false
        }
    },
    {
        path: '/clienti',
        name: 'clienti',
        exact: true,
        component: () => import('./components/Anagrafica/Cliente.vue'),
        meta: {
            breadcrumb: [{ label: 'Clienti' }],
            requiresAuth: false
        }
    },
    {
        path: '/fornitori',
        name: 'fornitori',
        exact: true,
        component: () => import('./components/Anagrafica/Fornitori.vue'),
        meta: {
            breadcrumb: [{ label: 'Fornitori' }],
            requiresAuth: false
        }
    }
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