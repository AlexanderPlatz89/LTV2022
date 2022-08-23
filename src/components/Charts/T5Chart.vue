<template>
    <h5 style="margin-top: 0.5em; text-align: center; background-color: rgba(128, 128, 128, 0.19); border: 4px solid rgba(0, 255, 238, 0.474)">T5</h5>
    <Chart type="line" :data="outputT5" :options="chartCSS" />
</template>

<script>

import { ref } from 'vue';

export default {
    created() {
        this.outputT5.datasets[0].data = this.$filters.deepClone(this.productionData)
        this.outputT5.labels = this.$filters.deepClone(this.timeList)
        this.outputT5.datasets[1].data = this.$filters.deepClone(this.plannedProductionList)
        setInterval(this.setDataChart, 2500)
    },
    setup() {
        const outputT5 = ref(
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
        return { outputT5, chartCSS }
    },
    data() {
        return {
            timeList: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'],
            time: 12,
            day: 1,
            productionData: [2400, 7500, 1500, 10000, 12000, 5000, 2300],
            plannedProductionList: [4500, 4500, 4500, 4500, 4500, 4500, 4500]
        }
    },
    methods: {
        setDataChart() {
            let production = Math.floor(Math.floor(Math.random() * 9000) + 1000)
            let plannedProduction = 4500
            this.time = this.time + 1
            if (this.time > 23) this.time = 0
            if(this.day == 0 || this.time == 0)this.day = this.day + 1
            if(this.day == 6)this.day = 1
            let timeString = this.time <= 9 ? '0' + this.time.toString() + ':00' : this.time.toString() + ':00'
            this.timeList.push(timeString)
            this.productionData.push(production)
            this.plannedProductionList.push(plannedProduction)
            this.productionData.shift()
            this.timeList.shift()
            this.plannedProductionList.shift()
            this.outputT5.datasets[0].data = this.$filters.deepClone(this.productionData)
            this.outputT5.labels = this.$filters.deepClone(this.timeList)
            this.outputT5.datasets[1].data = this.$filters.deepClone(this.plannedProductionList)
        }
    },
}
</script>

<style scoped lang="scss">
</style>