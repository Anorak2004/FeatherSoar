/**
 * 卡路里计算模块
 * 基于METs (Metabolic Equivalent of Task) 方法计算卡路里消耗
 */

// 羽毛球运动的METs值 (来源: Compendium of Physical Activities)
const BADMINTON_METS = {
  // 休闲/社交羽毛球
  CASUAL: 4.5,
  // 一般/竞技羽毛球
  GENERAL: 7.0,
  // 高强度/比赛级羽毛球
  COMPETITIVE: 9.0
}

// 默认体重（kg）
const DEFAULT_WEIGHT = 70

/**
 * 计算卡路里消耗
 * @param {number} durationMinutes - 运动持续时间（分钟）
 * @param {string} intensity - 运动强度 ('casual', 'general', 'competitive')
 * @param {number} weight - 体重（kg），默认70kg
 * @param {number} avgHeartRate - 平均心率，用于调整强度
 * @returns {number} 消耗的卡路里（kcal）
 */
export function calculateCalories(durationMinutes, intensity = 'general', weight = DEFAULT_WEIGHT, avgHeartRate = 0) {
  // 选择基础METs值
  let mets = BADMINTON_METS.GENERAL
  
  switch (intensity.toLowerCase()) {
    case 'casual':
      mets = BADMINTON_METS.CASUAL
      break
    case 'competitive':
      mets = BADMINTON_METS.COMPETITIVE
      break
    default:
      mets = BADMINTON_METS.GENERAL
  }
  
  // 基于心率调整METs值（如果提供了心率）
  if (avgHeartRate > 0) {
    // 简单的心率调整模型
    // 心率越高，METs值越高
    const heartRateFactor = getHeartRateFactor(avgHeartRate)
    mets = mets * heartRateFactor
  }
  
  // 卡路里计算公式：kcal = METs × 体重(kg) × 时间(小时)
  const durationHours = durationMinutes / 60
  const calories = mets * weight * durationHours
  
  return Math.round(calories)
}

/**
 * 根据心率获取调整因子
 * @param {number} heartRate - 心率
 * @returns {number} 调整因子
 * @private
 */
function getHeartRateFactor(heartRate) {
  if (heartRate < 100) {
    return 0.85
  } else if (heartRate < 120) {
    return 0.95
  } else if (heartRate < 140) {
    return 1.0
  } else if (heartRate < 160) {
    return 1.1
  } else if (heartRate < 180) {
    return 1.2
  } else {
    return 1.3
  }
}

/**
 * 根据运动模式获取强度
 * @param {string} mode - 运动模式 ('singles', 'doubles', 'mixed')
 * @returns {string} 强度级别
 */
export function getIntensityByMode(mode) {
  switch (mode.toLowerCase()) {
    case 'singles':
      return 'competitive'
    case 'doubles':
      return 'general'
    case 'mixed':
      return 'general'
    default:
      return 'general'
  }
}

/**
 * 实时计算卡路里消耗
 * @param {number} elapsedMinutes - 已经过的分钟数
 * @param {string} mode - 运动模式
 * @param {number} avgHeartRate - 平均心率
 * @param {number} weight - 体重（kg）
 * @returns {number} 当前消耗的卡路里
 */
export function calculateRealTimeCalories(elapsedMinutes, mode, avgHeartRate, weight = DEFAULT_WEIGHT) {
  const intensity = getIntensityByMode(mode)
  return calculateCalories(elapsedMinutes, intensity, weight, avgHeartRate)
} 