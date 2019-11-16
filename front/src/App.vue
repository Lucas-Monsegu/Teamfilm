<template>
  <v-app>
    <Bar />
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Bar from './components/Bar.vue'
export default {
  name: 'App',
  components: {
    Bar
  },
  mounted () {
    this.$store.dispatch('auth')
  }
}
</script>

<style>
html {
  overflow-y: auto !important;
}
</style>
