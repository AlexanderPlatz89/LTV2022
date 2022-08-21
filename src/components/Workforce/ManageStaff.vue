<template>
    <Dialog v-model:visible="showWorkerDialog" :style="{ width: '50vw' }">
        <div class="grid">
            <div class="col-6">
                <h5 class="label-add-worker">{{ $t('manageStaff.department') }}:</h5>
            </div>
            <div class="col-6 container-input-add-worker">
                <Dropdown v-model="newWorker.department" style="width: 100%" optionLabel="description" optionValue="code" :options="departments" :placeholder="$t('manageStaff.selectDepartment')" />
            </div>
        </div>
        <div class="grid col-12">
            <div class="col-6">
                <Fieldset>
                    <template #legend>
                        <h5>{{ $t('manageStaff.workerData') }}</h5>
                    </template>
                    <div class="grid">
                        <div class="col-6">
                            <h5 class="label-add-worker">{{ $t('manageStaff.name') }}:</h5>
                        </div>
                        <div class="col-6">
                            <InputText :disabled="newWorker.department == null" class="input-add-worker" type="text" v-model="newWorker.name" />
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-6">
                            <h5 class="label-add-worker">{{ $t('manageStaff.surname') }}:</h5>
                        </div>
                        <div class="col-6">
                            <InputText :disabled="newWorker.department == null" class="input-add-worker" type="text" v-model="newWorker.surname" />
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-6">
                            <h5 class="label-add-worker">{{ $t('manageStaff.age') }}:</h5>
                        </div>
                        <div class="col-6">
                            <InputText :disabled="newWorker.department == null" class="input-add-worker" type="number" v-model="newWorker.age" />
                        </div>
                    </div>
                </Fieldset>
            </div>
            <div class="col-6">
                <Fieldset>
                    <template #legend>
                        <h5>{{ $t('manageStaff.positionCompany') }}</h5>
                    </template>
                    <div class="grid">
                        <div class="col-6">
                            <h5 class="label-add-worker">{{ $t('manageStaff.workerRole') }}:</h5>
                        </div>
                        <div class="col-6 container-input-add-worker">
                            <Dropdown :disabled="newWorker.department == null" v-model="newWorker.workerRole" style="width: 10em" optionLabel="description" optionValue="code" :options="workerRoles" :placeholder="$t('manageStaff.workerRole')" />
                        </div>
                    </div>
                    <div class="grid">
                        <div class="col-6">
                            <h5 class="label-add-worker">{{ $t('manageStaff.machine') }}:</h5>
                        </div>
                        <div class="col-6 container-input-add-worker">
                            <Dropdown :disabled="newWorker.department == null" v-model="newWorker.machine" style="width: 10em" :options="machines" :placeholder="$t('manageStaff.machine')" />
                        </div>
                    </div>
                </Fieldset>
            </div>
        </div>
        <Button style="float: right" :label="$t('manageStaff.newWorker')" icon="pi pi-plus" iconPos="right" @click="addWorker()" />
    </Dialog>
    <Dialog v-model:visible="showTurnDialog" :style="{ width: '50vw' }">
        <div class="col-12">
            <Fieldset>
                <template #legend>
                    <h5>T4</h5>
                </template>
                <div class="grid">
                    <div class="col-4 container-input-add-worker">
                        <h5>Mattina</h5>
                        <Dropdown v-model="operatorSelected" style="width: 10em" :options="workers" :placeholder="$t('manageStaff.machine')" optionLabel="surname" optionValue="id" />
                        <Dropdown v-model="operatorSelected" style="width: 10em" :options="workers" :placeholder="$t('manageStaff.machine')" optionLabel="surname" optionValue="id" />
                        <Dropdown v-model="operatorSelected" style="width: 10em" :options="workers" :placeholder="$t('manageStaff.machine')" optionLabel="surname" optionValue="id" />
                    </div>
                    <div class="col-4 container-input-add-worker">
                        <h5>Pomeriggio</h5>
                        <Dropdown v-model="operatorSelected" style="width: 10em" :options="workers" :placeholder="$t('manageStaff.machine')" optionLabel="surname" optionValue="id" />
                        <Dropdown v-model="operatorSelected" style="width: 10em" :options="workers" :placeholder="$t('manageStaff.machine')" optionLabel="surname" optionValue="id" />
                        <Dropdown v-model="operatorSelected" style="width: 10em" :options="workers" :placeholder="$t('manageStaff.machine')" optionLabel="surname" optionValue="id" />
                    </div>
                    <div class="col-4 container-input-add-worker">
                        <h5>Notte</h5>
                        <Dropdown v-model="operatorSelected" style="width: 10em" :options="workers" :placeholder="$t('manageStaff.machine')" optionLabel="surname" optionValue="id" />
                        <Dropdown v-model="operatorSelected" style="width: 10em" :options="workers" :placeholder="$t('manageStaff.machine')" optionLabel="surname" optionValue="id" />
                        <Dropdown v-model="operatorSelected" style="width: 10em" :options="workers" :placeholder="$t('manageStaff.machine')" optionLabel="surname" optionValue="id" />
                    </div>
                </div>
            </Fieldset>
        </div>
        <div class="col-12">
            <Fieldset>
                <template #legend>
                    <h5>T5</h5>
                </template>
                <div class="grid">
                    <div class="col-4 container-input-add-worker">
                        <h5>Mattina</h5>
                        <Dropdown :disabled="newWorker.department" v-model="newWorker.machine" style="width: 10em" :options="machines" :placeholder="$t('manageStaff.machine')" />
                    </div>
                    <div class="col-4 container-input-add-worker">
                        <h5>Pomeriggio</h5>
                        <Dropdown :disabled="newWorker.department" v-model="newWorker.machine" style="width: 10em" :options="machines" :placeholder="$t('manageStaff.machine')" />
                    </div>
                    <div class="col-4 container-input-add-worker">
                        <h5>Notte</h5>
                        <Dropdown :disabled="newWorker.department" v-model="newWorker.machine" style="width: 10em" :options="machines" :placeholder="$t('manageStaff.machine')" />
                    </div>
                </div>
            </Fieldset>
        </div>
        <div class="col-12">
            <Fieldset>
                <template #legend>
                    <h5>T6</h5>
                </template>
                <div class="grid">
                    <div class="col-4 container-input-add-worker">
                        <h5>Mattina</h5>
                        <Dropdown :disabled="newWorker.department" v-model="newWorker.machine" style="width: 10em" :options="machines" :placeholder="$t('manageStaff.machine')" />
                    </div>
                    <div class="col-4 container-input-add-worker">
                        <h5>Pomeriggio</h5>
                        <Dropdown :disabled="newWorker.department" v-model="newWorker.machine" style="width: 10em" :options="machines" :placeholder="$t('manageStaff.machine')" />
                    </div>
                    <div class="col-4 container-input-add-worker">
                        <h5>Notte</h5>
                        <Dropdown :disabled="newWorker.department" v-model="newWorker.machine" style="width: 10em" :options="machines" :placeholder="$t('manageStaff.machine')" />
                    </div>
                </div>
            </Fieldset>
        </div>
        <div class="col-12">
            <Fieldset>
                <template #legend>
                    <h5>T7</h5>
                </template>
                <div class="grid">
                    <div class="col-4 container-input-add-worker">
                        <h5>Mattina</h5>
                        <Dropdown :disabled="newWorker.department" v-model="newWorker.machine" style="width: 10em" :options="machines" :placeholder="$t('manageStaff.machine')" />
                    </div>
                    <div class="col-4 container-input-add-worker">
                        <h5>Pomeriggio</h5>
                        <Dropdown :disabled="newWorker.department" v-model="newWorker.machine" style="width: 10em" :options="machines" :placeholder="$t('manageStaff.machine')" />
                    </div>
                    <div class="col-4 container-input-add-worker">
                        <h5>Notte</h5>
                        <Dropdown :disabled="newWorker.department" v-model="newWorker.machine" style="width: 10em" :options="machines" :placeholder="$t('manageStaff.machine')" />
                    </div>
                </div>
            </Fieldset>
        </div>
    </Dialog>
    <div class="layout-dashboard">
        <Button style="float: right" :label="$t('manageStaff.turn')" icon="pi pi-plus" iconPos="right" @click="openTurnDialog()" />
        <div class="col-12" style="height: 4em"><Button style="float: right" :label="$t('manageStaff.addWorker')" icon="pi pi-plus" iconPos="right" @click="openWorkerDialog()" /></div>

        <div class="col-12">
            <DataTable :value="workers" responsiveLayout="scroll" filterDisplay="row" v-model:filters="filters">
                <Column field="name" :header="$t('manageStaff.name')" :showFilterMenu="false" :sortable="true">
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter" @input="filterCallback()" :placeholder="$t('manageStaff.contains')" />
                    </template>
                    <template #body="worker">
                        <div v-if="!editing">{{ worker.data.name }}</div>
                        <div v-if="editing">
                            <InputText type="text" v-model="worker.data.name" />
                        </div>
                    </template>
                </Column>
                <Column field="surname" :header="$t('manageStaff.surname')" :showFilterMenu="false" :sortable="true">
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter" @input="filterCallback()" :placeholder="$t('manageStaff.contains')" />
                    </template>
                    <template #body="worker">
                        <div v-if="!editing">{{ worker.data.surname }}</div>
                        <div v-if="editing">
                            <InputText type="text" v-model="worker.data.surname" />
                        </div>
                    </template>
                </Column>
                <Column field="age" :header="$t('manageStaff.age')" :showFilterMenu="false" :sortable="true">
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter" @input="filterCallback()" :placeholder="$t('manageStaff.contains')" />
                    </template>
                    <template #body="worker">
                        <div v-if="!editing">{{ worker.data.age }}</div>
                        <div v-if="editing">
                            <InputText type="text" v-model="worker.data.age" />
                        </div>
                    </template>
                </Column>
                <Column field="workerRole" :header="$t('manageStaff.workerRole')" :showFilterMenu="false" :sortable="true">
                    <template #filter="{ filterModel, filterCallback }">
                        <Dropdown
                            v-model="filterModel.value"
                            class="p-column-filter"
                            @change="filterCallback()"
                            :options="workerRoles"
                            optionLabel="description"
                            optionValue="code"
                            :placeholder="$t('manageStaff.workerRole')"
                            style="min-width: 10em"
                        />
                    </template>
                    <template #body="worker">
                        <div v-if="!editing">{{ decodeWorker(worker.data.workerRole) }}</div>
                        <div v-if="editing">
                            <Dropdown v-model="worker.data.workerRole" :options="workerRoles" optionLabel="description" optionValue="code" style="min-width: 12.5em" />
                        </div>
                    </template>
                </Column>
                <Column field="department" :header="$t('manageStaff.department')" :showFilterMenu="false" :sortable="true">
                    <template #filter="{ filterModel, filterCallback }">
                        <Dropdown
                            v-model="filterModel.value"
                            class="p-column-filter"
                            @change="filterCallback()"
                            :options="departments"
                            optionLabel="description"
                            optionValue="code"
                            :placeholder="$t('manageStaff.department')"
                            style="min-width: 10em"
                        />
                    </template>
                    <template #body="worker">
                        <div v-if="!editing">{{ decodeDepartments(worker.data.department) }}</div>
                        <div v-if="editing">
                            <Dropdown v-model="worker.data.department" :options="departments" optionLabel="description" optionValue="code" style="min-width: 10em" />
                        </div>
                    </template>
                </Column>
                <Column field="machine" :header="$t('manageStaff.machine')" :showFilterMenu="false" :sortable="true">
                    <template #filter="{ filterModel, filterCallback }">
                        <Dropdown v-model="filterModel.value" class="p-column-filter" @change="filterCallback()" :options="machines" :placeholder="$t('manageStaff.machine')" style="min-width: 5em" />
                    </template>
                    <template #body="worker">
                        <div v-if="!editing">{{ worker.data.machine }}</div>
                        <div v-if="editing">
                            <Dropdown v-model="worker.data.machine" :options="machines" style="min-width: 5em" />
                        </div>
                    </template>
                </Column>
                <Column>
                    <template #body="worker">
                        <div v-if="!editing">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-info" @click="startEditingWorker(worker.data)" />
                        </div>
                        <div v-if="editing">
                            <Button icon="pi pi-check" class="p-button-rounded p-button-info" @click="editWorker(worker.data)" />
                            <Button icon="pi pi-times" class="p-button-rounded p-button-info" style="margin-left: 0.5em; margin-right: 0.5em" @click="cancelWorkerEditing()" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteWorker(worker.data)" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';

