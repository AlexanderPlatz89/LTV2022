<template>
  <div>
    <div class="card">
      <DataTable ref="dt" :value="lavorazioni" dataKey="id" editMode="row"
                 v-model:editingRows="editingRows" @row-edit-save="onRowEditSave(selectedLavorazione)"
                 :paginator="true" :rows="10" :filters="filters"
                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                 :rowsPerPageOptions="[5,10,25]"
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                 responsiveLayout="scroll">
        <template #header>
          <div class="p-grid table-header">
            <div class="flex flex-column md:flex-row md:justify-content-start">
              <h5 class="mb-2 md:m-0 p-as-md-center">Lavorazioni</h5>
            </div>
            <div class="flex md:flex-row md:justify-content-end" style="min-width: 20em">
              <span class="p-input-icon-left"><i class="pi pi-search"/>
              <InputText style="margin-right: .5em" v-model="filters['global'].value" placeholder="Cerca..."/>
              <Button class="p-button-rounded p-button-text p-button-plain" icon="pi pi-plus" @click="openNew"/>
            </span>
            </div>
          </div>
        </template>
        <Column field="rigaCommessa.commessa.codice" header="Numero Consegna" :sortable="true"
                style="min-width:12rem">
          <template #body="slotProps">
            <span>{{ slotProps.data.rigaCommessa.commessa.codice }}</span>
          </template>
        </Column>
        <Column field="rigaCommessa.commessa.dataConsegna" header="Data Consegna" :sortable="true"
                style="min-width:12rem">
          <template #body="slotProps">
            <span>{{ $filters.formatDate(slotProps.data.rigaCommessa.commessa.dataConsegna, "DD/MM/YYYY") }}</span>
          </template>
        </Column>
        <Column field="rigaCommessa.prodotto" header="Prodotto" :sortable="true" style="min-width:6rem">
          <template #body="slotProps">
            <i style="display: block;font-size: .8em;">{{ slotProps.data.rigaCommessa.prodotto.codice }}</i>
            <span>{{ slotProps.data.rigaCommessa.prodotto.descrizione }}</span>
          </template>
        </Column>
        <Column field="quantita" header="Quantita" :sortable="true" style="min-width:20rem"></Column>
        <Column field="stato" header="Stato" :sortable="true" style="min-width:12rem">
          <template #body="slotProps">
              <Status :status="slotProps.data.stato" />
          </template>
        </Column>
        <Column field="macchina" header="Macchina" :sortable="true" style="min-width:12rem">
          <template #editor="{ data, field }">
            <Dropdown v-model="data[field]" :options="macchine" @change="assegnaMacchina(data)"
                      placeholder="Seleziona macchina">
              <template #value="slotProps">
                <div v-if="slotProps.value && !slotProps.value.value">
                  <i style="display: block;font-size: .8em;">{{ slotProps.value.codice }}</i>
                  <span>{{ slotProps.value.descrizione }}</span>
                </div>
                <span v-else>
							{{ slotProps.placeholder }}
						</span>
              </template>
              <template #option="slotProps">
                <div v-if="slotProps.option && !slotProps.option.value">
                  <i style="display: block;font-size: .8em;">{{ slotProps.option.codice }}</i>
                  <span>{{ slotProps.option.descrizione }}</span>
                </div>
              </template>
            </Dropdown>
          </template>
          <template #body="slotProps">
            <template v-if="slotProps.data.macchina != null">
              <i style="display: block;font-size: .8em;">{{ slotProps.data.macchina.codice }}</i>
              <span>{{ slotProps.data.macchina.descrizione }}</span>
            </template>
          </template>
        </Column>
        <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"/>
      </DataTable>
    </div>

    <Dialog v-model:visible="editDialog" header="Commesse"
            :modal="true"
            :style="{width: '80%'}" class="p-fluid">
      <DataTable ref="dt" :value="righeCommessaDaLavorare" dataKey="id" style="min-height: 400px" :filters="filters"
                 rowGroupMode="subheader"
                 groupRowsBy="commessa.codice" sortMode="single" sortField="commessa.codice" :sortOrder="1" scrollable
                 scrollHeight="400px">
        <Column field="commessa.codice" header="Commessa"/>
        <Column field="rigaCommessa.prodotto" header="Prodotto" :sortable="true" style="min-width:6rem">
          <template #body="slotProps">
            <div class="p-grid">
              <i style="display: block;font-size: .8em;">{{ slotProps.data.prodotto.codice }}</i>
              <span>{{ slotProps.data.prodotto.descrizione }}</span>
            </div>
          </template>
        </Column>
        <Column field="quantita" header="Quantita" :sortable="true" style="min-width:6rem"></Column>
        <Column header="Lavorato" :sortable="true" style="min-width:6rem">
          <template #body="slotProps">
            <span>{{ inLavorazione(slotProps.data.lavorazioni) }}</span>
          </template>
        </Column>
        <Column header="Da Lavorare" style="min-width:12rem">
          <template #body="rigaCommessa">
            <InputText v-model="rigaCommessa.data.daLavorare"/>
          </template>
        </Column>
        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button icon="pi pi-plus" class="p-button-rounded p-button-text p-button-plain"
                    @click="creaLavorazioneDaLavorare(slotProps.data)"/>
          </template>
        </Column>
        <template #groupheader="slotProps">
          <span>{{ slotProps.data.commessa.codice }}</span>
        </template>
      </DataTable>
      <h5>Lavorazioni</h5>
      <DataTable ref="lav" :value="lavorazioniDaLavorare" dataKey="id" style="min-height: 200px" scrollable
                 scrollHeight="200px">
        <Column field="commessa.dataConsegna" header="Data Consegna" :sortable="true"
                style="min-width:12rem">
          <template #body="slotProps">
            <span>{{ slotProps.data.rigaCommessa.commessa.dataConsegna }}</span>
          </template>
        </Column>
        <Column field="rigaCommessa.commessa.codice" header="Commessa"/>
        <Column header="Prodotto">
          <template #body="slotProps">
            <span>{{
                slotProps.data.rigaCommessa.prodotto.codice + ' - ' + slotProps.data.rigaCommessa.prodotto.descrizione
              }}</span>
          </template>
        </Column>
        <Column field="quantita" header="Quantita" :sortable="true" style="min-width:12rem"></Column>
        <Column>
          <template #body="slotProps">
            <Button class="p-button-rounded p-button-text p-button-plain" icon="pi pi-trash"
                    @click="removeLavorazioneDaLavorare(slotProps.data)"/>
          </template>
        </Column>
      </DataTable>
      <template #footer>
        <Button class="p-button-rounded p-button-text p-button-plain" icon="pi pi-times" label="Cancel"
                @click="hideDialog"/>
        <Button class="p-button-rounded p-button-text p-button-plain" icon="pi pi-check" label="Save"
                @click="save"/>
      </template>
    </Dialog>


    <Dialog v-model:visible="deleteDialog" :modal="true" :style="{width: '450px'}" header="Confirm">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"/>
        <span v-if="lavorazione">Are you sure you want to delete <b>{{ lavorazione.id }}</b>?</span>
      </div>
      <template #footer>
        <Button class="p-button-rounded p-button-text p-button-plain" icon="pi pi-times" label="No"
                @click="deleteDialog = false"/>
        <Button class="p-button-rounded p-button-text p-button-plain" icon="pi pi-check" label="Yes"
                @click="remove(lavorazione)"/>
      </template>
    </Dialog>

  </div>
