<template>

</template>
<script>
import myfetch from '../utils/fetch'
export default {
  props: {
    filmId: String
  },
  methods: {
    postComment (rating, message) {
      myfetch('post', '/add_comment', data = { 'filmId': filmId, 'text': message, 'rating': rating })
        .then(_ => {
          this.loadingadd = false
          this.dialog = false
          this.$store.commit('animcheck', true)
          this.$store.commit('addSnack', {
            text: 'Comment successfully added'
          }))
        .catch(exception => {
          this.loadingadd = false
          this.dialog = false
          this.$store.commit('animfail', true)
          this.$store.commit('addSnack', {
            text: 'Comment is already added',
            color: 'error'
          })
        }).finally(_ => {
        })
    }
  },
  data () {
    return {
      dialog: false,
      loading: false
    }
  }
}
</script>
