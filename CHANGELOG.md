# 更新日志

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)，
格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

## [0.2.0] - 2026-11-11

### 重大变更

**网易文档站整体迁移，知识库全量重建。**

- 旧站 `mc.163.com/dev/mcmanual/mc-dev/`（VuePress 1.8.2，1483 页）**已下线 404**
- 新站 `mc.163.com/newdev/docs/`（VitePress 1.6.4），已抓取 **845 页 / 8.2 MB**
- 知识库压缩包从 2.6 MB 降到 1.6 MB

### 新增内容（新站独有的体系）

- **预设架构 PresetAPI**：预设管理入口、零件基类、通用对象、各类预设（39 页）
- **Apollo 联机 SDK**：大厅与游戏服事件、控制服、功能服、服务器通信、运营指令（13 页）
- **ShaderSDK**：着色器开发（8 页）
- **物理系统**：刚体质量、五类关节（固定/距离/球窝/铰链/滑动）、断裂阈值
- **PC Java 服务器开发指南**：认证接入、反作弊、跨服与大厅、自定义发包、数据持久化、经济系统、公会组队、性能与 TPS、多线程（23 页）
- **屏幕坐标 ↔ 世界坐标**：`GetWorldRayFromScreenPoint` / `WorldToScreenPoint` / `GetViewMatrix` / `GetProjectionMatrix` 等

### 变更

- 知识库目录结构改为 `api/` `mcguide/` `guide/` 三段式
- 预设 persona 的检索路径全部改写（`mcdocs/` `mconline/` 已不存在）
- 技能 `netease-mc-dev` 的 SKILL.md 重写
- 知识库版本号 `v0.2.0-kb`

### 保留

- 旧知识库改名 `mc-netease-legacy/` 留在本地，仅作历史参考

---

## [0.1.0] - 2026-11-11

### 新增

- 首个可用版本：网易《我的世界》中国版模组开发专用 Agent 预设
- 22 个工具条目，含 skills 检索、任务规划、文件与命令执行
- 平台条件禁用：Linux 用 `tool-bash`，Windows 自动切 `tool-pwsh`
- `scripts/validate.mjs` 结构与平台条件校验
- GitHub Actions 自动校验工作流
- 知识库 Release（1483 篇官方文档，2.6 MB 压缩 / 14 MB 解压）

### 约定

- 只写网易 ModSDK / Apollo，禁用国际版 `@minecraft/server`
- 交付前强制三问：能导入吗 / uuid 唯一吗 / 路径大小写对吗

---

## 版本对应关系

| 预设版本 | 适配 DSH | 知识库版本 | 文档站 |
|---|---|---|---|
| 0.2.0 | >= 0.2.1-rc.3 < 0.3.0 | `v0.2.0-kb` | newdev（845 页） |
| 0.1.0 | >= 0.2.1-rc.3 < 0.3.0 | `v0.1.0-kb` | dev/mcmanual（已下线） |
