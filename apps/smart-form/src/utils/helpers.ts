import { cloneDeep, isEqual, merge } from 'lodash-es'
import type { FormField, FormData } from '../types'

/**
 * 深度克隆对象
 */
export function deepClone<T>(obj: T): T {
  return cloneDeep(obj)
}

/**
 * 深度比较两个对象是否相等
 */
export function deepEqual(a: any, b: any): boolean {
  return isEqual(a, b)
}

/**
 * 深度合并对象
 */
export function deepMerge<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
  return merge(target, ...sources)
}

/**
 * 获取嵌套对象的值
 */
export function getNestedValue(obj: Record<string, any>, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined
  }, obj)
}

/**
 * 设置嵌套对象的值
 */
export function setNestedValue(obj: Record<string, any>, path: string, value: any): void {
  const keys = path.split('.')
  const lastKey = keys.pop()!
  const target = keys.reduce((current, key) => {
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {}
    }
    return current[key]
  }, obj)
  target[lastKey] = value
}

/**
 * 从表单字段配置中提取默认值
 */
export function extractDefaultValues(fields: FormField[]): FormData {
  const defaultValues: FormData = {}

  fields.forEach(field => {
    if (field.defaultValue !== undefined) {
      setNestedValue(defaultValues, field.name, field.defaultValue)
    }
  })

  return defaultValues
}

/**
 * 过滤可见字段
 */
export function filterVisibleFields(fields: FormField[], formData: FormData): FormField[] {
  return fields.filter(field => {
    if (field.conditional) {
      return field.conditional(formData)
    }
    return true
  })
}

/**
 * 排序字段
 */
export function sortFields(fields: FormField[]): FormField[] {
  return [...fields].sort((a, b) => {
    const orderA = a.order ?? 0
    const orderB = b.order ?? 0
    return orderA - orderB
  })
}

/**
 * 生成字段的唯一ID
 */
export function generateFieldId(field: FormField, index: number): string {
  return `${field.name}-${index}`
}

/**
 * 检查字段是否必填
 */
export function isFieldRequired(field: FormField): boolean {
  return field.rules?.some(rule => rule.required) ?? false
}

/**
 * 获取字段的验证规则
 */
export function getFieldRules(field: FormField) {
  return field.rules ?? []
}

/**
 * 格式化字段标签
 */
export function formatFieldLabel(field: FormField): string {
  if (field.label) {
    return field.label
  }

  // 从字段名生成标签
  return field.name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

/**
 * 检查值是否为空
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true
  }

  if (typeof value === 'string') {
    return value.trim() === ''
  }

  if (Array.isArray(value)) {
    return value.length === 0
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }

  return false
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * 生成随机ID
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 将对象转换为FormData
 */
export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData()

  function appendValue(key: string, value: any) {
    if (value instanceof File) {
      formData.append(key, value)
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        appendValue(`${key}[${index}]`, item)
      })
    } else if (value && typeof value === 'object') {
      Object.keys(value).forEach(subKey => {
        appendValue(`${key}[${subKey}]`, value[subKey])
      })
    } else {
      formData.append(key, value ?? '')
    }
  }

  Object.keys(obj).forEach(key => {
    appendValue(key, obj[key])
  })

  return formData
}

/**
 * 从FormData转换为对象
 */
export function formDataToObject(formData: FormData): Record<string, any> {
  const obj: Record<string, any> = {}

  for (const [key, value] of formData.entries()) {
    if (key.includes('[') && key.includes(']')) {
      // 处理数组和嵌套对象
      const keys = key.split(/[\[\]]/).filter(Boolean)
      let current = obj

      for (let i = 0; i < keys.length - 1; i++) {
        const currentKey = keys[i]
        if (!current[currentKey]) {
          current[currentKey] = {}
        }
        current = current[currentKey]
      }

      current[keys[keys.length - 1]] = value
    } else {
      obj[key] = value
    }
  }

  return obj
}
