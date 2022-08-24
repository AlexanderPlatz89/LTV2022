<template>
	<div class="grid">
		<div class="col-12" style="text-align: center">
			<h1>{{ $t("days.day" + day) }}</h1>
		</div>
		<div class="col-3">
			<T4Chart />
			<div class="grid col-12">
				<div :class="dynamicClassWorkesOnMachine(worker)" v-for="worker in t4Workers()" :key="worker">
					<span v-if="worker.surname !== 'N.D.'">{{ worker.surname.toUpperCase() }}</span>
				</div>
			</div>
		</div>
		<div class="col-3">
			<T5Chart />
			<div class="grid col-12">
				<div :class="dynamicClassWorkesOnMachine(worker)" v-for="worker in t5Workers()" :key="worker">
					<span v-if="worker.surname !== 'N.D.'">{{ worker.surname.toUpperCase() }}</span>
				</div>
			</div>
		</div>
		<div class="col-3">
			<T6Chart />
			<div class="grid col-12">
				<div :class="dynamicClassWorkesOnMachine(worker)" v-for="worker in t6Workers()" :key="worker">
					<span v-if="worker.surname !== 'N.D.'">{{ worker.surname.toUpperCase() }}</span>
				</div>
			</div>
		</div>
		<div class="col-3">
			<T7Chart />
			<div class="grid col-12">
				<div :class="dynamicClassWorkesOnMachine(worker)" v-for="worker in t7Workers()" :key="worker">
					<span v-if="worker.surname !== 'N.D.'">{{ worker.surname.toUpperCase() }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import T4Chart from '../Charts/T4Chart.vue'
import T5Chart from '../Charts/T5Chart.vue'
import T6Chart from '../Charts/T6Chart.vue'
import T7Chart from '../Charts/T7Chart.vue'

export default {
	components: {
		'T4Chart': T4Chart,
		'T5Chart': T5Chart,
		'T6Chart': T6Chart,
		'T7Chart': T7Chart,
	},
	created() {
		this.getWorkers()
		this.getWorksheets()
	},
	mounted() {
	},
	data() {
		return {}
	},
	computed: {
		time() {
			return this.$store.getters['time']
		},
		workersDB() {
			return this.$store.getters['workersDB'];
		},
		worksheetsDB() {
			return this.$store.getters['worksheetsDB'];
		},
		day() {
			return this.$store.getters["day"]
		},
		workers() {
			return this.$store.getters['workers'];
		},
	},
	watch: {
		time() {
			this.t4Workers()
			this.t5Workers()
			this.t6Workers()
			this.t7Workers()
		}
	},
	methods: {
		dynamicClassWorkesOnMachine(worker) {
			return 'col-12 worker-on-machine-' + worker.workerRole
		},
		async getWorkers() {
			let rotaryWorkers = await this.$db.readFromTable(this.workersDB, 'rotaryWorkers');
			this.$store.commit("setWorkers", rotaryWorkers)
		},
		async getWorksheets() {
			let rotaryWorksheets = await this.$db.readFromTable(this.worksheetsDB, 'rotaryWorksheets');
			this.$store.commit("setWorksheets", rotaryWorksheets)
		},
		t4Workers() {
			let turn = 0
			if (this.time >= 6 && this.time <= 13) turn = 1
			if (this.time >= 14 && this.time <= 21) turn = 2
			if (this.time == 22 || this.time == 23 || this.time == 0 || this.time == 1 || this.time == 2 ||
				this.time == 3 || this.time == 4 || this.time == 5) turn = 3
			let t4Workers = this.workers.filter(worker => worker.machine == 'T4' && worker.turn == turn)
			let machineLeader = t4Workers.find(worker => worker.workerRole == 1)
			let helper = t4Workers.find(worker => worker.workerRole == 2)
			let stakerist = t4Workers.find(worker => worker.workerRole == 3)
			if (machineLeader == null) machineLeader = { surname: 'N.D.' }
			if (helper == null) helper = { surname: 'N.D.' }
			if (stakerist == null) stakerist = { surname: 'N.D.' }
			t4Workers.splice(0, 3, machineLeader, helper, stakerist)
			return t4Workers != null ? t4Workers : []
		},
		t5Workers() {
			let turn = 0
			if (this.time >= 6 && this.time <= 13) turn = 1
			if (this.time >= 14 && this.time <= 21) turn = 2
			if (this.time == 22 || this.time == 23 || this.time == 0 || this.time == 1 || this.time == 2 ||
				this.time == 3 || this.time == 4 || this.time == 5) turn = 3
			let t5Workers = this.workers.filter(worker => worker.machine == 'T5' && worker.turn == turn)
			let machineLeader = t5Workers.find(worker => worker.workerRole == 1)
			let helper = t5Workers.find(worker => worker.workerRole == 2)
			let stakerist = t5Workers.find(worker => worker.workerRole == 3)
			if (machineLeader == null) machineLeader = { surname: 'N.D.' }
			if (helper == null) helper = { surname: 'N.D.' }
			if (stakerist == null) stakerist = { surname: 'N.D.' }
			t5Workers.splice(0, 3, machineLeader, helper, stakerist)
			return t5Workers != null ? t5Workers : []
		},
		t6Workers() {
			let turn = 0
			if (this.time >= 6 && this.time <= 13) turn = 1
			if (this.time >= 14 && this.time <= 21) turn = 2
			if (this.time == 22 || this.time == 23 || this.time == 0 || this.time == 1 || this.time == 2 ||
				this.time == 3 || this.time == 4 || this.time == 5) turn = 3
			let t6Workers = this.workers.filter(worker => worker.machine == 'T6' && worker.turn == turn)
			let machineLeader = t6Workers.find(worker => worker.workerRole == 1)
			let helper = t6Workers.find(worker => worker.workerRole == 2)
			let stakerist = t6Workers.find(worker => worker.workerRole == 3)
			if (machineLeader == null) machineLeader = { surname: 'N.D.' }
			if (helper == null) helper = { surname: 'N.D.' }
			if (stakerist == null) stakerist = { surname: 'N.D.' }
			t6Workers.splice(0, 3, machineLeader, helper, stakerist)
			return t6Workers != null ? t6Workers : []
		},
		t7Workers() {
			let turn = 0
			if (this.time >= 6 && this.time <= 13) turn = 1
			if (this.time >= 14 && this.time <= 21) turn = 2
			if (this.time == 22 || this.time == 23 || this.time == 0 || this.time == 1 || this.time == 2 ||
				this.time == 3 || this.time == 4 || this.time == 5) turn = 3
			let t7Workers = this.workers.filter(worker => worker.machine == 'T7' && worker.turn == turn)
			let machineLeader = t7Workers.find(worker => worker.workerRole == 1)
			let helper = t7Workers.find(worker => worker.workerRole == 2)
			let stakerist = t7Workers.find(worker => worker.workerRole == 3)
			if (machineLeader == null) machineLeader = { surname: 'N.D.' }
			if (helper == null) helper = { surname: 'N.D.' }
			if (stakerist == null) stakerist = { surname: 'N.D.' }
			t7Workers.splice(0, 3, machineLeader, helper, stakerist)
			return t7Workers != null ? t7Workers : []
		}
	},
}
</script>

<style scoped lang="scss">
.worker-on-machine-1 {
	margin-top: .5em;
	text-align: center;
	background-color: rgba(128, 128, 128, 0.19);
	border: 4px solid rgba(0, 21, 255, 0.474);
}

.worker-on-machine-2 {
	margin-top: .5em;
	text-align: center;
	background-color: rgba(128, 128, 128, 0.19);
	border: 4px solid #fccc55;
}

.worker-on-machine-3 {
	margin-top: .5em;
	text-align: center;
	background-color: rgba(128, 128, 128, 0.19);
	border: 4px solid rgba(0, 255, 238, 0.474);
}
</style>
