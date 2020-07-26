<template>
    <div class="container">
        <div><h3 style="background-color: bisque">Login</h3></div>
        <div>
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form class="card-body green--text" action="#" @submit.prevent="submit" v-show="!emailAuthed">
                <div class="w3-row">
                    <label for="email" class="font-weight-bolder">Email</label>
                    <div>
                        <input id="email" type="email" class="form-control" name="email"
                                value required autofocus v-model="form.email"/>
                    </div>
                </div>
                <div v-show="!emailAuthed">
                    <label for="password">Password</label>
                    <div>
                        <input id="password" type="password" class="form-control" name="password"
                                required v-model="form.password"/>
                    </div>
                </div>
                <div v-show="!emailAuthed">
                    <div>
                        <button type="submit" class="btn btn-warning" style="margin-top: 20px">Login</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    export default {
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                    phoneNumber: null,
                    code: ''
                },
                error: null,
                emailAuthed: false,
                sentPhoneNumber: false
            }
        },
        mounted() {
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
                'recaptcha-container',
                {
                    size: 'normal'
                }
            )
        },
        methods: {
            submit() {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.form.email, this.form.password)
                    .then(() => {
                        this.emailAuthed = true
                        this.$router.replace('/profile')
                    },
                        (err) => {
                            this.error = err.message
                        }
                    )
            }
        }
    }
</script>

<style>
    .card-body {
        padding: 30px;
    }
</style>
