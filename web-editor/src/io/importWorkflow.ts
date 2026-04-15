import type { Workflow } from "@comfigui/shared/workflow";

export function importWorkflow(text: string): Workflow {
  const parsed = JSON.parse(text) as Workflow;

  if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) {
    throw new Error("Invalid workflow shape");
  }

  return parsed;
}
