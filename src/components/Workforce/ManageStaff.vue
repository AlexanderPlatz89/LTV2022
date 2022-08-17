<template>
	<Dialog v-model:visible="showWorkerDialog">
		<div class="grid">
			<div class="col-6 container-input-add-worker">
				<div class="col-12">
					<h5>{{ $t('manageStaff.workerData') }}</h5>
				</div>
				<div class="grid">
					<div class="col-6">
						<h5 class="label-add-worker">{{ $t('manageStaff.name') }}: </h5>
					</div>
					<div class="col-6">
						<InputText class="input-add-worker" type="text" v-model="newWorker.name" />
					</div>
				</div>
				<div class="grid">
					<div class="col-6">
						<h5 class="label-add-worker">{{ $t('manageStaff.surname') }}: </h5>
					</div>
					<div class="col-6">
						<InputText class="input-add-worker" type="text" v-model="newWorker.surname" />
					</div>
				</div>
				<div class="grid">
					<div class="col-6">
						<h5 class="label-add-worker">{{ $t('manageStaff.age') }}: </h5>
					</div>
					<div class="col-6">
						<InputText class="input-add-worker" type="number" v-model="newWorker.age" />
					</div>
				</div>
			</div>
			<div class="col-6">
				<div class="col-12">
					<h5>{{ $t('manageStaff.positionCompany') }}</h5>
				</div>
				<div class="grid">
					<div class="col-6">
						<h5 class="label-add-worker">{{ $t('manageStaff.workerRole') }}: </h5>
					</div>
					<div class="col-6 container-input-add-worker">
						<Dropdown v-model="newWorker.workerRole" style="width: 10em;" optionLabel="description"
							optionValue="code" :options="workerRoles" :placeholder="$t('manageStaff.workerRole')" />
					</div>
				</div>
				<div class="grid">
					<div class="col-6">
						<h5 class="label-add-worker">{{ $t('manageStaff.department') }}: </h5>
					</div>
					<div class="col-6 container-input-add-worker">
						<Dropdown v-model="newWorker.department" style="width: 10em;" optionLabel="description"
							optionValue="code" :options="departments"
							:placeholder="$t('manageStaff.selectDepartment')" />
					</div>
					<div class="col-6">
						<h5 class="label-add-worker">{{ $t('manageStaff.machine') }}: </h5>
					</div>
					<div class="col-6 container-input-add-worker">
						<Dropdown v-model="newWorker.machine" style="width: 10em;" :options="machines"
							:placeholder="$t('manageStaff.machine')" />
					</div>
				</div>
			</div>
		</div>
		<Button style="float:right" :label="$t('manageStaff.newWorker')" icon="pi pi-plus" iconPos="right"
			@click="addWorker()" />
	</Dialog>
	<div class="layout-dashboard">
		<Button style="float:right" :label="$t('manageStaff.addWorker')" icon="pi pi-plus" iconPos="right"
			@click="openWorkerDialog()" />
	</div>
</template>

<script>

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
			]
		}
	},
	created() {
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
		addWorker() {
			const nameFormatted = this.newWorker.name && this.newWorker.name.trim()
			const surnameFromatted = this.newWorker.surname && this.newWorker.surname.trim()
			const ageFormatted = this.newWorker.age && this.newWorker.age.trim()
			const workerRoleFormatted = this.newWorker.workerRole && this.newWorker.workerRole.trim()
			const machineFormatted = this.newWorker.machine && this.newWorker.machine.trim()

			const workerItem = {
				id: this.workers.length + 1,
				name: nameFormatted,
				surname: surnameFromatted,
				age: ageFormatted,
				workerRole: workerRoleFormatted,
				department : this.newWorker.department,
				machine: machineFormatted,
			}
			if (!nameFormatted) {
				return
			}
			debugger
			this.workers.push(workerItem)
			this.insertNewWorker(workerItem)
			this.newWorker = ''
		},
		openWorkerDialog() {
			this.showWorkerDialog = true
			this.newWorker.id = this.workers.length + 1
		},
		async insertNewWorker(worker) {
			return new Promise((resolve, reject) => {
				const transaction = this.workersDB.transaction('rotaryWorkers', 'readwrite')
				const store = transaction.objectStore('rotaryWorkers')
				debugger
				store.put(worker)

				transaction.oncomplete = () => {
					resolve('Machine added successfully')
				}

				transaction.onerror = event => {
					reject(event)
				}
			})
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
</style>