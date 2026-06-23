/**
 * The Claude Code skill DAG. Concept nodes carry lesson content; achievement
 * nodes are capstone assessments earned by performance. Edges are
 * `prerequisite_for` (must be passed before the target unlocks). The orientation
 * node is tethered by soft, non-gating `orients` edges. The linear ladder is one
 * topological ordering.
 *
 * NOTE: `branch` reuses the framework's existing Branch slots as generic
 * grouping/colour buckets for this domain — they're styling tags, not labels.
 */
import type { SkillGraph, SkillNode, SkillEdge } from "../types";

const concept = (
  id: string,
  branch: SkillNode["branch"],
  lessonId: string,
  title: string,
  shortDescription: string,
  position: { x: number; y: number },
): SkillNode => ({ id, kind: "concept", branch, lessonId, title, shortDescription, position });

const achievement = (
  id: string,
  branch: SkillNode["branch"],
  title: string,
  shortDescription: string,
  assessmentIds: string[],
  position: { x: number; y: number },
): SkillNode => ({ id, kind: "achievement", branch, title, shortDescription, assessmentIds, position });

const NODES: SkillNode[] = [
  concept("c-orient", "foundations", "cl-orient", "Start Here: One Engine, Many Front-ends", "Desktop, VS Code, CLI are one engine sharing one config.", { x: 300, y: -160 }),
  concept("c-claudemd", "foundations", "cl-claudemd", "The .claude Directory", "Your team's operating manual, as versioned code.", { x: 300, y: 40 }),
  concept("c-skills", "categories", "cl-skills", "Skills", "On-demand capabilities; the description is the trigger.", { x: 60, y: 240 }),
  concept("c-agents", "composition", "cl-agents", "Sub-agents", "Bounded missions in their own context; least privilege.", { x: 320, y: 240 }),
  concept("c-tools", "examples", "cl-tools", "Hooks & MCP", "Enforced guardrails (hooks) and external tools (MCP).", { x: 580, y: 240 }),
  concept("c-team", "naturality", "cl-team", "A Shared Library for Your Team", "Plugins + a marketplace + managed settings = one shared setup.", { x: 320, y: 460 }),

  achievement("a-skill", "categories", "Author a Skill That Triggers", "Write a skill with a good description + progressive disclosure.", ["cap-skill"], { x: 60, y: 440 }),
  achievement("a-team", "naturality", "Set Up Claude for Your Team", "Stand up a shared library the whole team uses.", ["cap-team"], { x: 580, y: 460 }),
];

/** prerequisite_for edges: source must be passed before target unlocks. */
const PREREQS: [string, string][] = [
  ["c-claudemd", "c-skills"],
  ["c-claudemd", "c-agents"],
  ["c-claudemd", "c-tools"],
  ["c-skills", "c-team"],
  ["c-agents", "c-team"],
  ["c-tools", "c-team"],
  ["c-skills", "a-skill"],
  ["c-team", "a-team"],
];

/** soft, non-gating orientation links. */
const ORIENTS: [string, string][] = [
  ["c-orient", "c-claudemd"],
];

const EDGES: SkillEdge[] = [
  ...PREREQS.map(([source, target], i) => ({ id: `e${i}`, source, target, kind: "prerequisite_for" as const })),
  ...ORIENTS.map(([source, target], i) => ({ id: `o${i}`, source, target, kind: "orients" as const })),
];

export const SKILL_GRAPH: SkillGraph = { nodes: NODES, edges: EDGES };

export const ROOT_GOAL_ID = "a-team";

export function nodeById(id: string): SkillNode | undefined {
  return SKILL_GRAPH.nodes.find((n) => n.id === id);
}

export function nodeForLesson(lessonId: string): SkillNode | undefined {
  return SKILL_GRAPH.nodes.find((n) => n.lessonId === lessonId);
}

export function achievements(): SkillNode[] {
  return SKILL_GRAPH.nodes.filter((n) => n.kind === "achievement");
}

export function prereqsOf(id: string): string[] {
  return SKILL_GRAPH.edges
    .filter((e) => e.kind === "prerequisite_for" && e.target === id)
    .map((e) => e.source);
}

export function ancestorsOf(id: string): Set<string> {
  const out = new Set<string>();
  const walk = (n: string) => {
    for (const p of prereqsOf(n)) {
      if (!out.has(p)) { out.add(p); walk(p); }
    }
  };
  walk(id);
  return out;
}
