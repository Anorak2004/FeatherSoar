/**
 * 数据存储模块
 * 负责本地数据库操作
 */
import dbManager from '../core/utils/database'

/**
 * 保存会话数据到数据库
 * @param {Object} session - 会话数据
 * @returns {Promise} 操作结果Promise
 */
export function saveSession(session) {
  return new Promise((resolve, reject) => {
    try {
      // 构建SQL语句
      const sql = `
        INSERT INTO sessions (
          mode, start_time, end_time, duration, calories, 
          max_speed, avg_heart_rate, max_heart_rate, min_heart_rate, 
          strokes, smashes, forehand, backhand, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
      
      // 准备参数
      const params = [
        session.mode || 'singles',
        session.startTime || Date.now(),
        session.endTime || 0,
        session.duration || 0,
        session.calories || 0,
        session.maxSpeed || 0,
        session.avgHeartRate || 0,
        session.maxHeartRate || 0,
        session.minHeartRate || 0,
        session.strokes || 0,
        session.smashes || 0,
        session.forehand || 0,
        session.backhand || 0,
        session.notes || ''
      ]
      
      // 执行SQL
      dbManager.executeSql({
        sql,
        args: params
      })
      .then(data => {
        console.log('会话保存成功', data)
        resolve(data.insertId || 0)
      })
      .catch(err => {
        console.error('会话保存失败:', err)
        reject(err)
      })
    } catch (e) {
      console.error('保存会话出错:', e.message)
      reject(e)
    }
  })
}

/**
 * 获取所有会话数据
 * @param {number} limit - 限制返回的记录数量，0表示不限制
 * @param {number} offset - 偏移量
 * @returns {Promise} 会话数据Promise
 */
export function getAllSessions(limit = 0, offset = 0) {
  return new Promise((resolve, reject) => {
    try {
      // 构建SQL语句
      let sql = 'SELECT * FROM sessions ORDER BY start_time DESC'
      
      if (limit > 0) {
        sql += ` LIMIT ${limit}`
        
        if (offset > 0) {
          sql += ` OFFSET ${offset}`
        }
      }
      
      // 执行SQL
      dbManager.executeSql({
        sql
      })
      .then(data => {
        resolve(data && data.rows ? data.rows : [])
      })
      .catch(err => {
        console.error('获取会话失败:', err)
        // 遇到数据库错误时返回空数组，而不是拒绝Promise
        resolve([])
      })
    } catch (e) {
      console.error('获取会话出错，返回空数组:', e.message)
      // 遇到异常时返回空数组，而不是拒绝Promise
      resolve([])
    }
  })
}

/**
 * 获取历史记录列表（带分页）
 * @param {number} page - 当前页码，从1开始
 * @param {number} pageSize - 每页条数
 * @returns {Promise} 包含会话列表和总数的Promise
 */
export function getHistoryList(page = 1, pageSize = 20) {
  return new Promise((resolve, reject) => {
    try {
      // 确保参数合法
      if (page < 1) page = 1
      if (pageSize < 1) pageSize = 20
      
      const offset = (page - 1) * pageSize
      
      // 构建SQL语句
      const countSql = 'SELECT COUNT(*) as total FROM sessions'
      const dataSql = `SELECT * FROM sessions ORDER BY start_time DESC LIMIT ${pageSize} OFFSET ${offset}`
      
      // 先查询总数
      dbManager.executeSql({
        sql: countSql
      })
      .then(countResult => {
        const total = (countResult.rows && countResult.rows[0]) ? countResult.rows[0].total : 0
        
        // 再查询数据
        return dbManager.executeSql({
          sql: dataSql
        })
        .then(dataResult => {
          const items = dataResult.rows || []
          
          // 格式化数据
          const formattedItems = items.map(item => {
            return {
              id: item.id,
              mode: item.mode,
              date: item.start_time,
              duration: item.duration,
              calories: item.calories || 0,
              strokes: item.strokes || 0,
              avgHeartRate: item.avg_heart_rate || 0,
              maxHeartRate: item.max_heart_rate || 0,
              minHeartRate: item.min_heart_rate || 0,
              maxSpeed: item.max_speed || 0,
              smashes: item.smashes || 0,
              forehand: item.forehand || 0,
              backhand: item.backhand || 0
            }
          })
          
          resolve({
            total,
            items: formattedItems,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize)
          })
        })
      })
      .catch(err => {
        console.error('获取历史记录失败:', err)
        // 返回空结果，而不是拒绝Promise
        resolve({
          total: 0,
          items: [],
          page,
          pageSize,
          totalPages: 0
        })
      })
    } catch (e) {
      console.error('获取历史记录出错，返回空结果:', e.message)
      // 返回空结果，而不是拒绝Promise
      resolve({
        total: 0,
        items: [],
        page,
        pageSize,
        totalPages: 0
      })
    }
  })
}

/**
 * 获取单个会话数据
 * @param {number} sessionId - 会话ID
 * @returns {Promise} 会话数据Promise
 */
export function getSessionById(sessionId) {
  return new Promise((resolve, reject) => {
    try {
      // 确保sessionId有效
      if (!sessionId || isNaN(sessionId)) {
        reject(new Error('无效的会话ID'))
        return
      }
      
      // 构建SQL语句
      const sql = 'SELECT * FROM sessions WHERE id = ?'
      
      // 执行SQL
      dbManager.executeSql({
        sql,
        args: [sessionId]
      })
      .then(data => {
        if (data && data.rows && data.rows.length > 0) {
          resolve(data.rows[0])
        } else {
          reject(new Error('未找到指定会话'))
        }
      })
      .catch(err => {
        console.error('获取会话失败:', err)
        reject(err)
      })
    } catch (e) {
      console.error('获取会话出错:', e.message)
      reject(e)
    }
  })
}

/**
 * 更新会话数据
 * @param {number} sessionId - 会话ID
 * @param {Object} updates - 需要更新的字段
 * @returns {Promise} 操作结果Promise
 */
export function updateSession(sessionId, updates) {
  return new Promise((resolve, reject) => {
    try {
      // 确保参数有效
      if (!sessionId || isNaN(sessionId)) {
        reject(new Error('无效的会话ID'))
        return
      }
      
      if (!updates || typeof updates !== 'object') {
        reject(new Error('无效的更新数据'))
        return
      }
      
      // 构建更新字段
      const fields = []
      const values = []
      
      Object.keys(updates).forEach(key => {
        // 转换驼峰命名为下划线命名
        const fieldName = key.replace(/([A-Z])/g, '_$1').toLowerCase()
        fields.push(`${fieldName} = ?`)
        values.push(updates[key])
      })
      
      if (fields.length === 0) {
        resolve(0) // 没有字段需要更新
        return
      }
      
      // 添加ID参数
      values.push(sessionId)
      
      // 构建SQL语句
      const sql = `UPDATE sessions SET ${fields.join(', ')} WHERE id = ?`
      
      // 执行SQL
      dbManager.executeSql({
        sql,
        args: values
      })
      .then(data => {
        resolve(data.rowsAffected || 0)
      })
      .catch(err => {
        console.error('更新会话失败:', err)
        reject(err)
      })
    } catch (e) {
      console.error('更新会话出错:', e.message)
      reject(e)
    }
  })
}

/**
 * 删除会话数据
 * @param {number} sessionId - 会话ID
 * @returns {Promise} 操作结果Promise
 */
export function deleteSession(sessionId) {
  return new Promise((resolve, reject) => {
    try {
      // 确保sessionId有效
      if (!sessionId || isNaN(sessionId)) {
        reject(new Error('无效的会话ID'))
        return
      }
      
      // 构建SQL语句
      const sql = 'DELETE FROM sessions WHERE id = ?'
      
      // 执行SQL
      dbManager.executeSql({
        sql,
        args: [sessionId]
      })
      .then(data => {
        resolve(data.rowsAffected || 0)
      })
      .catch(err => {
        console.error('删除会话失败:', err)
        reject(err)
      })
    } catch (e) {
      console.error('删除会话出错:', e.message)
      reject(e)
    }
  })
}

/**
 * 保存报告数据
 * @param {Object} sessionData - 会话数据
 * @returns {Promise} 操作结果Promise
 */
export function saveReport(sessionData) {
  // 目前直接调用saveSession，后续可能会有不同的处理
  return saveSession(sessionData)
}

/**
 * 获取用户设置
 * @returns {Promise} 用户设置Promise
 */
export function getUserSettings() {
  return new Promise((resolve) => {
    // 目前返回默认设置，后续可能会从数据库或存储中获取
    resolve({
      heartRateMin: global.CONSTANTS.HEART_RATE.MIN,
      heartRateMax: global.CONSTANTS.HEART_RATE.MAX,
      defaultMode: global.CONSTANTS.MODE.SINGLES,
      vibrationEnabled: true,
      soundEnabled: true,
      autoEndSession: true,
      autoEndTimeout: 300 // 5分钟无活动自动结束
    })
  })
}

/**
 * 保存用户设置
 * @param {Object} settings - 用户设置
 * @returns {Promise} 操作结果Promise
 */
export function saveUserSettings(settings) {
  return new Promise((resolve) => {
    // 目前直接返回成功，后续可能会保存到数据库或存储中
    resolve(true)
  })
}

/**
 * 清除所有数据
 * @returns {Promise} 操作结果Promise
 */
export function clearAllData() {
  return new Promise((resolve, reject) => {
    try {
      // 构建SQL语句
      const sql = 'DELETE FROM sessions'
      
      // 执行SQL
      dbManager.executeSql({
        sql
      })
      .then(data => {
        resolve(data.rowsAffected || 0)
      })
      .catch(err => {
        console.error('清除数据失败:', err)
        reject(err)
      })
    } catch (e) {
      console.error('清除数据出错:', e.message)
      reject(e)
    }
  })
} 