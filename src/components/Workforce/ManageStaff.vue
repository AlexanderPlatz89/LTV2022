<template>
	<Dialog v-model:visible="showWorkerDialog" :style="{ width: '50vw' }">
		<div class="grid">
			<div class="col-6">
				<h5 class="label-add-worker">{{ $t('manageStaff.department') }}: </h5>
			</div>
			<div class="col-6 container-input-add-worker">
				<Dropdown v-model="newWorker.department" style="width: 100%;" optionLabel="description"
					optionValue="code" :options="departments" :placeholder="$t('manageStaff.selectDepartment')" />
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
							<h5 class="label-add-worker">{{ $t('manageStaff.name') }}: </h5>
						</div>
						<div class="col-6">
							<InputText :disabled="newWorker.department == null" class="input-add-worker" type="text"
								v-model="newWorker.name" />
						</div>
					</div>
					<div class="grid">
						<div class="col-6">
							<h5 class="label-add-worker">{{ $t('manageStaff.surname') }}: </h5>
						</div>
						<div class="col-6">
							<InputText :disabled="newWorker.department == null" class="input-add-worker" type="text"
								v-model="newWorker.surname" />
						</div>
					</div>
					<div class="grid">
						<div class="col-6">
							<h5 class="label-add-worker">{{ $t('manageStaff.age') }}: </h5>
						</div>
						<div class="col-6">
							<InputText :disabled="newWorker.department == null" class="input-add-worker" type="number"
								v-model="newWorker.age" />
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
							<h5 class="label-add-worker">{{ $t('manageStaff.workerRole') }}: </h5>
						</div>
						<div class="col-6 container-input-add-worker">
							<Dropdown :disabled="newWorker.department == null" v-model="newWorker.workerRole"
								style="width: 10em;" optionLabel="description" optionValue="code" :options="workerRoles"
								:placeholder="$t('manageStaff.workerRole')" />
						</div>
					</div>
					<div class="grid">
						<div class="col-6">
							<h5 class="label-add-worker">{{ $t('manageStaff.machine') }}: </h5>
						</div>
						<div class="col-6 container-input-add-worker">
							<Dropdown :disabled="newWorker.department == null" v-model="newWorker.machine"
								style="width: 10em;" :options="machines" :placeholder="$t('manageStaff.machine')" />
						</div>
					</div>
				</Fieldset>
			</div>
		</div>
		<Button style="float:right" :label="$t('manageStaff.newWorker')" icon="pi pi-plus" iconPos="right"
			@click="addWorker()" />
	</Dialog>
	<div class="layout-dashboard">
		<div class="col-12" style="height: 4em;"><Button style="float:right" :label="$t('manageStaff.addWorker')"
				icon="pi pi-plus" iconPos="right" @click="openWorkerDialog()" /></div>

		<div class="col-12">

			<DataTable :value="workers" responsiveLayout="scroll" filterDisplay="row" v-model:filters="filters">
				<Column field="name" :header="$t('manageStaff.name')" :showFilterMenu="false" :sortable="true">
					<template #filter="{ filterModel, filterCallback }">
						<InputText type="text" v-model="filterModel.value" class="p-column-filter"
							@input="filterCallback()" :placeholder="$t('manageStaff.contains')" />
					</template>
				</Column>
				<Column field="surname" :header="$t('manageStaff.surname')" :showFilterMenu="false" :sortable="true">
					<template #filter="{ filterModel, filterCallback }">
						<InputText type="text" v-model="filterModel.value" class="p-column-filter"
							@input="filterCallback()" :placeholder="$t('manageStaff.contains')" />
					</template>
				</Column>
				<Column field="age" :header="$t('manageStaff.age')" :showFilterMenu="false" :sortable="true">
					<template #filter="{ filterModel, filterCallback }">
						<InputText type="text" v-model="filterModel.value" class="p-column-filter"
							@input="filterCallback()" :placeholder="$t('manageStaff.contains')" />
					</template>
				</Column>
				<Column field="workerRole" :header="$t('manageStaff.workerRole')" :showFilterMenu="false" :sortable="true">
					<template #filter="{ filterModel, filterCallback }">
						<Dropdown v-model="filterModel.value" class="p-column-filter" @change="filterCallback()"
							:options="workerRoles" optionLabel="description" optionValue="code"
							:placeholder="$t('manageStaff.workerRole')" />
					</template>
					<template #body="worker">
						{{ decodeWorker(worker.data.workerRole) }}
					</template>
				</Column>
				<Column field="department" :header="$t('manageStaff.department')" :showFilterMenu="false" :sortable="true">
					<template #filter="{ filterModel, filterCallback }">
						<Dropdown v-model="filterModel.value" class="p-column-filter" @change="filterCallback()"
							:options="departments" optionLabel="description" optionValue="code"
							:placeholder="$t('manageStaff.department')" />
					</template>
					<template #body="worker">
						{{ decodeDepartments(worker.data.department) }}
					</template>
				</Column>
				<Column field="machine" :header="$t('manageStaff.machine')" :showFilterMenu="false" :sortable="true">
					<template #filter="{ filterModel, filterCallback }">
						<Dropdown v-model="filterModel.value" class="p-column-filter" @change="filterCallback()"
							:options="machines" :placeholder="$t('manageStaff.machine')" />
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';

