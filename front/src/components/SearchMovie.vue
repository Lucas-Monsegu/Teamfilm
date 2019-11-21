<template>
  <v-dialog v-model="dialog">
    <template #activator="{ on }">
      <v-btn
        v-if="$store.getters.loggedIn"
        class="mr-2"
        v-on="on"
        outlined
        text
        @click="focus()"
      >
        Add film
        <v-icon right>mdi-plus-circle-outline</v-icon>
      </v-btn>
      <v-btn
        v-else
        class="mr-2"
        outlined
        text
        @click="gologin()"
      >
        Add film
        <v-icon right>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-autocomplete
      ref="complete"
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      hide-details
      label="What film do you wanna add ?"
      hide-no-data
      item-text="title"
      item-value="id"
      solo
      no-filter
      auto-select-first
    >
      <template v-slot:item="{ item }">
        <template>
          <v-list-item-avatar tile>
            <v-img
              v-if="item.poster_path"
              :aspect-ratio="1/1"
              :src="`https://image.tmdb.org/t/p/w92/${item.poster_path}`"
            />
            <v-responsive
              v-else
              height="40"
            >
              <v-skeleton-loader
                tile
                type="avatar"
              ></v-skeleton-loader>
            </v-responsive>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}<span class="grey--text text--lighten-1"> {{ new Date(item.release_date).getFullYear() }}</span></v-list-item-title>
            <v-list-item-subtitle>{{ item.overview }}</v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
    <v-row justify="center">
      <v-btn
        :loading="loadingadd"
        :disabled="loadingadd"
        color="indigo"
        class="ma-2 white--text"
        @click="add"
      >
        Add film<v-icon right>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </v-row>
  </v-dialog>
</template>

<script>
import myfetch from '../utils/fetch'
export default {
  data () {
    return {
      dialog: false,
      loading: false,
      items: [],
      search: null,
      select: '',
      loadingadd: false
    }
  },
  watch: {
    search (val) {
      if (val) { this.querySelections(val) } else { this.items = [] }
    }
  },
  methods: {
    focus () {
      setTimeout(_ => this.$refs['complete'].focus())
    },
    add () {
      this.loadingadd = true
      myfetch('post', `/add_film/${this.select}`)
        .then(_ => {
          this.loadingadd = false
          this.dialog = false
          this.$store.commit('animcheck', true)
        })
        .catch(exception => {
          this.loadingadd = false
          this.dialog = false
          console.log('Error while posting film: ', exception)
          this.$store.commit('animfail', true)
        })
        .finally(_ => {
          this.$store.dispatch('getList')
          this.select = ''
        })
    },
    gologin () {
      this.$store.commit('addSnack', {
        text: 'You need to be signed in to add a film',
        color: 'error'
      })
    },
    async querySelections (v) {
      this.loading = true
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e59fb866a5c3211ad38d145410a3598b&language=en-US&query=${v}&page=1&include_adult=false`)
      const json = await res.json()
      this.items = json.results
      this.loading = false
    }
  }
}
</script>

<style>
#app > div.v-dialog__content.v-dialog__content--active > div {
  box-shadow: none;
}
</style>
