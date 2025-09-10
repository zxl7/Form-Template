<template>
  <div class="not-found">
    <div class="not-found-container">
      <!-- 错误代码 -->
      <div class="error-code">404</div>
      
      <!-- 错误标题 -->
      <h1 class="error-title">页面未找到</h1>
      
      <!-- 错误描述 -->
      <p class="error-description">
        抱歉，您访问的页面不存在或已被移动。
      </p>
      
      <!-- 操作按钮 -->
      <div class="action-buttons">
        <router-link to="/" class="home-button">
          🏠 返回首页
        </router-link>
        <button @click="goBack" class="back-button">
          ↩️ 返回上一页
        </button>
      </div>
      
      <!-- 额外帮助信息 -->
      <div class="help-section">
        <p>如果您认为这是一个错误，请联系管理员或尝试以下操作：</p>
        <ul class="help-list">
          <li>检查URL地址是否正确</li>
          <li>刷新页面重试</li>
          <li>查看我们的<a href="/about">关于页面</a>获取更多信息</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

/**
 * NotFound页面组件 - 404错误页面
 * 处理未匹配的路由，提供友好的错误提示和导航选项
 */
export default defineComponent({
  name: 'NotFoundPage',
  
  setup() {
    const router = useRouter()

    /**
     * 返回上一页
     */
    const goBack = () => {
      if (window.history.length > 1) {
        router.go(-1)
      } else {
        router.push('/')
      }
    }

    return {
      goBack
    }
  }
})
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 1rem;
}

.not-found-container {
  text-align: center;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.error-code {
  font-size: 6rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(255, 255, 255, 0.5);
  margin-bottom: 1rem;
  line-height: 1;
}

.error-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.error-description {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.home-button,
.back-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-block;
}

.home-button {
  background: #4CAF50;
  color: white;
}

.home-button:hover {
  background: #45a049;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
}

.back-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.help-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.help-section p {
  margin: 0 0 1rem 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

.help-list {
  text-align: left;
  margin: 0;
  padding: 0;
  list-style: none;
}

.help-list li {
  padding: 0.25rem 0;
  opacity: 0.8;
  font-size: 0.9rem;
}

.help-list li:before {
  content: '•';
  margin-right: 0.5rem;
  color: #4CAF50;
}

.help-list a {
  color: #4CAF50;
  text-decoration: none;
}

.help-list a:hover {
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .not-found-container {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
  
  .error-code {
    font-size: 4rem;
  }
  
  .error-title {
    font-size: 1.5rem;
  }
  
  .error-description {
    font-size: 1rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .home-button,
  .back-button {
    width: 100%;
    max-width: 250px;
  }
}
</style>