/**
 * The Claude Code curriculum — six lessons, one per concept node. Plain prose
 * (no @n/@t chips), each with ≥2 confusions, ≥3 quiz questions, and a
 * comparison-table visualization, to pass the gates.
 */
import type { Lesson } from "../../types";

export const clOrient: Lesson = {
  id: "cl-orient",
  stage: 0,
  title: "Start Here: One Engine, Many Front-ends",
  summary: "Desktop, the VS Code extension, and the CLI are the same Claude Code engine sharing one config — pick a front-end per task, not a product to commit to.",
  prerequisites: [],
  objectives: [
    "Name the three front-ends and what each is best at.",
    "Explain why they are not rival products.",
    "Decide which front-end fits a given task.",
  ],
  definitions: [
    { term: "front-end", short: "A way to drive Claude Code: the Desktop app's Code tab, the VS Code extension, or the terminal CLI.", example: "The CLI is best for automation; Desktop for visual review." },
    { term: "shared config", short: "CLAUDE.md, skills, agents, hooks, and MCP servers all three front-ends read the same way." },
  ],
  sections: [
    { heading: "It isn't Desktop vs. Claude Code", body: `Claude Desktop's Code tab, the VS Code extension, and the CLI all run the *same* engine and read the *same* config. You can run several at once and move a CLI session into Desktop. So the real question is never "which product?" — it's "which front-end fits this task?"` },
    { heading: "When to use which", body: `Use the CLI for automation, scripting, and headless/CI runs. Use Desktop or the VS Code extension when you want visual diff review and panes. On Windows, the CLI now runs natively — WSL is a choice (for a Linux toolchain or sandboxing), not a requirement.` },
  ],
  visualizations: [
    {
      id: "viz-orient", kind: "comparison-table",
      title: "Which front-end fits the task?",
      textualSummary: "Desktop and VS Code give visual diff review; the CLI gives headless/scripting and runs on Linux. All share one config.",
      columns: ["Desktop", "VS Code", "CLI"],
      rows: [
        { label: "Visual diff review / panes", cells: { Desktop: { value: "yes" }, "VS Code": { value: "yes" }, CLI: { value: "no" } } },
        { label: "Headless / scripting / CI", cells: { Desktop: { value: "no" }, "VS Code": { value: "n/a", note: "via the CLI it bundles" }, CLI: { value: "yes" } } },
        { label: "Runs on Linux", cells: { Desktop: { value: "no" }, "VS Code": { value: "yes" }, CLI: { value: "yes" } } },
      ],
    },
  ],
  confusions: [
    { misconception: "Desktop and the CLI are competing products you must choose between.", correction: "They're front-ends over one engine that shares config; you can use several and switch any time." },
    { misconception: "Claude Code only runs on Linux/WSL.", correction: "It runs natively on Windows now; WSL is optional (a Linux toolchain or sandboxing)." },
  ],
  quiz: [
    { id: "q-orient-1", type: "multiple-choice", prompt: "What is the relationship between Claude Desktop's Code tab and the CLI?", options: ["Different products with different engines", "The same engine, sharing config, behind different front-ends", "Desktop is a cut-down trial of the CLI", "They cannot be used on the same machine"], correct: 1, explanation: "All front-ends run the same engine and share CLAUDE.md / skills / MCP, so you pick per task." },
    { id: "q-orient-2", type: "true-false", prompt: "Claude Code requires WSL to run on Windows.", correct: false, explanation: "It runs natively on Windows now; WSL is a choice for a Linux toolchain or sandboxing." },
    { id: "q-orient-3", type: "multiple-choice", prompt: "You need to run Claude in CI with no human watching. Which front-end?", options: ["Desktop Code tab", "VS Code extension", "The CLI (headless)", "Any of them"], correct: 2, explanation: "Headless/scripted runs are CLI-only; Desktop is interactive." },
  ],
  masteryCheckpoint: "You can pick the right front-end for a task and explain why it isn't a product lock-in.",
};

