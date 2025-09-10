/**
 * Vue单文件组件类型声明
 * 用于解决TypeScript无法识别.vue文件的问题
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}