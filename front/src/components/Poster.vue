<template>
  <v-menu
    v-if="path"
    open-on-hover
    offset-x
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-responsive
        height="40"
        width="40"
        v-on="on"
      >
        <v-img
          :aspect-ratio="1/1"
          :src="`https://image.tmdb.org/t/p/w92${path}`"
        />
      </v-responsive>
    </template>

    <v-img
      max-width="342"
      :src="`https://image.tmdb.org/t/p/w342${path}`"
    />
  </v-menu>
  <v-responsive
    v-else
    height="40"
  >
    <v-skeleton-loader
      tile
      type="avatar"
    ></v-skeleton-loader>
  </v-responsive>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: null
    }
  }
}
</script>
