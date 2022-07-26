<template>
  <div>
    <div class="card">
      <h1>{{macchina}}</h1>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      macchina: null,
    }
  },
  mounted() {
    this.getMacchinaFromId()
  },
  methods: {
    getMacchinaFromId() {
      const id = Number(this.$route.params.id);
      if(id != null){
        this.macchina = this.macchine.find(macchina => Number(macchina.id) === Number(id))
      }
    }
  },
  computed: {
    macchine() {
      return this.$store.getters['macchina/macchine'];
    }
  }
}
</script>

<style lang="scss" scoped>
</style>