export const clClaudemd: Lesson = {
  id: "cl-claudemd",
  stage: 1,
  title: "The .claude Directory",
  summary: "The .claude directory is your team's operating manual as code: knowledge (CLAUDE.md), capabilities (skills/agents/hooks/MCP), and policy (settings) — versioned and reviewed like source.",
  prerequisites: [],
  objectives: [
    "List the three families of things that live in .claude.",
    "State the CLAUDE.md rule: every line earns its place; keep it under ~200 lines.",
    "Explain why CLAUDE.md is advisory and hooks are enforced.",
  ],
  definitions: [
    { term: "CLAUDE.md", short: "Always-loaded instructions: conventions, how-to-build, gotchas. Layered org → project → user.", example: "Commit it at the repo root so the team shares it." },
    { term: "settings.json", short: "Permissions, hooks, env. Commit .claude/settings.json; keep personal overrides in settings.local.json." },
    { term: "advisory vs enforced", short: "CLAUDE.md is guidance Claude may follow; hooks run no matter what — use hooks for non-negotiables." },
  ],
  sections: [
    { heading: "Three families", body: `Knowledge (CLAUDE.md, rules, memory) — what Claude should know. Capabilities (skills, agents, hooks, MCP) — what Claude can do. Policy (settings) — what Claude is allowed to do. A bad file here hits every teammate every session, so it earns code-review.` },
    { heading: "Keep it lean", body: `CLAUDE.md loads every session, so bloat is a per-session tax. Aim under ~200 lines; if removing a line wouldn't cause a mistake, cut it. For must-happen-every-time behaviour, use an enforced hook, not prose.` },
  ],
  visualizations: [
    {
      id: "viz-claudemd", kind: "comparison-table",
      title: "Commit it, or keep it local?",
      textualSummary: "Project CLAUDE.md and settings.json are committed for the team; personal overrides and secrets stay local.",
      columns: ["Commit (team)", "Local only"],
      rows: [
        { label: "Project CLAUDE.md", cells: { "Commit (team)": { value: "yes" }, "Local only": { value: "no" } } },
        { label: "settings.local.json / personal prefs", cells: { "Commit (team)": { value: "no" }, "Local only": { value: "yes" } } },
        { label: "Literal secrets / API keys", cells: { "Commit (team)": { value: "no" }, "Local only": { value: "no", note: "use ${ENV}/OAuth, not files" } } },
      ],
    },
  ],
  confusions: [
    { misconception: "Putting more in CLAUDE.md makes Claude follow it better.", correction: "Bloat dilutes what matters and hurts adherence; keep it lean and move enforcement to hooks." },
    { misconception: "Secrets can go in .mcp.json or settings since they're in the repo.", correction: "Never commit secrets; reference ${ENV} or use OAuth and keep values out of version control." },
  ],
  quiz: [
    { id: "q-claudemd-1", type: "multiple-choice", prompt: "Something must happen on every edit, no exceptions. Where does it belong?", options: ["A strongly-worded line in CLAUDE.md", "An enforced hook", "A skill description", "The user's memory file"], correct: 1, explanation: "CLAUDE.md is advisory; hooks are enforced and run regardless of what Claude decides." },
    { id: "q-claudemd-2", type: "true-false", prompt: "A bigger CLAUDE.md generally improves how well Claude follows it.", correct: false, explanation: "Bloat dilutes the signal and hurts adherence; keep it lean (~200 lines)." },
    { id: "q-claudemd-3", type: "multiple-choice", prompt: "Where should a personal env override live so it isn't shared?", options: [".claude/settings.json", ".claude/settings.local.json", "the project CLAUDE.md", ".mcp.json"], correct: 1, explanation: "settings.local.json is per-machine and git-ignored; settings.json is committed for the team." },
  ],
  masteryCheckpoint: "You can place a piece of config in the right .claude file and say whether it's advisory or enforced.",
};

