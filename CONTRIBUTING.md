# 贡献指南

感谢你想改进它。这个仓库不大，规矩也简单。

## 提 Issue 前

先看 [常见问题](docs/faq.md)，特别是「预设显示不可用」那一节——九成是这个原因。

## 改代码

```bash
git clone https://github.com/ZJTM-Studio/dshgo-CNminecraft-add-on-Development.git
cd dshgo-CNminecraft-add-on-Development
npm install
node scripts/validate.mjs    # 必须先跑通
```

改完 `patch/agent.patch.yml` 后，**结构校验通过不等于真能装**。合并前请实际装一遍：

```bash
dsh plugin --profile web add file:$PWD
# 重启 DSH，看预设选择器里能不能正常选中
```

## 三条硬规矩

| 规矩 | 为什么 |
|---|---|
| 顶层 `name:` 永远是 `@deepseek-ai/dsh-agent-preset` | 写成中文显示名会让 dsh 去 import 一个不存在的包，整个预设变「不可用」 |
| `tool-pwsh` 必须带 `disabled: !!js process.platform !== 'win32'` | Linux 上裸开 PowerShell 工具会让预设 activate 失败 |
| 人格描述与能力描述分开 | 用户明确要求简介只写「能干什么活」，不写人格设定 |

## 提交

```bash
git checkout -b feat/你的改动
git commit -m "feat: 一句话说清改了什么"
git push origin feat/你的改动
```

然后开 PR，填模板里的检查项。
