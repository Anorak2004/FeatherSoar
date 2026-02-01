/**
 * 数据存储模块
 * 负责本地数据库操作
 */
import dbManager from '../core/utils/database'

function serializeSeries(series) {
  if (!series || !Array.isArray(series)) return null
  try {
    return JSON.stringify(series)
  } catch (e) {
    console.error('序列化失败:', e)
    return null
  }
}

function parseSeries(payload) {
  if (!payload) return []
  if (Array.isArray(payload)) return payload
  try {
    return JSON.parse(payload)
  } catch (e) {
    console.error('解析序列失败:', e)
    return []
  }
}

function serializeScoreboard(scoreboard) {
  if (!scoreboard) return null
  try {
    return JSON.stringify(scoreboard)
  } catch (e) {
    console.error('scoreboard 序列化失败:', e)
    return null
  }
}

function parseScoreboard(payload) {
  if (!payload) return null
  if (typeof payload === 'object') return payload
  try {
    return JSON.parse(payload)
  } catch (e) {
    console.error('scoreboard 解析失败:', e)
    return null
  }
}

function serializeWarningEvents(events) {
  if (!events || !Array.isArray(events)) return null
  try {
    return JSON.stringify(events)
  } catch (e) {
    console.error('序列化预警事件失败:', e)
    return null
  }
}

