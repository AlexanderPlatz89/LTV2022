<template>
	<div class="layout-dashboard">
    <h1>Macchine: {{macchine}}</h1>
		<div class="grid">
      <Macchina v-for="macchina of macchine" :key="macchina.id" :macchina="macchina"/>
			<div class="col-12">
        <Lavorazione @refresh="refresh()"/>
      </div>
    </div>
	</div>
</template>

<script>
import axios from 'axios';
import Macchina from "@/components/Produzione/Macchina";
import Lavorazione from "@/components/Produzione/Lavorazione";

export default {
  components:{
    Macchina,
    Lavorazione
  },
	data() {
		return {
      macchine: null
    }
	},
	created() {
	},
	mounted() {
    this.getMachines()
	},
	methods: {
    getMachines(){
      axios.get('https://my-json-server.typicode.com/AlexanderPlatz89/macchine').then(response => {
        this.macchine = response
      })
    },
    refresh(){
      this.$store.dispatch("macchina/macchine")
    }
	},
}
</script>

<style scoped lang="scss">

</style>
