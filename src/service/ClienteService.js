import {executeQuery, getFilters} from "@/main";
import clienti from 'raw-loader!./graphql/query/clienti.graphqls';
import cliente from 'raw-loader!./graphql/query/cliente.graphqls';
import clienteUpsert from 'raw-loader!./graphql/mutation/clienteUpsert.graphqls';
import clienteRemove from 'raw-loader!./graphql/mutation/clienteRemove.graphqls';

export default class CommessaService {
    clienti(){
        return executeQuery(clienti)
    }
    cliente(id) {
        return executeQuery(cliente, {id:id})
    }
    upsert(object) {
        return executeQuery(clienteUpsert, {cliente:this.prepareClienteInput(object)})
    }
    remove(id) {
        return executeQuery(clienteRemove, {id:id})
    }
    prepareClienteInput(originalCliente){
        const cliente = getFilters().deepClone(originalCliente)
        if(cliente != null){
            cliente.id = Number(cliente.id)
            if(cliente.sediCliente != null )
                cliente.sediCliente.forEach(sedeCliente => {
                    sedeCliente.cliente = {id:cliente.id}
                })
        }
        return cliente
    }
}
