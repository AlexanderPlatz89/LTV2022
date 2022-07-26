import ProdottoService from "@/service/ProdottoService";

export default {
    namespaced: true,
    state: () => ({
        prodottoService: new ProdottoService(),
        prodotti: [],
        tipiProdotto:[],
        um:[],
        trattamenti:[]
    }),
    mutations: {
        prodotti(state,prodotti){
            state.prodotti = prodotti
        },
        tipiProdotto(state,tipiProdotto){
            state.tipiProdotto = tipiProdotto
        },
        um(state,um){
            state.um = um
        },
        trattamenti(state,trattamenti){
            state.trattamenti = trattamenti
        }
    },
    getters:{
        prodotti(state){
            return state.prodotti
        },
        tipiProdotto(state){
            return state.tipiProdotto
        },
        um(state){
            return state.um
        },
        trattamenti(state){
            return state.trattamenti
        }
    },
    actions:{
        prodotti(context) {
            context.dispatch("startLoading", null , {root:true});
            context.state.prodottoService.prodotti().then( result => {
                context.commit("prodotti",result)
                context.dispatch("stopLoading", null , {root:true});
            }).catch(e => {
                console.log(e)
                //todo aprire popup service error
                context.dispatch("resetLoading", null , {root:true});
            })
        },
        prodotto(context, id) {
            context.dispatch("startLoading", null , {root:true});
            return context.state.prodottoService.prodotto(id).then( result => {
                context.dispatch("stopLoading", null , {root:true});
                return result
            }).catch(e => {
                console.log(e)
                //todo aprire popup service error
                context.dispatch("resetLoading", null , {root:true});
            })

        },
        upsert(context, prodotto) {
            context.dispatch("startLoading", null , {root:true});
            return context.state.prodottoService.upsert(prodotto).then( result => {
                if(prodotto.componenti != null){
                    prodotto.componenti = prodotto.componenti
                        .filter(componente => componente.deleted !== true)
                }
                if(prodotto.id <= 0){
                    prodotto.id = result
                    let prodotti = context.getters["prodotti"]
                    if(prodotti != null) prodotti.unshift(prodotto)
                    else prodotti = [prodotto]
                    context.commit("prodotti",prodotti)
                }
                context.dispatch("stopLoading", null , {root:true});
            }).catch(e => {
                context.dispatch("resetLoading", null , {root:true});
                throw e
            })

        },
        remove(context, prodotto) {
            if(prodotto != null && prodotto.id > 0){
                context.dispatch("startLoading", null , {root:true});
                return context.state.prodottoService.remove(prodotto.id).then( () => {
                    const prodotti = context.getters["prodotti"].filter(original => original.id !== prodotto.id)
                    context.commit("prodotti",prodotti)
                    context.dispatch("stopLoading", null , {root:true});
                }).catch(e => {
                    context.dispatch("resetLoading", null , {root:true});
                    throw e
                })
            }
        },
        tipiProdotto(context) {
            context.dispatch("startLoading", null , {root:true});
            return context.state.prodottoService.tipiProdotto().then( result => {
                context.commit("tipiProdotto",result)
                context.dispatch("stopLoading", null , {root:true});
            }).catch(e => {
                console.log(e)
                //todo aprire popup service error
                context.dispatch("resetLoading", null , {root:true});
            })
        },
        um(context) {
            context.dispatch("startLoading", null , {root:true});
            return context.state.prodottoService.um().then( result => {
                context.commit("um",result)
                context.dispatch("stopLoading", null , {root:true});
            }).catch(e => {
                console.log(e)
                //todo aprire popup service error
                context.dispatch("resetLoading", null , {root:true});
            })
        },
        trattamenti(context) {
            context.dispatch("startLoading", null , {root:true});
            return context.state.prodottoService.trattamenti().then( result => {
                context.commit("trattamenti",result)
                context.dispatch("stopLoading", null , {root:true});
            }).catch(e => {
                console.log(e)
                //todo aprire popup service error
                context.dispatch("resetLoading", null , {root:true});
            })
        }
    }
}
