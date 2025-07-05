/**
 * 传感器数据采集模块
 */

/**
 * 加速度数据回调函数
 * @callback AccelerometerCallback
 * @param {Object} data - 加速度数据
 * @param {number} data.x - X轴加速度
 * @param {number} data.y - Y轴加速度
 * @param {number} data.z - Z轴加速度
 */

/**
 * 陀螺仪数据回调函数
 * @callback GyroscopeCallback
 * @param {Object} data - 陀螺仪数据
 * @param {number} data.x - X轴角速度
 * @param {number} data.y - Y轴角速度
 * @param {number} data.z - Z轴角速度
 */

let accelerometerSubscription = null
let gyroscopeSubscription = null

/**
 * 开始监听加速度传感器
 * @param {AccelerometerCallback} callback - 数据回调函数
 * @param {number} interval - 采样间隔（毫秒），默认20ms (50Hz)
 * @returns {boolean} 是否成功开始监听
 */
export function startAccelerometerListening(callback, interval = 20) {
  try {
    // 确保先停止之前的订阅
    stopAccelerometerListening()
    
    accelerometerSubscription = global.accelerometer.subscribe({
      interval,
      success: (data) => {
        callback(data)
      },
      fail: (data, code) => {
        console.error(`加速度传感器订阅失败: ${code}`)
        return false
      }
    })
    
    return true
  } catch (e) {
    console.error(`加速度传感器错误: ${e.message}`)
    return false
  }
}

/**
 * 停止监听加速度传感器
 * @returns {boolean} 是否成功停止监听
 */
export function stopAccelerometerListening() {
  try {
    if (accelerometerSubscription) {
      accelerometerSubscription.unsubscribe()
      accelerometerSubscription = null
    }
    return true
  } catch (e) {
    console.error(`停止加速度传感器错误: ${e.message}`)
    return false
  }
}

/**
 * 开始监听陀螺仪传感器
 * @param {GyroscopeCallback} callback - 数据回调函数
 * @param {number} interval - 采样间隔（毫秒），默认20ms (50Hz)
 * @returns {boolean} 是否成功开始监听
 */
export function startGyroscopeListening(callback, interval = 20) {
  try {
    // 确保先停止之前的订阅
    stopGyroscopeListening()
    
    gyroscopeSubscription = global.gyroscope.subscribe({
      interval,
      success: (data) => {
        callback(data)
      },
      fail: (data, code) => {
        console.error(`陀螺仪传感器订阅失败: ${code}`)
        return false
      }
    })
    
    return true
  } catch (e) {
    console.error(`陀螺仪传感器错误: ${e.message}`)
    return false
  }
}

/**
 * 停止监听陀螺仪传感器
 * @returns {boolean} 是否成功停止监听
 */
export function stopGyroscopeListening() {
  try {
    if (gyroscopeSubscription) {
      gyroscopeSubscription.unsubscribe()
      gyroscopeSubscription = null
    }
    return true
  } catch (e) {
    console.error(`停止陀螺仪传感器错误: ${e.message}`)
    return false
  }
}

/**
 * 计算加速度合力
 * @param {Object} data - 加速度数据
 * @returns {number} 加速度合力值
 */
export function calculateAccelerationMagnitude(data) {
  const { x, y, z } = data
  return Math.sqrt(x * x + y * y + z * z)
}

/**
 * 计算角速度合力
 * @param {Object} data - 陀螺仪数据
 * @returns {number} 角速度合力值
 */
export function calculateGyroscopeMagnitude(data) {
  const { x, y, z } = data
  return Math.sqrt(x * x + y * y + z * z)
} 