/**
 * 存储工具类 - 使用BlueOS storage API
 */

// 在实际环境中应该使用以下方式导入
// import storage from '@blueos.storage.storage';

// 创建一个模拟的storage API
const mockStorage = {
  get(options) {
    console.log('使用模拟storage.get', options.key);
    if (typeof options.success === 'function') {
      options.success('');
    }
  },
  getSync(options) {
    console.log('使用模拟storage.getSync', options.key);
    return '';
  },
  set(options) {
    console.log('使用模拟storage.set', options.key);
    if (typeof options.success === 'function') {
      options.success();
    }
  },
  delete(options) {
    console.log('使用模拟storage.delete', options.key);
    if (typeof options.success === 'function') {
      options.success();
    }
  },
  clear(options) {
    console.log('使用模拟storage.clear');
    if (typeof options.success === 'function') {
      options.success();
    }
  }
};

/**
 * 解析JSON数据，处理可能的错误
 * @param {string} data - JSON字符串
 * @param {any} defaultValue - 解析失败时的默认值
 * @returns {any} 解析后的数据或默认值
 */
function safeParseJSON(data, defaultValue) {
  if (!data) return defaultValue;
  
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('JSON解析错误:', e);
    return defaultValue;
  }
}

/**
 * 存储管理器
 */
const storageManager = {
  /**
   * 初始化存储
   * @returns {Promise} 初始化Promise
   */
  init() {
    return Promise.resolve();
  },

  /**
   * 保存运动会话
   * @param {Object} session - 运动会话数据
   * @returns {Promise} 保存Promise
   */
  saveSession(session) {
    return new Promise((resolve) => {
      try {
        // 获取现有会话列表
        const sessions = this.getAllSessionsSync() || [];
        
        // 生成唯一ID
        const newSession = { ...session, id: Date.now() };
        
        // 添加到列表
        sessions.push(newSession);
        
        // 保存会话列表
        mockStorage.set({
          key: 'sessions',
          value: JSON.stringify(sessions),
          success: () => resolve(newSession),
          fail: () => resolve(newSession)
        });
      } catch (e) {
        console.error('保存会话错误:', e);
        resolve({ ...session, id: Date.now() });
      }
    });
  },

  /**
   * 获取所有运动会话
   * @returns {Promise<Array>} 会话列表Promise
   */
  getAllSessions() {
    return new Promise((resolve) => {
      try {
        mockStorage.get({
          key: 'sessions',
          success: (data) => {
            const sessions = safeParseJSON(data, []);
            resolve(Array.isArray(sessions) ? sessions : []);
          },
          fail: () => resolve([])
        });
      } catch (e) {
        console.error('获取会话列表错误:', e);
        resolve([]);
      }
    });
  },

  /**
   * 同步获取所有运动会话
   * @returns {Array} 会话列表
   */
  getAllSessionsSync() {
    try {
      const data = mockStorage.getSync({ key: 'sessions' });
      const sessions = safeParseJSON(data, []);
      return Array.isArray(sessions) ? sessions : [];
    } catch (e) {
      console.error('同步获取会话列表错误:', e);
      return [];
    }
  },

  /**
   * 获取运动会话
   * @param {number} id - 会话ID
   * @returns {Promise<Object|null>} 会话Promise
   */
  getSession(id) {
    return new Promise((resolve) => {
      this.getAllSessions().then(sessions => {
        const session = sessions.find(s => s && s.id === id) || null;
        resolve(session);
      });
    });
  },

  /**
   * 更新运动会话
   * @param {Object} session - 会话数据
   * @returns {Promise<boolean>} 更新结果Promise
   */
  updateSession(session) {
    return new Promise((resolve) => {
      try {
        if (!session || !session.id) {
          resolve(false);
          return;
        }
        
        this.getAllSessions().then(sessions => {
          const index = sessions.findIndex(s => s && s.id === session.id);
          if (index !== -1) {
            sessions[index] = session;
            mockStorage.set({
              key: 'sessions',
              value: JSON.stringify(sessions),
              success: () => resolve(true),
              fail: () => resolve(false)
            });
          } else {
            resolve(false);
          }
        });
      } catch (e) {
        console.error('更新会话错误:', e);
        resolve(false);
      }
    });
  },

  /**
   * 删除运动会话
   * @param {number} id - 会话ID
   * @returns {Promise<boolean>} 删除结果Promise
   */
  deleteSession(id) {
    return new Promise((resolve) => {
      try {
        this.getAllSessions().then(sessions => {
          const filteredSessions = sessions.filter(s => s && s.id !== id);
          if (filteredSessions.length !== sessions.length) {
            mockStorage.set({
              key: 'sessions',
              value: JSON.stringify(filteredSessions),
              success: () => resolve(true),
              fail: () => resolve(false)
            });
          } else {
            resolve(false);
          }
        });
      } catch (e) {
        console.error('删除会话错误:', e);
        resolve(false);
      }
    });
  },

  /**
   * 清空所有会话
   * @returns {Promise<boolean>} 清空结果Promise
   */
  clearAllSessions() {
    return new Promise((resolve) => {
      try {
        mockStorage.delete({
          key: 'sessions',
          success: () => resolve(true),
          fail: () => resolve(false)
        });
      } catch (e) {
        console.error('清空会话错误:', e);
        resolve(false);
      }
    });
  },

  /**
   * 保存用户设置
   * @param {Object} settings - 用户设置
   * @returns {Promise<boolean>} 保存结果Promise
   */
  saveSettings(settings) {
    return new Promise((resolve) => {
      try {
        const validSettings = settings || {};
        
        mockStorage.set({
          key: 'settings',
          value: JSON.stringify(validSettings),
          success: () => resolve(true),
          fail: () => resolve(false)
        });
      } catch (e) {
        console.error('保存设置错误:', e);
        resolve(false);
      }
    });
  },

  /**
   * 获取用户设置
   * @returns {Promise<Object>} 用户设置Promise
   */
  getSettings() {
    return new Promise((resolve) => {
      try {
        mockStorage.get({
          key: 'settings',
          success: (data) => {
            const settings = safeParseJSON(data, {});
            resolve(typeof settings === 'object' && settings !== null ? settings : {});
          },
          fail: () => resolve({})
        });
      } catch (e) {
        console.error('获取设置错误:', e);
        resolve({});
      }
    });
  },

  /**
   * 同步获取用户设置
   * @returns {Object} 用户设置
   */
  getSettingsSync() {
    try {
      const data = mockStorage.getSync({ key: 'settings' });
      const settings = safeParseJSON(data, {});
      return typeof settings === 'object' && settings !== null ? settings : {};
    } catch (e) {
      console.error('同步获取设置错误:', e);
      return {};
    }
  }
};

export default storageManager; 