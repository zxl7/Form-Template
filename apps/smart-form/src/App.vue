<template>
  <div id="app">
    <a-layout>
      <a-layout-header class="header">
        <div class="logo">
          <h1>Smart Form</h1>
          <p>基于 Ant Design Vue 的智能表单组件库</p>
        </div>
      </a-layout-header>

      <div class="container">
        <a-tabs v-model:active-key="activeTab" class="demo-tabs">
          <a-tab-pane tab="动态表单" key="dynamic">
            <dynamic-form></dynamic-form>
          </a-tab-pane>
          <a-tab-pane tab="静态表单" key="static">
            <static-form></static-form>
          </a-tab-pane>
        </a-tabs>
      </div>

      <a-layout-footer class="footer">
        <p>Smart Form © 2025 Created with 🌟</p>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const activeTab = ref("dynamic")
</script>

<style>
#app {
  background: #f5f5f5;
}
.logo {
  background: #001529;
  color: white;
  padding: 0 24px;
  height: 32px;
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
  background: #f0f2f5;
  height: calc(100vh - 88px);
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
