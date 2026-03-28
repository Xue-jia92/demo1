# ClubMatch AI - 社团招新智能匹配平台

基于 AI 的高校社团招新匹配系统，连接学生兴趣与社团需求。

## 🌟 核心功能

### 1. 用户侧 (学生)
- **AI 兴趣测评**: 通过多维问卷生成用户画像。
- **智能推荐流**: 基于画像计算匹配度得分，精准推荐 Top N 社团。
- **AI 面试助手**: 模拟社团面试，提供实时反馈与建议。
- **一键报名**: 统一入口，简化流程。

### 2. 社团侧 (管理者)
- **招新仪表盘**: 实时监控申请人数、转化率及 AI 匹配分布。
- **人才发现**: AI 自动筛选高匹配度候选人。
- **面试管理**: 闭环管理面试流程，记录评价。

### 3. 技术栈
- **Frontend**: React (Vite) + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animation**: Framer Motion (Planned)

## 🚀 运行项目

1. 安装依赖:
   ```bash
   npm install
   ```

2. 启动开发服务器:
   ```bash
   npm run dev
   ```

## 📦 打包构建

```bash
npm run build
```

构建产物输出在 `dist/`。

## 🌍 部署上线（生成可访问链接）

### 方案 A：Vercel（推荐，最快）

1. 把项目推到 GitHub / Gitee（任意一个都可以）。
2. 进入 Vercel，新建项目并导入仓库。
3. 构建配置保持默认即可：
   - Build Command：`npm run build`
   - Output Directory：`dist`
4. 部署完成后会自动生成一个公网访问链接（形如 `https://xxx.vercel.app`）。

### 方案 B：Netlify（可视化操作）

1. 本地执行：
   ```bash
   npm run build
   ```
2. 打开 Netlify 后台，选择 “Deploy manually / Drag and drop”。
3. 把 `dist/` 文件夹拖拽上传，完成后会生成公网链接（形如 `https://xxx.netlify.app`）。

### 方案 C：GitHub Pages（适合静态站点）

已内置 GitHub Actions 自动部署到 Pages：
- 工作流文件：`.github/workflows/deploy-pages.yml`
- 会自动把 Vite `base` 设置为 `/<repo>/`，适配 `https://<user>.github.io/<repo>/`

使用步骤：
1. 把项目推到 GitHub（分支名为 `main`）。
2. GitHub 仓库 → Settings → Pages → Build and deployment：
   - Source 选择 `GitHub Actions`
3. 之后每次 `git push` 到 `main`，会自动构建并发布。
4. 部署成功后，访问：
   - `https://<你的 GitHub 用户名>.github.io/<仓库名>/`

如果你告诉我你准备用哪一种（Vercel / Netlify / GitHub Pages），我可以把对应的配置文件（例如 GitHub Actions workflow）直接补齐到仓库里。

## 🛠 逻辑补充说明
- **匹配算法**: 当前采用基于兴趣标签权重的模拟算法，可扩展为基于向量空间模型的语义匹配。
- **隐私保护**: 默认仅向学生展示匹配度，只有在学生申请后，社团方可查看完整 AI 画像。
- **动态权重**: 社团可在后台调整“技能”、“兴趣”、“活跃度”等指标的匹配权重。