export const clSkills: Lesson = {
  id: "cl-skills",
  stage: 2,
  title: "Skills",
  summary: "A skill is an on-demand capability. Its description is the trigger, and progressive disclosure keeps it cheap: a lean SKILL.md plus references/ loaded only when needed.",
  prerequisites: ["cl-claudemd"],
  objectives: [
    "Explain why the description is the primary trigger and should be specific.",
    "Apply progressive disclosure (SKILL.md body + references/ + scripts/).",
    "Decide when a skill is worth making vs not.",
  ],
  definitions: [
    { term: "skill", short: "A folder with a SKILL.md whose frontmatter declares name + description; loaded on demand.", example: ".claude/skills/release-notes/SKILL.md" },
    { term: "description (trigger)", short: "The always-in-context line that decides whether the skill fires. Be specific and a little pushy." },
    { term: "progressive disclosure", short: "Keep the body lean; push detail to references/ (loaded on demand) and scripts/ (run without loading)." },
  ],
  sections: [
    { heading: "The description is the contract", body: `The description is the only part always in context, so it decides whether Claude consults the skill. Claude tends to under-trigger, so name concrete phrases and contexts. Claude also won't consult a skill for one-step tasks it can already do.` },
    { heading: "Keep the body lean", body: `A long monolithic SKILL.md wastes context every time it triggers. Put methodology and examples in references/ and repeated work in scripts/. Explain the *why* of an instruction rather than stacking ALWAYS/NEVER rules.` },
  ],
  visualizations: [
    {
      id: "viz-skills", kind: "comparison-table",
      title: "What loads when (progressive disclosure)",
      textualSummary: "The description is always in context; the body loads on trigger; references/ and scripts/ load only when needed.",
      columns: ["Always in context", "On trigger / on demand"],
      rows: [
        { label: "name + description", cells: { "Always in context": { value: "yes" }, "On trigger / on demand": { value: "no" } } },
        { label: "SKILL.md body", cells: { "Always in context": { value: "no" }, "On trigger / on demand": { value: "yes" } } },
        { label: "references/ and scripts/", cells: { "Always in context": { value: "no" }, "On trigger / on demand": { value: "yes", note: "scripts run without loading" } } },
      ],
    },
  ],
  confusions: [
    { misconception: "A vague description like 'improve code' is fine.", correction: "Vague descriptions either never fire or fire constantly; name specific phrases and contexts." },
    { misconception: "Everything should be one big SKILL.md.", correction: "Use progressive disclosure: lean body + references/ + scripts/, so context isn't wasted." },
  ],
  quiz: [
    { id: "q-skills-1", type: "multiple-choice", prompt: "What most determines whether a skill triggers?", options: ["The length of the SKILL.md body", "The skill's description", "How many tools it lists", "Its position in the folder"], correct: 1, explanation: "The description is the always-loaded trigger surface; specificity drives correct triggering." },
    { id: "q-skills-2", type: "true-false", prompt: "Long reference material belongs in the SKILL.md body so it's always available.", correct: false, explanation: "Push it to references/ (loaded on demand); the body stays lean to save context." },
    { id: "q-skills-3", type: "multiple-choice", prompt: "Which description is most likely to trigger correctly?", options: ["'Helps with code.'", "'Improve things.'", "'Generate release notes from merged PRs. Use when the user asks for a changelog or release summary.'", "'Misc utilities.'"], correct: 2, explanation: "Specific phrases and contexts make triggering reliable; vague ones under- or over-fire." },
  ],
  masteryCheckpoint: "You can write a skill description that triggers on the right cases and structure the body with progressive disclosure.",
};

export const clAgents: Lesson = {
  id: "cl-agents",
  stage: 3,
  title: "Sub-agents",
  summary: "A sub-agent runs a bounded mission in its own context with least-privilege tools, and returns a result — not a transcript. Use it to keep your main context clean and to parallelize.",
  prerequisites: ["cl-claudemd"],
  objectives: [
    "Decide when a sub-agent is the right tool.",
    "Give a sub-agent one responsibility and only the tools it needs.",
    "Design its prompt so it returns a summary, not raw output.",
  ],
  definitions: [
    { term: "sub-agent", short: "A worker with its own context window and tool whitelist, defined at .claude/agents/<name>.md.", example: "A read-only code reviewer with Read/Grep only." },
    { term: "least privilege", short: "Give the agent only the tools its mission needs — a reviewer shouldn't have Write." },
    { term: "return a result", short: "The agent's final message IS its output; have it return a structured summary, not everything it read." },
  ],
  sections: [
    { heading: "When to use one", body: `Reach for a sub-agent when the work is a bounded mission with its own context (research, a broad read, an adversarial review) or when you want parallelism — and you want to keep your main conversation clean.` },
    { heading: "One job, least privilege, a clean return", body: `A god-agent that does everything and holds every tool is the top anti-pattern. Give it one responsibility, only the tools it needs, and a prompt that says what to return — a findings summary, not a stream-of-consciousness dump.` },
  ],
  visualizations: [
    {
      id: "viz-agents", kind: "comparison-table",
      title: "Main agent vs. a well-designed sub-agent",
      textualSummary: "A sub-agent has its own context, least-privilege tools, and returns a summary instead of a transcript.",
      columns: ["Main agent", "Sub-agent"],
      rows: [
        { label: "Own isolated context window", cells: { "Main agent": { value: "no" }, "Sub-agent": { value: "yes" } } },
        { label: "Least-privilege tool set", cells: { "Main agent": { value: "n/a" }, "Sub-agent": { value: "yes" } } },
        { label: "Returns a summary, not a dump", cells: { "Main agent": { value: "n/a" }, "Sub-agent": { value: "yes" } } },
      ],
    },
  ],
  confusions: [
    { misconception: "A sub-agent should have broad tool access to be useful.", correction: "Least privilege: only the tools the mission needs; a smaller surface means fewer mistakes." },
    { misconception: "The agent should report everything it looked at.", correction: "Its final message is the result — return a concise structured summary, not a transcript." },
  ],
  quiz: [
    { id: "q-agents-1", type: "multiple-choice", prompt: "What should a well-designed review sub-agent return to the main session?", options: ["Every file it read, in full", "A concise structured summary of findings", "Only a pass/fail bit", "Its entire reasoning transcript"], correct: 1, explanation: "The agent's final message is its output; a linearized summary keeps the main context clean." },
    { id: "q-agents-2", type: "true-false", prompt: "A code-review sub-agent should be granted Write/Edit tools by default.", correct: false, explanation: "Least privilege: a reviewer reads; it shouldn't have write access unless the mission needs it." },
    { id: "q-agents-3", type: "multiple-choice", prompt: "The best reason to use a sub-agent is:", options: ["To make the answer longer", "To run a bounded mission in its own context and keep the main one clean", "To avoid writing a CLAUDE.md", "To bypass permissions"], correct: 1, explanation: "Sub-agents isolate a bounded mission's context and enable parallelism." },
  ],
  masteryCheckpoint: "You can scope a sub-agent to one mission, grant least-privilege tools, and make it return a summary.",
};

