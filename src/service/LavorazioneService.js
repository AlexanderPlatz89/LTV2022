import {executeQuery, getFilters,} from "@/main";
import query_lavorazioni from 'raw-loader!./graphql/query/lavorazioniDaLavorare.graphqls';
import mutation_assegnaMacchina from 'raw-loader!./graphql/mutation/assegnaMacchina.graphqls';
import mutation_upsertLavorazioni from "raw-loader!./graphql/mutation/upsertLavorazioni.graphqls";

export default class LavorazioneService {
    lavorazioni() {
        return executeQuery(query_lavorazioni)
    }

    assegnaMacchina(lavorazione) {
        return executeQuery(mutation_assegnaMacchina, {lavorazione: this.prepareAssegnaMacchinaInput(lavorazione)})
    }

    upsert(lavorazioniOriginal) {
        if (lavorazioniOriginal != null) {
            const lavorazioni = []
            lavorazioniOriginal.forEach(lavorazione => {
                lavorazioni.push(this.prepareLavorazioneInput(lavorazione))
            })
            return executeQuery(mutation_upsertLavorazioni, {lavorazioni: lavorazioni})
        }
    }

    prepareLavorazioneInput(originalLavorazione) {
        const lavorazione = getFilters().deepClone(originalLavorazione)
        if (lavorazione != null) {
            lavorazione.id = Number(lavorazione.id)
            lavorazione.rigaCommessa = {
                id: lavorazione.rigaCommessa.id
            }
        }
        return lavorazione
    }

    prepareAssegnaMacchinaInput(lavorazione) {
        if (lavorazione != null && lavorazione.macchina != null) {
            return {
                id: lavorazione.id,
                macchina: {
                    id: lavorazione.macchina.id
                }
            }
        }
        return null
    }
}
