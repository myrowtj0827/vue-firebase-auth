import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import * as firebase from "firebase"
import store from './stores/store'
import * as Boostrap from 'bootstrap'

require('firebase/firestore')
import {firestorePlugin} from 'vuefire'
import '../w3.css'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(Boostrap)
Vue.use(firestorePlugin)

const firebaseConfig = {
    apiKey: 'AIzaSyBewMdj2MnjOJl6Wf8CDe9p0dga_yGA06I',
    authDomain: 'mytestfirebase-128d9.firebaseapp.com',
    databaseURL: 'https://mytestfirebase-128d9.firebaseio.com',
    projectId: 'mytestfirebase-128d9',
    storageBucket: 'mytestfirebase-128d9.appspot.com',
    messagingSenderId: '277282624704',
    appId: '1:277282624704:web:46eed040580011cb25c925'
}

firebase.initializeApp(firebaseConfig)
firebase.auth().languageCode = 'it'

firebase.auth().onAuthStateChanged(user => {
    store.dispatch('fetchUser', user)
})

const db = firebase.firestore()
const storage = firebase.storage()
const storageRef = storage.ref()

Vue.prototype.$db = db
Vue.prototype.$storage = storage
Vue.prototype.$storageRef = storageRef

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')