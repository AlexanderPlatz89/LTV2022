import {executeQuery, getFilters} from "@/main";
import macchine from 'raw-loader!./graphql/query/macchine.graphqls';
import macchina from 'raw-loader!./graphql/query/macchina.graphqls';
import macchinaUpsert from 'raw-loader!./graphql/mutation/macchinaUpsert.graphqls';
import macchinaRemove from 'raw-loader!./graphql/mutation/macchinaRemove.graphqls';

export default class MacchinaService {
    macchine(){
        return executeQuery(macchine)
    }
    macchina(id) {
        return executeQuery(macchina, {id:id})
    }
    upsert(object) {
        return executeQuery(macchinaUpsert, {macchina:this.prepareMacchinaInput(object)})
    }
    remove(id) {
        return executeQuery(macchinaRemove, {id:id})
    }
    prepareMacchinaInput(originalMacchina){
        const macchina = getFilters().deepClone(originalMacchina)
        if(macchina != null){
            macchina.id = Number(macchina.id)
        }
        return macchina
    }
}
