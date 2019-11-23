<template>
  <div>
    <v-expansion-panels
      inset
      focusable
      v-model="opened"
    >
      <v-expansion-panel>
        <v-expansion-panel-header>
          <template v-slot:default="{ open }">
            <v-row
              no-gutters
              justify="center"
            >
              <v-col
                cols="auto"
                v-if="myCom"
              >
                Edit your vote
                <v-icon>mdi-pencil</v-icon>
              </v-col>
              <v-col
                cols="auto"
                v-else
              >
                Make a vote
                <v-icon>mdi-star</v-icon>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content pa-0>
          <v-card-text class="pa-0">
            <v-row
              align="center"
              class="ma-0"
            >
              <v-col cols="auto">
                <v-row
                  justify="center"
                  align="center"
                  dense
                >
                  <v-col cols="auto">
                    <v-avatar size="40">
                      <v-img
                        class="elevation-6"
                        :src="$store.getters.user.avatar"
                      ></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="auto">
                    <span class="body-1">
                      {{ $store.getters.user.name }}
                    </span>
                  </v-col>
                </v-row>

                <v-row
                  justify="center"
                  class='px-4'
                >
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
                  v-model="text"
                  auto-grow
                  outlined
                  rows="3"
                  hide-details
                  color="#C32430"
                  row-height="25"
                  shaped
                  ref="comment"
                ></v-textarea>
              </v-col>
              <v-col
                cols="auto"
                class="pl-0"
              >
                <v-row justify="center">
                  <v-col cols="auto">
                    <v-btn
                      dark
                      color="#C32430"
                      fab
                      small
                      :loading="loading"
                      :disabled="loading"
                      @click="postComment"
                    >
                      <v-icon>mdi-send</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row
                  justify="center"
                  v-if="myCom"
                >
                  <v-col
                    cols="auto"
                    class="pt-0"
                  >
                    <v-btn
                      text
                      icon
                      color="#C32430"
                      @click="deleteComment"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import myfetch from '../utils/fetch'
export default {
  data () {
    return {
      loading: false,
      opened: false,
      text: '',
      rating: 0
    }
  },
  props: {
    filmId: Number
  },
  watch: {
    opened (val) {
      if (val === 0) {
        this.edit()
        setTimeout(_ => {
          this.$refs['comment'].focus()
        }, 100)
      }
    }
  },
  computed: {
    myCom () {
      return this.$store.getters.comments.find(comment => comment.user_id === this.$store.getters.user.id)
    }
  },
  methods: {
    edit () {
      const myCom = this.myCom
      if (myCom) {
        this.text = myCom.message
        this.rating = myCom.rating
      }
    },
    deleteComment () {
      myfetch('delete', '/delete_comment', { 'filmId': this.filmId })
        .then(_ => {
          this.$store.commit('animdelete', true)
          this.$store.commit('addSnack', {
            text: 'Vote successfully deleted'
          })
          this.$store.dispatch('getComments', this.filmId)
          this.opened = false
        }).catch(_ => {
          this.$store.commit('animfail', true)
          this.$store.commit('addSnack', {
            text: 'Error while deleting',
            color: 'error'
          })
        })
    },
    postComment () {
      this.loading = true
      const method = this.myCom ? 'patch' : 'post'
      const path = this.myCom ? '/edit_comment' : '/add_comment'
      const term = this.myCom ? 'edited' : 'added'
      myfetch(method, path, { 'filmId': this.filmId, 'text': this.text, 'rating': this.rating })
        .then(_ => {
          this.loading = false
          this.$store.commit('animcheck', true)
          this.$store.commit('addSnack', {
            text: `Vote successfully ${term}`
          })
          this.opened = false
          this.$store.dispatch('getComments', this.filmId)
        })
        .catch(exception => {
          this.loading = false
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

<style>
#content
  > div
  > div.container.container--fluid
  > div:nth-child(2)
  > div
  > div
  > div
  > div
  > div
  > div {
  padding: 0;
}
</style>
