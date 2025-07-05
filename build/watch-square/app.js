let $style$1411120752 = {
  "@info": {
    "styleObjectId": 1411120752
  }
};
const $app_style$1411120752 = $style$1411120752;
const storage = global.storage || {
  get(options) {
    if (typeof options.success === "function") {
      options.success("");
    }
  },
  getSync(options) {
    return "";
  },
  set(options) {
    if (typeof options.success === "function") {
      options.success();
    }
  },
  delete(options) {
    if (typeof options.success === "function") {
      options.success();
    }
  },
  clear(options) {
    if (typeof options.success === "function") {
      options.success();
    }
  }
};
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
        const sessions = this.getAllSessionsSync() || [];
        session.id = Date.now();
        sessions.push(session);
        storage.set({
          key: "sessions",
          value: JSON.stringify(sessions),
          success: () => resolve(session),
          fail: () => resolve(session)
        });
      } catch (e) {
        console.error("保存会话错误:", e);
        resolve(session);
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
        storage.get({
          key: "sessions",
          success: (data) => {
            try {
              const sessions = data ? JSON.parse(data) : [];
              resolve(sessions);
            } catch (e) {
              console.error("解析会话数据错误:", e);
              resolve([]);
            }
          },
          fail: () => resolve([])
        });
      } catch (e) {
        console.error("获取会话列表错误:", e);
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
      const data = storage.getSync({
        key: "sessions"
      });
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("同步获取会话列表错误:", e);
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
      this.getAllSessions().then((sessions) => {
        const session = sessions.find((s) => s.id === id) || null;
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
        this.getAllSessions().then((sessions) => {
          const index = sessions.findIndex((s) => s.id === session.id);
          if (index !== -1) {
            sessions[index] = session;
            storage.set({
              key: "sessions",
              value: JSON.stringify(sessions),
              success: () => resolve(true),
              fail: () => resolve(false)
            });
          } else {
            resolve(false);
          }
        });
      } catch (e) {
        console.error("更新会话错误:", e);
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
        this.getAllSessions().then((sessions) => {
          const filteredSessions = sessions.filter((s) => s.id !== id);
          if (filteredSessions.length !== sessions.length) {
            storage.set({
              key: "sessions",
              value: JSON.stringify(filteredSessions),
              success: () => resolve(true),
              fail: () => resolve(false)
            });
          } else {
            resolve(false);
          }
        });
      } catch (e) {
        console.error("删除会话错误:", e);
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
        storage.delete({
          key: "sessions",
          success: () => resolve(true),
          fail: () => resolve(false)
        });
      } catch (e) {
        console.error("清空会话错误:", e);
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
        storage.set({
          key: "settings",
          value: JSON.stringify(settings),
          success: () => resolve(true),
          fail: () => resolve(false)
        });
      } catch (e) {
        console.error("保存设置错误:", e);
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
        storage.get({
          key: "settings",
          success: (data) => {
            try {
              const settings = data ? JSON.parse(data) : {};
              resolve(settings);
            } catch (e) {
              console.error("解析设置数据错误:", e);
              resolve({});
            }
          },
          fail: () => resolve({})
        });
      } catch (e) {
        console.error("获取设置错误:", e);
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
      const data = storage.getSync({
        key: "settings"
      });
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error("同步获取设置错误:", e);
      return {};
    }
  }
};
global.CONSTANTS = {
  // 运动模式
  MODE: {
    SINGLES: "singles",
    DOUBLES: "doubles",
    MIXED: "mixed"
  },
  // 主题色
  THEME: {
    PRIMARY: "#33C9AB",
    SECONDARY: "#2B7A9A",
    WARNING: "#FF5733",
    SUCCESS: "#4CAF50",
    BACKGROUND: "#FFFFFF",
    TEXT: "#333333"
  },
  // 心率阈值（默认值）
  HEART_RATE: {
    MIN: 60,
    MAX: 180
  }
};
global.router = global.router || {
  push(options) {
    console.log("路由跳转:", options.uri);
  }
};
global.notification = global.notification || {
  showToast(options) {
    console.log("显示Toast:", options.message);
  }
};
global.accelerometer = global.accelerometer || {
  subscribe() {
    return 0;
  },
  unsubscribe() {
  }
};
global.gyroscope = global.gyroscope || {
  subscribe() {
    return 0;
  },
  unsubscribe() {
  }
};
global.heartrate = global.heartrate || {
  getHeartRate(callback) {
    if (typeof callback === "function") {
      callback({
        heartRate: 75
      });
    }
  }
};
global.workout = global.workout || {
  start(options) {
    if (typeof options.success === "function") {
      options.success();
    }
  },
  stop(options) {
    if (typeof options.success === "function") {
      options.success({
        calories: 100,
        duration: 1800
      });
    }
  }
};
global.storage = global.storage || {
  get(options) {
    if (typeof options.success === "function") {
      options.success("");
    }
  },
  getSync(options) {
    return "";
  },
  set(options) {
    if (typeof options.success === "function") {
      options.success();
    }
  },
  delete(options) {
    if (typeof options.success === "function") {
      options.success();
    }
  },
  clear(options) {
    if (typeof options.success === "function") {
      options.success();
    }
  }
};
global.storageManager = storageManager;
const memoryDb = {
  openOrCreate(options) {
    if (typeof options.success === "function") {
      options.success({
        status: "success"
      });
    }
  },
  executeSql(options) {
    if (typeof options.success === "function") {
      options.success({
        rows: [],
        rowsAffected: 0
      });
    }
  }
};
global.database = global.database || memoryDb;
global.dbManager = global.dbManager || {
  init() {
    return Promise.resolve();
  },
  executeSql() {
    return Promise.resolve({
      rows: [],
      rowsAffected: 0
    });
  }
};
global.dbInitPromise = Promise.resolve();
const $app_script$1411120752 = {
  /**
   * 应用创建时执行
   */
  onCreate() {
    console.log("FeatherSoar App Created");
    try {
      if (global.storageManager && typeof global.storageManager.init === "function") {
        global.dbInitPromise = global.storageManager.init().then(() => {
          console.log("存储初始化成功");
          return Promise.resolve();
        }).catch((err) => {
          console.error("存储初始化错误:", err);
          return Promise.resolve();
        });
      } else {
        console.log("存储API不可用");
        global.dbInitPromise = Promise.resolve();
      }
    } catch (e) {
      console.error("应用初始化错误:", e);
      global.dbInitPromise = Promise.resolve();
    }
    global.onerror = (error) => {
      console.error(`全局错误: ${error.message}`);
      return true;
    };
  },
  /**
   * 显示Toast提示
   */
  showToast(message, duration = 2e3) {
    try {
      if (global.notification && typeof global.notification.showToast === "function") {
        global.notification.showToast({
          message,
          duration
        });
      } else {
        console.log(`Toast: ${message}`);
      }
    } catch (e) {
      console.error("显示Toast错误:", e);
      console.log(`Toast: ${message}`);
    }
  }
};
$app_define$("@app-component/app", [], function($app_require$, $app_exports$, $app_module$) {
  $app_module$.exports = $app_script$1411120752.default || $app_script$1411120752;
  $app_module$.exports.style = $app_style$1411120752;
});
$app_bootstrap$("@app-application/app");
