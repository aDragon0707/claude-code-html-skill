# Claude Code HTML Skill

> English version: [README.en.md](README.en.md)

一个面向 Codex / Claude Code 的本地 skill：把复杂项目工作变成 **可读、可操作、可导出** 的单文件 HTML artifact，同时保留 Markdown / Obsidian 作为长期 source of truth。

它受 Anthropic 官方文章 [Using Claude Code: The unreasonable effectiveness of HTML](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html) 和官方示例仓库 [anthropics/html-effectiveness](https://github.com/anthropics/html-effectiveness) 启发，并融合了社区 `html-artifacts` skill 的结构思路。

## 它解决什么体感问题？

你可能已经遇到过这些问题：

- AI 写了 200 行 Markdown 计划，但你根本不想读完。
- 项目状态散在 Obsidian、worklog、handoff、聊天记录里，下一轮 AI 又要重新解释。
- 任务看板能看，但不能一键生成给某个 AI 的单任务 prompt。
- PR review、实现方案、事故复盘、架构解释在纯 Markdown 里很难横向比较。
- HTML 很好读，但长期文档还是必须回到 Markdown，尤其是 Obsidian。

这个 skill 的核心判断是：

```text
Markdown = 长期记忆 / source of truth / Obsidian 双链
HTML = 临时操作台 / 可视化 / 编辑器 / 调度台 / 导出器
```

## 它会生成什么？

它会根据任务自动选择 artifact 类型，而不是机械地“做一个网页”。

覆盖模式：

- 方案对比：三种实现方案并排比较，带指标和推荐
- 视觉探索：多个 UI 方向网格对比
- PR / Code Review：风险优先、annotated diff、测试缺口
- 代码/系统理解：流程图、文件路径、关键代码片段
- 设计系统/组件矩阵：tokens、variants、states
- 动画/交互原型：点击、拖拽、调参、复制参数
- SVG / 流程图 / 架构图
- 状态报告 / 事故报告 / 研究解释
- 实施计划：milestone、data flow、risk table、not doing
- 一次性编辑器：triage board、feature flags、prompt tuner
- Obsidian/Markdown 回写工作流
- 多 AI 调度台：单任务 prompt 导出、owner、blocker、evidence

## 最重要的设计原则

1. **先判断用户要完成什么动作**  
   比较、审阅、解释、调参、编辑、演示、交接、导出。

2. **不要做泛 dashboard**  
   如果页面没有明确动作，就不要做 HTML。

3. **编辑器必须能导出**  
   `Copy as Markdown`、`Copy diff`、`Copy prompt`、`Copy JSON`。

4. **执行 prompt 不能一股脑**  
   默认支持单任务、选中任务、Now bucket、变更 diff、全局规划分开导出。

5. **长期状态必须回写 Markdown**  
   HTML 看板不是真相源。执行完任务后要更新 Obsidian / worklog / decision log / AGENTS.md / CLAUDE.md。

## 安装

复制 `skill/` 到你的 Codex skills 目录：

```powershell
Copy-Item -Recurse .\skill "$env:USERPROFILE\.codex\skills\claude-code-html-skill"
```

然后重启 Codex，或新开一个会话。打 `/` 搜索：

```text
Claude Code HTML Skill
```

## 推荐用法

### 1. 方案对比

```text
使用 Claude Code HTML Skill，帮我比较三种实现这个同步队列的方案。我要能横向看复杂度、风险、测试成本，并给出推荐。
```

### 2. PR Review

```text
使用 Claude Code HTML Skill，把这个 PR 做成 HTML review artifact。先列 blocking findings，再给模块图、关键 diff、测试缺口。
```

### 3. Obsidian 项目管理

```text
使用 Claude Code HTML Skill，读取我的 Obsidian 项目 MOC 和 worklog，生成一个 HTML triage board。要求可以导出单任务 Codex prompt，并导出需要回写的 Markdown worklog section。
```

### 4. 多 AI 调度

```text
使用 Claude Code HTML Skill，把当前项目拆成适合多个 AI 执行的任务调度台。每个任务要有 owner、blocker、evidence required、target markdown note，并能复制单任务 prompt。
```

## 目录结构

```text
skill/
  SKILL.md
  agents/
    openai.yaml
  references/
    official-20-patterns.md
    official-details.md
    markdown-obsidian-loop.md
    ecosystem-comparison.md
    custom-editors.md
    exploration-and-planning.md
    code-review-and-pr.md
    design-and-prototypes.md
    diagrams-and-illustrations.md
    reports-and-research.md
    decks.md
    matching-your-style.md
```

## 和官方/社区的关系

这个 repo 不是 Anthropic 官方项目。

它参考了：

- Anthropic 官方文章：[Using Claude Code: The unreasonable effectiveness of HTML](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html)
- Anthropic 官方示例：[anthropics/html-effectiveness](https://github.com/anthropics/html-effectiveness)
- Anthropic Skills / artifact builder 思路：[anthropics/skills](https://github.com/anthropics/skills)
- 社区 skill：[dogum/html-artifacts](https://github.com/dogum/html-artifacts)

本项目的增量是：

- 把官方 20 个 HTML 示例整理成可路由 playbook
- 加入 Markdown / Obsidian source-of-truth 闭环
- 加入多 AI 调度和单任务 prompt 导出规则
- 强调使用者体感：少读长文、少丢上下文、少复制大杂烩 prompt

## License

Apache-2.0。见 [LICENSE](LICENSE)。
