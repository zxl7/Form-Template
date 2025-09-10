/**
 * 全局类型声明文件
 * 用于解决TypeScript模块解析问题
 */

// Vue模块类型声明
declare module 'vue' {
  import { CompatVue } from '@vue/runtime-dom'
  const Vue: CompatVue
  export default Vue
  export * from '@vue/runtime-dom'
  export { default } from '@vue/runtime-dom'
}

// Vue单文件组件类型声明
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}