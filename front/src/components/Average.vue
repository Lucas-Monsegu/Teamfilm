<template>
    <div>
        <v-row
            align="center"
            justify="center"
            dense
        >
            <v-rating
                v-model="rating"
                color="yellow darken-3"
                background-color="grey darken-1"
                half-increments
                readonly
                dense
            ></v-rating>
        </v-row>
        <v-row
            align="center"
            justify="center"
            dense
        >
            <v-chip
                v-if="rating !== -1"
                small
            >{{ Math.round(rating * 100) / 100 }} / 5</v-chip>
            <span v-else>
                No votes
            </span>
        </v-row>
    </div>
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
