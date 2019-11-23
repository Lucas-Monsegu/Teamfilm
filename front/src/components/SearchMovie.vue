<template>
  <v-dialog v-model="dialog">
    <template #activator="{ on }">
      <v-btn
        v-if="$store.getters.loggedIn"
        class="mr-2"
        v-on="on"
        outlined
        @click="focus()"
      >
        Add film
        <v-icon right>mdi-plus-circle-outline</v-icon>
      </v-btn>
      <v-btn
        v-else
        class="mr-2"
        outlined
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
      <template #append>
        <v-img
          max-width="100"
          contain
          src="https://www.themoviedb.org/assets/2/v4/logos/powered-by-rectangle-blue-61ce76f69ce1e4f68a6031d975df16cc184d5f04fa7f9f58ae6412646f2481c1.svg"
        />
      </template>
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
        v-show="select"
        :disabled="loadingadd"
        color="#C32430"
        class="ma-2 white--text"
        @click="add"
        id="addfilm"
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
      select: null,
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
          this.$store.commit('addSnack', {
            text: 'Film successfully added'
          })
        })
        .catch(exception => {
          this.loadingadd = false
          this.dialog = false
          this.$store.commit('animfail', true)
          this.$store.commit('addSnack', {
            text: 'This film is already added',
            color: 'error'
          })
        })
        .finally(_ => {
          this.$store.dispatch('getList')
          this.select = null
        })
    },
    gologin () {
      this.$store.commit('addSnack', {
        text: 'You need to be logged in to add a film',
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
#addfilm {
  position: absolute;
}
#app > div.v-dialog__content.v-dialog__content--active > div {
  overflow-y: hidden !important;
}
</style>
