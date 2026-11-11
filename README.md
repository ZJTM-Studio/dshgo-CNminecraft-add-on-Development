<div align="center">

<img src="assets/banner.svg" width="100%" alt="筑界工坊 · 网易MC开发"/>

# 筑界工坊 · 网易MC开发

**DSH Agent 预设 · 网易《我的世界》中国版模组开发专用**

[![License](https://img.shields.io/badge/License-MIT-1B3F8F?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![DSH](https://img.shields.io/badge/DSH-%E2%89%A50.2.1--rc.3-122C6E?style=for-the-badge&logo=deepseek&logoColor=white)](https://github.com/deepseek-ai)
[![Version](https://img.shields.io/badge/Version-0.1.0-F0B429?style=for-the-badge&logo=git&logoColor=white)](https://github.com/ZJTM-Studio/dshgo-CNminecraft-add-on-Development/releases)
[![Platform](https://img.shields.io/badge/Platform-Linux%20%7C%20macOS%20%7C%20Android-0A1B45?style=for-the-badge&logo=linux&logoColor=white)](#)

[快速开始](#-快速开始) ·
[能力](#-能力) ·
[知识库](#-知识库) ·
[结构](#-结构) ·
[常见问题](#-常见问题)

</div>

---

## ✨ 这是什么

一个 **DSH Agent 预设包**（bundle），安装后在预设选择器里多出一个专用 Agent。选中它开的会话会加载一套为网易 MC 模组开发定制的能力：

> 直接产出可导入 MCStudio 的完整模组包，**不空谈思路**

| 维度 | 普通会话 | 选中本预设 |
|---|---|---|
| 知识来源 | 模型记忆，容易编 API | 先 grep 本地官方文档库，查不到就直说 |
| 输出形态 | 给思路、给片段 | 给完整文件树 + 每个文件的完整内容 |
| 版本取向 | 可能混入国际版 `@minecraft/server` | 只写网易 ModSDK / Python 脚本 |
| 包结构 | 可能漏 uuid、路径大小写错 | 行为包+资源包成对、uuid 唯一、路径严格对齐 |

<div align="center">

```mermaid
flowchart LR
    A[选中预设] --> B[加载人格 + 22 个工具条目]
    B --> C{需要查文档?}
    C -->|是| D[grep 本地知识库<br/>1483 篇官方文档]
    C -->|否| E[直接产出]
    D --> E
    E --> F[完整文件树<br/>行为包 + 资源包]
    F --> G[收尾三问<br/>能导入? uuid 唯一? 路径对?]
```

</div>

---

## 🚀 快速开始

### 1. 安装预设

```bash
git clone https://github.com/ZJTM-Studio/dshgo-CNminecraft-add-on-Development.git
cd dshgo-CNminecraft-add-on-Development

dsh plugin --profile web add file:$PWD
```

### 2. 装知识库（强烈建议）

预设会去 `$DSH_HOME/knowledge/mc-netease/` 检索官方文档。没有这个目录时，它会退化成普通助手。

```bash
# 下载（压缩后 2.6 MB，解压后 14 MB / 1483 篇）
curl -L -o mc-netease.tar.gz \
  https://github.com/ZJTM-Studio/dshgo-CNminecraft-add-on-Development/releases/download/v0.1.0-kb/mc-netease.tar.gz

# 解压到知识库目录
mkdir -p $DSH_HOME/knowledge
tar xzf mc-netease.tar.gz -C $DSH_HOME/knowledge/
```

### 3. 重启并选用

重启 DSH，在预设选择器里选 **「筑界工坊 · 网易MC开发」**。

---

## 🎯 能力

- **完整模组包产出**：行为包 + 资源包成对生成，`manifest.json` 的 uuid 全唯一，目录路径大小写与磁盘严格一致（网易黑紫块最高频原因）
- **网易版专精**：只写 ModSDK / Apollo / Python 脚本，禁用国际版 API 与目录布局
- **文档优先**：回答前先检索 1483 篇官方文档，查不到明说「文档里没有」，不编造 API
- **收尾自检**：每次交付前强制三问 —— 能导入吗 / uuid 唯一吗 / 路径大小写对吗

---

## 📚 知识库

| 分支 | 内容 | 篇数 |
|---|---|---|
| `mcdocs` | ModAPI 接口参考 | 283 |
| `mcguide` | 开发指南与规范 | 584 |
| `mconline` | MCStudio 教程 | 615 |
| **合计** | | **1483** |

来源：网易官方文档站 `mc.163.com/dev/mcmanual/mc-dev/`，本地镜像含 `INDEX.md` 分类树。

---

## 🧱 结构

```
dshgo-CNminecraft-add-on-Development/
├── package.json              # dsh.bundle.patch 指向 patch/agent.patch.yml
├── patch/
│   └── agent.patch.yml       # 预设定义：persona + 22 个工具条目
├── assets/
│   ├── banner.svg            # README 横幅
│   ├── logo.jpg              # 工作室图标
│   └── logo-full.jpg         # 工作室横版标识
├── LICENSE                   # MIT
└── README.md
```

<details>
<summary>预设里包含哪些工具条目</summary>

| 分类 | 条目 |
|---|---|
| 文件 | `tool-fs`、`tool-fs-search` |
| 执行 | `tool-bash`（Windows 自动切 `tool-pwsh`） |
| 网络 | `tool-web` |
| 技能 | `skill-filesystem`、`tool-skill` |
| 规划 | `planning`、`compaction`、`delegation` |
| 交互 | `tool-ask-user`、`tool-todo`、`present` |
| 任务 | `tool-jobs`、`tool-schedule`、`command-goal`、`tool-goal` |

</details>

---

## ❓ 常见问题

<details>
<summary><b>装完选择器里显示「不可用」怎么办？</b></summary>

两种「不可用」要分清：

- **整页**「标准模式不可用」= roster 整体读取失败
- **该预设单独标「不可用」** = 它自己的 plugins 有条目加载不了

最常见原因是预设 YAML 顶层 `name:` 被改成了中文显示名（必须永远是包名 `@deepseek-ai/dsh-agent-preset`，中文名只能放 `config.name`）。

</details>

<details>
<summary><b>它跟国际版（Bedrock / Java）通用吗？</b></summary>

不通用，也不打算通用。本预设只写网易中国版的 ModSDK / Apollo 脚本，禁用了国际版 `@minecraft/server` 与目录布局。

</details>

<details>
<summary><b>知识库多大？必须装吗？</b></summary>

压缩 2.6 MB，解压 14 MB。不装也能用，但会失去「先查文档再回答」的能力，退化成普通助手。

</details>

---

## 📄 License

[MIT](LICENSE)

<div align="center">

<img src="assets/logo-full.jpg" width="420" alt="筑界同盟工作室 Architects' Alliance"/>

<br/><br/>

<sub><b>筑界同盟工作室</b> · Architects' Alliance</sub><br/>
<sub>只做网易中国版</sub>

</div>
