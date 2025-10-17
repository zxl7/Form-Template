import type { Rule } from 'ant-design-vue/es/form'
import type { BuiltInRules } from '../types'

/**
 * 内置验证规则
 */
export const builtInRules: BuiltInRules = {
  required: (message = '此字段为必填项'): Rule => ({
    required: true,
    message
  }),

  email: (message = '请输入有效的邮箱地址'): Rule => ({
    type: 'email',
    message
  }),

  phone: (message = '请输入有效的手机号码'): Rule => ({
    pattern: /^1[3-9]\d{9}$/,
    message
  }),

  url: (message = '请输入有效的URL地址'): Rule => ({
    type: 'url',
    message
  }),

  minLength: (length: number, message?: string): Rule => ({
    min: length,
    message: message || `长度不能少于${length}个字符`
  }),

  maxLength: (length: number, message?: string): Rule => ({
    max: length,
    message: message || `长度不能超过${length}个字符`
  }),

  min: (value: number, message?: string): Rule => ({
    type: 'number',
    min: value,
    message: message || `值不能小于${value}`
  }),

  max: (value: number, message?: string): Rule => ({
    type: 'number',
    max: value,
    message: message || `值不能大于${value}`
  }),

  pattern: (regex: RegExp, message = '格式不正确'): Rule => ({
    pattern: regex,
    message
  }),

  custom: (validator: (rule: any, value: any) => Promise<void> | void): Rule => ({
    validator
  })
}

/**
 * 常用正则表达式
 */
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^1[3-9]\d{9}$/,
  url: /^https?:\/\/.+/,
  idCard: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  chinese: /^[\u4e00-\u9fa5]+$/,
  english: /^[a-zA-Z]+$/,
  number: /^\d+$/,
  decimal: /^\d+(\.\d+)?$/,
  ip: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  username: /^[a-zA-Z0-9_]{3,20}$/
}

/**
 * 验证单个字段值
 */
export function validateField(
  value: any,
  rules: Rule[] = [],
  fieldName: string = ''
): Promise<string | undefined> {
  return new Promise((resolve) => {
    if (!rules.length) {
      resolve(undefined)
      return
    }

    for (const rule of rules) {
      const error = validateRule(value, rule, fieldName)
      if (error) {
        resolve(error)
        return
      }
    }
    resolve(undefined)
  })
}

/**
 * 验证单个规则
 */
function validateRule(
  value: any,
  rule: Rule,
  fieldName: string
): string | undefined {
  const { required, min, max, len, pattern, type, validator, message } = rule

  // 必填验证
  if (required && (value === undefined || value === null || value === '')) {
    return message || `${fieldName}是必填项`
  }

  // 如果值为空且不是必填，跳过其他验证
  if (value === undefined || value === null || value === '') {
    return undefined
  }

  // 长度验证
  if (len !== undefined && String(value).length !== len) {
    return message || `${fieldName}长度必须为${len}个字符`
  }

  // 最小长度验证
  if (min !== undefined && String(value).length < min) {
    return message || `${fieldName}长度不能少于${min}个字符`
  }

  // 最大长度验证
  if (max !== undefined && String(value).length > max) {
    return message || `${fieldName}长度不能超过${max}个字符`
  }

  // 数值范围验证
  if (type === 'number') {
    const numValue = Number(value)
    if (isNaN(numValue)) {
      return message || `${fieldName}必须是数字`
    }
    if (min !== undefined && numValue < min) {
      return message || `${fieldName}不能小于${min}`
    }
    if (max !== undefined && numValue > max) {
      return message || `${fieldName}不能大于${max}`
    }
  }

  // 正则表达式验证
  if (pattern && !pattern.test(String(value))) {
    return message || `${fieldName}格式不正确`
  }

  // 类型验证
  if (type === 'email' && !patterns.email.test(String(value))) {
    return message || `${fieldName}必须是有效的邮箱地址`
  }

  if (type === 'url' && !patterns.url.test(String(value))) {
    return message || `${fieldName}必须是有效的URL地址`
  }

  // 自定义验证器
  if (validator) {
    try {
      const result = validator(rule, value)
      if (result instanceof Promise) {
        result.catch((error) => {
          return message || error || `${fieldName}验证失败`
        })
      }
    } catch (error) {
      return message || `${fieldName}验证失败`
    }
  }

  return undefined
}

/**
 * 验证整个表单
 */
export function validateForm(
  data: Record<string, any>,
  fields: Array<{ name: string; rules?: Rule[] }>
): Promise<Record<string, string>> {
  return new Promise(async (resolve) => {
    const errors: Record<string, string> = {}

    for (const field of fields) {
      const value = data[field.name]
      const error = await validateField(value, field.rules, field.name)
      if (error) {
        errors[field.name] = error
      }
    }

    resolve(errors)
  })
}

/**
 * 创建自定义验证器
 */
export function createValidator(
  validator: (value: any) => boolean | string | Promise<boolean | string>,
  message?: string
): Rule {
  return {
    validator: async (rule: any, value: any) => {
      try {
        const result = await validator(value)
        if (result === false) {
          throw new Error(message || '验证失败')
        }
        if (typeof result === 'string') {
          throw new Error(result)
        }
      } catch (error) {
        throw error
      }
    }
  }
}

/**
 * 组合验证规则
 */
export function combineRules(...rules: Rule[]): Rule[] {
  return rules.filter(Boolean)
}

/**
 * 条件验证规则
 */
export function conditionalRule(
  condition: (formData: Record<string, any>) => boolean,
  rules: Rule[]
): Rule[] {
  return [
    {
      validator: async (rule: any, value: any, callback: any) => {
        // 这里需要访问表单数据，实际使用时需要从表单实例获取
        // 暂时返回空规则，具体实现需要在组件中处理
      }
    }
  ]
}
