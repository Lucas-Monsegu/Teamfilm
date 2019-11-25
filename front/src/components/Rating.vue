<template>
  <v-rating
    v-if="rating > -1"
    v-model="rating"
    color="yellow darken-3"
    background-color="grey darken-1"
    half-increments
    readonly
    dense
  ></v-rating>
  <span v-else>
    No votes
  </span>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      default: -1
    }
  }
}
</script>
