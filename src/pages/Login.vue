<template>
	<div class="login-body">
		<Toast />
		<div class="login-panel"></div>
		<div class="login-content">
			<img src="layout/images/LTV_logo.png" alt="babylon-layout" />

			<h1><span>{{ $t('login.signIn') }}</span>{{ $t('login.toBabylon') }}</h1>
			<p>{{ $t('login.welcome') }}</p>

			<div class="login-input-wrapper">
				<InputText placeholder="Username" v-model="username" />
				<i class="pi pi-user"></i>
			</div>

			<div class="login-input-wrapper">
				<InputText type="password" v-model="password" placeholder="Password" />
				<i class="pi pi-lock"></i>
			</div>

			<Button :label="$t('login.signIn')" @click="authenticate()" />
		</div>
	</div>
</template>

<script>

export default {
	async created() {
		this.machinesDB = await this.$db.createDB('MachinesDB', 1, ['flatStamMachines', 'rotaryMachines', 'legatoryMachines'])
		this.workersDB = await this.$db.createDB('WorkersDB', 1, ['flatStamWorkers', 'rotaryWorkers', 'legatoryWorkers'])
		this.worksheetsDB = await this.$db.createDB('WorksheetsDB', 1, ['flatStamWorksheets', 'rotaryWorksheets', 'legatoryWorksheets'])
	},
	data() {
		return {
			username: null,
			password: null,
			machinesDB: null,
			workersDB: null,
			worksheetsDB: null,
			signIn: ''
		}
	},
	methods: {
		authenticate() {
			this.$router.push({ path: '/dashboard' });
		},
	}
}
</script>

<style scoped>
.login-body {
	margin: auto;
	padding: auto;
	background-image: url("./galassia.jpg");
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.login-panel {
	opacity: 40%;
	left: auto;
	top: -140%;
	position: absolute;
}

.login-content {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.login-input-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.login-input-wrapper input {
	text-align: center;

}
</style>