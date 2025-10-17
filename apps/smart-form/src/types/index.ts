import type { Component, VNode } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'

// 表单字段类型
export type FieldType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'dateRange'
  | 'time'
  | 'timeRange'
  | 'number'
  | 'switch'
  | 'slider'
  | 'rate'
  | 'upload'
  | 'cascader'
  | 'treeSelect'
  | 'autoComplete'
  | 'custom'

// 表单字段配置
export interface FormField {
  name: string
  type: FieldType
  label?: string
  placeholder?: string
  defaultValue?: any
  options?: Array<{ label: string; value: any; disabled?: boolean }>
  rules?: Rule[]
  disabled?: boolean
  readonly?: boolean
  className?: string
  style?: Record<string, any>
  dependencies?: string[] // 依赖的字段名
  conditional?: (formData: Record<string, any>) => boolean // 条件显示
  render?: (props: FieldRenderProps) => VNode // 自定义渲染
  props?: Record<string, any> // 传递给组件的额外属性
  span?: number // 栅格布局的span
  offset?: number // 栅格布局的offset
  order?: number // 字段排序
}

// 字段渲染属性
export interface FieldRenderProps {
  field: FormField
  value: any
  onChange: (value: any) => void
  error?: string
  disabled?: boolean
}

// 表单配置
export interface FormConfig {
  fields: FormField[]
  layout?: 'horizontal' | 'vertical' | 'inline'
  labelCol?: Record<string, any>
  wrapperCol?: Record<string, any>
  size?: 'small' | 'middle' | 'large'
  disabled?: boolean
  className?: string
  style?: Record<string, any>
  colon?: boolean
  labelAlign?: 'left' | 'right'
  preserve?: boolean
  scrollToFirstError?: boolean
  validateOnRuleChange?: boolean
  hideRequiredMark?: boolean
  model?: Record<string, any>
}

// 表单数据
export type FormData = Record<string, any>

// 表单状态
export interface FormState {
  data: FormData
  errors: Record<string, string>
  touched: Record<string, boolean>
  isValid: boolean
  isSubmitting: boolean
}

// 表单事件
export interface FormEvents {
  onSubmit?: (data: FormData) => void | Promise<void>
  onChange?: (data: FormData, field: string, value: any) => void
  onValidate?: (errors: Record<string, string>) => void
  onReset?: () => void
  onFieldsChange?: (changedFields: any[], allFields: any[]) => void
  onValuesChange?: (changedValues: Record<string, any>, allValues: Record<string, any>) => void
}

// 表单组件属性
export interface SmartFormProps extends FormConfig, FormEvents {
  initialData?: FormData
  validateOnChange?: boolean
  validateOnBlur?: boolean
  showValidationSummary?: boolean
  submitButtonText?: string
  resetButtonText?: string
  showResetButton?: boolean
  showSubmitButton?: boolean
  loading?: boolean
  submitButtonProps?: Record<string, any>
  resetButtonProps?: Record<string, any>
  gutter?: number
}

// 动态表单生成器配置
export interface DynamicFormConfig {
  schema: FormField[]
  data?: FormData
  events?: FormEvents
  config?: Partial<FormConfig>
}

// 表单验证器
export interface FormValidator {
  validate: (data: FormData) => Promise<boolean>
  validateField: (field: string, value: any) => Promise<string | undefined>
  getErrors: () => Record<string, string>
  clearErrors: () => void
  setErrors: (errors: Record<string, string>) => void
}

// 内置验证规则
export interface BuiltInRules {
  required: (message?: string) => Rule
  email: (message?: string) => Rule
  phone: (message?: string) => Rule
  url: (message?: string) => Rule
  minLength: (length: number, message?: string) => Rule
  maxLength: (length: number, message?: string) => Rule
  min: (value: number, message?: string) => Rule
  max: (value: number, message?: string) => Rule
  pattern: (regex: RegExp, message?: string) => Rule
  custom: (validator: (rule: any, value: any) => Promise<void> | void) => Rule
}

// 表单布局配置
export interface FormLayout {
  type: 'grid' | 'flex' | 'inline'
  gutter?: number
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  align?: 'top' | 'middle' | 'bottom'
  wrap?: boolean
}

// 表单主题配置
export interface FormTheme {
  size?: 'small' | 'middle' | 'large'
  color?: string
  borderRadius?: number
  boxShadow?: string
  borderColor?: string
  focusColor?: string
  errorColor?: string
  successColor?: string
  warningColor?: string
}
