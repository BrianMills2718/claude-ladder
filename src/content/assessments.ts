/**
 * Achievement capstones. Each achievement node is earned by passing one of these
 * — a deterministic component (graded by the Quiz engine) plus an open-ended
 * explanation graded by the LLM judge (self-assess if no backend). Fatal
 * misconceptions fail the task regardless of other credit and route to remediation.
 */
import type { AssessmentTask, Misconception, Rubric } from "../types";

const M: Record<string, Misconception> = {
  vagueDescription: { id: "vague-description", description: "Writes a vague skill description that won't reliably trigger (or fires constantly).", remediationNodeIds: ["c-skills"], fatal: true },
  monolith: { id: "monolith", description: "Crams everything into one SKILL.md instead of using progressive disclosure.", remediationNodeIds: ["c-skills"] },
  siloed: { id: "siloed", description: "Keeps shared skills in a personal ~/.claude where the team can't use them.", remediationNodeIds: ["c-team"], fatal: true },
  secretsInConfig: { id: "secrets-in-config", description: "Puts literal secrets in .mcp.json / settings instead of ${ENV}/OAuth.", remediationNodeIds: ["c-tools", "c-team"], fatal: true },
};

export const RUBRICS: Record<string, Rubric> = {
  "rub-generic": {
    id: "rub-generic",
    criteria: [
      { id: "correct", description: "Conceptually correct and applied to the concrete case, not memorized vocabulary.", maxScore: 70 },
      { id: "tradeoffs", description: "Names the real tradeoff / why, not just the what.", maxScore: 30 },
    ],
  },
};

export const ASSESSMENTS: AssessmentTask[] = [
  {
    id: "cap-skill",
    nodeId: "a-skill",
    kind: "hybrid",
    title: "Author a skill that triggers",
    prompt: "Design a skill: its description and structure.",
    deterministic: [
      {
        id: "skill-q1", type: "multi-select",
        prompt: "Which make a skill reliable and lean?",
        options: [
          "A specific, slightly-pushy description naming concrete contexts",
          "A vague description like 'improve code'",
          "Long reference material pushed to references/ instead of the body",
          "Everything in one 800-line SKILL.md",
        ],
        correct: [0, 2],
        explanation: "The description is the trigger (be specific); progressive disclosure keeps the body lean by pushing detail to references/.",
      },
    ],
    openEnded: { prompt: "Write a description line for a skill that generates release notes from merged PRs, and say where the long step-by-step procedure should live and why.", rubricId: "rub-generic" },
    requiredConcepts: ["skills", "description-trigger", "progressive-disclosure"],
    fatalMisconceptions: [M.vagueDescription],
    passThreshold: 0.8,
  },
  {
    id: "cap-team",
    nodeId: "a-team",
    kind: "hybrid",
    title: "Set up Claude for your team",
    prompt: "Lay out a shared library across the right layers.",
    deterministic: [
      {
        id: "team-q1", type: "multi-select",
        prompt: "Which are correct for a team setup?",
        options: [
          "Cross-project skills/agents/MCP ship as plugins from a private marketplace",
          "Project config (.claude/) is committed to the repo",
          "Secrets are referenced via ${ENV}, never literal in config",
          "Everyone keeps the shared skills in their personal ~/.claude",
        ],
        correct: [0, 1, 2],
        explanation: "Layers: repo for project config, marketplace for cross-project tools, managed settings for policy; secrets via ${ENV}; personal ~/.claude is siloed.",
      },
    ],
    openEnded: { prompt: "Your team has a 'frontend-standards' skill + a code-review agent + a GitHub MCP server to share across 10 repos. Where does each live, and how does a new hire get them?", rubricId: "rub-generic" },
    requiredConcepts: ["plugins", "marketplace", "managed-settings"],
    fatalMisconceptions: [M.siloed, M.secretsInConfig],
    passThreshold: 0.8,
  },
];

export const ASSESSMENT_BY_ID: Record<string, AssessmentTask> = Object.fromEntries(
  ASSESSMENTS.map((a) => [a.id, a]),
);
