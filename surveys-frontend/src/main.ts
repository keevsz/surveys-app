import { createPinia } from 'pinia'
import { createApp } from 'vue'
import './style.css'
import router from './router'
import FontAwesomeIcon from './utils/fontawesome'
import App from './App.vue'


createApp(App)
    .use(createPinia())
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
