<template>
  <v-container>
    <v-row>
      <v-col
        cols="6"
        offset="3"
      >
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          hide-details
          autofocus
          outlined
          shaped
          dark
        />
      </v-col>
      <v-col class="pl-0">
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              v-on="on"
              icon
              large
              class="my-2"
              @click="getMovieList"
            >
              <v-icon color='white'>mdi-reload</v-icon>
            </v-btn>
          </template>
          Update films
        </v-tooltip>
      </v-col>
    </v-row>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="films"
        :search="search"
        @click:row="goto"
        :loading="loading"
      >
        <template v-slot:item.genres="{ item }">
          <Genres :genres="item.genres" />
        </template>
        <template v-slot:item.rating="{ item }">
          <Rating />
        </template>
        <template v-slot:item.runtime="{ item }">
          <Runtime :runtime="item.runtime" />
        </template>
        <template v-slot:item.poster_path="{ item }">
          <Poster :path="item.poster_path" />
        </template>
        <template v-slot:item.release_date="{ item }">
          {{ getDate(item.release_date) }}
        </template>
        <template v-slot:no-results>
          <div>
            No matching films, add it to the list !
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import Genres from '@/components/Genres.vue'
import Runtime from '@/components/Runtime.vue'
import Rating from '@/components/Rating.vue'
import Poster from '@/components/Poster.vue'

export default {
  components: {
    Genres,
    Runtime,
    Rating,
    Poster
  },
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: true,
          value: 'title'
        },
        { text: 'Poster', value: 'poster_path' },
        { text: 'Genres', value: 'genres' },
        { text: 'Rating', value: 'rating', sortable: true },
        { text: 'Release', value: 'release_date', sortable: true },
        { text: 'Language', value: 'language' },
        { text: 'Runtime', value: 'runtime' }
      ]
    }
  },
  computed: {
    films () {
      return this.$store.getters.films
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    goto (e) {
      this.$router.push(e.tmdb_id.toString())
    },
    getDate (dateString) {
      return new Date(dateString).getFullYear()
    },
    getMovieList () {
      this.$store.dispatch('getList')
    }
  },
  mounted () {
    this.getMovieList()
  }
}
</script>

<style>
#content
  > div
  > div
  > div
  > div
  > div.v-card.v-sheet.theme--light
  > div
  > div.v-data-table__wrapper
  > table
  > tbody
  > tr,
.v-chip {
  cursor: pointer;
}
.v-data-table__empty-wrapper {
  color: rgba(0, 0, 0, 0.54) !important;
}
</style>
