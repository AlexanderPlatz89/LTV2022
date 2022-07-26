import {executeQuery, getFilters} from "@/main";
import prodotti from 'raw-loader!./graphql/query/prodotti.graphqls';
import prodotto from 'raw-loader!./graphql/query/prodotto.graphqls';
import tipiProdotto from 'raw-loader!./graphql/query/tipiProdotto.graphqls';
import um from 'raw-loader!./graphql/query/um.graphqls';
import trattamenti from 'raw-loader!./graphql/query/trattamenti.graphqls';
import prodottoUpsert from "raw-loader!./graphql/mutation/prodottoUpsert.graphqls";
import prodottoRemove from "raw-loader!./graphql/mutation/prodottoRemove.graphqls";

export default class ProdottoService {
    prodotti(){
        return executeQuery(prodotti)
    }
    prodotto(id) {
        return executeQuery(prodotto, {id:id})
    }
    upsert(object) {
        return executeQuery(prodottoUpsert, {prodotto:this.prepareProdottoInput(object)})
    }
    remove(id) {
        return executeQuery(prodottoRemove, {id:id})
    }
    tipiProdotto() {
        return executeQuery(tipiProdotto)
    }
    um() {
        return executeQuery(um)
    }
    trattamenti() {
        return executeQuery(trattamenti)
    }
    prepareProdottoInput(originalProdotto){
        const prodotto = getFilters().deepClone(originalProdotto)
        if(prodotto != null){
            prodotto.id = Number(prodotto.id)
            if(prodotto.componenti != null )
                prodotto.componenti.forEach(componente => {
                    componente.prodottoLavorato = {id:prodotto.id}
                    if(componente.prodottoDaLavorare != null )
                        componente.prodottoDaLavorare = {id:componente.prodottoDaLavorare.id}
                })
        }
        return prodotto
    }
}
