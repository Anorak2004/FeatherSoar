/**
 * 日期时间工具函数
 */

/**
 * 格式化时间戳为可读字符串
 * @param {number} timestamp - 时间戳（毫秒）
 * @param {string} format - 格式模板，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的时间字符串
 */
export function formatTimestamp(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
  const date = new Date(timestamp)
  
  const replacements = {
    'YYYY': date.getFullYear(),
    'MM': String(date.getMonth() + 1).padStart(2, '0'),
    'DD': String(date.getDate()).padStart(2, '0'),
    'HH': String(date.getHours()).padStart(2, '0'),
    'mm': String(date.getMinutes()).padStart(2, '0'),
    'ss': String(date.getSeconds()).padStart(2, '0')
  }
  
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => replacements[match])
}

/**
 * 格式化日期（兼容性别名函数）
 * @param {number} timestamp - 时间戳（毫秒）
 * @param {string} format - 格式模板，默认 'YYYY-MM-DD'
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(timestamp, format = 'YYYY-MM-DD') {
  return formatTimestamp(timestamp, format)
}

/**
 * 计算两个时间戳之间的持续时间（秒）
 * @param {number} startTime - 开始时间戳（毫秒）
 * @param {number} endTime - 结束时间戳（毫秒）
 * @returns {number} 持续时间（秒）
 */
export function calculateDuration(startTime, endTime) {
  return Math.floor((endTime - startTime) / 1000)
}

/**
 * 格式化持续时间为可读格式（时:分:秒）
 * @param {number} durationSeconds - 持续时间（秒）
 * @returns {string} 格式化后的持续时间
 */
export function formatDuration(durationSeconds) {
  const hours = Math.floor(durationSeconds / 3600)
  const minutes = Math.floor((durationSeconds % 3600) / 60)
  const seconds = durationSeconds % 60
  
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':')
}

/**
 * 获取当前时间戳（毫秒）
 * @returns {number} 当前时间戳
 */
export function getCurrentTimestamp() {
  return Date.now()
}

/**
 * 获取当前日期的开始时间戳
 * @returns {number} 当天开始的时间戳
 */
export function getStartOfDay() {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return now.getTime()
}

/**
 * 获取本周开始的时间戳（周一为开始）
 * @returns {number} 本周开始的时间戳
 */
export function getStartOfWeek() {
  const now = new Date()
  const day = now.getDay() || 7 // 将周日的0转换为7
  const diff = now.getDate() - day + 1 // 调整为周一
  
  now.setDate(diff)
  now.setHours(0, 0, 0, 0)
  
  return now.getTime()
} 