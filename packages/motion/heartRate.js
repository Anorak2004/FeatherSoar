/**
 * 心率监测模块
 */

/**
 * 心率数据回调函数
 * @callback HeartRateCallback
 * @param {number} heartRate - 心率值
 */

let heartRateSubscription = null
let heartRateHistory = []
let heartRateStats = {
  current: 0,
  min: 0,
  max: 0,
  avg: 0
}

/**
 * 开始监听心率
 * @param {HeartRateCallback} callback - 心率数据回调函数
 * @returns {boolean} 是否成功开始监听
 */
export function startHeartRateMonitoring(callback) {
  try {
    // 确保先停止之前的订阅
    stopHeartRateMonitoring()
    
    // 重置历史数据
    heartRateHistory = []
    heartRateStats = {
      current: 0,
      min: 0,
      max: 0,
      avg: 0
    }
    
    heartRateSubscription = global.heartrate.subscribe({
      success: (data) => {
        const heartRate = data.heartRate
        
        // 更新当前心率
        heartRateStats.current = heartRate
        
        // 更新历史记录
        heartRateHistory.push({
          timestamp: Date.now(),
          value: heartRate
        })
        
        // 更新统计数据
        updateHeartRateStats()
        
        // 调用回调
        callback(heartRate)
      },
      fail: (data, code) => {
        console.error(`心率监测订阅失败: ${code}`)
        return false
      }
    })
    
    return true
  } catch (e) {
    console.error(`心率监测错误: ${e.message}`)
    return false
  }
}

/**
 * 停止心率监测
 * @returns {boolean} 是否成功停止监听
 */
export function stopHeartRateMonitoring() {
  try {
    if (heartRateSubscription) {
      heartRateSubscription.unsubscribe()
      heartRateSubscription = null
    }
    return true
  } catch (e) {
    console.error(`停止心率监测错误: ${e.message}`)
    return false
  }
}

/**
 * 更新心率统计数据
 * @private
 */
function updateHeartRateStats() {
  if (heartRateHistory.length === 0) return
  
  // 计算最小值、最大值和平均值
  const values = heartRateHistory.map(item => item.value)
  heartRateStats.min = Math.min(...values)
  heartRateStats.max = Math.max(...values)
  
  // 计算平均值
  const sum = values.reduce((acc, val) => acc + val, 0)
  heartRateStats.avg = Math.round(sum / values.length)
}

/**
 * 获取心率统计数据
 * @returns {Object} 心率统计数据
 */
export function getHeartRateStats() {
  return { ...heartRateStats }
}

/**
 * 获取心率历史数据
 * @param {number} limit - 限制返回的数据点数量，0表示返回全部
 * @returns {Array} 心率历史数据
 */
export function getHeartRateHistory(limit = 0) {
  if (limit <= 0 || limit >= heartRateHistory.length) {
    return [...heartRateHistory]
  }
  
  // 返回最近的n条记录
  return heartRateHistory.slice(-limit)
}

/**
 * 检查心率是否超出安全范围
 * @param {number} min - 最小安全心率
 * @param {number} max - 最大安全心率
 * @returns {Object} 检查结果
 */
export function checkHeartRateWarning(min, max) {
  const current = heartRateStats.current
  
  if (current <= 0) {
    return { isWarning: false, type: 'normal' }
  }
  
  if (current < min) {
    return { isWarning: true, type: 'low', value: current }
  }
  
  if (current > max) {
    return { isWarning: true, type: 'high', value: current }
  }
  
  return { isWarning: false, type: 'normal', value: current }
} 