<template>
  <div>
    <div class="card">
      <DataTable ref="dt" :filters="filters"
                 :paginator="true" :rows="10" :rowsPerPageOptions="[5,10,25]"
                 :value="macchine" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} macchine"
                 dataKey="id"
                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                 responsiveLayout="scroll">
        <template #header>
          <div class="p-grid table-header">
            <div class="flex flex-column md:flex-row md:justify-content-start">
              <h5 class="mb-2 md:m-0 p-as-md-center">Macchine</h5>
            </div>
            <div class="flex md:flex-row md:justify-content-end" style="min-width: 20em">
              <span class="p-input-icon-left"><i class="pi pi-search"/>
              <InputText v-model="filters['global'].value" placeholder="Cerca..." style="margin-right: .5em"/>
              <Button class="p-button-rounded p-button-text p-button-plain" icon="pi pi-plus" @click="openNew"/>
            </span>
            </div>
          </div>
        </template>
        <Column :sortable="true" field="codice" header="Codice" style="min-width:12rem"></Column>
        <Column :sortable="true" field="descrizione" header="Descrizione"
                style="min-width:20rem"></Column>
        <Column field="qrcode" header="QR Code"
                style="min-width:20rem">
          <template #body="slotProps">
            <qr-code :text="generateQR(slotProps.data)" :size="100"></qr-code>
          </template>
        </Column>
        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button class="p-button-rounded p-button-text p-button-plain" icon="pi pi-pencil"
                    @click="edit(slotProps.data)"/>
            <Button class="p-button-rounded p-button-danger p-button-text" icon="pi pi-trash"
                    @click="confirmDelete(slotProps.data)"/>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="editDialog" :header="'Macchina '+(macchina != null && macchina.codice != null ? macchina.codice : '') "
            :modal="true"
            :style="{width: '80%'}" class="p-fluid">
      <div class="formgrid grid">
        <div class="col-8 field">
          <label for="name">Codice</label>
          <InputText id="name" v-model.trim="macchina.codice" :class="{'p-invalid': submitted && !macchina.codice}" autofocus
                     required="true"/>
          <small v-if="submitted && !macchina.codice" class="p-error">Codice obbligatorio.</small>
        </div>
        <div class="col-8 field">
          <label>Ragione Sociale</label>
          <InputTextv-model.trim="macchina.descrizione" :class="{'p-invalid': submitted && !macchina.descrizione}" autofocus
                     required="true"/>
          <small v-if="submitted && !macchina.descrizione" class="p-error">Descrizione obbligatoria.</small>
        </div>
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
        <span v-if="macchina">Are you sure you want to delete <b>{{ macchina.codice }}</b>?</span>
      </div>
      <template #footer>
        <Button class="p-button-rounded p-button-text p-button-plain" icon="pi pi-times" label="No"
                @click="deleteDialog = false"/>
        <Button class="p-button-rounded p-button-text p-button-plain" icon="pi pi-check" label="Yes"
                @click="remove(macchina)" />
      </template>
    </Dialog>

  </div>
</template>

<script>
import {FilterMatchMode} from 'primevue/api';

export default {
  data() {
    return {
      macchine: null,
      macchina: {},
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
    this.loadMacchine();
  },
  mounted() {
  },
  methods: {
    loadMacchine() {
      this.$store.dispatch("macchina/macchine")
    },
    rowClass(data) {
      return data.deleted === true ? 'deleted' : null;
    },


    formatCurrency(value) {
      if (value)
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    },
    openNew() {
      this.macchina = {id: this.createId(this.macchine)};
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
      this.$store.dispatch("macchina/upsert", this.macchina).then(() => {
        this.editDialog = false;
        this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Macchina salvata', life: 3000});
      }).catch(e => {
        this.$toast.add({severity: 'error', summary: 'Attenzione!', detail: 'Impossibile salvare macchina', life: 3000});
        console.log(e)
      })
    },
    edit(macchina) {
      this.$store.dispatch("macchina/macchina", macchina.id).then(response => {
        this.macchina = this.$filters.deepClone(response);
        this.editDialog = true;
      })
    },
    confirmDelete(macchina) {
      this.macchina = macchina;
      this.deleteDialog = true;
    },
    remove(macchina) {
      this.$store.dispatch("macchina/remove", macchina).then(() => {
        this.deleteDialog = false
        this.macchina = null
        this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Macchina eliminata', life: 3000});
      }).catch(e => {
        this.$toast.add({
          severity: 'error',
          summary: 'Attenzione!',
          detail: 'Impossibile eliminare macchina',
          life: 3000
        });
        console.log(e)
      })
    },
    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.macchine.length; i++) {
        if (this.macchine[i].id === id) {
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
      this.macchina = {}
      this.expandedRows = [event.data]
      this.$store.dispatch("macchina/macchina", event.data.id).then(response => {
        this.macchina = response
      })
    },
    generateQR(macchina){
      return JSON.stringify({action:"macchina",id:macchina.id})
    }
  },
  computed: {
    macchineOriginal() {
      return this.$store.getters['macchina/macchine'];
    }
  },
  watch: {
    macchineOriginal() {
      this.macchine = this.macchineOriginal;
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