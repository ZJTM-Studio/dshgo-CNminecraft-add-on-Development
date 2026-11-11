# 安装详解

## 前置条件

| 项 | 要求 |
|---|---|
| DSH | >= 0.2.1-rc.3 < 0.3.0 |
| 系统 | Linux / macOS / Android(DSH Go) |
| Node | 18+（仅跑校验脚本时需要） |

## 第一步：装预设

```bash
git clone https://github.com/ZJTM-Studio/dshgo-CNminecraft-add-on-Development.git
cd dshgo-CNminecraft-add-on-Development

dsh plugin --profile web add file:$PWD
```

成功的标志是命令输出里出现 `added` 或类似的安装完成提示，并且：

```bash
ls node_modules 2>/dev/null | grep dsh-agent   # 或看 profile 的 node_modules
stat -c '%i %n' \
  patch/agent.patch.yml \
  $DSH_HOME/profiles/web/node_modules/dsh-agent-mcdev/patch/agent.patch.yml
```

如果两个路径的 inode 相同，说明 pnpm 用了硬链接 —— 之后改源文件会立即生效，不用重装。

## 第二步：装知识库

预设会去 `$DSH_HOME/knowledge/mc-netease/` 检索文档。没有它会退化成普通助手（不报错，但查不到东西）。

```bash
curl -L -o mc-netease.tar.gz \
  https://github.com/ZJTM-Studio/dshgo-CNminecraft-add-on-Development/releases/download/v0.2.0-kb/mc-netease.tar.gz

mkdir -p $DSH_HOME/knowledge
tar xzf mc-netease.tar.gz -C $DSH_HOME/knowledge/

# 验证：应该输出 845
find $DSH_HOME/knowledge/mc-netease -name "*.html" | wc -l
```

## 第三步：重启并选用

DSH 的预设注册表只在启动时读一次，**必须重启进程**（不是刷新网页）。

重启后在预设选择器里选「筑界工坊 · 网易MC开发」。

## 排错

### 显示「不可用」

分两种：

| 现象 | 原因 |
|---|---|
| **整个列表**只有「标准模式不可用」 | roster 整体读取失败，通常是 host 端报错 |
| **只有这一个**预设标「不可用」 | 该预设 activate 失败，它自己的 plugins 有条目加载不了 |

第二种最常见的原因，是预设 YAML 的**顶层 `name:` 被改成了中文显示名**。它必须永远是包名：

```yaml
- insert:
    - id: preset-mcdev
      name: '@deepseek-ai/dsh-agent-preset'   # ← 这一行不能改
      config:
        name: 筑界工坊 · 网易MC开发             # ← 中文名放这里
```

### 想看真实报错

起一个隔离端口的实例，日志里会直接说哪里错了：

```bash
dsh web --patch /etc/dsh-app/dsh-web.patch.yml \
        --patch /opt/dsh-app/speech.patch.yml \
        --patch /opt/dsh-app/auth/auth.patch.yml \
        --port 3095 --no-open
```

日志里找这两类：

```
agent preset mcdev: failed to import: Cannot find package 'xxx'
dsh: warning: N entries did not activate
```

> 注意：`dsh web` 不能再带 `--profile`，会报 `select a profile only once`。

### 知识库装了但查不到

确认路径：

```bash
ls $DSH_HOME/knowledge/mc-netease/INDEX.md
```

预设里硬编码的是 `/root/.dsh/knowledge/mc-netease/`。如果你的 `$DSH_HOME` 不是 `/root/.dsh`，需要手动建软链：

```bash
mkdir -p /root/.dsh/knowledge
ln -s $DSH_HOME/knowledge/mc-netease /root/.dsh/knowledge/mc-netease
```
