<template>
  <v-app>
    <Bar />
    <v-content id="content">
      <v-container fluid>
        <v-scroll-x-reverse-transition
          mode="out-in"
          duration="300"
        >
          <router-view />
        </v-scroll-x-reverse-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Bar from './components/Bar.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Bar
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
  }
}
</script>

<style>
html {
  height: "100%";
  overflow-y: auto !important;
}
/* .v-content__wrap {
  background-color: #577280 !important;
} */
</style>
