## 这个 PR 做了什么

<!-- 一句话说清改了什么、为什么改 -->

## 检查项

- [ ] `node scripts/validate.mjs` 通过
- [ ] 没有修改 `patch/agent.patch.yml` 顶层 `name:`（必须永远是 `@deepseek-ai/dsh-agent-preset`）
- [ ] `tool-pwsh` / `tool-bash` 仍带平台条件禁用
- [ ] 如改了人格描述，确认真实装一遍能正常激活（不是只看 YAML 语法）

## 相关 Issue

<!-- 例如 Closes #12 -->
