<template>
  <div>
    <v-chip
      v-for="genre in genres"
      class="mr-1"
      :key="genre"
      small
      dark
      pill
      label
      :color="get_color(genre)"
    >
      {{genre}}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    genres: {
      type: Array
    }
  },
  methods: {
    get_color (genre) {
      return this.available_genres[genre] === undefined ? '#999999' : this.available_genres[genre]
    }
  },
  data () {
    return {
      available_genres: {
        'Action': 'blue lighten-1',
        'Adventure': 'green lighten-1',
        'Animation': 'deep-orange ',
        'Comedy': 'deep-purple accent-2',
        'Crime': 'red accent-4',
        'Documentary': 'indigo darken-1',
        'Drama': 'lime darken-3',
        'Family': 'red lighten-1',
        'Fantasy': 'pink darken-1',
        'History': 'green darken-4',
        'Horror': 'grey darken-4',
        'Music': 'purple accent-4',
        'Mystery': 'blue-grey lighten-1',
        'Romance': 'red accent-3',
        'Science Fiction': 'light-blue darken-3',
        'TV Movie': 'brown darken-2`',
        'Thriller': 'teal darken-1',
        'War': 'grey darken-1',
        'Western': 'yellow darken-4' }
    }
  }
}
</script>
