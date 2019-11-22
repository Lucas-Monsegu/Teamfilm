<template>
  <v-card>
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
            <!-- <v-chip pill>
              <v-avatar left>
                <v-img :src="$store.getters.user.avatar" />
              </v-avatar>
              {{ $store.getters.user.name }}
            </v-chip> -->
            <v-col cols="auto">
              <v-avatar size="40">
                <v-img
                  class="elevation-6"
                  :src="comment.avatar"
                ></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="auto">
              <span class="body-1">
                {{ comment.name }}
              </span>
            </v-col>
          </v-row>
          <v-row
            justify="center"
            class='px-4'
          >
            <v-rating
              v-model="comment.rating"
              color="yellow darken-3"
              background-color="grey darken-1"
              half-increments
              hover
              clearable
              readonly
              dense
            ></v-rating>
          </v-row>
        </v-col>
        <v-divider vertical />
        <v-col>
          <p>
            {{ comment.message }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    comment: Object
  }
}
</script>
