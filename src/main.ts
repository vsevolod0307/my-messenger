/* eslint-disable */
import { createApp } from "vue";
import { VueFire, VueFireAuth } from "vuefire";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Импортируем нужные вам функции из нужных вам SDK
import { initializeApp } from "firebase/app";
// TODO: добавьте SDK для продуктов Firebase, которые вы хотите использовать
// https://firebase.google.com/docs/web/setup#available-libraries

// Конфигурация Firebase вашего веб-приложения
// Для Firebase JS SDK версии 7.20.0 и более поздних версий MeasurementId является необязательным
const firebaseApp = initializeApp({
    apiKey: "AIzaSyAINxc4F8ZbKRUdv8L77VPVEArtxYLxVXw",
    authDomain: "my-messenger-82417.firebaseapp.com",
    projectId: "my-messenger-82417",
    storageBucket: "my-messenger-82417.appspot.com",
    messagingSenderId: "960604895089",
    appId: "1:960604895089:web:956602d402407c2c87a8d0",
    measurementId: "G-HZREB0MVT4",
    databaseURL: "https://my-messenger-82417-default-rtdb.firebaseio.com"
})

createApp(App).use(store).use(router)
.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth()
    ]
}).mount("#app");
