<template>
    <v-container
        fluid
        fill-height
    >
        <v-row
            justify="center"
            align="center"
        >
            <v-col cols="5">
                <Genres :genres="genres" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Genres from '@/components/Genres.vue'
export default {
    data () {
        return {
            genres: [
                'Action',
                'Adventure',
                'Animation',
                'Comedy',
                'Crime',
                'Documentary',
                'Drama',
                'Family',
                'Fantasy',
                'History',
                'Horror',
                'Music',
                'Mystery',
                'Romance',
                'Science Fiction',
                'TV Movie',
                'Thriller',
                'War',
                'Western'
            ]
        }
    },
    components: {
        Genres
    }
}
</script>
