/**
 * API调用模块
 */

// API基础URL
const API_BASE_URL = 'https://api.feathersoar.com/v1'

// API端点
const API_ENDPOINTS = {
  SYNC: '/sync',
  PROFILE: '/profile',
  SESSIONS: '/sessions',
  LEADERBOARD: '/leaderboard'
}

// 默认请求头
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

/**
 * 发送HTTP请求
 * @param {string} url - 请求URL
 * @param {string} method - 请求方法 (GET, POST, PUT, DELETE)
 * @param {Object} data - 请求数据
 * @param {Object} headers - 请求头
 * @returns {Promise} 响应Promise
 */
function request(url, method = 'GET', data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText)
            resolve(response)
          } catch (e) {
            resolve(xhr.responseText)
          }
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
            response: xhr.responseText
          })
        }
      }
    }
    
    xhr.onerror = function() {
      reject({
        status: xhr.status,
        statusText: xhr.statusText,
        response: xhr.responseText
      })
    }
    
    xhr.open(method, url, true)
    
    // 设置请求头
    const requestHeaders = { ...DEFAULT_HEADERS, ...headers }
    Object.keys(requestHeaders).forEach(key => {
      xhr.setRequestHeader(key, requestHeaders[key])
    })
    
    // 发送请求
    if (data) {
      xhr.send(JSON.stringify(data))
    } else {
      xhr.send()
    }
  })
}

/**
 * 同步会话数据到服务器
 * @param {Object} sessionData - 会话数据
 * @param {string} token - 用户令牌
 * @returns {Promise} 响应Promise
 */
export function syncSession(sessionData, token) {
  return request(
    `${API_BASE_URL}${API_ENDPOINTS.SYNC}`,
    'POST',
    sessionData,
    {
      'Authorization': `Bearer ${token}`
    }
  )
}

/**
 * 获取用户个人资料
 * @param {string} token - 用户令牌
 * @returns {Promise} 响应Promise
 */
export function getProfile(token) {
  return request(
    `${API_BASE_URL}${API_ENDPOINTS.PROFILE}`,
    'GET',
    null,
    {
      'Authorization': `Bearer ${token}`
    }
  )
}

/**
 * 获取用户会话历史
 * @param {string} token - 用户令牌
 * @param {Object} params - 查询参数
 * @returns {Promise} 响应Promise
 */
export function getSessions(token, params = {}) {
  // 构建查询字符串
  const queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
  
  const url = `${API_BASE_URL}${API_ENDPOINTS.SESSIONS}${queryString ? `?${queryString}` : ''}`
  
  return request(
    url,
    'GET',
    null,
    {
      'Authorization': `Bearer ${token}`
    }
  )
}

/**
 * 获取排行榜数据
 * @param {string} token - 用户令牌
 * @param {string} type - 排行榜类型 ('weekly', 'friends')
 * @returns {Promise} 响应Promise
 */
export function getLeaderboard(token, type = 'weekly') {
  return request(
    `${API_BASE_URL}${API_ENDPOINTS.LEADERBOARD}?type=${type}`,
    'GET',
    null,
    {
      'Authorization': `Bearer ${token}`
    }
  )
} 