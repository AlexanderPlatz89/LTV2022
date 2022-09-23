<template>
    {{ Number(Number(isNaN(value) ? 0 : value).toFixed(precision)).toLocaleString() }}
</template>
<script>
import gsap from "gsap";
export default {
    name: "AnimatedNumber",
    props: {
        valueOriginal: {
            type: Number,
            required: true
        },
        precision: {
            type: Number,
            required: true
        },
        ease: {
            type: String,
            default: 'circ.out'
        },
        duration: {
            type: Number,
            default: 2
        }
    },
    mounted() {
        this.animateValue(this.valueOriginal)
    },
    data() {
        return {
            value: 0
        }
    },
    watch: {
        valueOriginal(newValue) {
            this.animateValue(newValue)
        }
    },
    methods: {
        animateValue(newValue) {
            gsap.to(this.$data, {
                duration: this.duration,
                ease: this.ease,
                value: newValue
            })
        }
    },
}
</script>
<style scoped>
</style>