<template>
<h5>T4</h5>
		<Chart type="line" :data="outputT4" :options="chartCSS" />
</template>

<script>

import { ref } from 'vue';

export default {
    created() {
    setInterval(this.setDataChart, 2500)
  },
    setup() {
        const outputT4 =  ref(
            {
                labels: [],
                datasets: [
                    {
                        label: 'Produzione reale',
                        data: [],
                        fill: false,
                        borderColor: '#42A5F5',
                        tension: .4
                    },
                    {
                        label: 'Produzione prevista',
                        data: [],
                        fill: false,
                        borderColor: '#FFA726',
                        tension: .4
                    }
                ]
            }
        );
        const chartCSS = ref(
            {
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        }
                    }
                }
            }
        );
        return { outputT4, chartCSS }
    },
    data(){
        return{
        timeList: [],
        time: 0,
        productionData: [],
        plannedProductionList: []
        }
    },
     methods: {
    setDataChart() {
      let production = Math.floor(Math.floor(Math.random() * 9000) + 1000)
      let plannedProduction = 4500
      this.time = this.time+1
      if(this.time > 23) this.time = 0
      let timeString = this.time <= 9 ? '0'+this.time.toString()+':00' : this.time.toString()+':00'
      this.timeList.push(timeString)
      this.productionData.push(production)
      this.plannedProductionList.push(plannedProduction)
      this.outputT4.datasets[0].data = this.$filters.deepClone(this.productionData)
      this.outputT4.labels = this.$filters.deepClone(this.timeList)
      this.outputT4.datasets[1].data = this.$filters.deepClone(this.plannedProductionList)
    }
  },
}
</script>

<style scoped lang="scss">
</style>