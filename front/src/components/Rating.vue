<template>
    <v-row
        v-if="rating > -1"
        align="center"
    >
        <v-rating
            v-model="rating"
            color="yellow darken-3"
            background-color="grey darken-1"
            half-increments
            readonly
            dense
        ></v-rating>
        <v-chip small>{{ Math.round(rating * 100) / 100 }} / 5</v-chip>
    </v-row>
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