</template>

<script>
import {FilterMatchMode} from 'primevue/api';
import Status from "@/components/Common/Status";

export default {
  components:{
    Status:Status
  },
  data() {
    return {
      selectedLavorazione: null,
      righeCommessaDaLavorare: [],
      lavorazioniDaLavorare: [],
      lavorazione: null,
      lavorazioni: [],
      editDialog: false,
      deleteDialog: false,
      filters: {},
      editingRows: []
    }
  },
  created() {
    this.initFilters();
  },
  beforeMount() {
    this.loadLavorazioni();
  },
  mounted() {
  },
  methods: {
    righeCommesseDaLavorare() {
      this.$store.dispatch("commessa/righeCommesseDaLavorare")
    },
    loadLavorazioni() {
      this.$store.dispatch("lavorazione/lavorazioni")
    },
    onRowEditSave(lavorazione) {
      this.$store.dispatch("lavorazione/assegna", lavorazione).then(() => this.refresh())
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    initFilters() {
      this.filters = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      }
    },
    openNew() {
      this.righeCommesseDaLavorare()
      this.lavorazione = {id: this.$filters.createId(this.lavorazioni)};
      this.submitted = false;
      this.editDialog = true;
    },
    hideDialog() {
      this.editDialog = false;
      this.submitted = false;
    },
    save() {
      this.$store.dispatch("lavorazione/upsert", this.lavorazioniDaLavorare).then(() => {
        this.editDialog = false;
        this.submitted = true;
        this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Lavorazioni salvate', life: 3000});
      }).catch(e => {
        this.$toast.add({
          severity: 'error',
          summary: 'Attenzione!',
          detail: 'Impossibile salvare lavorazioni',
          life: 3000
        });
        console.log(e)
      })
    },
    remove(lavorazione) {
      this.$store.dispatch("lavorazione/remove", lavorazione).then(() => {
        this.deleteDialog = false
        this.lavorazione = null
        this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Lavorazione eliminata', life: 3000});
      }).catch(e => {
        this.$toast.add({
          severity: 'error',
          summary: 'Attenzione!',
          detail: 'Impossibile eliminare lavorazione',
          life: 3000
        });
        console.log(e)
      })
    },
    inLavorazione(lavorazioni) {
      if (lavorazioni != null && lavorazioni.length > 0) {
        return lavorazioni.map(lavorazione => lavorazione.quantita != null ? lavorazione.quantita : 0).reduce((a, b) => a + b)
      }
      return 0
    },
    creaLavorazioneDaLavorare(rigaCommessa) {
      this.lavorazioniDaLavorare.push({
        id: this.$filters.createId(this.lavorazioniDaLavorare),
        stato: this.$store.getters['lavorazione/STATO_LAVORAZIONE'].DA_LAVORARE,
        quantita: rigaCommessa.daLavorare,
        rigaCommessa
      })
      delete rigaCommessa.daLavorare
    },
    removeLavorazioneDaLavorare(lavorazioneDaLavorare) {
      this.lavorazioniDaLavorare = this.lavorazioniDaLavorare.filter(lavorazione => Number(lavorazione.id) !== Number(lavorazioneDaLavorare.id))
    },
    assegnaMacchina(lavorazione){
      this.selectedLavorazione = lavorazione
    },
    refresh(){
      this.$emit('refresh');
    }
  },
  computed: {
    macchine() {
      return this.$store.getters["macchina/macchine"]
    },
    clienti() {
      return this.$store.getters["cliente/clienti"]
    },
    prodotti() {
      return this.$store.getters["prodotto/prodotti"]
    },
    um() {
      return this.$store.getters["prodotto/um"]
    },
    lavorazioniOriginal() {
      return this.$store.getters['lavorazione/lavorazioni'];
    },
    righeCommessaDaLavorareOriginal() {
      return this.$store.getters['commessa/righeCommesseDaLavorare'];
    }
  },
  watch: {
    lavorazioniOriginal() {
      this.lavorazioni = this.lavorazioniOriginal;
    },
    righeCommessaDaLavorareOriginal() {
      this.righeCommessaDaLavorare = this.righeCommessaDaLavorareOriginal;
    }
  }
}
</script>

<style lang="scss" scoped>
.p-button-raised {
  margin-right: .2em;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
  }
}

.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
  width: 50px;
  margin: 0 auto 2rem auto;
  display: block;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;

    .p-button {
      margin-bottom: 0.25rem;
    }
  }
}
</style>