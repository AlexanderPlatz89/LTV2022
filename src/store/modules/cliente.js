import ClienteService from "@/service/ClienteService";

export default {
    namespaced: true,
    state: () => ({
        clienteService: new ClienteService(),
        clienti: []
    }),
    mutations: {
        clienti(state,clienti){
            state.clienti = clienti
        }
    },
    getters:{
        clienti(state){
            return state.clienti
        }
    },
    actions:{
        clienti(context) {
            context.dispatch("startLoading", null , {root:true});
            context.state.clienteService.clienti().then( result => {
                context.commit("clienti",result)
                context.dispatch("stopLoading", null , {root:true});
            }).catch(e => {
                console.log(e)
                //todo aprire popup service error
                context.dispatch("resetLoading", null , {root:true});
            })
        },
        cliente(context, id) {
            context.dispatch("startLoading", null , {root:true});
            return context.state.clienteService.cliente(id).then( result => {
                context.dispatch("stopLoading", null , {root:true});
                return result
            }).catch(e => {
                console.log(e)
                //todo aprire popup service error
                context.dispatch("resetLoading", null , {root:true});
            })

        },
        upsert(context, cliente) {
            context.dispatch("startLoading", null , {root:true});
            return context.state.clienteService.upsert(cliente).then( result => {
                if(cliente.sediCliente != null){
                    cliente.sediCliente = cliente.sediCliente
                        .filter(sedeCliente => sedeCliente.deleted !== true)
                }
                if(cliente.id <= 0){
                    cliente.id = result
                    let clienti = context.getters["clienti"]
                    if(clienti != null) clienti.unshift(cliente)
                    else clienti = [cliente]
                    context.commit("clienti",clienti)
                }
                context.dispatch("stopLoading", null , {root:true});
            }).catch(e => {
                context.dispatch("resetLoading", null , {root:true});
                throw e
            })

        },
        remove(context, cliente) {
            if(cliente != null && cliente.id > 0){
                context.dispatch("startLoading", null , {root:true});
                return context.state.clienteService.remove(cliente.id).then( () => {
                    const clienti = context.getters["clienti"].filter(original => original.id !== cliente.id)
                    context.commit("clienti",clienti)
                    context.dispatch("stopLoading", null , {root:true});
                }).catch(e => {
                    context.dispatch("resetLoading", null , {root:true});
                    throw e
                })
            }
        }
    }
}
