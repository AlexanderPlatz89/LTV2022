<template>
  <div class="col-6 md:col-4 lg:col-3 xl:col-2">
    <div :class="'overview-box tipologia-'+macchina.tipo ">
      <span class="overview-title">{{macchina.codice}}</span>
      <div class="overview-subtitle">
        {{macchina.descrizione}}
      </div>
      <template v-if="!$filters.isEmpty(macchina.lavorazioni)">
        <div class="overview-subinfo" v-for="lavorazione of macchina.lavorazioni" v-bind:key="lavorazione.id">
          <b style="font-size: .8em;">{{ prodotto(lavorazione).codice}}</b> <i style="font-size: .8em;">{{lavorato(lavorazione)+"/"+target(lavorazione)}}</i>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

export default {
	data() {
		return {
		}
	},
  props: {
    macchina: {
      type: Object,
      required: true
    }
  },
	created() {
	},
	mounted() {
	},
	methods: {
    prodotto(lavorazione){
      if(lavorazione != null && lavorazione.rigaCommessa != null){
        return lavorazione.rigaCommessa.prodotto
      }
      return null
    },
    target(lavorazione){
      if(lavorazione != null && lavorazione.quantita != null){
        return lavorazione.quantita
      }
      return 0
    },
    lavorato(lavorazione){
      if(lavorazione != null && lavorazione.produzioni != null){
        return lavorazione.produzioni.reduce((a,b) => a + b.quantita, 0)
      }
      return 0
    }
	}
}
</script>

<style scoped lang="scss">
.overview-box{
  &.tipologia-CONTROLLO_NUMERICO{
    border-left: 3px solid red;
    background: #fff;
    color: #494957;
    .overview-subinfo{
      border-color: red;
    }
  }
  &.tipologia-2{
    border-left: 3px solid blue;
    background: #fff;
    color: #494957;
    .overview-subinfo{
      border-color: blue;
    }
  }
  &.tipologia-3{
    border-left: 3px solid green;
    background: #fff;
    color: #494957;
    .overview-subinfo{
      border-color: green;
    }
  }
}
.overview-title{

}
.overview-subtitle{

}
</style>
