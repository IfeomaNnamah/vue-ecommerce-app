import { createApp } from 'vue'
import App from './App.vue'
import router from '../router/index.js'
import '@/assets/css/custom.css'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import '@/assets/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/js/bootstrap.min.js"

import store from '../store/index.js'

const options = {
    // You can set your default options here
    transition: "Vue-Toastification__bounce",
    maxToasts: 1,
    newestOnTop: true,
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
};

// const app = createApp(App)

// app.use(store)
// app.use(Toast, options)
// app.use(router)
// app.mount('#app')
const app = createApp(App);
app.use(Toast, options).use(store).use(router).mount('#app')
