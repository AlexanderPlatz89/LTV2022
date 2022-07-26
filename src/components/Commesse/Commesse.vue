<template>
  <div>
    <div class="card">
      <DataTable ref="dt" :value="commesse" dataKey="id"
                 :paginator="true" :rows="10" :filters="filters"
                 @rowExpand="onRowExpand" v-model:expandedRows="expandedRows"
                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
        <template #header>
          <div class="p-grid table-header">
            <div class="flex flex-column md:flex-row md:justify-content-start">
              <h5 class="mb-2 md:m-0 p-as-md-center">Commesse</h5>
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
        <Column field="cliente.ragioneSociale" header="Cliente" :sortable="true" style="min-width:20rem"></Column>
        <Column field="data" header="Data" :sortable="true" style="min-width:12rem">
          <template #body="slotProps">
              <span>{{$filters.formatDate(slotProps.data.data,"DD/MM/YYYY")}}</span>
          </template>
        </Column>
        <Column field="dataConsegna" header="Data Consegna" :sortable="true" style="min-width:12rem">
          <template #body="slotProps">
            <span>{{$filters.formatDate(slotProps.data.dataConsegna,"DD/MM/YYYY")}}</span>
          </template>
        </Column>
        <Column field="stato" header="Stato" :sortable="true" style="min-width:12rem">
          <template #body="slotProps">
            <Status :status="slotProps.data.stato" />
          </template>
        </Column>
        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-plain" @click="edit(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text" @click="confirmDelete(slotProps.data)" />
          </template>
        </Column>
        <template #expansion>
          <DataTable :value="commessa.righeCommessa" :scrollable="true" scrollHeight="flex">
            <Column field="prodotto.descrizione" header="Prodotto" style="min-width:15rem"></Column>
            <Column field="prodotto.um" header="UM" style="min-width:2rem"></Column>
            <Column field="quantita" style="min-width:2rem;text-align:right">
              <template #header>
                <span style="text-align: right">Quantita</span>
              </template>
            </Column>
            <Column header="Lavorazione" style="min-width:8rem">
              <template #body="rigaCommessa">

                <ProgressBar :value="quantitaProdottaPerc(rigaCommessa.data)" style="width: 100%">
                  {{quantitaProdotta(rigaCommessa.data)}}/{{rigaCommessa.data.quantita}} - [{{quantitaProdottaPerc(rigaCommessa.data)}}%]
                </ProgressBar>
              </template>
            </Column>
          </DataTable>
        </template>
      </DataTable>
    </div>

    <Dialog v-model:visible="editDialog" :style="{width: '80%'}" :header="'Commessa '+(commessa != null && commessa.codice != null ? commessa.codice : '') " :modal="true" class="p-fluid">
      <div class="formgrid grid">
        <div class="col-8 field">
          <label for="name">Codice</label>
          <InputText id="name" v-model.trim="commessa.codice" required="true" autofocus :class="{'p-invalid': submitted && !commessa.codice}" />
          <small class="p-error" v-if="submitted && !commessa.codice">Codice obbligatorio.</small>
        </div>
        <div class="col-4 field">
          <label for="consegna">Consegna</label>
          <Calendar id="consegna" v-model="commessa.dataConsegna" required="true" autofocus :class="{'p-invalid': submitted && !commessa.dataConsegna}" />
          <small class="p-error" v-if="submitted && !commessa.dataConsegna">Data Consegna obbligatoria.</small>
        </div>
      </div>
      <div class="field">
        <label for="cliente" class="mb-3">Cliente</label>
        <Dropdown id="cliente" v-model="commessa.cliente" :options="clienti"
                  :show-clear="true" placeholder="Seleziona cliente">
          <template #value="slotProps">
            <div v-if="slotProps.value && !slotProps.value.value">
              <i style="display: block;font-size: .8em;">{{slotProps.value.codice}}</i>
              <span>{{slotProps.value.ragioneSociale}}</span>
            </div>
            <span v-else>
							{{slotProps.placeholder}}
						</span>
          </template>
          <template #option="slotProps">
            <div v-if="slotProps.option && !slotProps.option.value">
              <i style="display: block;font-size: .8em;">{{slotProps.option.codice}}</i>
              <span>{{slotProps.option.ragioneSociale}}</span>
            </div>
          </template>
        </Dropdown>
      </div>

      <div class="field">
        <DataTable :value="commessa.righeCommessa" editMode="cell" @cell-edit-complete="onCellEditComplete"
                   class="editable-cells-table" :row-class="rowClass" responsiveLayout="scroll">
          <Column header="Prodotto" key="id" style="width:70%">
            <template #editor="slotProps">
              <Dropdown v-model="slotProps.data.prodotto" :options="prodotti"
                        placeholder="Seleziona prodotto">
                <template #value="slotProps">
                  <div v-if="slotProps.value && !slotProps.value.value">
                    <i style="display: block;font-size: .8em;">{{slotProps.value.codice}}</i>
                    <span>{{slotProps.value.descrizione}}</span>
                  </div>
                  <span v-else>
							{{slotProps.placeholder}}
						</span>
                </template>
                <template #option="slotProps">
                  <div v-if="slotProps.option && !slotProps.option.value">
                    <i style="display: block;font-size: .8em;">{{slotProps.option.codice}}</i>
                    <span>{{slotProps.option.ragioneSociale}}</span>
                  </div>
                </template>
              </Dropdown>
            </template>
            <template #body="slotProps">
              <div v-if="slotProps.data.prodotto != null">
                <i style="display: block;font-size: .8em;">{{slotProps.data.prodotto.codice}}</i>
                <span>{{slotProps.data.prodotto.descrizione}}</span>
              </div>
              <div v-else>
                <span>Seleziona prodotto</span>
              </div>
            </template>
          </Column>
          <Column header="UM">
            <template #body="slotProps">
              <div v-if="slotProps.data.prodotto != null">
                <span>{{slotProps.data.prodotto.um}}</span>
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
              <Button icon="pi pi-plus" class="p-button-rounded p-button-text p-button-plain" @click="addRigaCommessa" />
            </template>
            <template #body="slotProps">
              <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text" :disabled="slotProps.data.lavorazioni != null && slotProps.data.lavorazioni.length > 0"
                      @click="deleteRigaCommessa(slotProps.data)" />
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
        <span v-if="commessa">Are you sure you want to delete <b>{{commessa.name}}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-rounded p-button-text p-button-plain" @click="deleteDialog = false"/>
        <Button label="Yes" icon="pi pi-check" class="p-button-rounded p-button-text p-button-plain" @click="remove(commessa)" />
      </template>
    </Dialog>

  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import Status from "@/components/Common/Status";

export default {
  components:{
    Status:Status
  },
  data() {
    return {
      commesse: null,
      commessa: {},
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
    this.loadCommesse();
  },
  mounted() {
  },
  methods: {
    loadCommesse(){
      this.$store.dispatch("commessa/commesse")
    },
    rowClass(data) {
      return data.deleted === true ? 'deleted': null;
    },
    onRowExpand(event){
      this.commessa = {}
      this.expandedRows = [event.data]
      this.$store.dispatch("commessa/commessa", event.data.id).then(response => {
        this.commessa = response
      })
    },
    onCellEditComplete(event){
      let { data, newData } = event;
      data.prodotto = newData.prodotto
      data.quantita = newData.quantita
      data.edited = true
    },
    addRigaCommessa(){
      if(this.commessa != null ){
        if(this.commessa.righeCommessa == null)this.commessa.righeCommessa = []
        this.commessa.righeCommessa.push({id:this.createId(this.commessa.righeCommessa),quantita:0})
      }
    },
    deleteRigaCommessa(rigaCommessa){
      if(rigaCommessa != null ){
        rigaCommessa.deleted = (rigaCommessa.deleted != null ? !rigaCommessa.deleted : true)
      }
    },
    quantitaInLavorazione(rigaCommessa){
      return rigaCommessa.lavorazioni != null ? rigaCommessa.lavorazioni.reduce((a,b) => a + b.quantita, 0) : 0
    },
    quantitaProdotta(rigaCommessa){
      return rigaCommessa.lavorazioni != null ? rigaCommessa.lavorazioni.reduce((l1,l2) => l1 + ( l2.produzioni != null ? l2.produzioni.reduce((p1,p2) => p1 + p2.quantita, 0) : 0), 0) : 0
    },
    quantitaProdottaPerc(rigaCommessa){
      return this.quantitaProdotta(rigaCommessa)*100/rigaCommessa.quantita
    },


    formatCurrency(value) {
      if(value)
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    },
    openNew() {
      this.commessa = {id:this.createId(this.commesse),data: new Date()};
      this.submitted = false;
      this.editDialog = true;
    },
    hideDialog() {
      this.editDialog = false;
      this.submitted = false;
    },
    save() {
      this.$store.dispatch("commessa/upsert",this.commessa).then(() => {
        this.editDialog = false;
        this.submitted = true;
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Commessa salvata', life: 3000});
      }).catch(e => {
        this.$toast.add({severity:'error', summary: 'Attenzione!', detail: 'Impossibile salvare commessa', life: 3000});
        console.log(e)
      })
    },
    edit(commessa) {
      this.$store.dispatch("commessa/commessa", commessa.id).then(response => {
        this.commessa = this.$filters.deepClone(response);
        this.commessa.data = ( this.commessa.data != null ? new Date(this.commessa.data) : null)
        this.commessa.dataConsegna = ( this.commessa.dataConsegna != null ? new Date(this.commessa.dataConsegna) : null)
        this.commessa.cliente = this.clienti.find(cliente => cliente.id === this.commessa.cliente.id)
        this.editDialog = true;
      })
    },
    confirmDelete(commessa) {
      this.commessa = commessa;
      this.deleteDialog = true;
    },
    remove(commessa) {
      this.$store.dispatch("commessa/remove",commessa).then(() => {
        this.deleteDialog = false
        this.commessa = null
        this.$toast.add({severity:'success', summary: 'Successful', detail: 'Commessa eliminata', life: 3000});
      }).catch(e => {
        this.$toast.add({severity:'error', summary: 'Attenzione!', detail: 'Impossibile eliminare commessa', life: 3000});
        console.log(e)
      })
    },
    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.commesse.length; i++) {
        if (this.commesse[i].id === id) {
          index = i;
          break;
        }
      }
      return index;
    },
    createId(list) {
      if(list != null){
        return -1 * (Math.max.apply(Math, list.map(function(o) { return o.id; })))
      }
      return -1
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
    prodotti(){
      return this.$store.getters["prodotto/prodotti"]
    },
    um(){
      return this.$store.getters["prodotto/um"]
    },
    commesseOriginal(){
      return this.$store.getters['commessa/commesse'];
    }
  },
  watch: {
    commesseOriginal(){
      this.commesse = this.commesseOriginal;
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