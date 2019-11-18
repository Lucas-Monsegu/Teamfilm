<template>
  <div>
    <v-app-bar
      color="teal darken-3"
      dark
      dense
    >
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-app-bar-nav-icon
            to="/"
            class="ma-0"
            v-on="on"
          >
            <v-icon>
              mdi-video-vintage
            </v-icon>
          </v-app-bar-nav-icon>
        </template>
        Home
      </v-tooltip>

      <v-toolbar-title class="pt-1">TeamFilm</v-toolbar-title>

      <v-spacer></v-spacer>

      <SearchMovie />

      <v-btn
        tile
        icon
        class="ma-0"
        v-if="!$store.getters.user"
      >
        <v-avatar>
          <v-skeleton-loader
            ref="skeleton"
            type="avatar"
          ></v-skeleton-loader>
        </v-avatar>
      </v-btn>
      <v-btn
        icon
        class="ma-0"
        v-else-if="Object.keys($store.getters.user).length > 0"
      >
        <v-avatar>
          <v-img :src="$store.getters.user.avatar"></v-img>
        </v-avatar>
      </v-btn>
      <v-btn
        v-else
        text
        @click="login"
      >Sign in</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import login from '../utils/login'
import SearchMovie from '@/components/SearchMovie.vue'

export default {
  components: {
    SearchMovie
  },
  methods: {
    login () {
      login(this.$route.path)
    }
  }
}
</script>

<style>
@font-face {
  font-family: "Palace";
  src: url("~@/assets/fonts/PalaceScriptMT.ttf");
}
.v-toolbar__title {
  font-family: "Palace";
  font-size: 4rem !important;
}
</style>
