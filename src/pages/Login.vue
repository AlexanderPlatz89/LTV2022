<template>
	<div class="login-body">
		<Toast />
		<div class="login-panel"></div>

		<div class="login-content">
			<img src="layout/images/logo-black.png" alt="babylon-layout" />

			<h1><span>SIGN IN</span> TO BABYLON</h1>
			<p>Welcome, please use the form to sign-in.</p>

			<div class="login-input-wrapper">
				<InputText placeholder="Username" v-model="username" />
				<i class="pi pi-user"></i>
			</div>

			<div class="login-input-wrapper">
				<InputText type="password" v-model="password" placeholder="Password" />
				<i class="pi pi-lock"></i>
			</div>

			<Button label="Sign In" @click="authenticate()" />
		</div>
	</div>
</template>

<script>

export default {
	async created() {
		this.machinesDB = await this.createMachinesDB()
		this.workersDB = await this.createWorkersDB()
		this.$store.commit("setMachinesDB", this.machinesDB)
		this.$store.commit("setWorkersDB", this.workersDB)
	},
	data() {
		return {
			username: null,
			password: null,
			machinesDB: null,
			workersDB: null,
		}
	},
	methods: {
		authenticate() {
			this.$router.push({ path: '/dashboard' });
		},
		async createMachinesDB() {
			return new Promise((resolve, reject) => {
				if (this.machinesDB) {
					resolve(this.machinesDB)
				}

				let request = window.indexedDB.open('machinesDB', 1)

				request.onerror = event => {
					console.error('ERROR: Unable to open database', event)
					reject('Error')
				}

				request.onsuccess = event => {
					this.machinesDB = event.target.result
					resolve(this.machinesDB)
				}

				request.onupgradeneeded = event => {
					let machinesDB = event.target.result
					machinesDB.createObjectStore('rotaryMachines', {
						autoIncrement: true,
						keyPath: 'id'
					})
					machinesDB.createObjectStore('flatStampMachines', {
						autoIncrement: true,
						keyPath: 'id'
					})
					machinesDB.createObjectStore('legatoryMachines', {
						autoIncrement: true,
						keyPath: 'id'
					})
				}
			})
		},

		async createWorkersDB() {
			return new Promise((resolve, reject) => {
				if (this.workersDB) {
					resolve(this.workersDB)
				}

				let request = window.indexedDB.open('workersDB', 1)

				request.onerror = event => {
					console.error('ERROR: Unable to open database', event)
					reject('Error')
				}

				request.onsuccess = event => {
					this.workersDB = event.target.result
					resolve(this.workersDB)
				}

				request.onupgradeneeded = event => {
					let workersDB = event.target.result
					workersDB.createObjectStore('rotaryWorkers', {
						autoIncrement: true,
						keyPath: 'id'
					})
					workersDB.createObjectStore('flatStampWorkers', {
						autoIncrement: true,
						keyPath: 'id'
					})
					workersDB.createObjectStore('legatoryWorkers', {
						autoIncrement: true,
						keyPath: 'id'
					})
				}
			})
		},
	}
}
</script>

<style scoped>
</style>