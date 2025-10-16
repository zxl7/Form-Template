import { createApp } from 'vue'
import App from './App.vue'
import { Button } from '@project/ui'
import './style.css'

const app = createApp(App)
app.component('Button', Button)
app.mount('#app')