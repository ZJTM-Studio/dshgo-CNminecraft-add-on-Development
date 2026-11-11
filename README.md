# 筑界工坊 · 网易MC开发

DSH（DeepSeek Harness）Agent 预设包 —— 专为**网易《我的世界》中国版**（MCStudio / ModSDK）模组开发设计。

## 它是什么

一个 DSH 插件包（bundle），包含一组 `patch` 定义：安装后在 DSH 的预设选择器里多出一个 Agent，选中它开的会话会加载：

- **人格与规矩**：只做网易版、直接出完整文件、不空谈思路
- **工具清单**：22 个工具条目（文件读写、命令执行、技能检索、任务规划等）
- **知识库检索**：配合下文的网易 MC 文档库使用

## 能力

- 直接产出可导入 MCStudio 的完整模组包（行为包 + 资源包成对、uuid 唯一、路径大小写严格）
- 只写网易 ModSDK / Python 脚本，不碰国际版 `@minecraft/server`
- 先查本地官方文档再答，查不到就直说，不编 API

## 安装

```bash
# 1. 克隆本仓库
git clone https://github.com/<你的用户名>/dsh-agent-mcdev.git
cd dsh-agent-mcdev

# 2. 装进 DSH
dsh plugin --profile web add file:$PWD

# 3. 重启 DSH，在预设选择器里选「筑界工坊 · 网易MC开发」
```

## 知识库（可选但强烈建议）

预设会去 `/root/.dsh/knowledge/mc-netease/` 检索网易官方文档。没有这个目录时，它会退化成普通助手。

知识库共 1483 篇（ModAPI 参考 / 开发指南 / 教程），约 14 MB，单独发布在 Releases 里：

```bash
# 下载并解压到 DSH 知识库目录
mkdir -p $DSH_HOME/knowledge
tar xzf mc-netease.tar.gz -C $DSH_HOME/knowledge/
```

## 结构

```
package.json              # dsh.bundle.patch 指向 patch/agent.patch.yml
patch/agent.patch.yml     # 预设定义：persona + 22 个工具条目
```

## 要求

- DSH >= 0.2.1-rc.3
- Linux / macOS（Windows 上 `tool-bash` 会自动禁用并改用 PowerShell）

## License

MIT
