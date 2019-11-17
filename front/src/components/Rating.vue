<template>
  <v-rating
    v-model="rating"
    color="yellow darken-3"
    background-color="grey darken-1"
    half-increments
    readonly
    dense
  ></v-rating>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      default: 0
    }
  }
}
</script>
