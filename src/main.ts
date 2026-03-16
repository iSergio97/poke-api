import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import FloatingVue from 'floating-vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { ViewTransitionsPlugin } from 'vue-view-transitions';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(FloatingVue);
app.use(VueQueryPlugin);
app.use(ViewTransitionsPlugin);

app.mount('#app')
