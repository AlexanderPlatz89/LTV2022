<template>
	<div>
		<DataTable :value="products" responsiveLayout="scroll">
			<Column field="code" header="Code"></Column>
			<Column field="name" header="Name"></Column>
			<Column field="category" header="Category"></Column>
			<Column field="quantity" header="Quantity"></Column>
		</DataTable>
	</div>
</template>

<script>

export default {
	components: {
	},
	data() {
		return {
			products: null
		}
	},
	created() {
	},
	mounted() {
	},
	methods: {
	},
}
</script>

<style scoped lang="scss">
</style>
