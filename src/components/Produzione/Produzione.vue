<template>
	<div class="layout-dashboard">
		<div class="grid">
      <Macchina v-for="macchina of macchine" :key="macchina.id" :macchina="macchina"/>
			<div class="col-12">
        <Lavorazione @refresh="refresh()"/>
      </div>
    </div>
	</div>
</template>

<script>

import Macchina from "@/components/Produzione/Macchina";
import Lavorazione from "@/components/Produzione/Lavorazione";

export default {
  components:{
    Macchina,
    Lavorazione
  },
	data() {
		return {
    }
	},
	created() {
	},
	mounted() {
	},
	methods: {
    refresh(){
      this.$store.dispatch("macchina/macchine")
    }
	},
  computed: {
    macchine(){
      return this.$store.getters['macchina/macchine']
    }
  }
}
</script>

<style scoped lang="scss">

</style>
