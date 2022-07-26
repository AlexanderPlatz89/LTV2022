import LavorazioneService from "@/service/LavorazioneService";

export default {
    namespaced: true,
    state: () => ({
        STATO_LAVORAZIONE: {DA_LAVORARE: 'DA_LAVORARE', IN_LAVORAZIONE: 'IN_LAVORAZIONE', LAVORATO: 'LAVORATO'},
        lavorazioneService: new LavorazioneService(),
        lavorazioni: []
    }),
    mutations: {
        lavorazioni(state, lavorazioni) {
            state.lavorazioni = lavorazioni
        }
    },
    getters: {
        lavorazioni(state) {
            return state.lavorazioni
        },
        STATO_LAVORAZIONE(state){
            return state.STATO_LAVORAZIONE
        }
    },
    actions: {
        lavorazioni(context) {
            context.dispatch("startLoading", null, {root: true});
            context.state.lavorazioneService.lavorazioni().then(result => {
                result.forEach(lavorazione => {
                    const commessa = lavorazione.rigaCommessa.commessa
                    commessa.data = (commessa.data != null ? new Date(commessa.data) : null)
                    commessa.dataConsegna = (commessa.dataConsegna != null ? new Date(commessa.dataConsegna) : null)
                    if(lavorazione.macchina != null){
                        lavorazione.macchina = context.rootGetters["macchina/macchine"].find(macchina => Number(macchina.id) === Number(lavorazione.macchina.id))
                    }
                })
                context.commit("lavorazioni", result)
                context.dispatch("stopLoading", null, {root: true});
            }).catch(e => {
                console.log(e)
                //todo aprire popup service error
                context.dispatch("resetLoading", null, {root: true});
            })
        },
        assegna(context, lavorazione) {
            context.dispatch("startLoading", null, {root: true});
            context.state.lavorazioneService.assegnaMacchina(lavorazione).then(macchina => {
                const lavorazioni = context.state.lavorazioni
                lavorazioni.filter(original => Number(original.id) === Number(lavorazione.id)
                ).forEach(original => original.macchina = (context.rootGetters["macchina/macchine"].find(m => Number(m.id) === Number(macchina.id))))
                context.commit("lavorazioni", lavorazioni)
                context.dispatch("stopLoading", null, {root: true});
            }).catch(e => {
                console.log(e)
                //todo aprire popup service error
                context.dispatch("resetLoading", null, {root: true});
            })
        },
        upsert(context, lavorazioni) {
            context.dispatch("startLoading", null, {root: true});
            context.state.lavorazioneService.upsert(lavorazioni).then(() => {
                context.dispatch("lavorazioni")
                context.dispatch("stopLoading", null, {root: true});
            }).catch(e => {
                console.log(e)
                //todo aprire popup service error
                context.dispatch("resetLoading", null, {root: true});
            })
        }
    }
}
