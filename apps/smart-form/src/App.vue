<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue"

import layout from "./layout.vue"

defineComponent({
  components: {
    layout,
  },
})
</script>

<style>
#app {
  background: #f5f5f5;
}
</style>
