<template>
  <div>
    <v-app-bar
      color="#C32430"
      dark
      dense
    >
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-app-bar-nav-icon
            class="ma-0"
            v-on="on"
            to="/"
          >
            <v-icon>mdi-home</v-icon>
          </v-app-bar-nav-icon>
        </template>
        Home
      </v-tooltip>

      <v-tooltip
        bottom
        nudge-top="26"
      >
        <template #activator="{ on }">
          <v-toolbar-title
            class="mt-1"
            @click="$store.commit('animteamfilm', true)"
            v-on="on"
            id="title"
          >
            TeamFilm
          </v-toolbar-title>
        </template>
        Animate !
      </v-tooltip>

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
        v-else-if="$store.getters.loggedIn"
      >
        <v-avatar>
          <v-img :src="$store.getters.user.avatar"></v-img>
        </v-avatar>
      </v-btn>
      <v-btn
        outlined
        v-else
        text
        @click="login"
      >
        Sign in
        <v-icon right>mdi-login</v-icon>
      </v-btn>
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
#title {
  cursor: pointer;
}
</style>
