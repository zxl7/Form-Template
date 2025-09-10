<template>
  <div class="home">
    <!-- 页面头部 -->
    <header class="home-header">
      <p class="home-subtitle">这是一个现代化的Vue 3首页模板</p>
    </header>

    <!-- 主要内容区域 -->
    <main class="home-content">
      <!-- 功能卡片区域 -->
      <section class="features-section">
        <h2 class="section-title">主要功能</h2>
        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.id">
            <div class="feature-icon">
              {{ feature.icon }}
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <!-- 快速操作区域 -->
      <section class="actions-section">
        <h2 class="section-title">快速开始</h2>
        <div class="actions-grid">
          <button 
            v-for="action in quickActions" 
            :key="action.id" 
            class="action-button"
            :class="action.type"
            @click="handleAction(action)"
          >
            {{ action.label }}
          </button>
        </div>
      </section>

      <!-- 状态信息区域 -->
      <section class="status-section">
        <h2 class="section-title">系统状态</h2>
        <div class="status-info">
          <div class="status-item">
            <span class="status-label">Vue版本:</span>
            <span class="status-value">{{ vueVersion }}</span>
          </div>
          <div class="status-item">
            <span class="status-label">环境:</span>
            <span class="status-value">{{ environment }}</span>
          </div>
          <div class="status-item">
            <span class="status-label">构建时间:</span>
            <span class="status-value">{{ buildTime }}</span>
          </div>
        </div>
      </section>
    </main>

    <!-- 页面底部 -->
    <footer class="home-footer">
      <p>&copy; 2024 表单库项目. 所有权利保留.</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

/**
 * Home页面组件 - 应用首页
 * 提供系统概览、功能导航和状态信息
 */
export default defineComponent({
  name: 'HomePage',
  
  setup() {
    // 功能列表数据
    const features = ref([
      {
        id: 1,
        icon: '📋',
        title: '动态表单',
        description: '创建和管理复杂的动态表单配置'
      },
      {
        id: 2,
        icon: '🎨',
        title: 'UI组件',
        description: '丰富的UI组件库，支持自定义主题'
      },
      {
        id: 3,
        icon: '⚡',
        title: '高性能',
        description: '基于Vue 3的响应式系统，极致性能'
      },
      {
        id: 4,
        icon: '🔧',
        title: '可配置',
        description: '高度可配置的组件和布局系统'
      }
    ])

    // 快速操作列表
    const quickActions = ref([
      {
        id: 'create-form',
        label: '创建新表单',
        type: 'primary'
      },
      {
        id: 'view-docs',
        label: '查看文档',
        type: 'secondary'
      },
      {
        id: 'explore-components',
        label: '浏览组件',
        type: 'outline'
      }
    ])

    // 系统状态信息
    const vueVersion = ref('3.5.21')
    const environment = ref('development')
    const buildTime = ref(new Date().toLocaleString('zh-CN'))

    /**
     * 处理快速操作点击事件
     * @param action - 操作对象
     */
    const handleAction = (action: any) => {
      console.log('执行操作:', action.label)
      // 这里可以添加具体的操作逻辑
      switch (action.id) {
        case 'create-form':
          alert('即将跳转到表单创建页面')
          break
        case 'view-docs':
          window.open('https://vuejs.org/', '_blank')
          break
        case 'explore-components':
          alert('即将打开组件库')
          break
      }
    }

    // 组件挂载后的生命周期钩子
    onMounted(() => {
      console.log('Home页面已加载')
    })

    return {
      features,
      quickActions,
      vueVersion,
      environment,
      buildTime,
      handleAction
    }
  }
})
</script>

<style scoped>
/* 页面布局样式 - 简洁白色背景 */
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  color: var(--color-gray-800);
}

/* 头部样式 - 简洁风格 */
.home-header {
  text-align: center;
  padding: 3rem 1rem 2rem;
  border-bottom: 1px solid var(--color-gray-200);
}

.home-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

.home-subtitle {
  font-size: 1.2rem;
  color: var(--color-gray-600);
  margin: 0;
  font-weight: 400;
}

/* 内容区域样式 */
.home-content {
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* 功能区样式 - 简洁风格 */
.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--color-primary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.feature-card:hover {
  border-color: var(--color-primary-light);
  box-shadow: var(--shadow-md);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.feature-description {
  color: var(--color-gray-600);
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}

/* 操作按钮样式 - 简洁风格 */
.actions-grid {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.action-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;
}

.action-button.primary {
  background: var(--color-primary);
  color: white;
}

.action-button.primary:hover {
  background: var(--color-primary-dark);
}

.action-button.secondary {
  background: var(--color-gray-300);
  color: var(--color-gray-800);
}

.action-button.secondary:hover {
  background: var(--color-gray-400);
}

.action-button.outline {
  background: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.action-button.outline:hover {
  background: var(--color-primary);
  color: white;
}

/* 状态信息样式 - 小清新风格 */
.status-info {
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: 16px;
  padding: 2rem;
  max-width: 450px;
  margin: 0 auto;
  box-shadow: var(--shadow-sm);
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-gray-100);
}

.status-item:last-child {
  border-bottom: none;
}

.status-label {
  font-weight: 500;
  color: var(--color-gray-700);
}

.status-value {
  color: var(--color-primary);
  font-family: 'Monaco', 'Menlo', monospace;
  font-weight: 600;
}

/* 底部样式 - 小清新风格 */
.home-footer {
  text-align: center;
  padding: 2rem 1rem;
  background: var(--color-white);
  border-top: 1px solid var(--color-gray-200);
  margin-top: auto;
  color: var(--color-gray-600);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-title {
    font-size: 2rem;
  }
  
  .home-subtitle {
    font-size: 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .actions-grid {
    flex-direction: column;
    align-items: center;
  }
  
  .action-button {
    width: 100%;
    max-width: 250px;
  }
}
</style>