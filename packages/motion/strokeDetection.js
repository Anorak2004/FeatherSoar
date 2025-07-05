/**
 * 挥拍检测模块
 */

import { calculateAccelerationMagnitude, calculateGyroscopeMagnitude } from './sensor'

// 挥拍检测配置
const STROKE_CONFIG = {
  // 加速度阈值（挥拍动作的最小加速度，单位：m/s²）
  ACCELERATION_THRESHOLD: 15,
  
  // 杀球加速度阈值（杀球动作的最小加速度，单位：m/s²）
  SMASH_ACCELERATION_THRESHOLD: 25,
  
  // 角速度阈值（单位：rad/s）
  GYROSCOPE_THRESHOLD: 5,
  
  // 挥拍动作的最小持续时间（毫秒）
  MIN_STROKE_DURATION: 150,
  
  // 两次挥拍之间的最小间隔（毫秒）
  MIN_STROKE_INTERVAL: 500
}

// 状态变量
let isDetectingStroke = false
let strokeStartTime = 0
let lastStrokeTime = 0
let maxAcceleration = 0
let maxGyroscope = 0
let strokeCount = 0
let smashCount = 0
let forehandCount = 0
let backhandCount = 0
let currentSpeed = 0
let maxSpeed = 0

// 回调函数
let onStrokeDetectedCallback = null

/**
 * 初始化挥拍检测
 * @param {Function} onStrokeDetected - 挥拍检测回调函数
 */
export function initStrokeDetection(onStrokeDetected) {
  resetStats()
  onStrokeDetectedCallback = onStrokeDetected
}

/**
 * 重置统计数据
 */
export function resetStats() {
  isDetectingStroke = false
  strokeStartTime = 0
  lastStrokeTime = 0
  maxAcceleration = 0
  maxGyroscope = 0
  strokeCount = 0
  smashCount = 0
  forehandCount = 0
  backhandCount = 0
  currentSpeed = 0
  maxSpeed = 0
}

/**
 * 处理加速度数据
 * @param {Object} accelData - 加速度数据
 */
export function processAccelerometerData(accelData) {
  const magnitude = calculateAccelerationMagnitude(accelData)
  
  const currentTime = Date.now()
  
  // 检测挥拍开始
  if (!isDetectingStroke && 
      magnitude > STROKE_CONFIG.ACCELERATION_THRESHOLD && 
      currentTime - lastStrokeTime > STROKE_CONFIG.MIN_STROKE_INTERVAL) {
    
    isDetectingStroke = true
    strokeStartTime = currentTime
    maxAcceleration = magnitude
    
  } 
  // 更新最大加速度
  else if (isDetectingStroke && magnitude > maxAcceleration) {
    maxAcceleration = magnitude
  }
}

/**
 * 处理陀螺仪数据
 * @param {Object} gyroData - 陀螺仪数据
 */
export function processGyroscopeData(gyroData) {
  if (!isDetectingStroke) return
  
  const magnitude = calculateGyroscopeMagnitude(gyroData)
  
  // 更新最大角速度
  if (magnitude > maxGyroscope) {
    maxGyroscope = magnitude
  }
  
  const currentTime = Date.now()
  
  // 检测挥拍结束
  if (currentTime - strokeStartTime >= STROKE_CONFIG.MIN_STROKE_DURATION) {
    completeStrokeDetection(currentTime)
  }
}

/**
 * 完成挥拍检测
 * @param {number} currentTime - 当前时间戳
 * @private
 */
function completeStrokeDetection(currentTime) {
  isDetectingStroke = false
  lastStrokeTime = currentTime
  
  // 计算拍速 (简化模型，基于最大加速度)
  // 实际应用中可能需要更复杂的物理模型
  currentSpeed = Math.round(maxAcceleration * 1.5)
  
  // 更新最高拍速
  if (currentSpeed > maxSpeed) {
    maxSpeed = currentSpeed
  }
  
  // 判断是否为杀球
  const isSmash = maxAcceleration > STROKE_CONFIG.SMASH_ACCELERATION_THRESHOLD
  
  // 判断是否为正手 (简化模型，基于角速度方向)
  // 实际应用中可能需要机器学习模型
  const isForehand = maxGyroscope > 0
  
  // 更新计数
  strokeCount++
  
  if (isSmash) {
    smashCount++
  }
  
  if (isForehand) {
    forehandCount++
  } else {
    backhandCount++
  }
  
  // 调用回调函数
  if (onStrokeDetectedCallback) {
    onStrokeDetectedCallback({
      timestamp: currentTime,
      speed: currentSpeed,
      isSmash,
      isForehand
    })
  }
}

/**
 * 获取挥拍统计数据
 * @returns {Object} 挥拍统计数据
 */
export function getStrokeStats() {
  return {
    strokeCount,
    smashCount,
    forehandCount,
    backhandCount,
    currentSpeed,
    maxSpeed
  }
} 