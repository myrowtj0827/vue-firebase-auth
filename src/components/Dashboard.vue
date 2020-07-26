<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Dashboard</div>
                    <div class="card-body">
                        <div v-if="user" class="alert alert-success" role="alert">You are logged in!</div>
                    </div>
                    <div class="card-body" style="padding-top: 0px;">
                        <div class="alert alert-danger" v-for="user in users" v-bind:key="user.id">
                            <span style="margin-right: 50px;">Name: {{user.name}}</span>
                            <span>E-mail: {{user.email}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                users: [],
                message: ''
            }
        },

        computed: {
            // map `this.user` to `this.$store.getters.user`
            ...mapGetters({
                user: 'user'
            })
        },

        mounted() {
            this.$db
                .collection('users')
                .get()
                .then(snap => {
                    snap.forEach(doc => {
                        this.users.push({id: doc.id, name: doc.data().name, email: doc.data().email})
                    })
                })
        }
    }
</script>
