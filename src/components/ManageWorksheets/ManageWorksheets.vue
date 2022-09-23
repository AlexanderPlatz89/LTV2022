<template>
    <Dialog v-model:visible="showWorksheetDialog" :style="{ width: '80vw' }">
        <Fieldset>
            <template #legend>
                <h5>{{ $t('manageWorksheet.worksheetNumber') }}</h5>
            </template>
            <div class="grid col-12">
                <div class="grid col-6">
                    <div class="col-6">
                        <h5 class="label-add-worksheet">{{ $t('manageWorksheet.worksheetNumber') }}:</h5>
                    </div>
                    <div class="col-6">
                        <InputText class="input-add-worksheet" type="text" v-model="newWorksheet.worksheetNumber" />
                    </div>
                </div>
                <div class="grid col-6">
                    <div class="col-6">
                        <h5 class="label-add-worksheet">{{ $t('manageWorksheet.publishingCompany') }}:</h5>
                    </div>
                    <div class="col-6 container-input-add-worksheet">
                        <Dropdown v-model="newWorksheet.publishingCompany" style="width: 10em"
                            :options="publishingCompanies" :placeholder="$t('manageWorksheet.publishingCompany')" />
                    </div>
                </div>
                <div class="grid col-6">
                    <div class="col-6">
                        <h5 class="label-add-worksheet">{{ $t('manageStaff.machine') }}:</h5>
                    </div>
                    <div class="col-6 container-input-add-worksheet">
                        <Dropdown v-model="newWorksheet.machine" style="width: 10em; float: right;" :options="machines"
                            :placeholder="$t('manageStaff.machine')" />
                    </div>
                </div>
                <div class="grid col-6">
                    <div class="col-6">
                        <h5 class="label-add-worksheet">{{ $t('manageWorksheet.department') }}:</h5>
                    </div>
                    <div class="col-6">
                        <Dropdown v-model="newWorksheet.department" :options="departments" optionLabel="description"
                            optionValue="code" style="min-width: 10em" />
                    </div>
                </div>
            </div>
        </Fieldset>
        <div class="col-12">
            <DataTable :value="newWorksheet.signatures" responsiveLayout="scroll" :rowClass="rowClass">
                <column field="accumulation" :header="$t('manageWorksheet.accumulation')" :showFilterMenu="false"
                    :sortable="true"></column>
                <column field="signature1" :header="$t('manageWorksheet.signature')" :showFilterMenu="false"
                    :sortable="true"></column>
                <column field="authorizedWaste" :header="$t('manageWorksheet.authorizedWaste')" :showFilterMenu="false"
                    :sortable="true"></column>
                <column field="numberOfCopies" :header="$t('manageWorksheet.numberOfCopies')" :showFilterMenu="false"
                    :sortable="true"></column>
                <column field="signature2" :header="$t('manageWorksheet.signature')" :showFilterMenu="false"
                    :sortable="true"></column>
                <column field="status" :header="$t('manageWorksheet.status')" :showFilterMenu="false" :sortable="true">
                    <template #body="signature">
                        {{  $t('status.'+ signature.data.status) }}</template>
                </column>
                <column field="machineLeader" :header="$t('manageStaff.machineLeader')" :showFilterMenu="false"
                    :sortable="true">
                </column>
            </DataTable>
        </div>
        <div class="col-12">
            <Button style="float: left" :label="$t('manageWorksheet.insertWorksheet')" icon="pi pi-plus" iconPos="right"
                @click="insertNewWorksheet()" />
            <Button style="float: right" :label="$t('manageWorksheet.newSignature')" icon="pi pi-book" iconPos="right"
                @click="addSignature()" />
        </div>
        <div class="grid col-12" v-if="addNewSignature">
            <div class="col-12">
                <Fieldset>
                    <template #legend>
                        <h5>{{ $t('manageWorksheet.signature') }}</h5>
                    </template>
                    <div class="grid col-12">
                        <div class="grid col-6">
                            <div class="col-6">
                                <h5 class="label-add-worksheet">{{ $t('manageWorksheet.signatureNumber') }}:</h5>
                            </div>
                            <div class="col-6">
                                <InputText class="input-add-worksheet" type="text" v-model="newSignature.signature1" />
                            </div>
                        </div>
                        <div class="grid col-6">
                            <div class="col-6">
                                <h5 class="label-add-worksheet">{{ $t('manageWorksheet.signatureNumber') }}:</h5>
                            </div>
                            <div class="col-6">
                                <InputText
                                    :disabled="newSignature.accumulation == null || newSignature.accumulation == 'C'"
                                    class="input-add-worksheet" type="text" v-model="newSignature.signature2" />
                            </div>
                        </div>
                        <div class="grid col-6">
                            <div class="col-6">
                                <h5 class="label-add-worksheet">{{ $t('manageWorksheet.accumulation') }}:</h5>
                            </div>
                            <div class="col-6">
                                <Dropdown v-model="newSignature.accumulation" style="width: 10em; float: right;"
                                    :options="accumulations" :placeholder="$t('manageWorksheet.accumulation')" />
                            </div>
                        </div>
                        <div class="grid col-6">
                            <div class="col-6">
                                <h5 class="label-add-worksheet">{{ $t('manageWorksheet.authorizedWaste') }}:</h5>
                            </div>
                            <div class="col-6">
                                <InputText class="input-add-worksheet" type="text"
                                    v-model="newSignature.authorizedWaste" />
                            </div>
                        </div>
                        <div class="grid col-6">
                            <div class="col-6">
                                <h5 class="label-add-worksheet">{{ $t('manageWorksheet.numberOfCopies') }}:</h5>
                            </div>
                            <div class="col-6">
                                <InputText class="input-add-worksheet" type="text"
                                    v-model="newSignature.numberOfCopies" />
                            </div>
                        </div>
                        <div class="grid col-6">
                            <div class="col-6">
                                <h5 class="label-add-worksheet">{{ $t('manageWorksheet.color') }}:</h5>
                            </div>
                            <div class="col-6">
                                <Dropdown v-model="newSignature.color" style="width: 10em; float: right;"
                                    :options="colors" :placeholder="$t('manageWorksheet.color')" />
                            </div>
                        </div>
                        <div class="grid col-6">
                            <div class="col-6">
                                <h5 class="label-add-worksheet">{{ $t('manageWorksheet.specialColor') }}:</h5>
                            </div>
                            <div class="col-6">
                                <InputText :disabled="newSignature.color == null || newSignature.color == 'Q' ||
                                newSignature.color == 'N'" class="input-add-worksheet" type="text"
                                    v-model="newSignature.specialColor" />
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <Button style="float: right" :label="$t('manageWorksheet.insertSignature')" icon="pi pi-plus"
                            iconPos="right" @click="pushNewSignature()" />
                    </div>
                </Fieldset>
            </div>
        </div>
    </Dialog>
    <div class="col-12" style="height: 4em;">
        <div class="col-12">
            <Button style="float: right" :label="$t('manageWorksheet.newWorksheet')" icon="pi pi-book" iconPos="right"
                @click="openWorksheetDialog()" />
        </div>
    </div>
    <div class="col-12">
        <DataTable :value="worksheets" v-model:expandedRows="expandedRows" dataKey="id" @rowExpand="onRowExpand"
            responsiveLayout="scroll" filterDisplay="row" v-model:filters="filters">
            <Column :expander="true" headerStyle="width: 3rem" />
            <column field="worksheetNumber" :header="$t('manageWorksheet.worksheetNumber')" :showFilterMenu="false"
                :sortable="true">
                <template #body="worksheet">
                <div v-if="!editing">{{worksheet.data.worksheetNumber}}</div>
                <div v-if="editing"> <InputText type="text" v-model="worksheet.data.worksheetNumber" /></div>
                </template>
            </column>
            <column field="machine" :header="$t('manageWorksheet.machine')" :showFilterMenu="false" :sortable="true">
            </column>
            <column>
                   <template #body="worksheet">
                        <div v-if="!editing">
                            <Button icon="pi pi-user-edit" class="p-button-rounded p-button-info"
                                @click="startEditingWorksheet(worksheet.data)" />
                        </div>
                        <div v-if="editing" class="grid col-12">
                            <div class="col-12">
                                <Button icon="pi pi-check" class="p-button-rounded p-button-info"
                                    @click="editWorksheet(worksheet.data)" />
                            </div>
                            <div class="col-12">
                                <Button icon="pi pi-times" class="p-button-rounded p-button-info"
                                    @click="cancelWorksheetEditing()" />
                            </div>
                            <div class="col-12">
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                                    @click="deleteWorksheet(worksheet.data)" />
                            </div>
                        </div>
                    </template>
                    </column>
            <template #expansion="worksheet">
                <DataTable :value="worksheet.data.signatures" responsiveLayout="scroll" :rowClass="rowClass">
                    <column field="accumulation" :header="$t('manageWorksheet.accumulation')" :showFilterMenu="false"
                        :sortable="true"></column>
                    <column field="signature1" :header="$t('manageWorksheet.signature')" :showFilterMenu="false"
                        :sortable="true"></column>
                    <column field="authorizedWaste" :header="$t('manageWorksheet.authorizedWaste')"
                        :showFilterMenu="false" :sortable="true"></column>
                    <column field="numberOfCopies" :header="$t('manageWorksheet.numberOfCopies')"
                        :showFilterMenu="false" :sortable="true"></column>
                    <column field="signature2" :header="$t('manageWorksheet.signature')" :showFilterMenu="false"
                        :sortable="true"></column>
                    <column field="status" :header="$t('manageWorksheet.status')" :showFilterMenu="false"
                        :sortable="true">
                        <template #body="signature">
                            {{ $t('status.' + signature.data.status) }}</template>
                    </column>
                    <column field="machineLeader" :header="$t('manageStaff.machineLeader')" :showFilterMenu="false"
                        :sortable="true">
                    </column>
                </DataTable>
            </template>
        </DataTable>
    </div>
