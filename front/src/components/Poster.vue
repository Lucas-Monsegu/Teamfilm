<template>
    <v-menu
        v-if="path"
        open-on-hover
        offset-x
        offset-y
        top
        eager
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
                    @error="errorImage"
                />
            </v-responsive>
        </template>

        <div>
            <v-img
                :key="path"
                eager
                max-width="342"
                :src="`https://image.tmdb.org/t/p/w342${path}`"
                :lazy-src="`https://image.tmdb.org/t/p/w92${path}`"
            >
                <template v-slot:placeholder>
                    <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                    >
                        <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                        ></v-progress-circular>
                    </v-row>
                </template>
            </v-img>
        </div>
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
        },
        id: {
            type: Number
        }
    },
    methods: {
        errorImage (errorCode) {
            this.$store.dispatch('updatePoster', this.id)
        }
    }
}
</script>
