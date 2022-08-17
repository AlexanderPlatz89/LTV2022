<template>
	<div class="login-body">
    <Toast/>
		<div class="login-panel"></div>

		<div class="login-content">
			<img src="layout/images/logo-black.png" alt="babylon-layout"/>

			<h1><span>SIGN IN</span> TO BABYLON</h1>
			<p>Welcome, please use the form to sign-in.</p>

			<div class="login-input-wrapper">
				<InputText placeholder="Username" v-model="username"/>
				<i class="pi pi-user"></i>
			</div>

			<div class="login-input-wrapper">
				<InputText type="password" v-model="password" placeholder="Password"/>
				<i class="pi pi-lock"></i>
			</div>

			<Button label="Sign In" @click="authenticate()"/>
		</div>
	</div>
</template>

<script>

	export default {
		async created(){
			this.machinseDB = await this.createMachinesDB()
		},
    data() {
      return {
        username: null,
        password: null,
		operatorsDB: null,
		machinesDB: null
      }
    },
		methods: {
    authenticate(){
          this.$router.push({ path: '/dashboard' });
	},
	async createOperatorsDB() {
      return new Promise((resolve, reject) => {
        if (this.operatorsDB) {
          resolve(this.operatorsDB)
        }

        let request = window.indexedDB.open('operatorsDB', 1)

        request.onerror = event => {
          console.error('ERROR: Unable to open database', event)
          reject('Error')
        }

        request.onsuccess = event => {
          this.operatorsDB = event.target.result
          resolve(this.operatorsDB)
        }

        request.onupgradeneeded = event => {
          let operatorsDB = event.target.result
          operatorsDB.createObjectStore('operatorsOfRotary', {
            autoIncrement: true,
            keyPath: 'id'
          })
                    operatorsDB.createObjectStore('operatorsOfFlatStamp', {
            autoIncrement: true,
            keyPath: 'id'
          })
               operatorsDB.createObjectStore('operatorsOfLegatory', {
            autoIncrement: true,
            keyPath: 'id'
          })
        }
      })
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
		}
	}
</script>

<style scoped>

</style>