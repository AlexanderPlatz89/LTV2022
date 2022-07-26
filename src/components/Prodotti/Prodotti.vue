<template>
  <div>
    <div class="card">
      <DataTable ref="dt" :value="prodotti" dataKey="id"
                 :paginator="true" :rows="10" :filters="filters"
                 @rowExpand="onRowExpand" v-model:expandedRows="expandedRows"
                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
        <template #header>
          <div class="p-grid table-header">
            <div class="flex flex-column md:flex-row md:justify-content-start">
              <h5 class="mb-2 md:m-0 p-as-md-center">Prodotti</h5>
            </div>
            <div class="flex md:flex-row md:justify-content-end" style="min-width: 20em">
              <span class="p-input-icon-left"><i class="pi pi-search" />
              <InputText style="margin-right: .5em" v-model="filters['global'].value" placeholder="Cerca..." />
              <Button icon="pi pi-plus" class="p-button-rounded p-button-text p-button-plain" @click="openNew" />
            </span>
            </div>
          </div>
        </template>
        <Column :expander="true" headerStyle="width: 3rem" />
        <Column field="codice" header="Codice" :sortable="true" style="min-width:12rem"></Column>
        <Column field="descrizione" header="Descrizione" :sortable="true" style="min-width:20rem"></Column>
        <Column field="tipo" header="Tipo" :sortable="true" style="min-width:12rem"></Column>
        <Column field="trattamento" header="Trattamento" :sortable="true" style="min-width:12rem"></Column>
        <Column field="tempoLavorazione" header="Tempo Lavorazione" :sortable="true" style="min-width:12rem"></Column>
        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-plain" @click="edit(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text" @click="confirmDelete(slotProps.data)" />
          </template>
        </Column>
        <template #expansion>
          <template v-if="!$filters.isEmpty(prodotto) && !$filters.isEmpty(prodotto.componenti)">
            <h5 class="mb-2 md:m-0 p-as-md-center">Componenti</h5>
            <DataTable :value="prodotto.componenti" :scrollable="true" scrollHeight="flex">
              <Column field="prodottoDaLavorare.tipo" header="Tipologia" style="min-width:15rem"></Column>
              <Column field="prodottoDaLavorare.codice" header="Codice" style="min-width:15rem"></Column>
              <Column field="prodottoDaLavorare.descrizione" header="Descrizione" style="min-width:15rem"></Column>
              <Column field="um" header="UM" style="min-width:2rem"></Column>
              <Column field="quantita" header="Quantita" style="min-width:2rem"></Column>
            </DataTable>
          </template>
          <template v-else>
            <div style="text-align: center;padding: .4em">
              <h4 class="mb-2 md:m-0 p-as-md-center">Nessun componente</h4>
            </div>
          </template>
        </template>
      </DataTable>
    </div>

    <Dialog v-model:visible="editDialog" :style="{width: '80%'}" :header="'Prodotto '+(prodotto != null && prodotto.codice != null ? prodotto.codice : '') " :modal="true" class="p-fluid">
      <div style="display:flex">
        <div class="formgrid grid">
          <div class="col-4 field">
            <label for="name">Codice</label>
            <InputText id="name" v-model.trim="prodotto.codice" required="true" autofocus :class="{'p-invalid': submitted && !prodotto.codice}" />
            <small class="p-error" v-if="submitted && !prodotto.codice">Codice obbligatorio.</small>
          </div>
          <div class="col-8 field">
            <label for="descrizione">Descrizione</label>
            <InputText id="descrizione" v-model.trim="prodotto.descrizione" required="true" autofocus :class="{'p-invalid': submitted && !prodotto.descrizione}" />
            <small class="p-error" v-if="submitted && !prodotto.descrizione">Descrizione obbligatoria.</small>
          </div>
          <div class="col-4 field">
            <label for="tipo">Tipologia</label>
            <Dropdown id="tipo" v-model="prodotto.tipo" :options="tipiProdotto"
                      placeholder="Seleziona Tipologia">
              <template #value="slotProps">
                <div v-if="slotProps.value && !slotProps.value.value">
                  <span>{{slotProps.value}}</span>
                </div>
                <span v-else>
							{{slotProps.placeholder}}
						</span>
              </template>
              <template #option="slotProps">
                <div v-if="slotProps.option && !slotProps.option.value">
                  <span>{{slotProps.option}}</span>
                </div>
              </template>
            </Dropdown>
            <small class="p-error" v-if="submitted && !prodotto.tipo">Tipologia obbligatorio.</small>
          </div>
          <div class="col-4 field">
            <label for="um">Unità di misura</label>
            <Dropdown id="um" v-model="prodotto.um" :options="um"
                      placeholder="Seleziona UM">
              <template #value="slotProps">
                <div v-if="slotProps.value && !slotProps.value.value">
                  <span>{{slotProps.value}}</span>
                </div>
                <span v-else>
							{{slotProps.placeholder}}
						</span>
              </template>
              <template #option="slotProps">
                <div v-if="slotProps.option && !slotProps.option.value">
                  <span>{{slotProps.option}}</span>
                </div>
              </template>
            </Dropdown>
            <small class="p-error" v-if="submitted && !prodotto.um">Unità di misura obbligatoria.</small>
          </div>
          <div class="col-4 field">
            <label for="tempoLavorazione">Tempo lavorazione</label>
            <InputNumber id="tempoLavorazione" v-model="prodotto.tempoLavorazione" required="true" autofocus :class="{'p-invalid': submitted && !prodotto.tempoLavorazione}" />
            <small class="p-error" v-if="submitted && !prodotto.tempoLavorazione">Tempo lavorazione obbligatorio.</small>
          </div>
          <div class="col-12 field">
            <label for="trattamento">Trattamento</label>
            <Dropdown id="trattamento" v-model="prodotto.trattamento" :options="trattamenti"
                      :show-clear="true" placeholder="Seleziona trattamento">
              <template #value="slotProps">
                <div v-if="slotProps.value && !slotProps.value.value">
                  <span>{{slotProps.value}}</span>
                </div>
                <span v-else>
							{{slotProps.placeholder}}
						</span>
              </template>
              <template #option="slotProps">
                <div v-if="slotProps.option && !slotProps.option.value">
                  <span>{{slotProps.option}}</span>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>
        <div style="margin-left:1em">
            <img style="height: 15em" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4
  //8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="/>
        </div>
      </div>
      <div class="field">
        <h5 class="mb-2 md:m-0 p-as-md-center">Componenti</h5>
        <DataTable :value="prodotto.componenti" editMode="cell" @cell-edit-complete="onCellEditComplete"
                   class="editable-cells-table" :row-class="rowClass" responsiveLayout="scroll">
          <Column header="Prodotto" key="id" style="width:70%">
            <template #editor="componente">
              <Dropdown v-model="componente.data.prodottoDaLavorare" :options="prodotti"
                        data-key="id" placeholder="Seleziona prodotto">
                <template #value="slotProps">
                  <div v-if="slotProps.value && !slotProps.value.value">
                    <i style="display: block;font-size: .8em;">{{slotProps.value.tipo}}</i>
                    <b>[{{slotProps.value.codice}}]</b><span style="margin-left:.4em">{{slotProps.value.descrizione}}</span>
                  </div>
                  <span v-else>{{slotProps.placeholder}}</span>
                </template>
                <template #option="slotProps">
                  <div v-if="slotProps.option && !slotProps.option.value">
                    <i style="display: block;font-size: .8em;">{{slotProps.option.tipo}}</i>
                    <b>[{{slotProps.option.codice}}]</b><span style="margin-left:.4em">{{slotProps.option.descrizione}}</span>
                  </div>
                </template>
              </Dropdown>
            </template>
            <template #body="componente">
              <div v-if="componente.data.prodottoDaLavorare != null">
                <i style="display: block;font-size: .8em;">{{componente.data.prodottoDaLavorare.tipo}}</i>
                <b>[{{componente.data.prodottoDaLavorare.codice}}]</b><span style="margin-left:.4em">{{componente.data.prodottoDaLavorare.descrizione}}</span>
              </div>
              <div v-else>
                <span>Seleziona prodotto</span>
              </div>
            </template>
          </Column>
          <Column header="UM">
            <template #body="slotProps">
              <div v-if="slotProps.data.prodottoDaLavorare != null">
                <span>{{slotProps.data.prodottoDaLavorare.um}}</span>
              </div>
            </template>
          </Column>
          <Column header="Quantita" style="text-align: right">
            <template #editor="slotProps">
              <InputNumber style="text-align: right" v-model="slotProps.data.quantita"/>
            </template>
            <template #body="slotProps">
              <div>
                <span>{{slotProps.data.quantita}}</span>
              </div>
            </template>
          </Column>
          <Column style="width:2em;">
            <template #header>
              <Button icon="pi pi-plus" class="p-button-rounded p-button-text p-button-plain" @click="addComponente" />
            </template>
            <template #body="slotProps">
              <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text" @click="deleteComponente(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-rounded p-button-text p-button-plain" @click="hideDialog"/>
        <Button label="Save" icon="pi pi-check" class="p-button-rounded p-button-text p-button-plain" @click="save" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="prodotto">Are you sure you want to delete <b>{{prodotto.descrizione}}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-rounded p-button-text p-button-plain" @click="deleteDialog = false"/>
        <Button label="Yes" icon="pi pi-check" class="p-button-rounded p-button-text p-button-plain" @click="remove(prodotto)" />
      </template>
    </Dialog>

  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';

export default {
  data() {
    return {
      prodotti: null,
      prodotto: {},
      expandedRows: [],
      editDialog: false,
      deleteDialog: false,
      filters: {},
      submitted: false
    }
  },
  created() {
    this.initFilters();
  },
  beforeMount() {
    this.loadProdotti();
  },
  mounted() {
  },
  methods: {
    loadProdotti(){
      this.$store.dispatch("prodotto/prodotti")
    },
    rowClass(data) {
      return data.deleted === true ? 'deleted': null;
    },
    onRowExpand(event){
      this.prodotto = {}
      this.expandedRows = [event.data]
      this.$store.dispatch("prodotto/prodotto", event.data.id).then(response => {
        this.prodotto = response
      })
    },
    onCellEditComplete(event){
      let { data, newData } = event;
      data.prodottoDaLavorare = newData.prodottoDaLavorare
      data.quantita = newData.quantita
      data.edited = true
    },
    addComponente(){
      if(this.prodotto != null ){
        if(this.prodotto.componenti == null)this.prodotto.componenti = []
        this.prodotto.componenti.push({id:this.$filters.createId(this.prodotto.componenti),quantita:0})
      }
    },
    deleteComponente(componente){
      if(componente != null ){
        componente.deleted = (componente.deleted != null ? !componente.deleted : true)
      }
    },
    formatCurrency(value) {
      if(value)
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    },
    openNew() {
      this.prodotto = {id:this.$filters.createId(this.prodotti)};
      this.submitted = false;
      this.editDialog = true;
    },
    hideDialog() {
      this.editDialog = false;
      this.submitted = false;
    },
    save() {
      this.submitted = true;
      this.$store.dispatch("prodotto/upsert",this.prodotto).then(() => {
        this.editDialog = false;
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Prodotto salvato', life: 3000});
      }).catch(e => {
        this.$toast.add({severity:'error', summary: 'Attenzione!', detail: 'Impossibile salvare prodotto', life: 3000});
        console.log(e)
      })
    },
    edit(prodotto) {
      this.$store.dispatch("prodotto/prodotto", prodotto.id).then(response => {
        this.prodotto = this.$filters.deepClone(response);
        this.submitted = false;
        this.editDialog = true;
      })
    },
    confirmDelete(prodotto) {
      this.prodotto = prodotto;
      this.deleteDialog = true;
    },
    remove(prodotto) {
      this.$store.dispatch("prodotto/remove",prodotto).then(() => {
        this.deleteDialog = false
        this.prodotto = null
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Prodotto eliminato', life: 3000});
      }).catch(e => {
        this.$toast.add({severity:'error', summary: 'Attenzione!', detail: 'Impossibile eliminare prodotto', life: 3000});
        console.log(e)
      })
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    initFilters() {
      this.filters = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      }
    }
  },
  computed:{
    clienti(){
      return this.$store.getters["cliente/clienti"]
    },
    prodottiOriginal(){
      return this.$store.getters["prodotto/prodotti"]
    },
    tipiProdotto(){
      return this.$store.getters["prodotto/tipiProdotto"]
    },
    um(){
      return this.$store.getters["prodotto/um"]
    },
    trattamenti(){
      return this.$store.getters["prodotto/trattamenti"]
    },
  },
  watch: {
    prodottiOriginal(){
      this.prodotti = this.prodottiOriginal;
    }
  }
}
</script>

<style lang="scss" scoped>
.p-button-raised{
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