function parseWarningEvents(payload) {
  if (!payload) return []
  if (Array.isArray(payload)) return payload
  try {
    return JSON.parse(payload)
  } catch (e) {
    console.error('解析预警事件失败:', e)
    return []
  }
}

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
          strokes, smashes, forehand, backhand, notes, heart_rate_series, speed_series,
          scoreboard, heart_rate_warning_events, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
      
      // 准备参数
      const now = Date.now()
      const params = [
        session.mode || 'singles',
        session.startTime || now,
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
        session.notes || '',
        serializeSeries(session.heartRateSeries || session.heart_rate_series),
        serializeSeries(session.speedSeries || session.speed_series),
        serializeScoreboard(session.scoreboard || session.scoreboard_data),
        serializeWarningEvents(session.heartRateWarningEvents || session.heart_rate_warning_events),
        now
      ]
      
      // 执行SQL
      dbManager.executeSql({
        sql,
        args: params
      })
      .then(data => {
        console.log('会话保存成功', data)
        resolve((data && data.insertId) || 0)
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
        const rows = data && data.rows ? data.rows : []
        const formatted = rows.map(item => ({
          ...item,
          heartRateSeries: parseSeries(item.heart_rate_series),
          speedSeries: parseSeries(item.speed_series),
          scoreboard: parseScoreboard(item.scoreboard),
          heartRateWarningEvents: parseWarningEvents(item.heart_rate_warning_events)
        }))
        resolve(formatted)
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
              backhand: item.backhand || 0,
              heartRateSeries: parseSeries(item.heart_rate_series),
              speedSeries: parseSeries(item.speed_series),
              scoreboard: parseScoreboard(item.scoreboard),
              heartRateWarningEvents: parseWarningEvents(item.heart_rate_warning_events)
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
 * 获取指定时间范围内的统计数据
 * @param {number} startTime - 开始时间戳（毫秒）
 * @param {number} endTime - 结束时间戳（毫秒）
 * @returns {Promise} 统计数据Promise
 * @returns {Promise<{totalDuration:number,totalCalories:number,totalStrokes:number,avgHeartRate:number,heartRateSeries:Array<{t:number,v:number}>,speedSeries:Array<{t:number,v:number}>}>} 统计结果
 * 说明：心率/拍速序列以会话 start_time 为横轴；心率使用 avg_heart_rate，拍速使用 max_speed；avgHeartRate 为时长加权平均。
 */
export function getStatsByRange(startTime, endTime) {
  return new Promise((resolve, reject) => {
    try {
      if (!startTime || !endTime || isNaN(startTime) || isNaN(endTime)) {
        resolve({
          totalDuration: 0,
          totalCalories: 0,
          totalStrokes: 0,
          avgHeartRate: 0,
          heartRateSeries: [],
          speedSeries: []
        })
        return
      }

      const sql = `SELECT * FROM sessions WHERE start_time >= ? AND start_time < ? ORDER BY start_time ASC`

      dbManager.executeSql({
        sql,
        args: [startTime, endTime]
      })
      .then(data => {
        const rows = data && data.rows ? data.rows : []
        if (!rows.length) {
          resolve({
            totalDuration: 0,
            totalCalories: 0,
            totalStrokes: 0,
            avgHeartRate: 0,
            heartRateSeries: [],
            speedSeries: []
          })
          return
        }

        let totalDuration = 0
        let totalCalories = 0
        let totalStrokes = 0
        let totalHeartWeighted = 0

        const heartRateSeries = []
        const speedSeries = []

        rows.forEach(item => {
          const duration = item.duration || 0
          const calories = item.calories || 0
          const strokes = item.strokes || 0
          const avgHeartRate = item.avg_heart_rate || 0
          const maxSpeed = item.max_speed || 0

          totalDuration += duration
          totalCalories += calories
          totalStrokes += strokes
          totalHeartWeighted += avgHeartRate * duration

          heartRateSeries.push({
            t: item.start_time,
            v: avgHeartRate
          })
          speedSeries.push({
            t: item.start_time,
            v: maxSpeed
          })
        })

        const avgHeartRate = totalDuration ? Math.round(totalHeartWeighted / totalDuration) : 0

        resolve({
          totalDuration,
          totalCalories: Math.round(totalCalories),
          totalStrokes,
          avgHeartRate,
          heartRateSeries,
          speedSeries
        })
      })
      .catch(err => {
        console.error('获取统计数据失败:', err)
        resolve({
          totalDuration: 0,
          totalCalories: 0,
          totalStrokes: 0,
          avgHeartRate: 0,
          heartRateSeries: [],
          speedSeries: []
        })
      })
    } catch (e) {
      console.error('获取统计数据出错:', e.message)
      resolve({
        totalDuration: 0,
        totalCalories: 0,
        totalStrokes: 0,
        avgHeartRate: 0,
        heartRateSeries: [],
        speedSeries: []
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
          const row = data.rows[0]
          resolve({
            ...row,
            heartRateSeries: parseSeries(row.heart_rate_series),
            speedSeries: parseSeries(row.speed_series),
            scoreboard: parseScoreboard(row.scoreboard),
            heartRateWarningEvents: parseWarningEvents(row.heart_rate_warning_events)
          })
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

      const normalizedUpdates = { ...updates }

      if (Object.prototype.hasOwnProperty.call(normalizedUpdates, 'heartRateSeries')) {
        normalizedUpdates.heart_rate_series = serializeSeries(normalizedUpdates.heartRateSeries)
        delete normalizedUpdates.heartRateSeries
      }

      if (Object.prototype.hasOwnProperty.call(normalizedUpdates, 'speedSeries')) {
        normalizedUpdates.speed_series = serializeSeries(normalizedUpdates.speedSeries)
        delete normalizedUpdates.speedSeries
      }

      if (Object.prototype.hasOwnProperty.call(normalizedUpdates, 'scoreboard')) {
        normalizedUpdates.scoreboard = serializeScoreboard(normalizedUpdates.scoreboard)
      }

      if (Object.prototype.hasOwnProperty.call(normalizedUpdates, 'scoreboard_data')) {
        normalizedUpdates.scoreboard = serializeScoreboard(normalizedUpdates.scoreboard_data)
        delete normalizedUpdates.scoreboard_data
      }

      if (Object.prototype.hasOwnProperty.call(normalizedUpdates, 'heartRateWarningEvents')) {
        normalizedUpdates.heart_rate_warning_events = serializeWarningEvents(normalizedUpdates.heartRateWarningEvents)
        delete normalizedUpdates.heartRateWarningEvents
      }
      
      // 构建更新字段
      const fields = []
      const values = []
      
      Object.keys(normalizedUpdates).forEach(key => {
        // 转换驼峰命名为下划线命名
        const fieldName = key.replace(/([A-Z])/g, '_$1').toLowerCase()
        fields.push(`${fieldName} = ?`)
        values.push(normalizedUpdates[key])
      })
      
      if (fields.length === 0) {
        resolve(0) // 没有字段需要更新
        return
      }
      
      // 添加ID参数
      values.push(sessionId)
      
      // 构建SQL语句
      const sql = `UPDATE sessions SET ${fields.join(', ')}, updated_at = ? WHERE id = ?`
      values.splice(values.length - 1, 0, Date.now())
      
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
  if (sessionData && sessionData.id) {
    const updates = {
      mode: sessionData.mode,
      startTime: sessionData.startTime,
      endTime: sessionData.endTime,
      duration: sessionData.duration,
      calories: sessionData.calories,
      maxSpeed: sessionData.maxSpeed,
      avgHeartRate: sessionData.avgHeartRate,
      maxHeartRate: sessionData.maxHeartRate,
      minHeartRate: sessionData.minHeartRate,
      strokes: sessionData.strokes,
      smashes: sessionData.smashes,
      forehand: sessionData.forehand,
      backhand: sessionData.backhand,
      notes: sessionData.notes,
      heartRateSeries: sessionData.heartRateSeries || sessionData.heart_rate_series,
      speedSeries: sessionData.speedSeries || sessionData.speed_series,
      scoreboard: sessionData.scoreboard || sessionData.scoreboard_data,
      heartRateWarningEvents: sessionData.heartRateWarningEvents || sessionData.heart_rate_warning_events
    }

    return updateSession(sessionData.id, updates).then(() => sessionData.id)
  }

  return saveSession(sessionData)
}

/**
 * 获取用户设置
 * @returns {Promise} 用户设置Promise
 */
export function getUserSettings() {
  return new Promise((resolve) => {
    const sql = 'SELECT data FROM user_settings WHERE id = 1'

    dbManager.executeSql({
      sql
    })
      .then(data => {
        const row = data && data.rows && data.rows[0] ? data.rows[0] : null
        if (!row || !row.data) {
          resolve(null)
          return
        }

        try {
          resolve(JSON.parse(row.data))
        } catch (e) {
          console.error('解析用户设置失败:', e.message)
          resolve(null)
        }
      })
      .catch(err => {
        console.error('获取用户设置失败:', err)
        resolve(null)
      })
  })
}

/**
 * 保存用户设置
 * @param {Object} settings - 用户设置
 * @returns {Promise} 操作结果Promise
 */
export function saveUserSettings(settings) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(settings || {})
    const now = Date.now()
    const sql = `
      INSERT INTO user_settings (id, data, updated_at)
      VALUES (1, ?, ?)
      ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at
    `

    dbManager.executeSql({
      sql,
      args: [payload, now]
    })
      .then(() => resolve(true))
      .catch(err => {
        console.error('保存用户设置失败:', err)
        reject(err)
      })
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