export const clTools: Lesson = {
  id: "cl-tools",
  stage: 4,
  title: "Hooks & MCP",
  summary: "Hooks are enforced guardrails on lifecycle events; MCP servers are external tools Claude can call. Both are shared via the repo — and secrets never go in the config.",
  prerequisites: ["cl-claudemd"],
  objectives: [
    "Distinguish enforced hooks from advisory instructions.",
    "Name the main hook lifecycle events.",
    "Share MCP tools with a team without leaking secrets.",
  ],
  definitions: [
    { term: "hook", short: "A command that runs on a lifecycle event — enforced, regardless of what Claude decides.", example: "PostToolUse: auto-format after every edit." },
    { term: "lifecycle event", short: "When a hook fires: PreToolUse / PostToolUse (with a tool matcher), UserPromptSubmit, SessionStart / Stop." },
    { term: "MCP server", short: "An external tool Claude can call (GitHub, a database). Configured in .mcp.json or settings; secrets via ${ENV}." },
  ],
  sections: [
    { heading: "Hooks: enforce the non-negotiables", body: `Unlike CLAUDE.md, a hook runs no matter what Claude decides — use it for things that must always happen: auto-format/lint on edit, blocking a risky command, logging. Programmatic coverage is exhaustive and cheap.` },
    { heading: "MCP: shared tools, no secrets in config", body: `Put project MCP servers in the repo so the team shares the same tools. Reference credentials with \${ENV} or OAuth — never literal keys in .mcp.json or settings.json.` },
  ],
  visualizations: [
    {
      id: "viz-tools", kind: "comparison-table",
      title: "Hook vs. CLAUDE.md vs. MCP",
      textualSummary: "Hooks are enforced; CLAUDE.md is advisory; MCP adds external tools. Secrets never live in config.",
      columns: ["Hook", "CLAUDE.md", "MCP"],
      rows: [
        { label: "Enforced (runs regardless)", cells: { Hook: { value: "yes" }, "CLAUDE.md": { value: "no" }, MCP: { value: "n/a" } } },
        { label: "Adds an external tool", cells: { Hook: { value: "no" }, "CLAUDE.md": { value: "no" }, MCP: { value: "yes" } } },
        { label: "Holds secrets directly", cells: { Hook: { value: "no" }, "CLAUDE.md": { value: "no" }, MCP: { value: "no", note: "use ${ENV}/OAuth" } } },
      ],
    },
  ],
  confusions: [
    { misconception: "A hook is just advice Claude might follow.", correction: "Hooks are enforced — they run on their event regardless of Claude's choices; that's the point." },
    { misconception: "It's fine to paste an API key into .mcp.json since the repo is private.", correction: "Never commit secrets; use ${ENV}/OAuth and keep values out of version control." },
  ],
  quiz: [
    { id: "q-tools-1", type: "multiple-choice", prompt: "You need linting to run on every file edit, guaranteed. What do you use?", options: ["A note in CLAUDE.md", "A PostToolUse hook", "A skill", "A sub-agent"], correct: 1, explanation: "Hooks are enforced on lifecycle events; CLAUDE.md is advisory." },
    { id: "q-tools-2", type: "true-false", prompt: "Putting a literal API key in .mcp.json is fine if the repo is private.", correct: false, explanation: "Never commit secrets; reference ${ENV} or use OAuth." },
    { id: "q-tools-3", type: "multiple-choice", prompt: "Which is a real hook lifecycle event?", options: ["OnThink", "PostToolUse", "BeforeAnswer", "OnScroll"], correct: 1, explanation: "PreToolUse/PostToolUse, UserPromptSubmit, SessionStart/Stop are the lifecycle events." },
  ],
  masteryCheckpoint: "You can choose a hook for an enforced rule and add a shared MCP server without exposing secrets.",
};

