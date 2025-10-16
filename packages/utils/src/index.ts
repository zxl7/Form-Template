// 工具函数集合
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('zh-CN');
};

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
