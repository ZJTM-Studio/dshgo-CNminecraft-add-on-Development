# 更新日志

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)，
格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

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

| 预设版本 | 适配 DSH | 知识库版本 |
|---|---|---|
| 0.1.0 | >= 0.2.1-rc.3 < 0.3.0 | `v0.1.0-kb` |
