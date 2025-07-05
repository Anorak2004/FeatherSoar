let $style$1411120752 = {
  "@info": {
    "styleObjectId": 1411120752
  }
};
const $app_style$1411120752 = $style$1411120752;
if (!global.storage) {
  console.log("storage API不可用，使用模拟实现");
  global.storage = {
    get(options) {
      console.log("使用模拟storage.get", options.key);
      if (typeof options.success === "function") {
        options.success("");
      }
    },
    getSync(options) {
      console.log("使用模拟storage.getSync", options.key);
      return "";
    },
    set(options) {
      console.log("使用模拟storage.set", options.key);
      if (typeof options.success === "function") {
        options.success();
      }
    },
    delete(options) {
      console.log("使用模拟storage.delete", options.key);
      if (typeof options.success === "function") {
        options.success();
      }
    },
    clear(options) {
      console.log("使用模拟storage.clear");
      if (typeof options.success === "function") {
        options.success();
      }
    }
  };
}
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
      if (global.storage) {
        console.log("存储API可用");
        global.dbInitPromise = Promise.resolve().then(() => {
          console.log("存储初始化成功");
          return this.createSessionsStorage();
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
   * 确保会话存储已创建
   */
  createSessionsStorage() {
    return new Promise((resolve) => {
      try {
        if (global.storage && typeof global.storage.get === "function") {
          global.storage.get({
            key: "sessions",
            success: (data) => {
              if (!data) {
                global.storage.set({
                  key: "sessions",
                  value: JSON.stringify([]),
                  success: () => resolve(),
                  fail: () => resolve()
                });
              } else {
                resolve();
              }
            },
            fail: () => {
              global.storage.set({
                key: "sessions",
                value: JSON.stringify([]),
                success: () => resolve(),
                fail: () => resolve()
              });
            }
          });
        } else {
          resolve();
        }
      } catch (e) {
        console.error("创建会话存储错误:", e);
        resolve();
      }
    });
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
