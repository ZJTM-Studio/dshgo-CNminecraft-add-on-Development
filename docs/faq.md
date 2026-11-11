# 常见问题

## 它跟国际版（Bedrock / Java）通用吗

不通用，也不打算通用。

本项目只写网易中国版的 **ModSDK / Apollo** 脚本，明确禁用：

- 国际版 `@minecraft/server`（JS API）
- 国际版目录布局（`behavior_pack` 根目录的 `manifest.json` 字段与网易不同）
- 国际版的事件系统（`world.afterEvents` 那套）

用户原话：「制作的模组必须严格按照网易我的世界模组包制作，因为我不会去做国际版，我只会去做网易版」。

## 知识库多大？必须装吗

压缩 1.6 MB，解压 8.2 MB，845 页。

不装也能用，但会失去"先查文档再回答"的能力 —— 它会退化成普通助手，可能编 API。

## 能同时装多个预设吗

可以。预设之间互不干扰，选择器里并列显示，开新会话时选一个。

## 为什么简介里不写人格设定

用户明确要求：「简介里边"人格为鲸鱼娘，六边形战士"这句话给我去掉，不要说明他的人格是啥，光说他能干什么活就完事了」。

## 改成自己工作室的名字怎么做

改三处（只改后两处就行，第一处不能碰）：

```yaml
- insert:
    - id: preset-mcdev
      name: '@deepseek-ai/dsh-agent-preset'   # ← 绝对不能改
      config:
        id: mcdev                              # ← 可以改，保持唯一
        name: 你的名字                          # ← 显示名
        description: 干什么活的说明              # ← 能力描述
```

改完跑 `node scripts/validate.mjs` 确认结构没问题，再重启 DSH。

## 为什么横幅是 SVG 不是 PNG

SVG 体积小（40 KB 含内嵌 logo）、任意分辨率不糊、GitHub 直接渲染。

代价是 SVG 作为 `<img>` 加载时**不能引用外部图片**（浏览器安全策略），所以 logo 必须以 base64 内嵌在 SVG 里。这条已经写进 CI 检查了。

## 装了以后没反应

检查三件事：

1. 重启了 DSH 进程吗（不是刷新页面）
2. `$DSH_HOME/knowledge/mc-netease/INDEX.md` 存在吗
3. 开的会话是不是选了「筑界工坊 · 网易MC开发」这个预设

详细排错见 [install.md](install.md#排错)。
