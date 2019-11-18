<template>
  <v-overlay
    :value="overlay"
    opacity="1"
    id="anim"
  >
  </v-overlay>
</template>

<script>
import Lottie from 'lottie-web'
import Cookie from 'vue-cookie'
import * as animationData from '../assets/anims/teamfilm.json'

export default {
  name: 'anim',
  data () {
    return {
      overlay: false,
      anim: null
    }
  },
  watch: {
    paused (isPaused) {
      if (isPaused) {
        this.overlay = false
        Lottie.stop()
      }
    }
  },
  computed: {
    paused () {
      return this.anim ? this.anim.isPaused : null
    }
  },
  mounted () {
    if (!Cookie.get('anim')) {
      this.overlay = true
      Cookie.set('anim', 'yeaaaaah', { expires: '1D' })
      this.anim = Lottie.loadAnimation({
        container: document.getElementById('anim'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: animationData.default
      })
      Lottie.play()
    }
  }
}
</script>
