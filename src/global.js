/**
 * 轻羽飞扬 - 全局配置
 * 将常用的 Feature API 挂载到 global 下，方便项目使用
 * 如果需要增加全局变量，请同步更新 app.d.ts，可用于代码提示、错误检测
 */

/**
 * 全局变量初始化
 */

// 在BlueOS环境中，storage API应该已经是全局可用的
// 如果不可用，我们提供一个模拟实现
if (!global.storage) {
  console.log('storage API不可用，使用模拟实现');
  global.storage = {
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
}

// 全局常量
global.CONSTANTS = {
  // 运动模式
  MODE: {
    SINGLES: 'singles',
    DOUBLES: 'doubles',
    MIXED: 'mixed'
  },
  
  // 主题色
  THEME: {
    PRIMARY: '#33C9AB',
    SECONDARY: '#2B7A9A',
    WARNING: '#FF5733',
    SUCCESS: '#4CAF50',
    BACKGROUND: '#FFFFFF',
    TEXT: '#333333'
  },
  
  // 心率阈值（默认值）
  HEART_RATE: {
    MIN: 60,
    MAX: 180
  }
};

// 确保路由API可用
global.router = global.router || {
  push(options) {
    console.log('路由跳转:', options.uri);
  }
};

// 确保通知API可用
global.notification = global.notification || {
  showToast(options) {
    console.log('显示Toast:', options.message);
  }
};

// 确保传感器API可用
global.accelerometer = global.accelerometer || {
  subscribe() { return 0; },
  unsubscribe() {}
};

global.gyroscope = global.gyroscope || {
  subscribe() { return 0; },
  unsubscribe() {}
};

// 确保健康API可用
global.heartrate = global.heartrate || {
  getHeartRate(callback) {
    if (typeof callback === 'function') {
      callback({ heartRate: 75 });
    }
  }
};

global.workout = global.workout || {
  start(options) {
    if (typeof options.success === 'function') {
      options.success();
    }
  },
  stop(options) {
    if (typeof options.success === 'function') {
      options.success({ calories: 100, duration: 1800 });
    }
  }
};

// 内存数据库简单实现
const memoryDb = {
  openOrCreate(options) {
    if (typeof options.success === 'function') {
      options.success({ status: 'success' });
    }
  },
  executeSql(options) {
    if (typeof options.success === 'function') {
      options.success({ rows: [], rowsAffected: 0 });
    }
  }
};

// 确保数据库API可用
global.database = global.database || memoryDb;

// 简单的数据库管理器
global.dbManager = global.dbManager || {
  init() {
    return Promise.resolve();
  },
  executeSql() {
    return Promise.resolve({ rows: [], rowsAffected: 0 });
  }
};

// 初始化Promise
global.dbInitPromise = Promise.resolve();
