<template>
  <v-overlay
    :value="overlay"
    :opacity="opacity"
    :z-index="10"
  >
    <div
      id="anim"
      :style="style"
    />
  </v-overlay>
</template>

<script>
import Lottie from 'lottie-web'

export default {
  props: {
    name: {
      type: String,
      default: 'check'
    },
    width: Number,
    height: Number,
    speed: {
      type: Number,
      default: 1
    },
    opacity: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      overlay: false,
      anim: null,
      style: {
        width: this.width ? `${this.width}px` : '100%',
        height: this.height ? `${this.height}px` : '100%'
      }
    }
  },
  watch: {
    paused (isPaused) {
      if (isPaused) {
        this.overlay = false
        Lottie.destroy()
      }
    },
    state (play) {
      if (play) {
        this.play()
        this.$store.commit(this.statename, false)
      }
    }
  },
  computed: {
    paused () {
      return this.anim ? this.anim.isPaused : null
    },
    state () {
      return this.$store.getters[this.statename]
    },
    statename () {
      return `anim${this.name}`
    }
  },
  methods: {
    play () {
      this.overlay = true
      setTimeout(_ => {
        this.anim = Lottie.loadAnimation({
          container: document.getElementById('anim'),
          renderer: 'svg',
          loop: false,
          autoplay: false,
          path: `/anims/${this.name}.json`
        })
        Lottie.setSpeed(this.speed)
        Lottie.play()
      })
    }
  }
}
</script>
