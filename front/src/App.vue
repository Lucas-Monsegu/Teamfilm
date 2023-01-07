<template>
    <v-app>
        <div id="bg"></div>

        <Snack />
        <Animations />
        <Bar />
        <div id="barspacer" />
        <v-content id="content">
            <v-img
                src="/curtain.svg"
                id="leftc"
                class="curtain"
            />
            <v-img
                src="/curtain.svg"
                id="rightc"
                class="curtain"
            />
            <v-fade-transition
                mode="out-in"
                duration="150"
            >
                <keep-alive include="home">
                    <router-view />
                </keep-alive>
            </v-fade-transition>
        </v-content>
    </v-app>
</template>

<script>
import Bar from './components/Bar.vue'
import axios from 'axios'
import Cookie from 'vue-cookie'
import Animations from '@/components/Animations.vue'
import Snack from '@/components/Snack.vue'
axios.defaults.withCredentials = true
export default {
    name: 'App',
    components: {
        Bar,
        Animations,
        Snack
    },
    created () {
        axios.interceptors.response.use(
            response => response,
            error => {
                const status = error.response && error.response.status ? error.response.status : null
                if (status && status === 401) {
                    this.$store.dispatch('logout', false)
                }
                return Promise.reject(error)
            }
        )
        this.$store.dispatch('auth')
    },
    mounted () {
        if (this.$route.path === '/nwl') {
            this.$store.commit('addSnack', {
                text: 'You need to be whitelisted to logged in',
                color: 'error'
            })
            this.$router.push('/')
        }
        if (!Cookie.get('anim')) {
            Cookie.set('anim', 'yeaaaaah', { expires: '1D' })
            this.$store.commit('animteamfilm', true)
        }
    }
}
</script>

<style>
html {
    height: 100%;
    overflow-y: auto !important;
}
#leftc {
    left: 0;
}
#rightc {
    transform: scaleX(-1);
    right: 0;
}
#bg{
    position: fixed;
    top:0%;
    width:100vw;
    height:100vh;
    background: radial-gradient(
        circle,
        rgba(15, 51, 63, 1) 0%,
        rgba(8, 8, 9, 1) 100%,
        rgba(0, 0, 0, 1) 100%
    );
}
.curtain {
    position: fixed;
    top: 0;
    width: 11vw;
    height: 37vw;
}
#barspacer {
    height: 48px;
}
</style>
