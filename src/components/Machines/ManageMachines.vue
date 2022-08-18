<template>
	<Dialog v-model:visible="showMachineDialog" :style="{ width: '10vw' }">
		<div>
			<h5 class="label-add-worker">{{ $t('manageStaff.machine') }}: </h5>
		</div>
		<div class="container-input-add-worker">
			<Dropdown v-model="machines.machine" style="width: 10em;" :options="machines"
				:placeholder="$t('manageStaff.machine')" />
		</div>
		<Button style="margin-top: 10px; width: 10em;" :label="$t('manageStaff.addMachine')" icon="pi pi-plus" iconPos="right"
			@click="addMachine()" />
	</Dialog>
	<div class="layout-dashboard">
		<h1>Machines</h1>
		<div style="height: 4em;"><Button style="float: right" :label="$t('manageStaff.addMachine')"
				icon="pi pi-plus" iconPos="right" @click="openMachineDialog()"/></div>
		<div class="card">
			<h5>Line Styles</h5>
			<Chart type="line" :data="lineStylesData" :options="basicOptions" />
		</div>
	</div>
</template>

<script>

export default {
	components: {
	},
	data() {
		return {
			showMachineDialog: false,
			newMachine: {},
			lineStylesData: {
				labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
				datasets: [
					{
						label: 'T6',
						data: [12, 51, 62, 33, 21, 62, 45, 12, 51, 62, 33, 21, 62],
						fill: true,
						borderColor: 'red',
						tension: .4,
						backgroundColor: 'rgba(255,167,38,0.2)'
					}
				]
			},
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
		}
	},
	created() {
	},
	mounted() {
	},
	methods: {
		addMachine() {
			const workerItem = {
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
			this.newMachine = {}
			this.showWorkerDialog = false
		},
		openMachineDialog() {
			this.showMachineDialog = true
		}
	},
	computed: {
		machinesDB() {
			return this.$store.getters["machinesDB"]
		}
	}
}
</script>

<style scoped lang="scss">
</style>