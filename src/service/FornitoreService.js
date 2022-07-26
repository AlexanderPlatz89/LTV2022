import {executeQuery, getFilters} from "@/main";
import fornitori from 'raw-loader!./graphql/query/fornitori.graphqls';
import fornitore from 'raw-loader!./graphql/query/fornitore.graphqls';
import fornitoreUpsert from 'raw-loader!./graphql/mutation/fornitoreUpsert.graphqls';
import fornitoreRemove from 'raw-loader!./graphql/mutation/fornitoreRemove.graphqls';

export default class CommessaService {
    fornitori(){
        return executeQuery(fornitori)
    }
    fornitore(id) {
        return executeQuery(fornitore, {id:id})
    }
    upsert(object) {
        return executeQuery(fornitoreUpsert, {fornitore:this.prepareFornitoreInput(object)})
    }
    remove(id) {
        return executeQuery(fornitoreRemove, {id:id})
    }
    prepareFornitoreInput(originalFornitore){
        const fornitore = getFilters().deepClone(originalFornitore)
        if(fornitore != null){
            fornitore.id = Number(fornitore.id)
            if(fornitore.sediFornitore != null )
                fornitore.sediFornitore.forEach(sedeFornitore => {
                    sedeFornitore.fornitore = {id:fornitore.id}
                })
        }
        return fornitore
    }
}
