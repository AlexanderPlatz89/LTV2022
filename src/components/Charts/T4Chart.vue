<template>
    <div class="machine-container" :style="dynamicStyle()">
        <h5 style="margin-top:1em">T4</h5>
    </div>
    <div class="grid" style="padding:1em; text-align: center">
        <div class="col-6" style="border-right: 1px solid grey;"><span>Copie Prodotte: </span></div>
        <div class="col-6"><AnimatedNumber :duration="1" :precision="0" :value-original="parseInt(totalCopies)"/></div>
    </div>
    <Chart type="line" :data="outputT4" :options="chartCSS" />
</template>

<script>

import { ref } from 'vue';
import AnimatedNumber from '../Common/AnimatedNumber.vue'

export default {
    components: {'AnimatedNumber': AnimatedNumber},
    created() {
        this.outputT4.datasets[0].data = this.$filters.deepClone(this.productionData)
        this.outputT4.labels = this.$filters.deepClone(this.timeList)
        this.outputT4.datasets[1].data = this.$filters.deepClone(this.plannedProductionList)
        setInterval(this.setDataChart, 2500)
    },
    setup() {
        const outputT4 = ref(
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
    data() {
        return {
            timeList: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'],
            time: 12,
            day: 1,
            productionData: [3200, 6500, 5500, 8000, 12000, 8000, 5300],
            plannedProductionList: [6500, 6500, 6500, 6500, 6500, 6500, 6500],
            totalCopies: 0
        }
    },
    watch: {
        productionData: {
            handler(){
                this.totalCopies = this.totalCopies + this.productionData[this.productionData.length - 1]
            },
            deep:true
        },
        day() {
            this.$store.commit("setDay", this.day)
        },
        time() {
            this.$store.commit("setTime", this.time)
        }
    },
    methods: {
        dynamicStyle(){
            if(this.productionData[this.productionData.length - 1] > this.plannedProductionList[this.plannedProductionList.length - 1]){
                return 'background-color: #90EE90 !important'
            } else {
                return 'background-color: coral !important'
            }
        },
        setDataChart() {
            let production = Math.floor(Math.floor(Math.random() * 9000) + 1000)
            let plannedProduction = 4500
            this.time = this.time + 1
            if (this.time > 23) this.time = 0
            if (this.day == 0 || this.time == 0) this.day = this.day + 1
            if (this.day == 6) this.day = 1
            let timeString = this.time <= 9 ? '0' + this.time.toString() + ':00' : this.time.toString() + ':00'
            this.timeList.push(timeString)
            this.productionData.push(production)
            this.plannedProductionList.push(plannedProduction)
            this.productionData.shift()
            this.timeList.shift()
            this.plannedProductionList.shift()
            this.outputT4.datasets[0].data = this.$filters.deepClone(this.productionData)
            this.outputT4.labels = this.$filters.deepClone(this.timeList)
            this.outputT4.datasets[1].data = this.$filters.deepClone(this.plannedProductionList)
        }
    },
}
</script>

<style scoped lang="scss">
.machine-container {
    text-align: center;
    border-radius: 2px;
    border-bottom: 1px solid grey;
    height: 4em;
    padding: .35em;
}
</style>