export default {
    components: {},
    data() {
        return {
            showWorkerDialog: false,
            showTurnDialog: false,
            workers: [],
            operatorSelected: null,
            newWorker: {},
            workersRestore: [],
            departments: [
                { description: this.$t('departments.rotary'), code: 1 },
                { description: this.$t('departments.flatStamp'), code: 2 },
                { description: this.$t('departments.legatory'), code: 3 },
            ],
            machines: ['T4', 'T5', 'T6', 'T7'],
            workerRoles: [
                { description: this.$t('roles.headMachine'), code: '1' },
                { description: this.$t('roles.helperMachine'), code: '2' },
                { description: this.$t('roles.stacker'), code: '3' },
            ],
            filters: {
                name: { value: null, matchMode: FilterMatchMode.CONTAINS },
                surname: { value: null, matchMode: FilterMatchMode.CONTAINS },
                age: { value: null, matchMode: FilterMatchMode.CONTAINS },
                workerRole: { value: null, matchMode: FilterMatchMode.EQUALS },
                department: { value: null, matchMode: FilterMatchMode.EQUALS },
                machine: { value: null, matchMode: FilterMatchMode.EQUALS },
            },
        };
    },
    created() {
        this.getWorker();
    },
    mounted() {},
    computed: {
        editing() {
            return this.$store.getters['editing'];
        },
        machinesDB() {
            return this.$store.getters['machinesDB'];
        },
        workersDB() {
            return this.$store.getters['workersDB'];
        },
    },
    methods: {
        editWorker(worker) {
            let table = this.$t('tables.workers' + worker.department);
            this.$db.insert(this.workersDB, table, {
                ...worker,
                name: worker.name.trim(),
                surname: worker.surname.trim(),
                age: worker.age.trim(),
                workerRole: worker.workerRole.trim(),
                department: worker.department,
                machine: worker.machine.trim(),
            });
            this.stopEditing();
        },
        deleteWorker(worker) {
            let table = this.$t('tables.workers' + worker.department);
            this.workers = this.workers.filter((workerList) => workerList.id !== worker.id);
            this.$db.delete(this.workersDB, table, worker.id);
        },
        startEditingWorker() {
            this.workersRestore = this.$filters.deepClone(this.workers);
            this.startEditing();
        },
        cancelWorkerEditing() {
            this.workers = this.$filters.deepClone(this.workersRestore);
            this.workersRestore = [];
            this.stopEditing();
        },
        startEditing() {
            this.$store.commit('setEditing', true);
        },
        stopEditing() {
            this.$store.commit('setEditing', false);
        },
        decodeDepartments(code) {
            if (code === 1) {
                return this.$t('departments.rotary');
            } else if (code === 2) {
                return this.$t('departments.flatStamp');
            } else if (code === 3) {
                return this.$t('departments.legatory');
            } else {
                return 'N.D';
            }
        },
        decodeWorker(code) {
            if (code === '1') {
                return this.$t('roles.headMachine');
            } else if (code === '2') {
                return this.$t('roles.helperMachine');
            } else if (code === '3') {
                return this.$t('roles.stacker');
            } else {
                return 'N.D';
            }
        },
        async getWorker() {
            let rotaryWorkers = await this.$db.readFromTable(this.workersDB, 'rotaryWorkers');
            rotaryWorkers.forEach((worker) => this.workers.push(worker));
        },
        addWorker() {
            const workerItem = {
                id: (Math.random() * 10000).toFixed(0),
                name: this.newWorker.name && this.newWorker.name.trim(),
                surname: this.newWorker.surname && this.newWorker.surname.trim(),
                age: this.newWorker.age && this.newWorker.age.trim(),
                workerRole: this.newWorker.workerRole && this.newWorker.workerRole.trim(),
                department: this.newWorker.department,
                machine: this.newWorker.machine && this.newWorker.machine.trim(),
            };
            this.workers.push(workerItem);
            let table = this.$t('tables.workers' + workerItem.department);
            this.$db.insert(this.workersDB, table, workerItem);
            this.newWorker = {};
            this.showWorkerDialog = false;
        },
        openWorkerDialog() {
            this.showWorkerDialog = true;
        },
        openTurnDialog() {
            this.showTurnDialog = true;
        },
    },
};
</script>

<style scoped lang="scss">
.container-input-add-worker {
    padding: 0.5em;
}

.input-add-worker {
    width: 10em !important;
}

.label-add-worker {
    margin-top: 0.25em;
}

.dataTable {
    position: relative;
    align-content: center;
    justify-content: center;
}
</style>
