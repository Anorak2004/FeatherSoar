/**
 * 健康数据同步模块
 * 负责与系统健康App同步运动数据
 */

/**
 * 同步运动会话到健康App
 * @param {Object} session - 运动会话数据
 * @returns {Promise} 同步结果Promise
 */
export function syncWorkout(session) {
  return new Promise((resolve, reject) => {
    try {
      // 检查session是否有效
      if (!session || !session.startTime || !session.endTime) {
        reject(new Error('无效的会话数据'))
        return
      }
      
      // 计算持续时间（毫秒）
      const durationMs = session.endTime - session.startTime
      
      // 构建健康App需要的数据格式
      const workoutData = {
        // 运动类型为羽毛球
        type: 'badminton',
        // 开始时间
        startTime: session.startTime,
        // 持续时间（毫秒）
        duration: durationMs,
        // 卡路里消耗
        calories: session.calories || 0,
        // 平均心率
        avgHeartRate: session.avgHeartRate || 0,
        // 最大心率
        maxHeartRate: session.maxHeartRate || 0,
        // 附加数据
        extra: {
          // 羽毛球特有数据
          strokes: session.strokes || 0,
          smashes: session.smashes || 0,
          maxSpeed: session.maxSpeed || 0
        }
      }
      
      // 调用健康App API
      global.workout.addRecord({
        record: workoutData,
        success: (data) => {
          console.log('运动数据同步成功', data)
          resolve(data)
        },
        fail: (data, code) => {
          console.error(`运动数据同步失败: ${code}`, data)
          reject(new Error(`同步失败: ${code}`))
        }
      })
    } catch (e) {
      console.error('同步健康数据出错:', e.message)
      reject(e)
    }
  })
}

/**
 * 检查健康App同步权限
 * @returns {Promise} 权限状态Promise
 */
export function checkHealthPermission() {
  return new Promise((resolve, reject) => {
    try {
      global.workout.hasPermission({
        success: (data) => {
          resolve(data.result)
        },
        fail: (data, code) => {
          console.error(`检查健康权限失败: ${code}`, data)
          reject(new Error(`检查权限失败: ${code}`))
        }
      })
    } catch (e) {
      console.error('检查健康权限出错:', e.message)
      reject(e)
    }
  })
}

/**
 * 请求健康App权限
 * @returns {Promise} 权限请求结果Promise
 */
export function requestHealthPermission() {
  return new Promise((resolve, reject) => {
    try {
      global.workout.requestPermission({
        success: (data) => {
          resolve(data.result)
        },
        fail: (data, code) => {
          console.error(`请求健康权限失败: ${code}`, data)
          reject(new Error(`请求权限失败: ${code}`))
        }
      })
    } catch (e) {
      console.error('请求健康权限出错:', e.message)
      reject(e)
    }
  })
} 