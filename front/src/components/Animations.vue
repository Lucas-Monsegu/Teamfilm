<template>
  <div>
    <Anim
      :width="800"
      :height="800"
      name="teamfilm"
    />
    <Anim
      :width="800"
      :height="800"
      name="check"
      :opacity="0.5"
    />
    <Anim
      :width="200"
      :height="200"
      name="fail"
      :opacity="0.5"
    />
    <Anim
      :width="400"
      :height="400"
      name="delete"
      :opacity="0.9"
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
