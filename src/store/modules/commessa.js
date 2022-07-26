import CommessaService from "@/service/CommessaService";

export default {
    namespaced: true,
    state: () => ({
        commessaService: new CommessaService(),
        commesse: [],
        righeCommesseDaLavorare: []
    }),
    mutations: {
        commesse(state,commesse){
            state.commesse = commesse
        },
        righeCommesseDaLavorare(state,righeCommesseDaLavorare){
            state.righeCommesseDaLavorare = righeCommesseDaLavorare
        }
    },
    getters:{
        commesse(state){
            return state.commesse
        },
        righeCommesseDaLavorare(state){
            return state.righeCommesseDaLavorare
        }
    },
    actions:{
        commesse(context) {
            context.dispatch("startLoading", null , {root:true});
            context.state.commessaService.commesse().then( result => {
                result.forEach(commessa => {
                    commessa.data = (commessa.data != null ? new Date(commessa.data) : null)
                    commessa.dataConsegna = (commessa.dataConsegna != null ? new Date(commessa.dataConsegna) : null)
                })
                context.commit("commesse",result)
                context.dispatch("stopLoading", null , {root:true});
            }).catch(e => {
                console.log(e)
                //todo aprire popup service error
                context.dispatch("resetLoading", null , {root:true});
            })
        },
        commessa(context, id) {
            context.dispatch("startLoading", null , {root:true});
            return context.state.commessaService.commessa(id).then( result => {
                result.data = (result.data != null ? new Date(result.data) : null)
                result.dataConsegna = (result.dataConsegna != null ? new Date(result.dataConsegna) : null)
                context.dispatch("stopLoading", null , {root:true});
                return result
            }).catch(e => {
                console.log(e)
                //todo aprire popup service error
                context.dispatch("resetLoading", null , {root:true});
            })

        },
        upsert(context, commessa) {
            context.dispatch("startLoading", null , {root:true});
            return context.state.commessaService.upsert(commessa).then( result => {
                if(commessa.righeCommessa != null){
                    commessa.righeCommessa = commessa.righeCommessa
                        .filter(rigaCommessa => rigaCommessa.deleted !== true)
                }
                if(commessa.id <= 0){
                    commessa.id = result
                    let commesse = context.getters["commesse"]
                    if(commesse != null) commesse.unshift(commessa)
                    else commesse = [commessa]
                    context.commit("commesse",commesse)
                }
                context.dispatch("stopLoading", null , {root:true});
            }).catch(e => {
                context.dispatch("resetLoading", null , {root:true});
                throw e
            })

        },
        remove(context, commessa) {
            if(commessa != null && commessa.id > 0){
                context.dispatch("startLoading", null , {root:true});
                return context.state.commessaService.remove(commessa.id).then( () => {
                    const commesse = context.getters["commesse"].filter(original => original.id !== commessa.id)
                    context.commit("commesse",commesse)
                    context.dispatch("stopLoading", null , {root:true});
                }).catch(e => {
                    context.dispatch("resetLoading", null , {root:true});
                    throw e
                })
            }
        },
        righeCommesseDaLavorare(context){
            context.dispatch("startLoading", null , {root:true});
            return context.state.commessaService.righeCommesseDaLavorare().then( data => {
                context.commit("righeCommesseDaLavorare",data)
                context.dispatch("stopLoading", null , {root:true});
            }).catch(e => {
                context.dispatch("resetLoading", null , {root:true});
                throw e
            })
        }
    }
}
