<template>
    <div class="container">
        <div><h3 style="background-color: #5bc0de">Profile</h3></div>
        <div class="w3-col">
            <div class="w3-card-2" align="center" style="color: red">
                <div class="align-center card-body green--text">
                    <img :src="imageUrl" height="150" v-if="imageUrl">
                    <input type="file" style="display: block" ref="image" accept="image/*"
                            v-on:change="onFilePicked"/>
                </div>
                <div class="align-center">
                    Name: <input id="profile-name" type="text" class="w3-hover-amber" v-model="name"/>
                    <br>
                    E-mail: <input id="profile-email" type="text" class="w3-hover-amber" v-model="email"/>
                </div>
            </div>
            <div class="w3-card-2">
                <button v-on:click="save" class="w3-light-green" style="margin-top: 20px">Save</button>
                <div style="margin-top: 20px">
                    <progress :value="uploadProgress" max="100"></progress>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import firebase from 'firebase'

    export default {
        data() {
            return {
                imageName: '',
                imageUrl: '',
                imageFile: '',
                uploadProgress: 0,
                errorMessage: '',
                downloadURL: '',
                name: '',
                email: '',
            }
        },
        computed: {
            // map `this.user` to `this.$store.getters.user`
            ...mapGetters({
                user: 'user'
            })
        },
        mounted() {
            let userUID = firebase.auth().currentUser.uid

            this.$db.collection('users').doc(userUID)
                .get()
                .then((doc) => {
                    this.name = doc.data().name
                    this.email = doc.data().email
                    this.imageName = doc.data().profile_picture

                    let imagePath = 'images/.' + this.imageName
                    this.$storageRef.child(imagePath).getDownloadURL()
                        .then((url) => {
                            let xhr = new XMLHttpRequest()

                            xhr.responseType = 'blob'
                            xhr.onload = () => {
                                // let blob = xhr.response
                            }

                            xhr.open('GET', url)
                            xhr.send()

                            this.imageUrl = url
                        })
                        .catch((error) => {
                            alert(error.message)
                            this.errorMessage = error
                        })

                })
        },
        methods: {
            onFilePicked(e) {
                const files = e.target.files

                if (files[0] !== undefined) {
                    this.imageName = files[0].name

                    if (this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }

                    const fr = new FileReader()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result
                        this.imageFile = files[0]
                    })
                } else {
                    this.imageName = ''
                    this.imageUrl = ''
                    this.imageFile = ''
                }
            },
            save() {
                // Create the file metadata
                const metadata = {
                    contentType: 'image/jpeg'
                }

                // Upload file and metadata to the object 'images/file.jpg'
                let uploadTask = this.$storageRef.child('images/.' + this.imageName).put(this.imageFile, metadata)

                // Listen for state change, errors, and completion of the upload
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    (snapshot) => {
                        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        this.uploadProgress = percentage
                    },
                    (error) => {
                        switch (error.code) {
                            case 'storage/unauthorized':
                                this.errorMessage = 'User has not permission to access the object'
                                break
                            case 'storage/canceled':
                                this.errorMessage = 'User canceled the upload'
                                break
                            case 'storage/unknown':
                                this.errorMessage = 'Unknown error occurred, inspect error.serverResponse'
                        }
                    },
                    () => {
                        this.uploadProgress = 100

                        let userId = firebase.auth().currentUser.uid

                        this.$db.collection('users').doc(userId).update({
                            name: this.name,
                            email: this.email.toLowerCase(),
                            profile_picture: this.imageName
                        })
                            .then(() => {
                                alert('Successful Updated')
                            })
                    })
            }
        }
    }
</script>

<style>
    img {
        width: 200px;
        height: 200px;
        margin-bottom: 20px;
    }

    input#profile-name {
        border-width: 0px 0px 1px 0px;
        margin-bottom: 30px;
        border-color: black;
    }

    input#profile-email {
        border-width: 0px 0px 1px 0px;
        border-color: black;
    }
</style>
