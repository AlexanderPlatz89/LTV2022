<template>
<div class="grid">
	<div class="col-3">
		<T4Chart />
	</div>
	<div class="col-3">
		<T5Chart />
	</div>
	<div class="col-3">
		<T6Chart />
	</div>
	<div class="col-3">
		<T7Chart />
	</div>
	</div>
</template>

<script>
import T4Chart from  '../Charts/T4Chart.vue'
import T5Chart from  '../Charts/T5Chart.vue'
import T6Chart from  '../Charts/T6Chart.vue'
import T7Chart from  '../Charts/T7Chart.vue'

export default {
	components: {
		'T4Chart': T4Chart,
		'T5Chart': T5Chart,
		'T6Chart': T6Chart,
		'T7Chart': T7Chart,
	},
	created() {
	},
	mounted() {
	},
	data(){
		return {}
	},
	methods: {
	},
}
</script>

<style scoped lang="scss">
</style>
