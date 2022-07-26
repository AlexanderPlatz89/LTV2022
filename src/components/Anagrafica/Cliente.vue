<template>
  <div>
    <div class="card">
      <DataTable ref="dt" v-model:expandedRows="expandedRows" :filters="filters"
                 :paginator="true" :rows="10" :rowsPerPageOptions="[5,10,25]"
                 :value="clienti" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} clienti"
                 dataKey="id"
                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                 responsiveLayout="scroll"
                 @rowExpand="onRowExpand">
        <template #header>
          <div class="p-grid table-header">
            <div class="flex flex-column md:flex-row md:justify-content-start">
              <h5 class="mb-2 md:m-0 p-as-md-center">Clienti</h5>
            </div>
            <div class="flex md:flex-row md:justify-content-end" style="min-width: 20em">
              <span class="p-input-icon-left"><i class="pi pi-search"/>
              <InputText v-model="filters['global'].value" placeholder="Cerca..." style="margin-right: .5em"/>
              <Button class="p-button-rounded p-button-text p-button-plain" icon="pi pi-plus" @click="openNew"/>
            </span>
            </div>
          </div>
        </template>
        <Column :expander="true" headerStyle="width: 3rem"/>
        <Column :sortable="true" field="codice" header="Codice Cliente" style="min-width:12rem"></Column>
        <Column :sortable="true" field="ragioneSociale" header="Ragione SocialeCliente"
                style="min-width:20rem"></Column>
        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button class="p-button-rounded p-button-text p-button-plain" icon="pi pi-pencil"
                    @click="edit(slotProps.data)"/>
            <Button class="p-button-rounded p-button-danger p-button-text" icon="pi pi-trash"
                    @click="confirmDelete(slotProps.data)"/>
          </template>
        </Column>
        <template #expansion>
          <DataTable :value="cliente.sediCliente" :scrollable="true" scrollHeight="flex">
            <Column field="indirizzo" header="Indirizzo" style="min-width:15rem"></Column>
            <Column field="citta" header="Citta" style="min-width:15rem"></Column>
          </DataTable>
        </template>
      </DataTable>
    </div>

    <Dialog v-model:visible="editDialog" :header="'Cliente '+(cliente != null && cliente.ragioneSociale != null ? cliente.ragioneSociale : '') "
            :modal="true"
            :style="{width: '80%'}" class="p-fluid">
      <div class="formgrid grid">
        <div class="col-8 field">
          <label for="name">Codice</label>
          <InputText id="name" v-model.trim="cliente.codice" :class="{'p-invalid': submitted && !cliente.codice}" autofocus
                     required="true"/>
          <small v-if="submitted && !cliente.codice" class="p-error">Codice obbligatorio.</small>
        </div>
        <div class="col-8 field">
          <label for="ragsoc">Ragione Sociale</label>
          <InputText id="ragsoc" v-model.trim="cliente.ragioneSociale" :class="{'p-invalid': submitted && !cliente.ragioneSociale}" autofocus
                     required="true"/>
          <small v-if="submitted && !cliente.ragioneSociale" class="p-error">Ragione Sociale obbligatoria.</small>
        </div>
      </div>

      <div class="field">
        <DataTable :value="cliente.sediCliente"
                   class="editable-cells-table" :row-class="rowClass" responsiveLayout="scroll">
          <Column header="indirizzo" style="text-align: left">
            <template #body="sedeCliente">
              <input-text style="text-align: left" v-model="sedeCliente.data.indirizzo" />
            </template>
          </Column>
          <Column header="citta" style="text-align: left">
            <template #body="sedeCliente">
              <input-text style="text-align: left" v-model="sedeCliente.data.citta"/>
            </template>
          </Column>
          <Column header="nazione" style="text-align: left">
            <template #body="sedeCliente">
              <input-text style="text-align: left" v-model="sedeCliente.data.nazione"/>
            </template>
          </Column>
          <Column header="provincia" style="text-align: left">
            <template #body="sedeCliente">
              <input-text style="text-align: left" v-model="sedeCliente.data.area"/>
            </template>
          </Column>
          <Column header="cap" style="text-align: left">
            <template #body="sedeCliente">
              <input-text style="text-align: left" v-model="sedeCliente.data.zip"/>
            </template>
          </Column>
          <Column style="width:2em;">
            <template #header>
              <Button icon="pi pi-plus" class="p-button-rounded p-button-text p-button-plain" @click="addSedeCliente" />
            </template>
            <template #body="slotProps">
              <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text" @click="deleteSedeCliente(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
      </div>

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
        <span v-if="cliente">Are you sure you want to delete <b>{{ cliente.ragioneSociale }}</b>?</span>
      </div>
      <template #footer>
        <Button class="p-button-rounded p-button-text p-button-plain" icon="pi pi-times" label="No"
                @click="deleteDialog = false"/>
        <Button class="p-button-rounded p-button-text p-button-plain" icon="pi pi-check" label="Yes"
                @click="remove(cliente)" />
      </template>
    </Dialog>

  </div>
</template>

<script>
import {FilterMatchMode} from 'primevue/api';

export default {
  data() {
    return {
      clienti: null,
      cliente: {},
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
    this.loadClienti();
  },
  mounted() {
  },
  methods: {
    loadClienti() {
      this.$store.dispatch("cliente/clienti")
    },
    rowClass(data) {
      return data.deleted === true ? 'deleted' : null;
    },


    formatCurrency(value) {
      if (value)
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    },
    openNew() {
      this.cliente = {id: this.createId(this.clienti)};
      this.submitted = false;
      this.editDialog = true;
    },
    hideDialog() {
      this.editDialog = false;
      this.submitted = false;
    },
    save() {
      this.submitted = true;
      this.editDialog = false;
      this.$store.dispatch("cliente/upsert", this.cliente).then(() => {
        this.editDialog = false;
        this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Cliente salvato', life: 3000});
      }).catch(e => {
        this.$toast.add({severity: 'error', summary: 'Attenzione!', detail: 'Impossibile salvare cliente', life: 3000});
        console.log(e)
      })
    },
    edit(cliente) {
      this.$store.dispatch("cliente/cliente", cliente.id).then(response => {
        this.cliente = this.$filters.deepClone(response);
        this.editDialog = true;
      })
    },
    confirmDelete(cliente) {
      this.cliente = cliente;
      this.deleteDialog = true;
    },
    remove(cliente) {
      this.$store.dispatch("cliente/remove", cliente).then(() => {
        this.deleteDialog = false
        this.cliente = null
        this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Cliente eliminato', life: 3000});
      }).catch(e => {
        this.$toast.add({
          severity: 'error',
          summary: 'Attenzione!',
          detail: 'Impossibile eliminare cliente',
          life: 3000
        });
        console.log(e)
      })
    },
    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.clienti.length; i++) {
        if (this.clienti[i].id === id) {
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
    },
    onRowExpand(event){
      this.cliente = {}
      this.expandedRows = [event.data]
      this.$store.dispatch("cliente/cliente", event.data.id).then(response => {
        this.cliente = response
      })
    },
    onCellEditComplete(event){
      let { data, newData } = event;
      data.indirizzo = newData.indirizzo
      data.citta = newData.citta
      data.nazione = newData.nazione
      data.edited = true
    },
    addSedeCliente(){
      if(this.cliente != null ){
        if(this.cliente.sediCliente == null)this.cliente.sediCliente = []
        this.cliente.sediCliente.push({id:this.createId(this.cliente.sediCliente),indirizzo:0})
      }
    },
    deleteSedeCliente(sedeCliente){
      if(sedeCliente != null ){
        sedeCliente.deleted = (sedeCliente.deleted != null ? !sedeCliente.deleted : true)
      }
    },
  },
  computed: {
    clientiOriginal() {
      return this.$store.getters['cliente/clienti'];
    }
  },
  watch: {
    clientiOriginal() {
      this.clienti = this.clientiOriginal;
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