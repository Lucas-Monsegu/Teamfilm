<template>
  <div>
    <v-app-bar
      color="#C32430"
      dark
      dense
      elevate-on-scroll
      fixed
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
        nudge-top="2"
      >
        <template #activator="{ on }">
          <v-toolbar-title
            class="mt-1 font-weight-black px-2"
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

      <div v-if="!$store.getters.user">
        <v-avatar>
          <v-skeleton-loader
            ref="skeleton"
            type="avatar"
          ></v-skeleton-loader>
        </v-avatar>
        <v-avatar>
          <v-skeleton-loader
            ref="skeleton"
            type="avatar"
          ></v-skeleton-loader>
        </v-avatar>
      </div>
      <div v-else-if="$store.getters.loggedIn">
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              icon
              class="ma-0"
              v-on="on"
            >
              <v-avatar size=40>
                <v-img :src="$store.getters.user.avatar"></v-img>
              </v-avatar>
            </v-btn>
          </template>
          {{ $store.getters.user.name }}
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              icon
              v-on="on"
              @click="$store.dispatch('logout', true)"
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          Log out
        </v-tooltip>
      </div>
      <v-btn
        outlined
        v-else
        @click="login"
      >
        Log in
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
@font-face {
  font-family: "Blacksword";
  src: url("~@/assets/fonts/Blacksword.otf");
}
.v-toolbar__title {
  font-family: "Blacksword";
  font-size: 2rem !important;
}
#title {
  cursor: pointer;
}
</style>
