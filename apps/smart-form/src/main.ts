import { createApp } from 'vue'
import App from './App.vue'
import { Button } from '@project/ui'

const app = createApp(App)
app.component('Button', Button)
app.mount('#app')