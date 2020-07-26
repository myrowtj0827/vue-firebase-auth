<template>
    <div id="app">
        <div class="w3-row bg-transparent">
            <div class="container">
                <router-link to="/" class="w3-col m8 w3-hover-grey w3-yellow w3-text-cyan" id="logo">
                    <h6 style="text-align: center;">My Vue-Firebase</h6></router-link>
                <div v-if="user.loggedIn" class="w3-col m4 w3-hover-blue w3-yellow w3-text-cyan">
                    <div>
                        <div class="w3-col m6 w3-hover-red w3-yellow w3-text-cyan">
                            <router-link to="profile">
                                <h6 style="text-align: center;">{{user.data.displayName}}</h6>
                            </router-link>
                        </div>
                        <div class="w3-col m6 w3-hover-red w3-yellow w3-text-cyan">
                            <a @click.prevent="signOut"><h6 style="text-align: center;">Sign out</h6></a>
                        </div>
                    </div>
                </div>
                <div v-else style="display: inline-block;" class="w3-col m4 w3-hover-grey w3-yellow w3-text-cyan">
                    <div class="w3-col m6 w3-hover-red w3-yellow w3-text-cyan">
                        <router-link to="login"><h6 style="text-align: center;">Log in</h6></router-link>
                    </div>
                    <div class="w3-col m6 w3-hover-red w3-yellow w3-text-cyan">
                        <router-link to="signup"><h6 style="text-align: center;">Sign up</h6></router-link>
                    </div>

                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import firebase from 'firebase'

    export default {
        name: 'app',
        computed: {
            ...mapGetters({
                user: 'user'
            })
        },
        methods: {
            signOut() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.$router.replace({
                            name: 'home'
                        })
                    })
            }
        }
    }
</script>

<style>

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
