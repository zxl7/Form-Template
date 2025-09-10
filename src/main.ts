import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/global.css'  // 导入全局样式

/**
 * 创建Vue应用实例并挂载到DOM
 * 添加路由支持
 */
const app = createApp(App)

// 使用路由
app.use(router)

// 挂载应用到DOM
app.mount('#app')