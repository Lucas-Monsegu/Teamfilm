<template>
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
          <v-img
            v-else
            src="https://picsum.photos/id/11/100/60"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}<span class="grey--text text--lighten-1"> {{ new Date(item.release_date).getFullYear() }}</span></v-list-item-title>
          <v-list-item-subtitle>{{ item.overview }}</v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      search2: '',
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
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
