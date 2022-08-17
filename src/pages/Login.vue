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

			<Button label="Sign In" @click="authenticate"/>
		</div>
	</div>
</template>

<script>

	export default {
    data() {
      return {
        username: null,
        password: null
      }
    },
		methods: {
      authenticate(){
          this.$router.push({ path: '/produzione' });
			}
		}
	}
</script>

<style scoped>

</style>