export default {
	components: {
	},
	data() {
		return {
			showWorkerDialog: false,
			workers: [],
			newWorker: {},
			departments: [
				{ description: this.$t('departments.rotary'), code: 1 },
				{ description: this.$t('departments.flatStamp'), code: 2 },
				{ description: this.$t('departments.legatory'), code: 3 },
			],
			machines: [
				'T4',
				'T5',
				'T6',
				'T7'
			],
			workerRoles: [
				{ description: this.$t('roles.headMachine'), code: '1' },
				{ description: this.$t('roles.helperMachine'), code: '2' },
				{ description: this.$t('roles.stacker'), code: '3' },
			],
			filters: {
				'name': { value: null, matchMode: FilterMatchMode.CONTAINS },
				'surname': { value: null, matchMode: FilterMatchMode.CONTAINS },
				'age': { value: null, matchMode: FilterMatchMode.CONTAINS },
				'workerRole': { value: null, matchMode: FilterMatchMode.EQUALS },
				'department': { value: null, matchMode: FilterMatchMode.EQUALS },
				'machine': { value: null, matchMode: FilterMatchMode.EQUALS },
			}

		}
	},
	created() {
		this.getWorker()
	},
	mounted() {
	},
	computed: {
		machinesDB() {
			return this.$store.getters["machinesDB"]
		},
		workersDB() {
			return this.$store.getters["workersDB"]
		}
	},
	methods: {
		decodeDepartments(code) {
			if (code === 1) {
				return this.$t('departments.rotary')
			} else if (code === 2) {
				return this.$t('departments.flatStamp')
			} else if (code === 3) {
				return this.$t('departments.legatory')
			} else {
				return "N.D"
			}
		},
		decodeWorker(code) {
			if (code === '1') {
				return this.$t('roles.headMachine')
			} else if (code === '2') {
				return this.$t('roles.helperMachine')
			} else if (code === '3') {
				return this.$t('roles.stacker')
			} else {
				return "N.D"
			}
		},
		async getWorker() {
			let rotaryWorkers = await this.$db.readFromTable(this.workersDB, 'rotaryWorkers')
			rotaryWorkers.forEach(worker => this.workers.push(worker))
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
			}
			this.workers.push(workerItem)
			if(workerItem.department === 1){
				this.$db.insert(this.workersDB, 'rotaryWorkers', workerItem)
			} else if(workerItem.department === 2){
				this.$db.insert(this.workersDB, 'flatStampWorkers', workerItem)
			} else {
				this.$db.insert(this.workersDB, 'legatoryWorkers', workerItem)
			}
			this.newWorker = {}
			this.showWorkerDialog = false
		},
		openWorkerDialog() {
			this.showWorkerDialog = true
		},
	},
}
</script>

<style scoped lang="scss">
.container-input-add-worker {
	padding: 0.5em;
}

.input-add-worker {
	width: 10em !important;
}

.label-add-worker {
	margin-top: .25em;
}

.dataTable {
	position: relative;
	align-content: center;
	justify-content: center;
}
</style>