# 架构说明

## 它到底是什么

不是插件（plugin），也不完全是 agent —— 它是一个 **DSH bundle**：一份声明式的 patch，安装时把内容"插"进 profile 的配置树里。

```
package.json
  └── dsh.bundle.patch: ./patch/agent.patch.yml
        └── 一条 insert 记录
              └── @deepseek-ai/dsh-agent-preset
                    └── config: { id, name, description, order, plugins[] }
                          └── plugins[] 里 22 个工具条目
```

安装命令走的是插件那套（`dsh plugin add`），所以从用户视角看它就是插件。

## 为什么这样做

DSH 的预设是声明式的，好处是：

- **不侵入本体**：不 patch `/opt/dsh` 下任何文件
- **可撤销**：`dsh plugin --profile web remove dsh-agent-mcdev` 就干净了
- **可组合**：同一个 profile 里能装多个预设，选择器里并列显示

## 关键设计决策

### 平台条件禁用

`tool-pwsh` 在 Linux 上加载会失败，失败会让整个预设 activate 不了。所以：

```yaml
- id: tool-pwsh
  name: '@deepseek-ai/dsh-tool-pwsh'
  disabled: !!js process.platform !== 'win32'
```

`!!js` 是 dsh 自定义的 YAML 标签，值在加载时求值。标准 YAML 解析器不认识它，所以 `scripts/validate.mjs` 解析前会先剥掉。

### 人格与工具分离

`agent.patch.yml` 里有两块互不相干的东西：

- `persona` 条目：只负责说话方式和行为规矩
- 其余 21 个条目：只负责能调什么工具

改人格不会影响能力，改工具不会影响人格。

### 知识库外置

知识库（8.2 MB / 845 页）没有进仓库，原因：

- 让 clone 保持秒级
- 文档会更新，用 Release 单独发版本更灵活
- 仓库只放代码，符合常规做法

代价是**装预设不等于装知识库**，两件事得分开做。

## 22 个工具条目分组

| 组 | 条目 | 作用 |
|---|---|---|
| 人格 | `persona` | 说话方式、行为规矩 |
| 指令 | `agent-instructions`、`time-context` | 基础系统提示与时间 |
| 文件 | `tool-fs`、`tool-fs-search` | 读写、搜索 |
| 执行 | `tool-bash` / `tool-pwsh` | 跑命令（按平台二选一） |
| 网络 | `tool-web` | 搜索与抓取 |
| 技能 | `skill-filesystem`、`tool-skill` | 技能发现与加载 |
| 规划 | `planning`、`compaction`、`delegation` | 任务拆分、上下文压缩、子智能体 |
| 交互 | `tool-ask-user`、`tool-todo`、`present` | 提问、待办、产出展示 |
| 任务 | `tool-jobs`、`tool-schedule`、`command-goal`、`tool-goal` | 后台任务、定时、目标管理 |
| 插件 | `tool-plugin-manager`、`tool-plugin-market` | 已禁用（避免预设内再装插件） |
