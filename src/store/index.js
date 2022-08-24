import { createStore } from 'vuex'
import AuthService from "@/service/AuthService";

const store = createStore({
    modules: {
    },
    state: {
        time: 12,
        workers: [],
        machinesDB: null,
        workersDB: null,
        worksheetsDB: null,
        endpoint: (location.hostname.search("localhost") !== -1 ? location.protocol + '//' + location.hostname + ':8081' : location.protocol + '//' + location.hostname),
        user: null,
        editing: false,
        loading: 0,
        progressLoaded: 30,
        progressTotal: 0,
        searchValue: null,
        authService: new AuthService(),
        day: 1
    },
    getters: {
        time: state => {
            return state.time;
        },
        workers: state => {
            return state.workers;
        },
        editing: state => {
            return state.editing;
        },
        machinesDB: state => {
            return state.machinesDB;
        },
        workersDB: state => {
            return state.workersDB;
        },
        worksheetsDB: state => {
            return state.worksheetsDB;
        },
        token: state => {
            if (state.user != null) {
                return state.user.token;
            }
            return null;
        },
        refresh: state => {
            if (state.user != null) {
                return state.user.refresh;
            }
            return null;
        },
        progress: state => {
            let progress = Math.round((state.progressLoaded * 100) / state.progressTotal)
            if (progress > 99) {
                progress = 99
            }
            return progress
        },
        day: state => {
            return state.day;
        }
    },
    mutations: {
        setTime(state, time) {
            state.time = time;
        },
        setWorkers(state, workers) {
            state.workers = workers;
        },
        setMachinesDB(state, machinesDB) {
            state.machinesDB = machinesDB;
        },
        setWorkersDB(state, workersDB) {
            state.workersDB = workersDB;
        },
        setWorksheetsDB(state, worksheetsDB) {
            state.worksheetsDB = worksheetsDB;
        },
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            if (state.user != null) {
                state.user.token = token;
            }
        },
        setRefresh(state, refresh) {
            if (state.user != null) {
                state.user.refresh = refresh;
            }
        },
        setEditing(state, editing) {
            state.editing = editing;
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        setProgressLoaded(state, progressLoaded) {
            state.progressLoaded = (isNaN(progressLoaded) ? 0 : progressLoaded);
        },
        setProgressTotal(state, progressTotal) {
            state.progressTotal = (isNaN(progressTotal) ? 0 : progressTotal);
        },
        incrementProgressLoaded(state, progressLoaded) {
            state.progressLoaded += (isNaN(progressLoaded) ? 0 : progressLoaded);
        },
        incrementProgressTotal(state, progressTotal) {
            state.progressTotal += (isNaN(progressTotal) ? 0 : progressTotal);
        },
        setInterval(state, interval) {
            state.interval = interval;
        },
        searchValue(state, searchValue) {
            state.searchValue = searchValue;
        },
        setDay(state, day) {
            state.day = day;
        }
    },
    actions: {
        startProgress(context) {
            if (context.state.progressLoaded < 70) {
                setTimeout(() => {
                    context.commit("setProgressLoaded", 70)
                }, 1000);
            }
            if (context.state.interval == null) {
                context.state.interval = setInterval(() => {
                    if (context.state.loading === 0) {
                        clearInterval(context.state.interval)
                        context.commit('setInterval', null)
                    } else {
                        context.commit("incrementProgressLoaded", 2)
                    }
                }, 500);
            }
        },
        startLoading(context) {
            context.commit('setLoading', context.state.loading + 1)
            context.dispatch('startProgress')
        },
        stopLoading(context) {
            context.commit("setProgressLoaded", 0);
            context.commit("setProgressTotal", 100);
            if (context.state.loading === 1) {
                clearInterval(context.state.interval)
                context.commit('setInterval', null)
                context.commit("setProgressLoaded", 100)
                setTimeout(() => {
                    context.commit('setLoading', context.state.loading > 0 ? context.state.loading - 1 : 0)
                    context.commit("setProgressLoaded", 0)
                }, 800);
            } else {
                context.commit('setLoading', context.state.loading > 0 ? context.state.loading - 1 : 0)
            }
        },
        resetLoading(context) {
            clearInterval(context.state.interval)
            context.commit('setInterval', null)
            context.commit('setLoading', 0)
            context.commit('setProgressLoaded', 0)
            context.commit('setProgressTotal', 0)
        },
        async logout(context) {
            context.commit('setUser', null)
            context.commit('setEditing', false)
            context.commit('setLoading', 0)
            context.commit('setProgressLoaded', 0)
            context.commit('setProgressTotal', 0)
        },
        async authenticate(context, { username, password }) {
            await context.state.authService.authenticate(username, password).then(token => {
                if (token != null) {
                    context.commit('setUser', { username: username, token: token })
                    context.dispatch('macchina/macchine')
                    context.dispatch('cliente/clienti')
                    context.dispatch('fornitore/fornitori')
                    context.dispatch('prodotto/prodotti')
                    context.dispatch('prodotto/tipiProdotto')
                    context.dispatch('prodotto/um')
                    context.dispatch('prodotto/trattamenti')
                } else {
                    throw 403
                }
            })
        }
    }
})

export default store;
