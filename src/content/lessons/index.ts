/**
 * The ordered lesson list. The rest of the app is data-driven off this array.
 * `UPCOMING` shows the not-yet-authored topics greyed in the sidebar so the
 * learner sees where the ladder is heading.
 */
import type { Lesson } from "../../types";
import { clOrient, clClaudemd, clSkills, clAgents, clTools, clTeam } from "./claude";

export const LESSONS: Lesson[] = [
  clOrient,
  clClaudemd,
  clSkills,
  clAgents,
  clTools,
  clTeam,
];

/** Not-yet-authored topics, shown greyed in the sidebar. */
export const UPCOMING: { stage: number; title: string }[] = [
  { stage: 6, title: "Plugins & Marketplaces" },
  { stage: 7, title: "Managed Settings & Governance" },
  { stage: 8, title: "Choosing Your Workspace (Desktop / VS Code / CLI)" },
  { stage: 9, title: "Cost & Context Management" },
];

export function lessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
