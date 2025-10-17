<template>
  <header class="header">
    <div class="logo">
      <h1>Smart Form</h1>
      <p>基于 Ant Design Vue 的智能表单组件库</p>
    </div>
  </header>

  <div class="container">请选择组件：</div>

  <footer class="footer">
    <p>Smart Form © 2025 Created with 🌟</p>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue"
// const activeTab = ref("dynamic")
</script>

<style>
.logo {
  background: #001529;
  color: white;
  padding: 0 24px;
  height: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h1 {
    color: white;
    margin: 0;
    font-size: 24px;
  }
  p {
    color: rgba(255, 255, 255, 0.65);
    margin: 4px 0 0 0;
    font-size: 14px;
  }
}

.container {
  margin: 16px;
  padding: 16px;
  box-sizing: border-box;
  background: #f0f2f5;
  height: calc(100vh - 104px);
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.footer {
  text-align: center;
  background: #f0f2f5;
  height: 24px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.45);
}
</style>
