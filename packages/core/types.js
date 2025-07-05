/**
 * 类型定义
 * 注意：由于JavaScript不支持类型，这里只是通过JSDoc注释提供类型信息
 */

/**
 * 运动会话数据
 * @typedef {Object} Session
 * @property {number} id - 会话ID
 * @property {string} mode - 运动模式 ('singles', 'doubles', 'mixed')
 * @property {number} startTime - 开始时间戳
 * @property {number} endTime - 结束时间戳
 * @property {number} duration - 持续时间（秒）
 * @property {number} calories - 卡路里消耗
 * @property {number} maxSpeed - 最高拍速
 * @property {number} avgHeartRate - 平均心率
 * @property {number} maxHeartRate - 最高心率
 * @property {number} minHeartRate - 最低心率
 * @property {number} strokes - 总挥拍次数
 * @property {number} smashes - 杀球次数
 * @property {number} forehand - 正手次数
 * @property {number} backhand - 反手次数
 * @property {string} notes - 备注
 */

/**
 * 实时数据点
 * @typedef {Object} DataPoint
 * @property {number} timestamp - 时间戳
 * @property {number} heartRate - 心率
 * @property {number} speed - 拍速
 * @property {boolean} isSmash - 是否为杀球
 * @property {boolean} isForehand - 是否为正手
 */

/**
 * 用户设置
 * @typedef {Object} Settings
 * @property {number} heartRateMin - 心率下限
 * @property {number} heartRateMax - 心率上限
 * @property {boolean} vibrateOnWarning - 预警时是否振动
 * @property {boolean} syncWithHealth - 是否同步到健康App
 * @property {boolean} darkMode - 是否使用深色模式
 */

/**
 * 创建一个新的会话对象
 * @param {string} mode - 运动模式
 * @returns {Session} 新会话对象
 */
export function createSession(mode) {
  const startTime = Date.now()
  
  return {
    id: startTime,
    mode,
    startTime,
    endTime: null,
    duration: 0,
    calories: 0,
    maxSpeed: 0,
    avgHeartRate: 0,
    maxHeartRate: 0,
    minHeartRate: 0,
    strokes: 0,
    smashes: 0,
    forehand: 0,
    backhand: 0,
    notes: ''
  }
}

/**
 * 创建一个新的数据点
 * @param {number} heartRate - 心率
 * @param {number} speed - 拍速
 * @param {boolean} isSmash - 是否为杀球
 * @param {boolean} isForehand - 是否为正手
 * @returns {DataPoint} 新数据点
 */
export function createDataPoint(heartRate, speed, isSmash = false, isForehand = true) {
  return {
    timestamp: Date.now(),
    heartRate,
    speed,
    isSmash,
    isForehand
  }
} 