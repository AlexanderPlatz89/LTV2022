import {executeQuery,getFilters} from "@/main";
import commesse from 'raw-loader!./graphql/query/commesse.graphqls';
import commessa from 'raw-loader!./graphql/query/commessa.graphqls';
import righeCommesseDaLavorare from 'raw-loader!./graphql/query/righeCommesseDaLavorare.graphqls';
import commessaUpsert from 'raw-loader!./graphql/mutation/commessaUpsert.graphqls';
import commessaRemove from 'raw-loader!./graphql/mutation/commessaRemove.graphqls';

export default class CommessaService {
    commesse(){
        return executeQuery(commesse)
    }
    commessa(id) {
        return executeQuery(commessa, {id:id})
    }
    upsert(object) {
        return executeQuery(commessaUpsert, {commessa:this.prepareCommessaInput(object)})
    }
    remove(id) {
        return executeQuery(commessaRemove, {id:id})
    }
    righeCommesseDaLavorare(){
        return executeQuery(righeCommesseDaLavorare)
    }
    prepareCommessaInput(commessaOriginal){
        const commessa = getFilters().deepClone(commessaOriginal)
        if(commessa != null){
            commessa.id = Number(commessa.id)
            if(commessa.data != null)
                commessa.data = getFilters().formatDate(new Date(commessa.data),"YYYY-MM-DD")
            if(commessa.dataConsegna != null)
                commessa.dataConsegna = getFilters().formatDate(new Date(commessa.dataConsegna),"YYYY-MM-DD")
            if(commessa.cliente != null)
                commessa.cliente = {id:commessa.cliente.id}
            if(commessa.righeCommessa != null )
                commessa.righeCommessa.forEach(rigaCommessa => {
                    rigaCommessa.commessa = {id:commessa.id}
                    if(rigaCommessa.prodotto != null )
                        rigaCommessa.prodotto = {id:rigaCommessa.prodotto.id}
                })
        }
        return commessa
    }
}
