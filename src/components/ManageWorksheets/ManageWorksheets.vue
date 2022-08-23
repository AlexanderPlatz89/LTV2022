<template>
    <Dialog v-model:visible="showWorksheetDialog" :style="{ width: '80vw' }">
        <div class="grid">
            <div class="col-6">
                <h5 class="label-add-worksheet">{{ $t('manageWorksheet.worksheetNumber') }}:</h5>
            </div>
            <div class="col-6">
                <InputText class="input-add-worksheet" type="text" v-model="newWorksheet.worksheetNumber" />
            </div>
        </div>
        <div class="grid">
            <div class="col-6">
                <h5 class="label-add-worksheet">{{ $t('manageWorksheet.publishingCompany') }}:</h5>
            </div>
            <div class="col-6 container-input-add-worksheet">
                <Dropdown v-model="newWorksheet.publishingCompany" style="width: 10em" :options="publishingCompanies"
                    :placeholder="$t('manageWorksheet.publishingCompany')" />
            </div>
        </div>
        <div class="grid">
            <div class="col-6">
                <h5 class="label-add-worksheet">{{ $t('manageStaff.machine') }}:</h5>
            </div>
            <div class="col-6 container-input-add-worksheet">
                <Dropdown v-model="newWorksheet.machine" style="width: 10em" :options="machines"
                    :placeholder="$t('manageStaff.machine')" />
            </div>
        </div>
        <div class="col-12">
            <Button style="float: right" :label="$t('manageWorksheet.newSignature')" icon="pi pi-book" iconPos="right"
                @click="addSignature()" />
        </div>
        <div class="grid col-12" v-if="addNewSignature">
            <div class="col-6">
                {{addNewSignature}}
                <Fieldset>
                    <template #legend>
                        <h5>{{ $t('manageStaff.workerData') }}</h5>
                    </template>
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
            </column>
            <column field="machine" :header="$t('manageWorksheet.machine')" :showFilterMenu="false" :sortable="true">
            </column>
            <template #expansion="worksheet">
                <DataTable :value="worksheet.data.signatures" responsiveLayout="scroll" :rowClass="rowClass">
                    <column field="signature" :header="$t('manageWorksheet.signature')" :showFilterMenu="false"
                        :sortable="true"></column>
                    <column field="accumulation" :header="$t('manageWorksheet.accumulation')" :showFilterMenu="false"
                        :sortable="true"></column>
                    <column field="authorizedWaste" :header="$t('manageWorksheet.authorizedWaste')"
                        :showFilterMenu="false" :sortable="true"></column>
                    <column field="numberOfCopies" :header="$t('manageWorksheet.numberOfCopies')"
                        :showFilterMenu="false" :sortable="true"></column>
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
            newWorksheet: {
                id: (Math.random() * 10000).toFixed(0),
                signatures: []
            },
            newSignature: {},
            showWorksheetDialog: false,
            expandedRows: [],
            worksheets: [
                {
                    id: 65465,
                    worksheetNumber: 220822,
                    publishingCompany: 'Mondadori',
                    machine: 'T5',
                    signatures: [
                        {
                            signature: '1',
                            accumulation: 'C',
                            authorizedWaste: 3000,
                            numberOfCopies: 10500,
                            status: 2,
                            machineLeader: 'Battaglia'
                        },
                        {
                            signature: '2',
                            accumulation: 'C',
                            authorizedWaste: 1500,
                            numberOfCopies: 10500,
                            status: 3,
                            machineLeader: 'Schirru'
                        },
                        {
                            signature: '3',
                            accumulation: 'C',
                            authorizedWaste: 1500,
                            numberOfCopies: 10500,
                            status: 3,
                            machineLeader: 'Battaglia'
                        },
                        {
                            signature: '4',
                            accumulation: 'C',
                            authorizedWaste: 1500,
                            numberOfCopies: 10500,
                            status: 1,
                            machineLeader: null
                        },
                        {
                            signature: '5',
                            accumulation: 'C',
                            authorizedWaste: 1500,
                            numberOfCopies: 10500,
                            status: 1,
                            machineLeader: null
                        },
                        {
                            signature: '6',
                            accumulation: 'NC',
                            authorizedWaste: 750,
                            numberOfCopies: 5250,
                            status: 1,
                            machineLeader: null
                        },
                    ]
                }
            ],
            filters: {
                name: { value: null, matchMode: FilterMatchMode.CONTAINS },
            }
        }
    },
    methods: {
        addSignature() {
            this.addNewSignature = true
            this.newSignature.id = 516
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
        }
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
    width: 10em !important;
}

.label-add-worksheet {
    margin-top: 0.25em;
}
</style>