<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        xs="12"
        lg="10"
        xl="8"
      >
        <v-card>
          <v-card-title class="d-block text-center display-3">
            {{ this.title || 'Loading...'}}
          </v-card-title>
          <v-card-text>
            <v-row
              justify="center"
              align="start"
            >
              <v-col
                cols="auto"
                class="pb-0"
              >
                <v-img
                  eager
                  v-if="poster_path"
                  max-width="342"
                  :src="`https://image.tmdb.org/t/p/w342${poster_path}`"
                  lazy-src="https://picsum.photos/id/861/342/513"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <v-img
                  eager
                  v-else
                  max-width="342"
                  src="https://picsum.photos/id/861/342/513"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
              <v-col class="pb-0">
                <v-row
                  justify="space-between"
                  class="mb-3"
                >
                  <v-col
                    cols="auto"
                    class="pa-0"
                  >
                    <v-card height="100%">
                      <v-card-title class="subtitle-1 d-block pb-0 text-center text-truncate">
                        TeamFilm's rating
                      </v-card-title>
                      <v-card-text>
                        <Average :rating="rating" />
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col
                    cols="auto"
                    class="pa-0"
                  >
                    <v-card height="100%">
                      <v-card-title class="subtitle-1 d-block pb-0 text-center text-truncate">
                        TMDb's rating
                      </v-card-title>
                      <v-card-text>
                        <Average :rating="vote_average / 2" />
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-card>
                    <v-card-title class="headline d-block-inline text-truncate">
                      Overview
                      <v-spacer />
                      <Genres :genres="genres" />
                    </v-card-title>
                    <v-card-text class="body-1">
                      {{ overview }}
                    </v-card-text>
                  </v-card>
                </v-row>
              </v-col>
              <v-col
                cols="auto"
                class="pb-0"
              >
                <v-card>
                  <v-card-title class="subtitle-1 d-block pb-0 text-truncate">
                    Release date
                  </v-card-title>
                  <v-card-text>
                    {{ getDate }}
                  </v-card-text>
                  <v-divider light />
                  <v-card-title class="subtitle-1 d-block pb-0 text-truncate">
                    Runtime
                  </v-card-title>
                  <v-card-text>
                    {{ getRuntime }}
                  </v-card-text>
                  <v-divider light />
                  <v-card-title class="subtitle-1 d-block pb-0 text-truncate">
                    Language
                  </v-card-title>
                  <v-card-text class="text-uppercase">
                    {{ language }}
                  </v-card-text>
                  <v-divider light />
                  <v-card-title class="subtitle-1 d-block pb-0 text-truncate">
                    Budget
                  </v-card-title>
                  <v-card-text>
                    {{ getBudget }}
                  </v-card-text>
                  <v-divider light />
                  <v-card-title class="subtitle-1 d-block pb-0 text-truncate">
                    Revenue
                  </v-card-title>
                  <v-card-text>
                    {{ getRevenue }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      v-if="$store.getters.loggedIn"
    >
      <v-col
        xs="12"
        lg="10"
        xl="8"
      >
        <AddComment
          @update="updateRating"
          :filmId="id"
        />
      </v-col>
    </v-row>
    <v-row
      justify="center"
      v-for="comment in $store.getters.comments"
      :key="comment.id"
    >
      <v-col
        xs="12"
        lg="10"
        xl="8"
      >
        <Comment :comment="comment" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import myfetch from '../utils/fetch'
import Average from '@/components/Average'
import Genres from '@/components/Genres'
import AddComment from '@/components/AddComment'
import Comment from '@/components/Comment'

export default {
  components: {
    Average,
    Genres,
    AddComment,
    Comment
  },
  computed: {
    getDate () {
      return new Date(this.release_date).getFullYear()
    },
    getRuntime () {
      let h = Math.floor(this.runtime / 60)
      let m = (this.runtime % 60).toString().padStart(2, '0')
      return `${h}h${m}`
    },
    getBudget () {
      if (this.budget <= 0) {
        return 'Unknown'
      }
      return this.formatter.format(this.budget)
    },
    getRevenue () {
      if (this.revenue <= 0) {
        return 'Unknown'
      }
      return this.formatter.format(this.revenue)
    }
  },
  methods: {
    updateRating () {
      const urlTeamFilm = `/get_movie/${this.id}`
      myfetch('get', urlTeamFilm).then(res => {
        const json = res.data
        this.rating = json.rating
      })
    },
    async GetTmdbDatas () {
      const url = `https://api.themoviedb.org/3/movie/${this.id}?api_key=e59fb866a5c3211ad38d145410a3598b&language=en-US`
      fetch(url).then(async res => {
        const json = await res.json()
        const arr = ['budget', 'revenue', 'vote_average', 'overview']
        arr.forEach(prop => {
          this[prop] = json[prop]
        })
      })
      const urlTeamFilm = `/get_movie/${this.id}`
      myfetch('get', urlTeamFilm).then(res => {
        const json = res.data
        const arr = ['genres', 'rating', 'language', 'release_date', 'runtime', 'poster_path', 'title']
        arr.forEach(prop => {
          this[prop] = json[prop]
        })
      })
      this.$store.dispatch('getComments', this.id)
    }
  },
  mounted () {
    this.GetTmdbDatas()
  },
  data () {
    return {
      id: parseInt(this.$route.params.id),
      title: null,
      budget: null,
      revenue: null,
      language: null,
      genres: null,
      vote_average: null,
      poster_path: null,
      release_date: null,
      runtime: null,
      rating: null,
      overview: null,
      formatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      })
    }
  }
}
</script>