</template>
<script>
import { FilterMatchMode } from 'primevue/api';

export default {
    components: {},
    data() {
        return {
            addNewSignature: false,
            publishingCompanies: ['Mondadori', 'Larousse', 'Rizzoli', 'Deagostini', 'Sejer'],
            machines: ['T4', 'T5', 'T6', 'T7'],
            accumulations: ['C', 'NC'],
            colors: ['N', 'N+1', 'P', 'Q'],
            departments: [
                { description: this.$t('departments.rotary'), code: 1 },
                { description: this.$t('departments.flatStamp'), code: 2 },
                { description: this.$t('departments.legatory'), code: 3 },
            ],
            newWorksheet: {
                id: (Math.random() * 10000).toFixed(0),
                signatures: []
            },
            newSignature: {},
            showWorksheetDialog: false,
            expandedRows: [],
            filters: {
                name: { value: null, matchMode: FilterMatchMode.CONTAINS },
            }
        }
    },
    computed: {
        worksheetsDB() {
            return this.$store.getters["worksheetsDB"]
        },
        worksheets(){
            return this.$store.getters["worksheets"]
        },
        editing(){
            return this.$store.getters["editing"]
        }
    },
    methods: {
        insertNewWorksheet() {
            const signaturesFormatted = this.$filters.deepClone(this.newWorksheet.signatures)
            const objFormatted = {
                id: this.newWorksheet.id.trim(),
                signatures: signaturesFormatted,
                worksheetNumber: this.newWorksheet.worksheetNumber.trim(),
                publishingCompany: this.newWorksheet.publishingCompany.trim(),
                machine: this.newWorksheet.machine.trim(),
                department: this.newWorksheet.department
            }
            let table = this.$t('tables.worksheets' + this.newWorksheet.department);
            this.$db.insert(this.worksheetsDB, table, objFormatted);
            this.worksheets.push(this.newWorksheet)
            this.showWorksheetDialog = false
        },
        addSignature() {
            this.addNewSignature = true
            this.newSignature.id = (Math.random() * 10000).toFixed(0),
                this.newSignature.status = '1'
        },
        pushNewSignature() {
            this.newWorksheet.signatures.push(this.newSignature)
            this.addNewSignature = false
            this.newSignature = {}
        },
        openWorksheetDialog() {
            this.showWorksheetDialog = true
        },
        rowClass(data) {
            return 'row-' + data.status
        },
        onRowExpand(event) {
            this.$toast.add({
                severity: 'info', summary: this.$t('manageWorksheet.worksheetNumber') +
                    ': ' + event.data.worksheetNumber, detail: event.data.publishingCompany, life: 3000
            });
        },
                editWorksheet(worksheet) {
            let table = this.$t('tables.worksheet' + worksheet.department);
                  const signaturesFormatted = this.$filters.deepClone(this.newWorksheet.signatures)
            this.$db.insert(this.worksheetsDB, table, {
                ...worksheet,
                id: worksheet.id.trim(),
                signatures: signaturesFormatted,
                worksheetNumber: worksheet.worksheetNumber.trim(),
                publishingCompany: worksheet.publishingCompany.trim(),
                machine: worksheet.machine.trim(),
                department: worksheet.department
            });
            this.stopEditing();
        },
              deleteWorksheet(worksheet) {
            let table = this.$t('tables.worksheets' + worksheet.department);
            const newWorksheetsList = this.worksheets.filter((worksheetList) => worksheetList.id !== worksheet.id);
            this.$store.commit("setWorksheets", newWorksheetsList)
            this.$db.delete(this.worksheetsDB, table, worksheet.id);
        },
                startEditingWorksheet() {
            this.worksheetsRestore = this.$filters.deepClone(this.worksheets);
            this.startEditing();
        },
        cancelWorksheetEditing() {
            this.worksheets = this.$filters.deepClone(this.worksheetsRestore);
            this.worksheetsRestore = [];
            this.stopEditing();
        },
        startEditing() {
            this.$store.commit('setEditing', true);
        },
        stopEditing() {
            this.$store.commit('setEditing', false);
        },
    }
}
</script>

<style>
.row-1 {
    background-color: none !important;
    border-left: 3px solid rgb(85, 136, 230);
}

.row-2 {
    background-color: rgba(243, 237, 212) !important;
    border-left: 3px solid rgba(193, 165, 42);
}

.row-3 {
    background-color: rgba(151, 211, 88, 0.493) !important;
    border-left: 3px solid rgb(60, 116, 0);
}

.container-input-add-worksheet {
    padding: 0.5em;
}

.input-add-worksheet {
    float: right;
    width: 10em !important;
}

.label-add-worksheet {
    margin-top: 0.25em;
}
</style>