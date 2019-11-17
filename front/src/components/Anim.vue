<template>
  <div id="anim">
    <v-overlay
      :value="overlay"
      opacity="1"
    >
      <lottie
        :options="defaultOptions"
        :height="800"
        :width="800"
        v-on:animCreated="handleAnimation"
      />
    </v-overlay>
  </div>
</template>

<script>
import Lottie from 'vue-lottie'
import * as animationData from '../assets/anims/teamfilm.json'

export default {
  name: 'anim',
  components: {
    'lottie': Lottie
  },
  data () {
    return {
      overlay: false,
      defaultOptions: {
        autoplay: true,
        loop: false,
        animationData: animationData.default
      },
      animationSpeed: 1
    }
  },
  mounted () {
    this.handleAnimation()
    this.play()
  },
  methods: {
    handleAnimation (anim) {
      this.anim = anim
      this.stop()
      this.play()
      console.log('handle')
    },

    stop () {
      this.anim.stop()
    },

    play () {
      this.overlay = true
      this.anim.play()
    },

    pause () {
      this.anim.pause()
    },

    onSpeedChange () {
      this.anim.setSpeed(this.animationSpeed)
    }
  }
}
</script>

<style>
#anim {
  position: fixed;
}
</style>
