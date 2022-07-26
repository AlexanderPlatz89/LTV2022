<template>
  <Tag :value="label" :severity="severity"/>
</template>

<script>

export default {
  data() {
    return {
      STATUS_MAP: {
        INSERITO: {label: "inserito", severity: "info"},
        DA_LAVORARE: {label: "da lavorare", severity: "danger"},
        IN_LAVORAZIONE: {label: "in lavorazione", severity: "warning"},
        LAVORATO: {label: "lavorato", severity: "success"}
      }
    }
  },
  props: {
    status: {
      type: String,
      required: true
    }
  },
  computed: {
    label() {
      return this.STATUS_MAP[this.status].label
    },
    severity() {
      return this.STATUS_MAP[this.status].severity
    }
  }

}
</script>

<style scoped lang="scss">
</style>
