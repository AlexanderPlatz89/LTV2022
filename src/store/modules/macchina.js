import MacchinaService from "@/service/MacchinaService";

export default {
    namespaced: true,
    state: () => ({
        macchinaService: new MacchinaService(),
        macchine: []
    }),
    mutations: {
        macchine(state, macchine) {
            state.macchine = macchine
        }
    },
    getters: {
        macchine(state) {
            return state.macchine
        }
    },
    actions: {
        macchine(context) {
            context.dispatch("startLoading", null, {root: true});
            context.state.macchinaService.macchine().then(result => {
                context.commit("macchine", result)
                context.dispatch("stopLoading", null, {root: true});
            }).catch(e => {
                console.log(e)
                //todo aprire popup service error
                context.dispatch("resetLoading", null, {root: true});
            })
        },
        macchina(context, id) {
            context.dispatch("startLoading", null, {root: true});
            return context.state.macchinaService.macchina(id).then(result => {
                context.dispatch("stopLoading", null, {root: true});
                return result
            }).catch(e => {
                console.log(e)
                //todo aprire popup service error
                context.dispatch("resetLoading", null, {root: true});
            })

        },
        upsert(context, macchina) {
            context.dispatch("startLoading", null, {root: true});
            return context.state.macchinaService.upsert(macchina).then(result => {
                if (macchina.id <= 0) {
                    macchina.id = result
                    let macchine = context.getters["macchine"]
                    if (macchine != null) macchine.unshift(macchina)
                    else macchine = [macchina]
                    context.commit("macchine", macchine)
                }
                context.dispatch("stopLoading", null, {root: true});
            }).catch(e => {
                context.dispatch("resetLoading", null, {root: true});
                throw e
            })

        },
        remove(context, macchina) {
            if (macchina != null && macchina.id > 0) {
                context.dispatch("startLoading", null, {root: true});
                return context.state.macchinaService.remove(macchina.id).then(() => {
                    const macchine = context.getters["macchine"].filter(original => original.id !== macchina.id)
                    context.commit("macchine", macchine)
                    context.dispatch("stopLoading", null, {root: true});
                }).catch(e => {
                    context.dispatch("resetLoading", null, {root: true});
                    throw e
                })
            }
        }
    }
}
