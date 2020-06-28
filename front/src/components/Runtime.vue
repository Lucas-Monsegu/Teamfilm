<template>
    <div>
        {{ toHours }}
    </div>
</template>
<script>
export default {
    props: {
        runtime: {
            type: Number
        }
    },
    computed: {
        toHours () {
            let h = Math.floor(this.runtime / 60)
            let m = (this.runtime % 60).toString().padStart(2, '0')
            return `${h}h${m}`
        }
    }

}
</script>
