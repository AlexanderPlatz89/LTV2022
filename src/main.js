import { createApp, h } from 'vue';
import { i18n } from "./plugins/i18n";
import IdleVue from 'idle-vue-3'
import router from './router';
import store from './store';
import axios from 'axios';
import moment from 'moment';
import VueQRCodeComponent from 'vue-qrcode-component'
import VueQrcodeReader from "vue3-qrcode-reader";
import App from './App.vue';

import PrimeVue from 'primevue/config';
import * as PrimeVueConfig from './primevue';
import 'primevue/resources/primevue.min.css';
import 'font-awesome/css/font-awesome.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css'
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';

import Access from './pages/Access';
import Error from './pages/Error';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const app = createApp({
    computed: {
        ViewComponent() {
            switch (this.$route.path) {
                case '/login':
                    return Login;
                case '/error':
                    return Error;
                case '/access':
                    return Access;
                case '/notfound':
                    return NotFound;
                default:
                    return App;
            }
        }
    },
    render() {
        return h(this.ViewComponent)
    }
});

app.use(PrimeVue, { ripple: true });
app.use(router);
app.use(store);
app.use(i18n);
app.use(IdleVue, { eventEmitter: app, idleTime: 6000000, store });
app.use(VueQrcodeReader);
app.component('qr-code', VueQRCodeComponent)

app.config.globalProperties.$db = {

    async delete(db, table, id) {

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(table, 'readwrite')
            const store = transaction.objectStore(table)

            store.delete(id)

            transaction.oncomplete = () => {
                resolve('Item successfully deleted.')
            }

            transaction.onerror = event => {
                reject(event)
            }
        })
    },

    async insert(db, table, objToInsert) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(table, 'readwrite')
            const store = transaction.objectStore(table)
            store.put(objToInsert)

            transaction.oncomplete = () => {
                resolve('Machine added successfully')
            }

            transaction.onerror = event => {
                reject(event)
            }
        })
    },
    async readFromTable(db, table) {
        let outPut = []
        let response = new Promise((resolve, reject) => {
            const transaction = db.transaction(table, 'readonly')
            const store = transaction.objectStore(table)

            let workersList = []
            store.openCursor().onsuccess = event => {
                const cursor = event.target.result
                if (cursor) {
                    workersList.push(cursor.value)
                    cursor.continue()
                }
            }

            transaction.oncomplete = () => {
                resolve(workersList)
            }

            transaction.onerror = event => {
                reject(event)
            }
        })
        await response.then(response => {
            outPut = response
        })
        return outPut
    },
}
app.config.globalProperties.$filters = {
    createId(list) {
        return createId(list)
    },
    formatDate(value, format) {
        return formatDate(value, format)
    },
    sendToast(vue, errorKey) {
        if (errorKey != null) {
            vue.$toast.add({
                severity: vue.$t("common.toasts." + errorKey + ".severity"),
                summary: vue.$t("common.toasts." + errorKey + ".summary"),
                detail: vue.$t("common.toasts." + errorKey + ".detail"),
                life: 3000
            });
        }
    },
    deepClone(object) {
        if (object != null) {
            return JSON.parse(JSON.stringify(object))
        }
    },
    isEmpty(object) {
        return isEmpty(object)
    },
    isEditable(elementId, aclRules, editing) {
        return (editing && (aclRules.find(a => a.elementId === elementId) ? aclRules.find(a => a.elementId === elementId).editable : true))
    },
    isVisible(elementId, aclRules) {
        return (aclRules.find(a => a.elementId === elementId) ? aclRules.find(a => a.elementId === elementId).visible : true)
    },
    isClickable(elementId, aclRules) {
        return ((aclRules.find(a => a.elementId === elementId) ? aclRules.find(a => a.elementId === elementId).clickable : true))
    },
    searchUser(query, user) {
        if (user != null) {
            if (user.username != null && user.username.toUpperCase().startsWith(query.toUpperCase())) return user;
            if (user.description != null && user.description.toUpperCase().includes(query.toUpperCase())) return user;
            if (user.email != null && user.email.toUpperCase().includes(query.toUpperCase())) return user;
        }
    },
    searchApplication(query, application) {
        if (application != null) {
            if (application.code != null && application.code.toUpperCase().startsWith(query.toUpperCase())) return application;
            if (application.description != null && application.description.toUpperCase().includes(query.toUpperCase())) return application;
        }
    },
    searchRole(query, role) {
        if (role != null) {
            if (role.code != null && role.code.toUpperCase().startsWith(query.toUpperCase())) return role;
            if (role.description != null && role.description.toUpperCase().includes(query.toUpperCase())) return role;
        }
    }
}
PrimeVueConfig.init(app);

app.mount('#app');

export function getAxios() {
    axios.defaults.baseURL = store.state.endpoint;
    if (getUser() != null && getUser().token != null) {
        axios.defaults.headers.common.authorization = `Bearer ${getUser() != null ? getUser().token : null}`;
    }
    return axios;
}

export function executeQuery(query, variables) {
    return getAxios().post('graphql', {
        query: query,
        variables: variables
    }).then(result => {
        if (result.data.errors != null && result.data.errors.length > 0) {
            console.log(result.data.errors);
            let errorKey = null;
            result.data.errors.forEach(e => {
                if (e.exception != null && e.exception.errorKey != null) {
                    errorKey = e.exception.errorKey;
                }
            })
            throw {
                request: { status: 200 },
                response: { data: { errorKey: errorKey != null ? errorKey : 'graphql' } }
            };
        }
        if (result.data.data != null) {
            return result.data.data[Object.keys(result.data.data)[0]];
        }
    }).catch(e => {
        if (e.request.status === 403) {
            setUser(null);
        }
        throw e;
    });
}

export function setUser(user) {
    store.commit("setUser", user);
}

export function getUser() {
    if (app != null && store != null && store.state) {
        return store.state.user;
    }
}

export function getEndpoint() {
    if (app != null && store != null && store.state) {
        return store.state.endpoint;
    }
}

export function getFilters() {
    if (app != null) {
        return app.config.globalProperties.$filters
    }
}

export function getVueInstance() {
    return app;
}

export function createId(list) {
    if (list != null && list.length > 0) {
        return -1 * (Math.max.apply(Math, list.map(function (o) {
            return Math.abs(o.id) + 1
        })))
    }
    return -1
}

export function formatDate(value, format) {
    if (value && format) {
        return moment(value.toISOString()).format(format)
    }
}

export function isEmpty(object) {
    return (object == null || object === "" || object.length === 0);
}
