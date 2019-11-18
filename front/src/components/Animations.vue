<template>
  <div>
    <Anim
      name="teamfilm"
      :opacity="1"
      :speed="1"
    />
    <Anim
      :width="800"
      :height="800"
      name="check"
      :opacity="0.5"
      :speed="1"
    />
  </div>
</template>

<script>
import Anim from '@/components/Anim.vue'

export default {
  components: {
    Anim
  }
}
</script>
