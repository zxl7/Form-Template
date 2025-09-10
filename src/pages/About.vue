<template>
  <div class="about">
    <div class="about-container">
      <!-- 页面头部 -->
      <header class="about-header">
        <h1 class="about-title">关于我们</h1>
        <p class="about-subtitle">了解表单库系统的更多信息</p>
      </header>

      <!-- 主要内容 -->
      <main class="about-content">
        <!-- 项目介绍 -->
        <section class="about-section">
          <h2>项目介绍</h2>
          <p>
            表单库系统是一个基于Vue 3和TypeScript开发的现代化表单解决方案。
            我们致力于提供高效、灵活的表单组件和工具，帮助开发者快速构建复杂的表单界面。
          </p>
        </section>

        <!-- 技术栈 -->
        <section class="about-section">
          <h2>技术栈</h2>
          <div class="tech-stack">
            <div class="tech-item" v-for="tech in techStack" :key="tech.name">
              <span class="tech-name">{{ tech.name }}</span>
              <span class="tech-version">{{ tech.version }}</span>
            </div>
          </div>
        </section>

        <!-- 功能特性 -->
        <section class="about-section">
          <h2>主要特性</h2>
          <ul class="features-list">
            <li v-for="feature in features" :key="feature">{{ feature }}</li>
          </ul>
        </section>

        <!-- 返回首页按钮 -->
        <div class="back-to-home">
          <router-link to="/" class="back-button">
            ← 返回首页
          </router-link>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

/**
 * About页面组件 - 关于我们页面
 * 展示项目信息、技术栈和功能特性
 */
export default defineComponent({
  name: 'AboutPage',
  
  setup() {
    // 技术栈数据
    const techStack = ref([
      { name: 'Vue', version: '3.5.21' },
      { name: 'TypeScript', version: '5.9.2' },
      { name: 'Vite', version: '5.0.0' },
      { name: 'Vue Router', version: '4.2.0' }
    ])

    // 功能特性列表
    const features = ref([
      '基于Vue 3 Composition API开发',
      '完整的TypeScript类型支持',
      '响应式表单组件',
      '可配置的表单验证',
      '现代化的UI设计',
      '完整的文档和示例'
    ])

    return {
      techStack,
      features
    }
  }
})
</script>

<style scoped>
.about {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 1rem;
}

.about-container {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
}

.about-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.about-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
}

.about-section {
  margin-bottom: 2.5rem;
}

.about-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fff;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 0.5rem;
}

.about-section p {
  line-height: 1.6;
  opacity: 0.9;
  margin: 0;
}

.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.tech-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tech-name {
  display: block;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.tech-version {
  opacity: 0.7;
  font-size: 0.9rem;
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  padding-left: 1.5rem;
}

.features-list li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4CAF50;
  font-weight: bold;
}

.features-list li:last-child {
  border-bottom: none;
}

.back-to-home {
  text-align: center;
  margin-top: 2rem;
}

.back-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-container {
    padding: 1.5rem;
    margin: 1rem;
  }
  
  .about-title {
    font-size: 2rem;
  }
  
  .about-subtitle {
    font-size: 1rem;
  }
  
  .tech-stack {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>