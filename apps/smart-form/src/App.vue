<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue"

import Layout from "./layout.vue"

defineComponent({
  components: {
    Layout,
  },
})
</script>

<style>
#app {
  background: #f5f5f5;
}
</style>
