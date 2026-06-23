/**
 * Personalized goals (MVP): map a free-text goal to an existing achievement node
 * via a static keyword ruleset. Selecting it highlights that achievement's
 * prerequisite sub-DAG.
 */
import { nodeById } from "./graph";

interface Rule {
  match: RegExp;
  goal: string;
}

// More specific intents first.
const RULES: Rule[] = [
  { match: /team|org|share|shared|plugin|marketplace|managed|onboard|colleague|coworker/i, goal: "a-team" },
  { match: /skill|trigger|author|write a|reusable|workflow/i, goal: "a-skill" },
  { match: /claude\.?md|\.claude|settings|hook|mcp|agent|subagent/i, goal: "a-team" },
];

export interface ResolvedGoal {
  goal: string;
  title: string;
}

export function resolveGoal(text: string): ResolvedGoal | null {
  const t = text.trim();
  if (!t) return null;
  for (const r of RULES) {
    if (r.match.test(t)) {
      const node = nodeById(r.goal);
      if (node) return { goal: r.goal, title: node.title };
    }
  }
  return null;
}
