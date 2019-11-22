<template>
  <v-card v-if="$store.getters.loggedIn">
    <v-card-text class="py-0">
      <v-row>
        <v-col cols="auto">
          <v-row justify="center">
            <v-chip pill>
              <v-avatar left>
                <v-img :src="$store.getters.user.avatar" />
              </v-avatar>
              {{ $store.getters.user.name }}
            </v-chip>
          </v-row>
          <v-row justify="center">
            <v-rating
              v-model="rating"
              color="yellow darken-3"
              background-color="grey darken-1"
              half-increments
              hover
              clearable
              dense
            ></v-rating>
          </v-row>
        </v-col>
        <v-divider vertical />
        <v-col>
          <v-textarea
            v-model="comment"
            label="Comments"
            auto-grow
            outlined
            rows="3"
            color="#C32430"
            row-height="25"
            shaped
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import myfetch from '../utils/fetch'
export default {
  data () {
    return {
      dialog: false,
      loading: false,
      rating: 0,
      comment: null
    }
  },
  props: {
    filmId: Number
  },
  methods: {
    postComment (rating, message) {
      myfetch('post', '/add_comment', { 'filmId': this.filmId, 'text': message, 'rating': rating })
        .then(_ => {
          this.loadingadd = false
          this.dialog = false
          this.$store.commit('animcheck', true)
          this.$store.commit('addSnack', {
            text: 'Comment successfully added'
          })
        })
        .catch(exception => {
          this.loadingadd = false
          this.dialog = false
          this.$store.commit('animfail', true)
          this.$store.commit('addSnack', {
            text: 'Comment is already added',
            color: 'error'
          })
        })
    }
  }
}
</script>
