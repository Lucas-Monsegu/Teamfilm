<template>
  <v-btn
    fab
    icon
    @click=click
  >
    <v-avatar>
      <v-img
        contain
        :style='style'
        :src="this.opened ? '/clapboard_v3_closed.svg' : '/clapboard_v3_opened.svg'"
      />
    </v-avatar>
  </v-btn>
</template>
<script>
export default {
  methods: {
    click () {
      console.log(this.opened)
      if (this.opened) {
        return
      }
      this.opened = !this.opened
      setTimeout(_ => { this.opened = !this.opened }, 1000)
    }
  },
  computed: {
    style () {
      return {
        transform: `rotate(${!this.opened ? '-7' : '0'}deg)`
      }
    }
  },
  data () {
    return {
      opened: false
    }
  }
}
</script>
