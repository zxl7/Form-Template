<template>
  <button :class="[baseClass, variantClass, { disabled }]">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// 定义按钮的变体类型
type ButtonVariant = 'default' | 'primary' | 'secondary' | 'danger';

// 定义按钮属性
interface ButtonProps {
  variant?: ButtonVariant;
  disabled?: boolean;
}

// 声明组件属性
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  disabled: false
});

// 计算基础类名
const baseClass = 'btn';

// 根据variant计算对应的类名
const variantClass = computed(() => `btn-${props.variant}`);
</script>

<style scoped lang="scss">
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  // 禁用状态
  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  // 悬停效果
  &:not(.disabled):hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  // 点击效果
  &:not(.disabled):active {
    transform: translateY(0);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }
}

// 默认按钮样式
.btn-default {
  background-color: #42b883;
  color: white;
}

// 主要按钮样式
.btn-primary {
  background-color: #667eea;
  color: white;
}

// 次要按钮样式
.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #e0e0e0;
}

// 危险按钮样式
.btn-danger {
  background-color: #ff4d4f;
  color: white;
}
</style>
