import FornitoreService from "@/service/FornitoreService";

export default {
    namespaced: true,
    state: () => ({
        fornitoreService: new FornitoreService(),
        fornitori: []
    }),
    mutations: {
        fornitori(state,fornitori){
            state.fornitori = fornitori
        }
    },
    getters:{
        fornitori(state){
            return state.fornitori
        }
    },
    actions:{
        fornitori(context) {
            context.dispatch("startLoading", null , {root:true});
            context.state.fornitoreService.fornitori().then( result => {
                context.commit("fornitori",result)
                context.dispatch("stopLoading", null , {root:true});
            }).catch(e => {
                console.log(e)
                //todo aprire popup service error
                context.dispatch("resetLoading", null , {root:true});
            })
        },
        fornitore(context, id) {
            context.dispatch("startLoading", null , {root:true});
            return context.state.fornitoreService.fornitore(id).then( result => {
                context.dispatch("stopLoading", null , {root:true});
                return result
            }).catch(e => {
                console.log(e)
                //todo aprire popup service error
                context.dispatch("resetLoading", null , {root:true});
            })

        },
        upsert(context, fornitore) {
            context.dispatch("startLoading", null , {root:true});
            return context.state.fornitoreService.upsert(fornitore).then( result => {
                if(fornitore.sediFornitore != null){
                    fornitore.sediFornitore = fornitore.sediFornitore
                        .filter(sedeFornitore => sedeFornitore.deleted !== true)
                }
                if(fornitore.id <= 0){
                    fornitore.id = result
                    let fornitori = context.getters["fornitori"]
                    if(fornitori != null) fornitori.unshift(fornitore)
                    else fornitori = [fornitore]
                    context.commit("fornitori",fornitori)
                }
                context.dispatch("stopLoading", null , {root:true});
            }).catch(e => {
                context.dispatch("resetLoading", null , {root:true});
                throw e
            })

        },
        remove(context, fornitore) {
            if(fornitore != null && fornitore.id > 0){
                context.dispatch("startLoading", null , {root:true});
                return context.state.fornitoreService.remove(fornitore.id).then( () => {
                    const fornitori = context.getters["fornitori"].filter(original => original.id !== fornitore.id)
                    context.commit("fornitori",fornitori)
                    context.dispatch("stopLoading", null , {root:true});
                }).catch(e => {
                    context.dispatch("resetLoading", null , {root:true});
                    throw e
                })
            }
        }
    }
}
