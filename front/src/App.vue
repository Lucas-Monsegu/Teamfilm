<template>
  <v-app>
    <Animations />
    <Bar />
    <v-content id="content">
      <v-img
        src="/curtain.svg"
        id="leftc"
        class="curtain"
      />
      <v-img
        src="/curtain.svg"
        id="rightc"
        class="curtain"
      />
      <v-container fluid>
        <v-fade-transition
          mode="out-in"
          duration="150"
        >
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Bar from './components/Bar.vue'
import axios from 'axios'
import Cookie from 'vue-cookie'
import Animations from '@/components/Animations.vue'

export default {
  name: 'App',
  components: {
    Bar,
    Animations
  },
  created () {
    axios.interceptors.response.use(
      response => response,
      error => {
        const status = error.response && error.response.status ? error.response.status : null
        if (status && status === 401) {
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
    this.$store.dispatch('auth')
  },
  mounted () {
    if (!Cookie.get('anim')) {
      Cookie.set('anim', 'yeaaaaah', { expires: '1D' })
      this.$store.commit('animteamfilm', true)
    }
  }
}
</script>

<style>
html {
  height: 100%;
  overflow-y: auto !important;
}
#app {
  background: radial-gradient(
    circle,
    rgba(15, 51, 63, 1) 0%,
    rgba(8, 8, 9, 1) 100%,
    rgba(0, 0, 0, 1) 100%
  );
}
#leftc {
  left: 0;
}
#rightc {
  transform: scaleX(-1);
  right: 0;
}
.curtain {
  position: absolute;
  top: 0;
  width: 225px;
  height: 750px;
}
</style>
