<template>
  <div>
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      class="mx-4"
      hide-details
      label="What movie did you watch ?"
      no-data-text="No match"
      item-text="title"
      item-value="id"
      outlined
      shaped
      no-filter
      auto-select-first
    >
      <template v-slot:item="{ item }">
        <template>
          <v-list-item-avatar tile>
            <v-img
              v-if="item.poster_path"
              :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`"
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      items: [],
      search: null,
      select: null
    }
  },
  watch: {
    search (val) {
      if (val) { this.querySelections(val) } else { this.items = [] }
    }
  },
  methods: {
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
