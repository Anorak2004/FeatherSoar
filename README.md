# 轻羽飞扬 (FeatherSoar)

轻羽飞扬是一款专为羽毛球爱好者设计的智能手表应用，帮助用户记录、分析和提升羽毛球运动表现。

## 功能特点

- **实时数据监测**：心率、挥拍速度、挥拍次数等数据实时监测
- **动作识别**：自动识别正手、反手、杀球等动作
- **数据分析**：详细的运动报告和趋势分析
- **健康管理**：心率预警、卡路里消耗计算
- **历史记录**：查看历史训练数据和进步情况

## 项目结构

```
feathersoar/
├── src/                    # 源代码目录
│   ├── assets/             # 资源文件
│   │   ├── images/         # 图片资源
│   │   └── styles/         # 样式文件
│   ├── pages/              # 页面组件
│   │   ├── Home/           # 首页
│   │   ├── SessionStart/   # 运动开始页
│   │   ├── Dashboard/      # 运动仪表盘页
│   │   ├── Report/         # 运动报告页
│   │   ├── History/        # 历史记录页
│   │   └── Settings/       # 设置页
│   ├── app.ux              # 应用入口文件
│   ├── app.d.ts            # 类型声明文件
│   ├── global.js           # 全局变量和API
│   └── manifest.json       # 应用配置文件
├── packages/               # 功能模块包
│   ├── core/               # 核心工具和类型
│   ├── motion/             # 运动数据采集与算法
│   ├── ui/                 # UI组件
│   ├── service/            # 服务和API
│   ├── watchface/          # 表盘组件
│   └── quickcard/          # 快捷卡片组件
└── scripts/                # 构建和工具脚本
```

## 技术栈

- BlueOS 应用开发框架
- JavaScript/TypeScript
- SASS/SCSS
- Canvas 图表绘制

## 安装与使用

1. 克隆本仓库
   ```
   git clone https://github.com/yourusername/feathersoar.git
   cd feathersoar
   ```

2. 安装依赖
   ```
   pnpm install
   ```

3. 开发调试
   ```
   pnpm dev
   ```

4. 构建应用
   ```
   pnpm build
   ```

## 开发团队

- 设计：UI/UX设计团队
- 开发：前端开发团队
- 算法：运动数据分析团队

## 许可证

本项目采用 MIT 许可证
