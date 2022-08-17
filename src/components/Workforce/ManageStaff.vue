<template>
	<Dialog v-model:visible="showWorkerDialog">
		<div class="grid">
			<div class="col-6 container-input-add-worker">
				<div class="col-12"><h5>{{$t('manageStaff.workerData')}}</h5></div>
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
						<InputNumber class="input-add-worker" type="text" v-model="newWorker.age" />
					</div>
				</div>
			</div>
			<div class="col-6">
				<div class="col-12"><h5>{{$t('manageStaff.workerRole')}}</h5></div>
				<div class="grid">
					<div class="col-6">
						<h5 class="label-add-worker">{{ $t('manageStaff.department') }}: </h5>
					</div>
					<div class="col-6 container-input-add-worker">
						<Dropdown v-model="newWorker.department" style="width: 100%;" optionLabel="description"
							optionValue="code" :options="departments"
							:placeholder="$t('manageStaff.selectDepartment')" />
					</div>
				</div>
			</div>
		</div>
	</Dialog>
	<div class="layout-dashboard">
		<Button style="float:right" :label="$t('manageStaff.addWorker')" icon="pi pi-plus" iconPos="right"
			@click="openWorkerDialog()" />
	</div>
</template>

<script>

export default {
  components:{
  },
	data() {
		return {
			showWorkerDialog: false,
			newWorker: {},
			departments:[
				{description: this.$t('department.rotary'), code: '1'},
				{description: this.$t('department.flatStamp'), code: '2'},
				{description: this.$t('department.legatory'), code: '3'},
			]
    }
	},
	created() {
	},
	mounted() {
	},
	methods: {
		openWorkerDialog(){
			this.showWorkerDialog = true
		}
	},
}
</script>

<style scoped lang="scss">
.container-input-add-worker{
	padding: 1em;
}
.input-add-worker{
	width: 100%;
}
.label-add-worker{
	margin-top: .35em;
}

</style>