export const clTeam: Lesson = {
  id: "cl-team",
  stage: 5,
  title: "A Shared Library for Your Team",
  summary: "A team setup is layers: project config in the repo, cross-project tooling in a plugin marketplace, and org policy in managed settings. Plugins bundle skills + agents + hooks + MCP into one versioned, shareable unit.",
  prerequisites: ["cl-skills", "cl-agents", "cl-tools"],
  objectives: [
    "Match each artifact (project config, shared tools, org policy) to its sharing mechanism.",
    "Explain why a plugin marketplace is the shared library.",
    "Name the managed setting that fixes the WSL/Windows config split.",
  ],
  definitions: [
    { term: "plugin", short: "A versioned bundle of skills + agents + hooks + MCP servers, installed from a marketplace.", example: "An internal 'frontend-standards' plugin." },
    { term: "plugin marketplace", short: "A private repo of plugins; the team runs /plugin marketplace add once, then installs and gets updates." },
    { term: "managed settings", short: "Org policy delivered by Team/Enterprise admin: allow-lists, a managed CLAUDE.md, and wslInheritsWindowsSettings." },
  ],
  sections: [
    { heading: "Layers, not one place", body: `Project-specific config lives in the repo (.claude/ committed). Cross-project tools live in an internal plugin marketplace. Org-wide policy lives in managed settings. Match each thing to its layer instead of one bucket.` },
    { heading: "Plugins are the shared library", body: `A plugin bundles skills, agents, hooks, and MCP into one versioned unit, distributed by a private marketplace. That's how you avoid skills getting siloed in one person's ~/.claude. Managed settings (including wslInheritsWindowsSettings, which makes WSL inherit the Windows config) provide the guardrails.` },
  ],
  visualizations: [
    {
      id: "viz-team", kind: "comparison-table",
      title: "What lives in which layer",
      textualSummary: "Project config goes in the repo; cross-project tools in a marketplace plugin; org policy in managed settings.",
      columns: ["Project (git)", "Marketplace plugin", "Managed settings"],
      rows: [
        { label: "Project-specific skills/agents", cells: { "Project (git)": { value: "yes" }, "Marketplace plugin": { value: "no" }, "Managed settings": { value: "no" } } },
        { label: "Cross-project shared tools", cells: { "Project (git)": { value: "no" }, "Marketplace plugin": { value: "yes" }, "Managed settings": { value: "no" } } },
        { label: "Org-wide policy / allow-lists", cells: { "Project (git)": { value: "no" }, "Marketplace plugin": { value: "no" }, "Managed settings": { value: "yes" } } },
      ],
    },
  ],
  confusions: [
    { misconception: "All shared config should live in one place (everyone's ~/.claude).", correction: "It's layered: repo for project config, marketplace for cross-project tools, managed settings for org policy." },
    { misconception: "Skills in your personal ~/.claude are available to the team.", correction: "They're siloed; commit to .claude/skills or ship them as a plugin from the marketplace." },
  ],
  quiz: [
    { id: "q-team-1", type: "multiple-choice", prompt: "What's the cleanest way to share a set of skills + agents + MCP across many repos in a team?", options: ["Email a zip file", "Each person copies them into ~/.claude", "Bundle them as plugins in a private marketplace", "Paste them into every repo's CLAUDE.md"], correct: 2, explanation: "Plugins bundle them into one versioned unit; a marketplace distributes and updates them team-wide." },
    { id: "q-team-2", type: "true-false", prompt: "A skill in your personal ~/.claude is automatically available to your teammates.", correct: false, explanation: "It's siloed; commit it to .claude/skills or ship it as a plugin." },
    { id: "q-team-3", type: "multiple-choice", prompt: "Which managed setting makes WSL inherit the Windows-side config?", options: ["wslSharedConfig", "wslInheritsWindowsSettings", "inheritWsl", "windowsToWsl"], correct: 1, explanation: "wslInheritsWindowsSettings fixes the WSL/Windows config split for managed setups." },
  ],
  masteryCheckpoint: "You can lay out a team's skills/agents/MCP across project, marketplace, and managed-settings layers.",
};
