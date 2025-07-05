let $style$779992388 = {
  "@info": {
    "styleObjectId": 779992388
  }
};
const $app_style$779992388 = $style$779992388;
const $app_script$779992388 = {
  data: function dataFun() {
    return {
      historyCount: 0,
      totalStrokes: 0,
      totalCalories: 0
    };
  },
  onInit() {
    console.log("Home页面初始化");
    this.historyCount = 0;
    this.totalStrokes = 0;
    this.totalCalories = 0;
    if (global.dbInitPromise) {
      global.dbInitPromise.then(() => {
        this.loadStatsFromStorage();
      }).catch((err) => {
        console.error("存储初始化错误:", err);
      });
    }
  },
  onShow() {
    if (global.dbInitPromise) {
      global.dbInitPromise.then(() => {
        this.loadStatsFromStorage();
      }).catch((err) => {
        console.error("存储初始化错误:", err);
      });
    }
  },
  methods: {
    /**
     * 从存储加载统计数据
     */
    loadStatsFromStorage() {
      try {
        if (global.storageManager && typeof global.storageManager.getAllSessions === "function") {
          global.storageManager.getAllSessions().then((sessions) => {
            this.historyCount = sessions.length || 0;
            let totalStrokes = 0;
            let totalCalories = 0;
            sessions.forEach((session) => {
              totalStrokes += session.strokes || 0;
              totalCalories += session.calories || 0;
            });
            this.totalStrokes = totalStrokes;
            this.totalCalories = totalCalories;
          }).catch((err) => {
            console.error("加载会话数据错误:", err);
            this.setDefaultStats();
          });
        } else {
          this.setDefaultStats();
        }
      } catch (e) {
        console.error("加载统计数据错误:", e);
        this.setDefaultStats();
      }
    },
    /**
     * 设置默认统计数据
     */
    setDefaultStats() {
      this.historyCount = 0;
      this.totalStrokes = 0;
      this.totalCalories = 0;
    },
    /**
     * 开始按钮点击事件
     */
    onStartClick() {
      try {
        if (global.router && typeof global.router.push === "function") {
          global.router.push({
            uri: "/pages/SessionStart"
          });
        } else {
          console.log("路由跳转: /pages/SessionStart");
        }
      } catch (e) {
        console.error("开始按钮点击错误:", e);
      }
    },
    /**
     * 历史记录点击事件
     */
    onHistoryClick() {
      try {
        if (global.router && typeof global.router.push === "function") {
          global.router.push({
            uri: "/pages/History"
          });
        } else {
          console.log("路由跳转: /pages/History");
        }
      } catch (e) {
        console.error("历史记录点击错误:", e);
      }
    },
    /**
     * 统计数据点击事件
     */
    onStatsClick() {
      try {
        if (global.router && typeof global.router.push === "function") {
          global.router.push({
            uri: "/pages/History"
          });
        } else {
          console.log("路由跳转: /pages/History");
        }
      } catch (e) {
        console.error("统计数据点击错误:", e);
      }
    },
    /**
     * 设置按钮点击事件
     */
    onSettingsClick() {
      try {
        if (global.router && typeof global.router.push === "function") {
          global.router.push({
            uri: "/pages/Settings"
          });
        } else {
          console.log("路由跳转: /pages/Settings");
        }
      } catch (e) {
        console.error("设置按钮点击错误:", e);
      }
    }
  }
};
$app_define$("@app-component/index", [], function($app_require$, $app_exports$, $app_module$) {
  $app_module$.exports = $app_script$779992388.default || $app_script$779992388;
  $app_module$.exports.style = $app_style$779992388;
});
$app_bootstrap$("@app-component/index");
