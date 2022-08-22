<template>
	<div class="grid">
		<div class="col-12" style="text-align: center">
			<h1>{{ $t("days.day" + day) }}</h1>
		</div>
		<div class="col-3">
			<T4Chart />
			<div class="grid col-12" style="padding: 3em;">
				<div class="col-4" v-for="worker in t4Workers()" :key="worker">{{ worker.surname }}</div>
				</div>
			</div>
			<div class="col-3">
				<T5Chart />
				<div class="grid col-12" style="padding: 3em;">
				<div class="col-4" v-for="worker in t5Workers()" :key="worker">{{ worker.surname }}</div>
			</div>
			</div>
			<div class="col-3">
				<T6Chart />
					<div class="grid col-12" style="padding: 3em;">
				<div class="col-4" v-for="worker in t6Workers()" :key="worker">{{ worker.surname }}</div>
				</div>
			</div>
			<div class="col-3">
				<T7Chart />
				<div class="grid col-12" style="padding: 3em;">
				<div class="col-4" v-for="worker in t7Workers()" :key="worker">{{ worker.surname }}</div>
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
		async getWorkers() {
			let rotaryWorkers = await this.$db.readFromTable(this.workersDB, 'rotaryWorkers');
			this.$store.commit("setWorkers", rotaryWorkers)
		},
		t4Workers() {
			let turn = 0
			if (this.time >= 6 && this.time <= 13) turn = 1
			if (this.time >= 14 && this.time <= 21) turn = 2
			if (this.time >= 22 && this.time <= 5) turn = 3
			const t4MorningWorkers = this.workers.filter(worker => worker.machine == 'T4' && worker.turn == turn)
			return t4MorningWorkers != null ? t4MorningWorkers : []
		},
			t5Workers() {
			let turn = 0
			if (this.time >= 6 && this.time <= 13) turn = 1
			if (this.time >= 14 && this.time <= 21) turn = 2
			if (this.time >= 22 && this.time <= 5) turn = 3
			const t4MorningWorkers = this.workers.filter(worker => worker.machine == 'T5' && worker.turn == turn)
			return t4MorningWorkers != null ? t4MorningWorkers : []
		},
			t6Workers() {
			let turn = 0
			if (this.time >= 6 && this.time <= 13) turn = 1
			if (this.time >= 14 && this.time <= 21) turn = 2
			if (this.time >= 22 && this.time <= 5) turn = 3
			const t4MorningWorkers = this.workers.filter(worker => worker.machine == 'T6' && worker.turn == turn)
			return t4MorningWorkers != null ? t4MorningWorkers : []
		},
			t7Workers() {
			let turn = 0
			if (this.time >= 6 && this.time <= 13) turn = 1
			if (this.time >= 14 && this.time <= 21) turn = 2
			if (this.time >= 22 && this.time <= 5) turn = 3
			const t4MorningWorkers = this.workers.filter(worker => worker.machine == 'T7' && worker.turn == turn)
			return t4MorningWorkers != null ? t4MorningWorkers : []
		}
	},
}
</script>

<style scoped lang="scss">
</style>
