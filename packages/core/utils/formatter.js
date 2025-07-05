/**
 * 数据格式化工具函数
 */

/**
 * 格式化心率数据
 * @param {number} heartRate - 心率值
 * @returns {string} 格式化后的心率字符串
 */
export function formatHeartRate(heartRate) {
  return `${Math.round(heartRate)} BPM`
}

/**
 * 格式化拍速数据
 * @param {number} speed - 拍速值 (km/h)
 * @returns {string} 格式化后的拍速字符串
 */
export function formatSpeed(speed) {
  return `${Math.round(speed)} km/h`
}

/**
 * 格式化卡路里数据
 * @param {number} calories - 卡路里值
 * @returns {string} 格式化后的卡路里字符串
 */
export function formatCalories(calories) {
  return `${Math.round(calories)} kcal`
}

/**
 * 格式化持续时间
 * @param {number} seconds - 持续时间（秒）
 * @param {boolean} showSeconds - 是否显示秒数
 * @returns {string} 格式化后的时间字符串
 */
export function formatDuration(seconds, showSeconds = true) {
  if (seconds < 0) seconds = 0
  
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  
  let result = ''
  
  if (hours > 0) {
    result += `${hours}小时`
  }
  
  if (minutes > 0 || hours > 0) {
    result += `${minutes}分`
  }
  
  if (showSeconds || (!hours && !minutes)) {
    result += `${remainingSeconds}秒`
  }
  
  return result || '0秒'
}

/**
 * 格式化百分比数据
 * @param {number} value - 原始值
 * @param {number} total - 总值
 * @returns {string} 格式化后的百分比字符串
 */
export function formatPercentage(value, total) {
  if (!total) return '0%'
  return `${Math.round((value / total) * 100)}%`
}

/**
 * 计算进攻/防守占比
 * @param {number} smashes - 杀球次数
 * @param {number} strokes - 总挥拍次数
 * @returns {Object} 进攻/防守占比对象
 */
export function calculateOffenseDefense(smashes, strokes) {
  if (!strokes) return { offense: 0, defense: 0 }
  
  const offense = Math.round((smashes / strokes) * 100)
  const defense = 100 - offense
  
  return { offense, defense }
}

/**
 * 计算正手/反手占比
 * @param {number} forehand - 正手次数
 * @param {number} backhand - 反手次数
 * @returns {Object} 正手/反手占比对象
 */
export function calculateForehandBackhand(forehand, backhand) {
  const total = forehand + backhand
  if (!total) return { forehandPercent: 0, backhandPercent: 0 }
  
  const forehandPercent = Math.round((forehand / total) * 100)
  const backhandPercent = 100 - forehandPercent
  
  return { forehandPercent, backhandPercent }
} 