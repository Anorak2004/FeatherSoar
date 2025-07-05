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
        if (global.storage && typeof global.storage.get === "function") {
          global.storage.get({
            key: "sessions",
            success: (data) => {
              try {
                const sessions = data ? JSON.parse(data) : [];
                const validSessions = Array.isArray(sessions) ? sessions : [];
                this.historyCount = validSessions.length;
                let totalStrokes = 0;
                let totalCalories = 0;
                validSessions.forEach((session) => {
                  const strokes = Number(session && session.strokes) || 0;
                  const calories = Number(session && session.calories) || 0;
                  totalStrokes += strokes;
                  totalCalories += calories;
                });
                this.totalStrokes = totalStrokes;
                this.totalCalories = totalCalories;
              } catch (e) {
                console.error("解析会话数据错误:", e);
                this.setDefaultStats();
              }
            },
            fail: () => {
              this.setDefaultStats();
            }
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
