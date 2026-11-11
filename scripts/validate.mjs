#!/usr/bin/env node
/**
 * 校验 agent 预设补丁的结构合法性。
 * 在 CI 和本地都能跑：node scripts/validate.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

let YAML
try {
  YAML = require('yaml')
} catch {
  console.error('缺少依赖，请先运行：npm i -D yaml')
  process.exit(2)
}

const PATCH = 'patch/agent.patch.yml'
const errors = []
const warnings = []

function fail(msg) { errors.push(msg) }
function warn(msg) { warnings.push(msg) }

// 1) 文件存在
if (!fs.existsSync(PATCH)) {
  fail(`找不到 ${PATCH}`)
  report()
}

// 2) package.json 的 dsh.bundle.patch 指向同一文件
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const declared = pkg?.dsh?.bundle?.patch
if (!declared) fail('package.json 缺少 dsh.bundle.patch')
else if (path.normalize(declared) !== path.normalize('./' + PATCH))
  warn(`package.json 指向 ${declared}，与默认 ${PATCH} 不同`)

// 3) 解析 YAML（剥离 dsh 自定义的 !!js 标签）
const raw = fs.readFileSync(PATCH, 'utf8')
let doc
try {
  doc = YAML.parse(raw.replace(/!!js\s+/g, ''))
} catch (e) {
  fail(`YAML 解析失败：${e.message}`)
  report()
}

if (!Array.isArray(doc) || doc.length === 0) {
  fail('顶层应为非空数组（-[insert: ...]）')
  report()
}

const ins = doc[0]?.insert
if (!Array.isArray(ins) || ins.length === 0) {
  fail('第一项应为 { insert: [...] }')
  report()
}

for (const row of ins) {
  // 4) 顶层 name 必须是包名，不能是中文显示名 —— 这是最常见的「不可用」原因
  if (row.name !== '@deepseek-ai/dsh-agent-preset') {
    fail(`顶层 name 必须是 '@deepseek-ai/dsh-agent-preset'，实际是 ${JSON.stringify(row.name)}`)
  }

  const cfg = row.config
  if (!cfg) { fail('缺少 config'); continue }

  for (const key of ['id', 'name', 'description']) {
    if (!cfg[key]) fail(`config.${key} 不能为空`)
  }
  if (!Number.isInteger(cfg.order)) warn('config.order 建议用整数')

  const plugins = cfg.plugins
  if (!Array.isArray(plugins) || plugins.length === 0) {
    fail('config.plugins 必须是非空数组')
    continue
  }

  // 5) 每条插件都要有 id + name；分组条目必须带 group:true + isolate + config 数组
  for (const [i, p] of plugins.entries()) {
    const where = `plugins[${i}]`
    if (!p.id) fail(`${where} 缺少 id`)
    if (!p.name) fail(`${where} 缺少 name`)

    if (p.name === 'cordis:group') {
      if (p.group !== true) fail(`${where} (cordis:group) 必须写 group: true`)
      if (!p.isolate) fail(`${where} (cordis:group) 必须写 isolate`)
      if (!Array.isArray(p.config)) fail(`${where} (cordis:group) 的 config 必须是数组`)
    }
  }

  // 6) 平台条件禁用：Linux 上裸开 pwsh 会拖垮整个预设
  const byId = Object.fromEntries(plugins.map(p => [p.id, p]))
  if (byId['tool-pwsh'] && byId['tool-pwsh'].disabled === undefined)
    fail('tool-pwsh 必须带平台条件禁用：disabled: !!js process.platform !== \'win32\'')
  if (byId['tool-bash'] && byId['tool-bash'].disabled === undefined)
    warn('tool-bash 建议带 disabled: !!js process.platform === \'win32\'')

  // 7) id 唯一
  const ids = plugins.map(p => p.id).filter(Boolean)
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i)
  if (dup.length) fail(`plugins id 重复：${[...new Set(dup)].join(', ')}`)
}

report()

function report() {
  if (warnings.length) {
    console.log('⚠️  警告：')
    warnings.forEach(w => console.log('   -', w))
  }
  if (errors.length) {
    console.error('\n❌ 校验失败：')
    errors.forEach(e => console.error('   -', e))
    process.exit(1)
  }
  console.log('\n✅ 预设结构校验通过')
  process.exit(0)
}
